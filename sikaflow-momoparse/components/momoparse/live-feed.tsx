import { OperatorBadge, StatusBadge, TypeBadge } from "@/components/momoparse/badge";
import type { Transaction } from "@/lib/data/transactions";

interface LiveFeedItem {
  id: string;
  time: string;
  operator: "mtn" | "moov" | "celtiis";
  type: "received" | "sent" | "payment" | "withdrawal";
  amount: string;
  reference: string;
  status: "success" | "failed" | "pending";
}

export function LiveTransactionsFeed({ items }: { items: LiveFeedItem[] | Transaction[] }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface sf-card-shadow">
      <div className="border-b border-mp-border px-4 py-3">
        <h3 className="text-xs font-bold uppercase tracking-wide text-mp-muted">Flux en direct</h3>
      </div>
      {items.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-center">
          <div>
            <p className="text-sm text-mp-muted">Aucune transaction recente</p>
            <p className="mt-1 text-xs text-mp-muted/70">Les nouvelles transactions apparaitront ici</p>
          </div>
        </div>
      ) : (
        <ul className="max-h-[min(40vh,320px)] divide-y divide-mp-border overflow-auto md:max-h-[280px]">
          {items.map((tx) => (
            <li
              key={tx.id}
              className="mp-feed-row flex min-w-0 flex-col gap-2 px-4 py-3 text-sm transition-colors hover:bg-mp-bg sm:flex-row sm:flex-wrap sm:items-center"
            >
              <span className="shrink-0 text-xs font-semibold tabular-nums text-mp-muted">{tx.time}</span>
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <OperatorBadge op={tx.operator} />
                <TypeBadge type={tx.type} />
              </div>
              <span className="font-mono text-sm font-bold text-mp-text sm:ml-auto sm:shrink-0">{tx.amount}</span>
              <span className="min-w-0 break-all font-mono text-[11px] text-mp-muted sm:max-w-[45%]">{tx.reference}</span>
              <StatusBadge status={tx.status} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
