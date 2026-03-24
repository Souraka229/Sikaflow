import { OperatorBadge, StatusBadge, TypeBadge } from "@/components/momoparse/badge";
import type { LiveTx } from "@/lib/mock-data";

export function LiveTransactionsFeed({ items }: { items: LiveTx[] }) {
  return (
    <div className="rounded-[8px] border border-white/[0.08] bg-mp-surface">
      <div className="border-b border-white/[0.08] px-4 py-3">
        <h3 className="text-[11px] font-mono uppercase tracking-widest text-white/55">
          Live transactions
        </h3>
      </div>
      <ul className="max-h-[280px] divide-y divide-white/[0.06] overflow-auto">
        {items.map((tx, i) => (
          <li
            key={tx.id}
            className={`mp-feed-row flex flex-wrap items-center gap-2 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-white/[0.03] ${i === 0 ? "" : ""}`}
          >
            <span className="font-mono text-xs tabular-nums text-white/45">
              {tx.time}
            </span>
            <OperatorBadge op={tx.operator} />
            <TypeBadge type={tx.type} />
            <span className="ml-auto font-mono text-sm font-medium text-white/[0.92]">
              {tx.amount}
            </span>
            <span className="font-mono text-[11px] text-white/40">{tx.reference}</span>
            <StatusBadge status={tx.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}
