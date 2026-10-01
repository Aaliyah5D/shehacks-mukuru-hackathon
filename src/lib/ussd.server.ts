// USSD menu for feature phones, shaped like Africa's Talking's USSD callback:
// the gateway POSTs { sessionId, phoneNumber, text } where `text` is every
// reply so far joined by "*" (e.g. "1*1*500"). We answer "CON …" to keep the
// session open or "END …" to close it. Re-parsing `text` on every request
// keeps the menu stateless; it reuses the same services as the web app.
import {
  buildQuote,
  createTransfer,
  currentRateWindow,
  listCountries,
  listTransfersBySender,
  MAX_AMOUNT,
  MIN_AMOUNT,
} from "./senda.server";
import type { TransferStatus } from "./types";

export type UssdRequest = { sessionId: string; phoneNumber: string; text: string };

const STRINGS = {
  en: {
    menu: "Senda\n1. Send money\n2. My transfers\n3. Shona\n0. Exit",
    sendTo: "Send to:",
    amount: "Amount in Rand (R{min}-R{max}):",
    phone: "Recipient phone number:",
    name: "Recipient full name:",
    city: "Recipient city:",
    confirm:
      "Send R{amount}\nFee R{fee}\nTotal R{total}\n{name} gets {receive} {cur}\n1. Confirm\n2. Cancel",
    sent: "Sent! Ref {id}\n{name} will get an SMS when it is ready to collect.",
    cancelled: "Cancelled. Nothing was sent.",
    bye: "Thank you for using Senda.",
    invalid: "Invalid choice. Please dial again.",
    badAmount: "Amount must be R{min}-R{max}. Please dial again.",
    badPhone: "Invalid phone number. Please dial again.",
    expired: "The rate changed. Nothing was sent. Please dial again.",
    failed: "Service unavailable. Please try again later.",
    none: "You have not sent any money yet.",
    mine: "Your transfers:",
    status: {
      SENT: "Sent",
      IN_TRANSIT: "In transit",
      READY_TO_COLLECT: "Ready",
      COLLECTED: "Collected",
    },
  },
  // Shona (prototype — should be reviewed by a native speaker).
  sn: {
    menu: "Senda\n1. Tumira mari\n2. Mari yandatumira\n0. Buda",
    sendTo: "Tumira ku:",
    amount: "Mari muRand (R{min}-R{max}):",
    phone: "Nhamba yerunhare yemugamuchiri:",
    name: "Zita rizere remugamuchiri:",
    city: "Guta remugamuchiri:",
    confirm:
      "Tumira R{amount}\nMari yekutumira R{fee}\nZvese R{total}\n{name} anogamuchira {receive} {cur}\n1. Bvuma\n2. Kanzura",
    sent: "Yatumirwa! Nhamba {id}\n{name} achagamuchira SMS kana yagadzirira kutorwa.",
    cancelled: "Zvakanzurwa. Hapana chatumirwa.",
    bye: "Tatenda nekushandisa Senda.",
    invalid: "Sarudzo isiri iyo. Ridza zvakare.",
    badAmount: "Mari inofanira kuva R{min}-R{max}. Ridza zvakare.",
    badPhone: "Nhamba isiri iyo. Ridza zvakare.",
    expired: "Mwero wachinja. Hapana chatumirwa. Ridza zvakare.",
    failed: "Sevhisi haisi kushanda. Edza zvakare gare gare.",
    none: "Hauna mari yawakatumira.",
    mine: "Mari yawakatumira:",
    status: {
      SENT: "Yatumirwa",
      IN_TRANSIT: "Iri munzira",
      READY_TO_COLLECT: "Yagadzirira",
      COLLECTED: "Yatorwa",
    },
  },
} satisfies Record<string, Record<string, string | Record<TransferStatus, string>>>;
type Strings = (typeof STRINGS)["en"];

