import { OperatorBadge, StatusBadge, TypeBadge } from "@/components/momoparse/badge";
import type { LiveTx } from "@/lib/mock-data";

type Row = LiveTx & { date: string };

export function RecentTransactionsTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-white/[0.08] bg-mp-surface">
      <div className="border-b border-white/[0.08] px-4 py-3">
        <h3 className="text-[11px] font-mono uppercase tracking-widest text-white/55">
          Recent transactions
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] font-mono text-[10px] uppercase tracking-wider text-white/45">
              <th className="px-4 py-2 font-medium">Date</th>
              <th className="px-4 py-2 font-medium">Opérateur</th>
              <th className="px-4 py-2 font-medium">Type</th>
              <th className="px-4 py-2 font-medium text-right">Montant</th>
              <th className="px-4 py-2 font-medium">Référence</th>
              <th className="px-4 py-2 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-white/[0.06] transition-colors duration-150 hover:bg-white/[0.03]"
              >
                <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-white/70">
                  {r.date}
                </td>
                <td className="px-4 py-2.5">
                  <OperatorBadge op={r.operator} />
                </td>
                <td className="px-4 py-2.5">
                  <TypeBadge type={r.type} />
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-right font-mono text-sm text-white/[0.92]">
                  {r.amount}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-white/45">{r.reference}</td>
                <td className="px-4 py-2.5">
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
