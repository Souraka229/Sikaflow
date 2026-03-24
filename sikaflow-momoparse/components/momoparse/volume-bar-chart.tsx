import Link from "next/link";
import { formatXof } from "@/lib/format-currency";
import type { MonthVolumeBucket } from "@/lib/data/transactions";

export function VolumeBarChart({ buckets }: { buckets: MonthVolumeBucket[] }) {
  const total = buckets.reduce((s, b) => s + b.volume, 0);
  const maxVol = Math.max(...buckets.map((b) => b.volume), 1);
  const activeIdx =
    buckets.length > 0
      ? buckets.reduce((best, b, i, arr) => (b.volume > arr[best].volume ? i : best), 0)
      : -1;

  return (
    <div className="rounded-[var(--radius-mp)] border border-mp-border bg-mp-surface p-6 sf-card-shadow">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-mp-muted">
            Volume mensuel (FCFA, 12 mois)
          </p>
          <p className="mt-1 break-words text-2xl font-bold tabular-nums text-mp-text sm:text-3xl">
            {formatXof(total)}
          </p>
          <p className="text-sm font-semibold text-mp-muted">
            {total > 0 ? "Somme des transactions réussies" : "Aucun volume sur cette période"}
          </p>
        </div>
        <Link
          href="/dashboard/docs"
          className="rounded-full border border-mp-border bg-mp-bg px-4 py-2 text-xs font-bold text-mp-text transition-colors hover:bg-mp-text hover:text-mp-surface"
        >
          API & intégration
        </Link>
      </div>

      {total === 0 ? (
        <p className="mt-8 text-center text-sm text-mp-muted">
          Les barres se rempliront lorsque des paiements seront enregistrés pour votre compte.
        </p>
      ) : (
        <div className="mt-8 mb-1 flex h-44 items-end justify-between gap-0.5 border-b border-mp-border pb-2 sm:gap-1 md:gap-2">
          {buckets.map((m, idx) => {
            const h = Math.round((m.volume / maxVol) * 100);
            const isActive = idx === activeIdx && m.volume > 0;
            return (
              <div key={m.yearMonth} className="relative flex min-w-0 flex-1 flex-col items-center justify-end">
                {isActive && (
                  <span
                    className="absolute -top-8 left-1/2 z-10 max-w-[min(100vw-2rem,12rem)] -translate-x-1/2 truncate rounded-lg bg-black px-2 py-1 text-[10px] font-bold text-[#DFFF00] sf-card-shadow"
                    title={m.yearMonth}
                  >
                    {formatXof(m.volume)}
                  </span>
                )}
                <div
                  className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                    m.volume > 0 ? "bg-[#DFFF00]" : "bg-neutral-200"
                  } ${isActive ? "ring-2 ring-black/20" : ""}`}
                  style={{ height: `${Math.max(h, m.volume > 0 ? 8 : 4)}%` }}
                />
                <span
                  className="mt-2 max-w-full truncate text-[9px] font-bold text-mp-muted sm:text-[10px]"
                  title={m.yearMonth}
                >
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