// Registered customers, looked up by the phone the session comes from.
const CUSTOMERS: Record<string, { name: string; city: string }> = {
  "27820000000": { name: "Thandi", city: "Johannesburg" },
};

// Rate window shown on each session's confirm screen, so "1. Confirm" sends
// at the rate the customer read even if the window rolls over meanwhile.
const g = globalThis as unknown as { __sendaUssdQuotes?: Map<string, number> };
const confirmWindows = (g.__sendaUssdQuotes ??= new Map());

const con = (s: string) => `CON ${s}`;
const end = (s: string) => `END ${s}`;
const fill = (s: string, vars: Record<string, string | number>) =>
  Object.entries(vars).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), s);
const money = (n: number) =>
  new Intl.NumberFormat("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

export function handleUssd({ sessionId, phoneNumber, text }: UssdRequest): string {
  let inputs = text ? text.split("*") : [];
  let s: Strings = STRINGS.en;
  if (inputs[0] === "3") {
    s = STRINGS.sn;
    inputs = inputs.slice(1);
  }
  const [choice, ...rest] = inputs;
  if (choice === undefined) return con(s.menu);
  if (choice === "1") return sendMoney(rest, s, sessionId, phoneNumber);
  if (choice === "2") return myTransfers(s, phoneNumber);
  if (choice === "0") return end(s.bye);
  return end(s.invalid);
}

function sendMoney(inputs: string[], s: Strings, sessionId: string, phoneNumber: string) {
  const dests = listCountries().filter((c) => c.role === "destination");
  const [countryChoice, amountText, phone, name, city, confirm] = inputs.map((v) => v.trim());

  if (countryChoice === undefined)
    return con([s.sendTo, ...dests.map((c, i) => `${i + 1}. ${c.name}`)].join("\n"));
  const dest = dests[Number(countryChoice) - 1];
  if (!dest) return end(s.invalid);

  const limits = { min: MIN_AMOUNT, max: MAX_AMOUNT };
  if (amountText === undefined) return con(fill(s.amount, limits));
  const amount = Number(amountText);
  if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT)
    return end(fill(s.badAmount, limits));

  if (phone === undefined) return con(s.phone);
  if (phone.replace(/\D/g, "").length < 7) return end(s.badPhone);
  if (name === undefined) return con(s.name);
  if (!name) return end(s.invalid);
  if (city === undefined) return con(s.city);
  if (!city) return end(s.invalid);

  if (confirm === undefined) {
    const window = currentRateWindow();
    const quote = buildQuote(amount, dest.currencyCode, window);
    if (!quote) return end(s.failed);
    confirmWindows.set(sessionId, window);
    return con(
      fill(s.confirm, {
        amount: money(quote.amount),
        fee: money(quote.fee),
        total: money(quote.total),
        name,
        receive: money(quote.receiveAmount),
        cur: quote.receiveCurrency,
      }),
    );
  }

  const rateWindow = confirmWindows.get(sessionId);
  confirmWindows.delete(sessionId);
  if (confirm !== "1") return end(s.cancelled);

  const customer = CUSTOMERS[phoneNumber.replace(/\D/g, "")] ?? { name: phoneNumber, city: "—" };
  const result = createTransfer({
    amount,
    rateWindow,
    sender: { ...customer, countryCode: "ZA", phone: phoneNumber },
    recipient: { name, phone, city, countryCode: dest.code },
  });
  if ("error" in result) return end(result.error === "quote_expired" ? s.expired : s.failed);
  return end(fill(s.sent, { id: result.id, name }));
}

function myTransfers(s: Strings, phoneNumber: string) {
  const recent = listTransfersBySender(phoneNumber).slice(0, 3);
  if (!recent.length) return end(s.none);
  const lines = recent.map(
    (t) =>
      `${t.id} ${s.status[t.status]}\n${t.recipient.name}: ${money(t.quote.receiveAmount)} ${t.quote.receiveCurrency}`,
  );
  return end([s.mine, ...lines].join("\n"));
}
