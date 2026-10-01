import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { api, USSD_SERVICE_CODE } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import { Field, Screen } from "@/components/senda/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ussd")({
  head: () => ({
    meta: [
      { title: "Send with USSD — Senda" },
      {
        name: "description",
        content: `No smartphone or data? Dial ${USSD_SERVICE_CODE} to send money home.`,
      },
      { property: "og:title", content: "Send with USSD — Senda" },
      { property: "og:description", content: "Send money home from any phone, with no data." },
    ],
  }),
  component: UssdPage,
});

type Phase = "dial" | "running" | "session" | "ended";
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

function UssdPage() {
  const { t } = useI18n();
  const [phone, setPhone] = useState("+27 82 000 0000");
  const [phase, setPhase] = useState<Phase>("dial");
  const [dialed, setDialed] = useState(USSD_SERVICE_CODE);
  const [screen, setScreen] = useState("");
  const [inputs, setInputs] = useState<string[]>([]);
  const [reply, setReply] = useState("");
  const [sessionId, setSessionId] = useState("");

  // One gateway round-trip: every reply so far, joined by "*".
  async function request(session: string, next: string[]) {
    setPhase("running");
    try {
      const res = await api.ussd({ sessionId: session, phoneNumber: phone, text: next.join("*") });
      setScreen(res.slice(4));
      setInputs(next);
      setReply("");
      setPhase(res.startsWith("CON ") ? "session" : "ended");
    } catch {
      setScreen(t("ussdInvalid"));
      setPhase("ended");
    }
  }

  function call() {
    if (dialed.trim() !== USSD_SERVICE_CODE) {
      setScreen(t("ussdInvalid"));
      setPhase("ended");
      return;
    }
    const id = `sim-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setSessionId(id);
    void request(id, []);
  }

  function hangUp() {
    setPhase("dial");
    setScreen("");
    setInputs([]);
    setReply("");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (phase === "dial") call();
    else if (phase === "session" && reply.trim())
      void request(sessionId, [...inputs, reply.trim()]);
    else if (phase === "ended") hangUp();
  }

  const press = (k: string) =>
    phase === "dial"
      ? setDialed((d) => d + k)
      : phase === "session"
        ? setReply((r) => r + k)
        : undefined;
  const backspace = () =>
    phase === "dial" ? setDialed((d) => d.slice(0, -1)) : setReply((r) => r.slice(0, -1));

  const primaryLabel =
    phase === "dial" ? t("ussdCall") : phase === "ended" ? t("ussdClose") : t("ussdSend");
  const keyClass =
    "min-h-12 rounded-xl bg-neutral-800 text-xl font-semibold text-white active:bg-neutral-700 disabled:opacity-40";

  return (
    <Screen title={t("ussdTitle")} back="/">
      <p className="text-muted-foreground">{t("ussdLead")}</p>
      <Field
        id="ussd-phone"
        label={t("ussdPhone")}
        type="tel"
        inputMode="tel"
        value={phone}
        disabled={phase !== "dial"}
        onChange={(e) => setPhone(e.target.value)}
      />

      <form
        onSubmit={onSubmit}
        className="mx-auto w-full max-w-xs rounded-[2.5rem] bg-neutral-900 p-4 shadow-xl"
      >
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-72 flex-col rounded-2xl bg-[#d9e6c8] p-4 font-mono text-[15px] leading-snug text-neutral-900"
        >
          {phase === "dial" && (
            <>
              <p className="text-sm">{t("ussdHint", { code: USSD_SERVICE_CODE })}</p>
              <label htmlFor="ussd-dial" className="sr-only">
                {t("ussdCall")}
              </label>
              <input
                id="ussd-dial"
                value={dialed}
                onChange={(e) => setDialed(e.target.value)}
                autoComplete="off"
                className="mt-auto w-full bg-transparent text-right text-3xl font-bold outline-none"
              />
            </>
          )}
          {phase === "running" && <p className="m-auto text-center">{t("ussdRunning")}</p>}
          {(phase === "session" || phase === "ended") && (
            <p className="whitespace-pre-line">{screen}</p>
          )}
          {phase === "session" && (
            <div className="mt-auto pt-3">
              <label htmlFor="ussd-reply" className="sr-only">
                {t("ussdReply")}
              </label>
              <input
                id="ussd-reply"
                autoFocus
                autoComplete="off"
                placeholder={t("ussdReply")}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="w-full border-b-2 border-neutral-900 bg-transparent py-1 outline-none"
              />
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {KEYS.map((k) => (
            <button
              key={k}
              type="button"
              className={keyClass}
              disabled={phase === "running" || phase === "ended"}
              onClick={() => press(k)}
            >
              {k}
            </button>
          ))}
          <button
            type="button"
            className={cn(keyClass, "bg-red-700 text-base active:bg-red-600")}
            disabled={phase === "dial" || phase === "running"}
            onClick={hangUp}
          >
            {t("ussdCancel")}
          </button>
          <button
            type="submit"
            className={cn(keyClass, "bg-green-700 text-base active:bg-green-600")}
            disabled={phase === "running"}
          >
            {primaryLabel}
          </button>
          <button
            type="button"
            className={keyClass}
            aria-label={t("ussdDelete")}
            disabled={phase === "running" || phase === "ended"}
            onClick={backspace}
          >
            ⌫
          </button>
        </div>
      </form>
      <p className="text-center text-xs text-muted-foreground">
        POST /api/ussd · Africa's Talking USSD format
      </p>
    </Screen>
  );
}
