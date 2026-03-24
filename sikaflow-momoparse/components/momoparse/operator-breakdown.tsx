import { formatXof } from "@/lib/format-currency";
import { getTransactionsByOperator } from "@/lib/data/transactions";

export async function OperatorBreakdown() {
  const breakdown = await getTransactionsByOperator();
  
  const total = Object.values(breakdown).reduce((sum, op) => sum + op.volume, 0);
  
  const rows = [
    { 
      name: "MTN", 
      volume: formatXof(breakdown.mtn.volume), 
      count: breakdown.mtn.count, 
      pct: total > 0 ? Math.round((breakdown.mtn.volume / total) * 100) : 0 
    },
    { 
      name: "Moov", 
      volume: formatXof(breakdown.moov.volume), 
      count: breakdown.moov.count, 
      pct: total > 0 ? Math.round((breakdown.moov.volume / total) * 100) : 0 
    },
    { 
      name: "Celtiis", 
      volume: formatXof(breakdown.celtiis.volume), 
      count: breakdown.celtiis.count, 
      pct: total > 0 ? Math.round((breakdown.celtiis.volume / total) * 100) : 0 
    },
  ];

  const hasData = rows.some(r => r.count > 0);

  return (
    <div className="rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-5 sf-card-shadow">
      <h3 className="text-xs font-bold uppercase tracking-wide text-mp-muted">Par operateur</h3>
      {!hasData ? (
        <div className="flex items-center justify-center py-8 text-center">
          <div>
            <p className="text-sm text-mp-muted">Aucune donnee</p>
            <p className="mt-1 text-xs text-mp-muted/70">Les statistiques apparaitront ici</p>
          </div>
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {rows.map((r) => (
            <li key={r.name}>
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="font-bold text-mp-text">{r.name}</span>
                <span className="text-xs font-semibold text-mp-muted">
                  {r.volume} <span className="text-mp-muted/70">({r.count} tx)</span>
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-[#DFFF00] transition-all duration-300"
                  style={{ width: `${r.pct}%` }}
                />
              </div>
              <p className="mt-1 text-right text-[10px] font-bold text-mp-muted">{r.pct}%</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
