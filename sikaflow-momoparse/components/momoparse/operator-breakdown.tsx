const rows = [
  { name: "MTN", volume: "892.000 FCFA", count: 45, pct: 62 },
  { name: "Moov", volume: "324.000 FCFA", count: 32, pct: 22 },
  { name: "Celtiis", volume: "78.000 FCFA", count: 12, pct: 16 },
];

export function OperatorBreakdown() {
  return (
    <div className="rounded-[8px] border border-white/[0.08] bg-mp-surface p-4">
      <h3 className="text-[11px] font-mono uppercase tracking-widest text-white/55">
        Operator breakdown
      </h3>
      <ul className="mt-4 space-y-4">
        {rows.map((r) => (
          <li key={r.name}>
            <div className="flex items-baseline justify-between gap-2 text-sm">
              <span className="font-medium text-white/[0.92]">{r.name}</span>
              <span className="font-mono text-xs text-white/55">
                {r.volume}{" "}
                <span className="text-white/40">({r.count} tx)</span>
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-[4px] bg-white/10">
              <div
                className="h-full rounded-[4px] bg-[#FF6B35] transition-all duration-300"
                style={{ width: `${r.pct}%` }}
              />
            </div>
            <p className="mt-1 text-right font-mono text-[10px] text-white/40">
              {r.pct}%
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
