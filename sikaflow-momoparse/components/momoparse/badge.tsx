import type { Operator, TxStatus, TxType } from "@/lib/mock-data";

const operatorClass: Record<Operator, string> = {
  mtn: "bg-[#FF6B35]/15 text-[#FF6B35] border-[#FF6B35]/35",
  moov: "bg-[#6B4EFF]/15 text-[#6B4EFF] border-[#6B4EFF]/35",
  celtiis: "bg-[#2D9CDB]/15 text-[#2D9CDB] border-[#2D9CDB]/35",
};

const typeClass: Record<TxType, string> = {
  received: "bg-[#00C48C]/15 text-[#00C48C] border-[#00C48C]/35",
  sent: "bg-[#FF5C5C]/15 text-[#FF5C5C] border-[#FF5C5C]/35",
  payment: "bg-[#0099FF]/15 text-[#0099FF] border-[#0099FF]/35",
  withdrawal: "bg-white/10 text-white/70 border-white/15",
};

const statusClass: Record<TxStatus, string> = {
  success: "bg-[#00C48C]/15 text-[#00C48C] border-[#00C48C]/35",
  failed: "bg-[#FF5C5C]/15 text-[#FF5C5C] border-[#FF5C5C]/35",
  pending: "bg-[#FF6B35]/15 text-[#FF6B35] border-[#FF6B35]/35",
};

const base =
  "inline-flex items-center rounded-[6px] border px-2 py-0.5 text-[11px] font-mono font-medium uppercase tracking-wide";

export function OperatorBadge({ op }: { op: Operator }) {
  const label = op === "mtn" ? "MTN" : op === "moov" ? "Moov" : "Celtiis";
  return <span className={`${base} ${operatorClass[op]}`}>{label}</span>;
}

export function TypeBadge({ type }: { type: TxType }) {
  const labels: Record<TxType, string> = {
    received: "Received",
    sent: "Sent",
    payment: "Payment",
    withdrawal: "Withdrawal",
  };
  return <span className={`${base} ${typeClass[type]}`}>{labels[type]}</span>;
}

export function StatusBadge({ status }: { status: TxStatus }) {
  const labels: Record<TxStatus, string> = {
    success: "Success",
    failed: "Failed",
    pending: "Pending",
  };
  return <span className={`${base} ${statusClass[status]}`}>{labels[status]}</span>;
}

export function PlanBadge({ plan }: { plan: "PRO" | "FREE" }) {
  return (
    <span
      className={`rounded-[6px] border px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider ${
        plan === "PRO"
          ? "border-[#FF6B35]/40 bg-[#FF6B35]/15 text-[#FF6B35]"
          : "border-white/15 bg-white/5 text-white/55"
      }`}
    >
      {plan}
    </span>
  );
}
