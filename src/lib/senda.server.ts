// Senda business logic (mock database + services). Server-only.
import { STATUS_FLOW, type Country, type Quote, type Transfer, type TransferStatus } from "./types";

export { STATUS_FLOW };
export type { Country, Quote, Transfer, TransferStatus };

// ---- Country service (add a country = add a row) ----
const COUNTRIES: Country[] = [
  {
    id: "za",
    name: "South Africa",
    code: "ZA",
    flag: "🇿🇦",
    currency: "South African Rand",
    currencyCode: "ZAR",
    currencySymbol: "R",
    supported: true,
    role: "origin",
  },
  {
    id: "zw",
    name: "Zimbabwe",
    code: "ZW",
    flag: "🇿🇼",
    currency: "Zimbabwe Gold",
    currencyCode: "ZWG",
    currencySymbol: "ZiG",
    supported: true,
    role: "destination",
  },
  {
    id: "mz",
    name: "Mozambique",
    code: "MZ",
    flag: "🇲🇿",
    currency: "Mozambican Metical",
    currencyCode: "MZN",
    currencySymbol: "MT",
    supported: true,
    role: "destination",
  },
  {
    id: "ls",
    name: "Lesotho",
    code: "LS",
    flag: "🇱🇸",
    currency: "Lesotho Loti",
    currencyCode: "LSL",
    currencySymbol: "L",
    supported: true,
    role: "destination",
  },
  {
    id: "sz",
    name: "Eswatini",
    code: "SZ",
    flag: "🇸🇿",
    currency: "Swazi Lilangeni",
    currencyCode: "SZL",
    currencySymbol: "E",
    supported: true,
    role: "destination",
  },
  {
    id: "bw",
    name: "Botswana",
    code: "BW",
    flag: "🇧🇼",
    currency: "Botswana Pula",
    currencyCode: "BWP",
    currencySymbol: "P",
    supported: true,
    role: "destination",
  },
  {
    id: "zm",
    name: "Zambia",
    code: "ZM",
    flag: "🇿🇲",
    currency: "Zambian Kwacha",
    currencyCode: "ZMW",
    currencySymbol: "K",
    supported: true,
    role: "destination",
  },
  {
    id: "mw",
    name: "Malawi",
    code: "MW",
    flag: "🇲🇼",
    currency: "Malawian Kwacha",
    currencyCode: "MWK",
    currencySymbol: "MK",
    supported: true,
    role: "destination",
  },
  {
    id: "gh",
    name: "Ghana",
    code: "GH",
    flag: "🇬🇭",
    currency: "Ghanaian Cedi",
    currencyCode: "GHS",
    currencySymbol: "₵",
    supported: true,
    role: "destination",
  },
  {
    id: "ng",
    name: "Nigeria",
    code: "NG",
    flag: "🇳🇬",
    currency: "Nigerian Naira",
    currencyCode: "NGN",
    currencySymbol: "₦",
    supported: true,
    role: "destination",
  },
];

export const listCountries = () => COUNTRIES.filter((c) => c.supported);
export const getCountry = (code: string) =>
  COUNTRIES.find((c) => c.code === code.toUpperCase() && c.supported);

// ---- Mock FX service (1 ZAR = X) ----
// Rates drift up to ±1.5% from a base rate, changing every RATE_WINDOW_MS.
// Each window's rate is derived deterministically from (currency, window), so
// a quote can be honoured later without storing it: the client sends back the
// quote's window and the server recomputes exactly the rate it showed.
const BASE_RATES: Record<string, number> = {
  ZAR: 1,
  ZWG: 1.48,
  MZN: 3.52,
  LSL: 1,
  SZL: 1,
  BWP: 0.74,
  ZMW: 1.46,
  MWK: 95.3,
  GHS: 0.84,
  NGN: 86.7,
};
const PEGGED = new Set(["ZAR", "LSL", "SZL"]); // 1:1 with the rand, never drift
const RATE_WINDOW_MS = 3 * 60 * 1000;

export const currentRateWindow = (now = Date.now()) => Math.floor(now / RATE_WINDOW_MS);
// A quote stays valid for the rest of its window plus one more (3–6 minutes).
export const rateValidUntil = (window: number) =>
  new Date((window + 2) * RATE_WINDOW_MS).toISOString();
