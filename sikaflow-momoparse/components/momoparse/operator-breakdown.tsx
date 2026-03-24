import { formatXof } from "@/lib/format-currency";

const rows = [
  { name: "MTN", volume: formatXof(892_000), count: 45, pct: 62 },
  { name: "Moov", volume: formatXof(324_000), count: 32, pct: 22 },
  { name: "Celtiis", volume: formatXof(78_000), count: 12, pct: 16 },
];

export function OperatorBreakdown() {
  return (
    <div className="rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-5 sf-card-shadow">
      <h3 className="text-xs font-bold uppercase tracking-wide text-mp-muted">Par opérateur</h3>
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
    </div>
  );
}
