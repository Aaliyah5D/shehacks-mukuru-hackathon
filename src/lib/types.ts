// Domain types shared by the backend (senda.server.ts) and the client (api.ts).
export type Country = {
  id: string;
  name: string;
  code: string;
  flag: string;
  currency: string;
  currencyCode: string;
  currencySymbol: string;
  supported: boolean;
  role: "origin" | "destination";
};

export type TransferStatus = "SENT" | "IN_TRANSIT" | "READY_TO_COLLECT" | "COLLECTED";
export const STATUS_FLOW: TransferStatus[] = [
  "SENT",
  "IN_TRANSIT",
  "READY_TO_COLLECT",
  "COLLECTED",
];

export type Quote = {
  sendCurrency: string;
  receiveCurrency: string;
  amount: number;
  fee: number;
  total: number;
  rate: number;
  receiveAmount: number;
  /** FX window the rate belongs to; send it back to lock this rate in. */
  rateWindow: number;
  /** ISO time until which this quote will be honoured. */
  rateValidUntil: string;
};

/** A (mock) SMS sent to the recipient. */
export type Notification = {
  kind: "SENT" | "READY_TO_COLLECT";
  to: string;
  at: string;
};

export type Transfer = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: TransferStatus;
  sender: { name: string; city: string; countryCode: string; phone?: string };
  recipient: { name: string; phone: string; city: string; countryCode: string };
  quote: Quote;
  notifications: Notification[];
};

/** Shortcode customers dial to reach the USSD menu (see ussd.server.ts). */
export const USSD_SERVICE_CODE = "*120*7362#";