export const isRateWindowValid = (window: number, now = Date.now()) => {
  const current = currentRateWindow(now);
  return window === current || window === current - 1;
};

function drift(currency: string, window: number) {
  // FNV-1a hash → a stable pseudo-random number in [-0.015, 0.015]. The final
  // avalanche step makes neighbouring windows produce unrelated values.
  let h = 2166136261;
  for (const ch of `${currency}:${window}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  h ^= h >>> 16;
  return ((h >>> 0) / 0xffffffff - 0.5) * 0.03;
}

export function getRate(currencyCode: string, window = currentRateWindow()) {
  const code = currencyCode.toUpperCase();
  const base = BASE_RATES[code];
  if (!base) return undefined;
  if (PEGGED.has(code)) return base;
  return Number((base * (1 + drift(code, window))).toPrecision(4));
}

// ---- Fee service: flat fee + percentage, configurable ----
const FEE_CONFIG = { flat: 15, percent: 0.02, min: 20 };
export const calculateFee = (amount: number) =>
  round2(Math.max(FEE_CONFIG.min, FEE_CONFIG.flat + amount * FEE_CONFIG.percent));

const round2 = (n: number) => Math.round(n * 100) / 100;

export const MIN_AMOUNT = 50;
export const MAX_AMOUNT = 5000;

export function buildQuote(
  amount: number,
  receiveCurrency: string,
  window = currentRateWindow(),
): Quote | null {
  const rate = getRate(receiveCurrency, window);
  if (!rate || !Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) return null;
  const fee = calculateFee(amount);
  return {
    sendCurrency: "ZAR",
    receiveCurrency: receiveCurrency.toUpperCase(),
    amount: round2(amount),
    fee,
    total: round2(amount + fee),
    rate,
    receiveAmount: round2(amount * rate),
    rateWindow: window,
    rateValidUntil: rateValidUntil(window),
  };
}

// ---- Status state machine ----
export function canTransition(from: TransferStatus, to: TransferStatus) {
  return STATUS_FLOW.indexOf(to) === STATUS_FLOW.indexOf(from) + 1;
}

// ---- Transfer service (in-memory mock DB) ----
const g = globalThis as unknown as { __sendaTransfers?: Map<string, Transfer> };
const store = (g.__sendaTransfers ??= new Map());

function newId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return `SND-${id}`;
}

const digits = (phone: string) => phone.replace(/\D/g, "");

export function createTransfer(input: {
  amount: number;
  /** Window of the quote the customer saw; omitted = take the current rate. */
  rateWindow?: number | undefined;
  sender: Transfer["sender"];
  recipient: Transfer["recipient"];
}): Transfer | { error: string } {
  const dest = getCountry(input.recipient.countryCode);
  if (!dest || dest.role !== "destination") return { error: "unsupported_country" };
  const window = input.rateWindow ?? currentRateWindow();
  if (!isRateWindowValid(window)) return { error: "quote_expired" };
  const quote = buildQuote(input.amount, dest.currencyCode, window);
  if (!quote) return { error: "invalid_amount" };
  const now = new Date().toISOString();
  let id = newId();
  while (store.has(id)) id = newId();
  const t: Transfer = {
    id,
    createdAt: now,
    updatedAt: now,
    status: "SENT",
    sender: input.sender,
    recipient: input.recipient,
    quote,
    notifications: [{ kind: "SENT", to: input.recipient.phone, at: now }],
  };
  store.set(id, t);
  return t;
}

export const getTransfer = (id: string) => store.get(id.toUpperCase().trim());

export const listTransfersBySender = (phone: string) =>
  [...store.values()]
    .filter((t) => t.sender.phone && digits(t.sender.phone) === digits(phone))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export function updateStatus(id: string, to: TransferStatus): Transfer | { error: string } {
  const t = getTransfer(id);
  if (!t) return { error: "not_found" };
  if (!canTransition(t.status, to)) return { error: "invalid_transition" };
  t.status = to;
  t.updatedAt = new Date().toISOString();
  // Tell the recipient when there's something for them to do.
  if (to === "READY_TO_COLLECT")
    t.notifications.push({ kind: to, to: t.recipient.phone, at: t.updatedAt });
  return t;
}
