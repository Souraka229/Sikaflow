export type Operator = "mtn" | "moov" | "celtiis";
export type TxType = "received" | "sent" | "payment" | "withdrawal";
export type TxStatus = "success" | "failed" | "pending";

export interface LiveTx {
  id: string;
  time: string;
  operator: Operator;
  type: TxType;
  amount: string;
  reference: string;
  status: TxStatus;
}

export const liveFeedMock: LiveTx[] = [
  {
    id: "1",
    time: "12:34:22",
    operator: "mtn",
    type: "received",
    amount: "25.000 FCFA",
    reference: "MP240324.1829",
    status: "success",
  },
  {
    id: "2",
    time: "12:31:08",
    operator: "moov",
    type: "payment",
    amount: "4.500 FCFA",
    reference: "MOOV-99281",
    status: "success",
  },
  {
    id: "3",
    time: "12:28:55",
    operator: "celtiis",
    type: "received",
    amount: "15.000 F",
    reference: "CEL-44102",
    status: "pending",
  },
  {
    id: "4",
    time: "12:15:01",
    operator: "mtn",
    type: "sent",
    amount: "10.000 FCFA",
    reference: "MTN-FAIL-01",
    status: "failed",
  },
];

export const recentTxMock: (LiveTx & { date: string; rawSms: string })[] = [
  {
    id: "r1",
    date: "2024-03-24 12:34",
    time: "12:34:22",
    operator: "mtn",
    type: "received",
    amount: "25.000 FCFA",
    reference: "MP240324.1829",
    status: "success",
    rawSms:
      "Vous avez recu 25000 FCFA de JEAN KOUASSI (22997000000). Ref: MP240324.1829. Nouveau solde: 182.400 FCFA.",
  },
  {
    id: "r2",
    date: "2024-03-24 11:02",
    time: "11:02:14",
    operator: "moov",
    type: "payment",
    amount: "4.500 FCFA",
    reference: "MOOV-99281",
    status: "success",
    rawSms:
      "Paiement de 4500 FCFA marchand RESTAFY SA. Ref MOOV-99281. Solde: 12.000 FCFA.",
  },
  {
    id: "r3",
    date: "2024-03-24 09:41",
    time: "09:41:33",
    operator: "celtiis",
    type: "received",
    amount: "8.000 F",
    reference: "CEL-8821",
    status: "pending",
    rawSms: "Credit 8000 F recu de 22961000000. Ref CEL-8821.",
  },
];

export const apiKeysMock = [
  {
    id: "k1",
    name: "Restafy Production",
    prefix: "mklive_8f3a…",
    scopes: ["read:transactions", "write:transactions"],
    lastUsed: "Il y a 12 min",
    active: true,
  },
  {
    id: "k2",
    name: "Staging",
    prefix: "mklive_dev…",
    scopes: ["read:transactions"],
    lastUsed: "Hier",
    active: true,
  },
];

export const devicesMock = [
  {
    id: "d1",
    name: "Caisse Sika — Principal",
    deviceId: "dev_sika_01",
    operators: ["mtn", "moov"] as Operator[],
    lastPingMin: 2,
  },
  {
    id: "d2",
    name: "Backup BJ",
    deviceId: "dev_sika_02",
    operators: ["celtiis"] as Operator[],
    lastPingMin: 45,
  },
];
