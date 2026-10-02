import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  api,
  ApiError,
  flushQueuedTransfers,
  getQueuedTransfers,
  isBadNetworkDemoEnabled,
  isConnectionHealthy,
  queueTransferForRetry,
  setBadNetworkDemoEnabled,
} from "@/lib/api";
import { useFlow } from "@/lib/flow";
import { useI18n } from "@/lib/i18n";
import { useQuote } from "@/lib/use-quote";
import { Button, buttonClass, Card, ErrorMessage, Screen } from "@/components/senda/ui";
import { FeeBreakdown } from "@/components/senda/money";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Review transfer — Senda" },
      { name: "description", content: "Check every cost before you send." },
      { property: "og:title", content: "Review transfer — Senda" },
      { property: "og:description", content: "No hidden fees. Ever." },
    ],
  }),
  component: ReviewPage,
});

function ReviewPage() {
  const { t } = useI18n();
  const { draft } = useFlow();
  const nav = useNavigate();
  const { dest, countries, data, refetch } = useQuote();
  const origin = countries?.find((c) => c.code === draft.fromCode);
  const [queuedNotice, setQueuedNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulatedBadNetwork, setSimulatedBadNetwork] = useState(isBadNetworkDemoEnabled());
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setBadNetworkDemoEnabled(simulatedBadNetwork);
    if (simulatedBadNetwork) {
      setQueuedNotice((current) => current ?? "Queued, will send when you're back online");
    }
  }, [simulatedBadNetwork]);

  const goToTransferSuccess = (transferId: string) => {
    nav({ to: "/success/$id", params: { id: transferId as never } });
  };

  useEffect(() => {
    const retryQueuedTransfers = async () => {
      if (!getQueuedTransfers().length || !isConnectionHealthy()) return;
      const sent = await flushQueuedTransfers();
      if (!sent.length) return;
      const tr = sent[sent.length - 1];
      if (!tr) return;
      setQueuedNotice(null);
      goToTransferSuccess(tr.id);
    };

    void retryQueuedTransfers();
    window.addEventListener("online", retryQueuedTransfers);
    return () => window.removeEventListener("online", retryQueuedTransfers);
  }, [nav]);

  const expired = submitError === "quote_expired";

  const handleSend = async () => {
    if (!data?.quote) return;

    const payload = {
      amount: data.quote.amount,
      rateWindow: data.quote.rateWindow,
      sender: { ...draft.sender, countryCode: draft.fromCode },
      recipient: { ...draft.recipient, countryCode: draft.toCode },
    };
    const idempotencyKey = `senda-${Date.now()}-${payload.recipient.phone.replace(/\D/g, "")}`;

    setSubmitError(null);
    setQueuedNotice(null);
    setIsSubmitting(true);

    try {
      const tr = await api.createTransfer(payload, idempotencyKey);
      goToTransferSuccess(tr.id);
    } catch (error) {
      if (error instanceof ApiError && (error.code === "network_unavailable" || error.code === "network_slow")) {
        queueTransferForRetry(payload, idempotencyKey);
        setQueuedNotice("Queued, will send when you're back online");
        return;
      }

      if (error instanceof ApiError && error.code === "quote_expired") {
        setSubmitError("quote_expired");
        refetch();
        return;
      }

      setSubmitError("api_error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen title={t("reviewTitle")} step={4} back="/recipient">
      {dest && data?.quote && <FeeBreakdown quote={data.quote} country={dest} />}
      <Card className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{t("from")}</p>
          <p className="text-lg font-bold">{draft.sender.name}</p>
          <p className="text-muted-foreground">
            {draft.sender.city}, {origin?.name} {origin?.flag}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{t("to")}</p>
          <p className="text-lg font-bold">{draft.recipient.name}</p>
          <p className="text-muted-foreground">
            {draft.recipient.city}, {dest?.name} {dest?.flag}
          </p>
          <p className="text-sm text-muted-foreground">{draft.recipient.phone}</p>
        </div>
      </Card>
      <label className="flex items-center justify-between rounded-2xl border border-dashed border-input bg-muted/30 px-4 py-3 text-sm font-medium">
        <span>Simulate bad network</span>
        <input
          type="checkbox"
          checked={simulatedBadNetwork}
          onChange={(e) => setSimulatedBadNetwork(e.target.checked)}
          aria-label="Simulate bad network"
        />
      </label>
      {submitError && <ErrorMessage>{expired ? t("errQuoteExpired") : t("errApi")}</ErrorMessage>}
      {queuedNotice && (
        <div className="rounded-2xl border border-success/50 bg-success-soft px-4 py-3 text-sm font-semibold text-success">
          {queuedNotice}
        </div>
      )}
      <div className="space-y-3">
        <Button variant="accent" disabled={isSubmitting || !data?.quote} onClick={handleSend}>
          {isSubmitting ? t("sending") : `${t("confirmSend")} ✓`}
        </Button>
        <Link to="/amount" className={buttonClass("secondary")}>
          {t("editTransfer")}
        </Link>
      </div>
    </Screen>
  );
}
