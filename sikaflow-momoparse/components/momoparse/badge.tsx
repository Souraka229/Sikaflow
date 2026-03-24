import type { Operator, TxStatus, TxType } from "@/lib/data/transactions";

const operatorClass: Record<Operator, string> = {
  mtn: "bg-neutral-100 text-neutral-900 border-neutral-200",
  moov: "bg-violet-50 text-violet-900 border-violet-200",
  celtiis: "bg-sky-50 text-sky-900 border-sky-200",
};

const typeClass: Record<TxType, string> = {
  received: "bg-emerald-50 text-emerald-900 border-emerald-200",
  sent: "bg-red-50 text-red-900 border-red-200",
  payment: "bg-blue-50 text-blue-900 border-blue-200",
  withdrawal: "bg-neutral-100 text-neutral-700 border-neutral-200",
};

const statusClass: Record<TxStatus, string> = {
  success: "bg-emerald-50 text-emerald-800 border-emerald-200",
  failed: "bg-red-50 text-red-800 border-red-200",
  pending: "bg-amber-50 text-amber-900 border-amber-200",
};

const base =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide";

export function OperatorBadge({ op }: { op: Operator }) {
  const label = op === "mtn" ? "MTN" : op === "moov" ? "Moov" : "Celtiis";
  return <span className={`${base} ${operatorClass[op]}`}>{label}</span>;
}

export function TypeBadge({ type }: { type: TxType }) {
  const labels: Record<TxType, string> = {
    received: "Reçu",
    sent: "Envoyé",
    payment: "Paiement",
    withdrawal: "Retrait",
  };
  return <span className={`${base} ${typeClass[type]}`}>{labels[type]}</span>;
}

export function StatusBadge({ status }: { status: TxStatus }) {
  const labels: Record<TxStatus, string> = {
    success: "OK",
    failed: "Échec",
    pending: "En cours",
  };
  return <span className={`${base} ${statusClass[status]}`}>{labels[status]}</span>;
}

export function PlanBadge({ plan }: { plan: "PRO" | "FREE" }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
        plan === "PRO"
          ? "border-transparent bg-[#DFFF00] text-black"
          : "border-mp-border bg-mp-bg text-mp-muted"
      }`}
    >
      {plan}
    </span>
  );
}
