// Client-side REST wrappers. Types are shared with the backend.
import type { Country, Quote, Transfer, TransferStatus } from "./types";

export { STATUS_FLOW, USSD_SERVICE_CODE } from "./types";
export type { Country, Notification, Quote, Transfer, TransferStatus } from "./types";

export class ApiError extends Error {
  constructor(
    public code: string,
    public status: number,
  ) {
    super(code);
  }
}

const BAD_NETWORK_KEY = "senda-demo-bad-network";
const QUEUED_TRANSFERS_KEY = "senda-offline-transfer-queue";
const SENT_IDEMPOTENCY_KEYS_KEY = "senda-sent-idempotency-keys";

export type TransferPayload = {
  amount: number;
  rateWindow: number;
  sender: Transfer["sender"];
  recipient: Transfer["recipient"];
};

export type QueuedTransfer = {
  idempotencyKey: string;
  createdAt: string;
  payload: TransferPayload;
};

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(body.error ?? "unknown", res.status);
  return body as T;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const readLocalJson = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeLocalJson = <T>(key: string, value: T) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota/privacy issues.
  }
};

export const isBadNetworkDemoEnabled = () => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(BAD_NETWORK_KEY) === "1";
};

export const setBadNetworkDemoEnabled = (enabled: boolean) => {
  if (typeof window === "undefined") return;
  if (enabled) window.localStorage.setItem(BAD_NETWORK_KEY, "1");
  else window.localStorage.removeItem(BAD_NETWORK_KEY);
};

export const isConnectionHealthy = () => {
  if (typeof navigator === "undefined") return true;
  if (isBadNetworkDemoEnabled()) return false;
  return navigator.onLine;
};

export const getQueuedTransfers = (): QueuedTransfer[] =>
  readLocalJson<QueuedTransfer[]>(QUEUED_TRANSFERS_KEY, []);

export const writeQueuedTransfers = (items: QueuedTransfer[]) => {
  writeLocalJson(QUEUED_TRANSFERS_KEY, items);
};

export const getSentIdempotencyKeys = (): Set<string> => {
  const keys = readLocalJson<string[]>(SENT_IDEMPOTENCY_KEYS_KEY, []);
  return new Set(keys);
};

export const removeQueuedTransfer = (idempotencyKey: string) => {
  const queued = getQueuedTransfers().filter((item) => item.idempotencyKey !== idempotencyKey);
  writeQueuedTransfers(queued);
};

export const queueTransferForRetry = (
  payload: TransferPayload,
  idempotencyKey: string = crypto.randomUUID(),
): string => {
  const queued = getQueuedTransfers();
  const sentKeys = getSentIdempotencyKeys();
  const alreadyQueued = queued.some((item) => item.idempotencyKey === idempotencyKey);
  if (alreadyQueued || sentKeys.has(idempotencyKey)) return idempotencyKey;

  const next: QueuedTransfer = {
    idempotencyKey,
    createdAt: new Date().toISOString(),
    payload,
  };
  writeQueuedTransfers([...queued, next]);
  return idempotencyKey;
};

export const markTransferAsSent = (idempotencyKey: string) => {
  const keys = getSentIdempotencyKeys();
  keys.add(idempotencyKey);
  writeLocalJson(SENT_IDEMPOTENCY_KEYS_KEY, [...keys]);
  removeQueuedTransfer(idempotencyKey);
};

export const flushQueuedTransfers = async (): Promise<Transfer[]> => {
  if (!isConnectionHealthy()) return [];

  const queued = getQueuedTransfers();
  if (!queued.length) return [];

  const remaining: QueuedTransfer[] = [];
  const sent: Transfer[] = [];
  const sentKeys = getSentIdempotencyKeys();

  for (const item of queued) {
    if (sentKeys.has(item.idempotencyKey)) continue;
    try {
      const transfer = await api.createTransfer(item.payload, item.idempotencyKey);
      markTransferAsSent(item.idempotencyKey);
      sent.push(transfer);
    } catch {
      remaining.push(item);
    }
  }

  writeQueuedTransfers(remaining);
  return sent;
};

export const api = {
  countries: () => req<{ countries: Country[] }>("/api/countries").then((r) => r.countries),
  rate: (currency: string, amount?: number) =>
    req<{ rate: number; quote: Quote | null; limits: { min: number; max: number } }>(
      `/api/exchange-rates/${currency}${amount ? `?amount=${amount}` : ""}`,
    ),
  createTransfer: async (
    data: TransferPayload,
    idempotencyKey: string = crypto.randomUUID(),
  ): Promise<Transfer> => {
    if (isBadNetworkDemoEnabled()) {
      await sleep(2500);
      throw new ApiError("network_slow", 503);
    }
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      await sleep(250);
      throw new ApiError("network_unavailable", 503);
    }

    const res = await req<{ transfer: Transfer }>("/api/transfers", {
      method: "POST",
      headers: { "Idempotency-Key": idempotencyKey },
      body: JSON.stringify(data),
    });
    return res.transfer;
  },
  getTransfer: (id: string) =>
    req<{ transfer: Transfer }>(`/api/transfers/${encodeURIComponent(id)}`).then((r) => r.transfer),
  setStatus: (id: string, status: TransferStatus) =>
    req<{ transfer: Transfer }>(`/api/transfers/${encodeURIComponent(id)}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }).then((r) => r.transfer),
  /** One USSD request; returns the raw gateway reply ("CON …" or "END …"). */
  ussd: async (data: { sessionId: string; phoneNumber: string; text: string }) => {
    const res = await fetch("/api/ussd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new ApiError("ussd_failed", res.status);
    return res.text();
  },
};

export const countriesQuery = {
  queryKey: ["countries"],
  queryFn: api.countries,
  staleTime: Infinity,
};

export const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("en-ZA", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
