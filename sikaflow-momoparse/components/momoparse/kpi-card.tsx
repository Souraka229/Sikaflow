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
    <div className="rounded-[8px] border border-white/[0.08] bg-mp-surface p-4 transition-colors duration-150 hover:border-white/[0.12]">
      <p className="text-[11px] font-mono uppercase tracking-widest text-white/55">
        {title}
      </p>
      <p className="mt-2 font-mono text-2xl font-semibold tracking-tight text-white/[0.92]">
        {value}
      </p>
      <div className="mt-2">
        {subVariant === "trend" && (
          <span className="text-xs font-mono text-[#00C48C]">{sub}</span>
        )}
        {subVariant === "badge" && (
          <span className="rounded-[6px] border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-white/55">
            {sub}
          </span>
        )}
        {subVariant === "status" && (
          <span className="text-xs text-white/70">{sub}</span>
        )}
      </div>
    </div>
  );
}
