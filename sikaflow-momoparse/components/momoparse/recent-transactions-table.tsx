import { OperatorBadge, StatusBadge, TypeBadge } from "@/components/momoparse/badge";
import type { Transaction } from "@/lib/data/transactions";

interface Row {
  id: string;
  date: string;
  operator: "mtn" | "moov" | "celtiis";
  type: "received" | "sent" | "payment" | "withdrawal";
  amount: string;
  reference: string;
  status: "success" | "failed" | "pending";
}

export function RecentTransactionsTable({ rows }: { rows: Row[] | Transaction[] }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface sf-card-shadow">
      <div className="border-b border-mp-border px-4 py-3">
        <h3 className="text-xs font-bold uppercase tracking-wide text-mp-muted">Transactions recentes</h3>
      </div>
      {rows.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-center">
          <div>
            <p className="text-sm text-mp-muted">Aucune transaction</p>
            <p className="mt-1 text-xs text-mp-muted/70">Vos transactions apparaitront ici</p>
          </div>
        </div>
      ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-mp-border text-[10px] font-bold uppercase tracking-wider text-mp-muted">
              <th className="px-4 py-3 font-bold">Date</th>
              <th className="px-4 py-3 font-bold">Opérateur</th>
              <th className="px-4 py-3 font-bold">Type</th>
              <th className="px-4 py-3 text-right font-bold">Montant</th>
              <th className="px-4 py-3 font-bold">Référence</th>
              <th className="px-4 py-3 font-bold">Statut</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-mp-border transition-colors hover:bg-mp-bg"
              >
                <td className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-mp-muted">
                  {r.date}
                </td>
                <td className="px-4 py-3">
                  <OperatorBadge op={r.operator} />
                </td>
                <td className="px-4 py-3">
                  <TypeBadge type={r.type} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-sm font-bold text-mp-text">
                  {r.amount}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-mp-muted">{r.reference}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
