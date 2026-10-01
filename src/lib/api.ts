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

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(body.error ?? "unknown", res.status);
  return body as T;
}

export const api = {
  countries: () => req<{ countries: Country[] }>("/api/countries").then((r) => r.countries),
  rate: (currency: string, amount?: number) =>
    req<{ rate: number; quote: Quote | null; limits: { min: number; max: number } }>(
      `/api/exchange-rates/${currency}${amount ? `?amount=${amount}` : ""}`,
    ),
  createTransfer: (data: {
    amount: number;
    rateWindow: number;
    sender: Transfer["sender"];
    recipient: Transfer["recipient"];
  }) =>
    req<{ transfer: Transfer }>("/api/transfers", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((r) => r.transfer),
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
