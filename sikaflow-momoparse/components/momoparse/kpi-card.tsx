export function KpiCard({
  title,
  value,
  sub,
  subVariant = "trend",
}: {
  title: string;
  value: string;
  sub: string;
  subVariant?: "trend" | "badge" | "status";
}) {
  return (
    <div className="sf-card-shadow rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-5 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-wide text-mp-muted">{title}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-mp-text">{value}</p>
      <div className="mt-2">
        {subVariant === "trend" && (
          <span className="text-sm font-semibold text-emerald-600">{sub}</span>
        )}
        {subVariant === "badge" && (
          <span className="inline-block rounded-full border border-mp-border bg-mp-bg px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-mp-muted">
            {sub}
          </span>
        )}
        {subVariant === "status" && <span className="text-sm text-mp-muted">{sub}</span>}
      </div>
    </div>
  );
}
