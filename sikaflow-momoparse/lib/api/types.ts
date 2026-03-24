export type Operator = "mtn" | "moov" | "celtiis";
export type TxType = "received" | "sent" | "payment" | "withdrawal";
export type TxStatus = "success" | "failed" | "pending";

/** Transaction exposée par l’API publique (pas de secrets). */
export interface PublicTransaction {
  id: string;
  operator: Operator;
  type: TxType;
  status: TxStatus;
  amount: number;
  currency: "XOF";
  reference: string;
  counterparty: string | null;
  receivedAt: string;
  externalRef: string | null;
  metadata: Record<string, unknown> | null;
}

export interface PublicTransactionDetail extends PublicTransaction {
  rawSms: string;
}
