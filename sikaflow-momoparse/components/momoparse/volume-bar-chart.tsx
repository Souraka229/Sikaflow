"use client";

import { formatXof } from "@/lib/format-currency";

type MonthBar = { label: string; h: number; active: boolean; tooltipAmount?: number };

const months: MonthBar[] = [
  { label: "J", h: 32, active: false },
  { label: "F", h: 45, active: false },
  { label: "M", h: 38, active: false },
  { label: "A", h: 55, active: false },
  { label: "M", h: 48, active: false },
  { label: "J", h: 72, active: true, tooltipAmount: 78_222 },
  { label: "J", h: 40, active: false },
  { label: "A", h: 52, active: false },
  { label: "S", h: 44, active: false },
  { label: "O", h: 58, active: false },
  { label: "N", h: 50, active: false },
  { label: "D", h: 36, active: false },
];

export function VolumeBarChart() {
  return (
    <div className="rounded-[var(--radius-mp)] border border-mp-border bg-mp-surface p-6 sf-card-shadow">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-mp-muted">Volume mensuel (FCFA)</p>
          <p className="mt-1 break-words text-2xl font-bold tabular-nums text-mp-text sm:text-3xl">
            {formatXof(90_744)}
          </p>
          <p className="text-sm font-semibold text-emerald-600">+5 % ce mois</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-full border border-mp-border bg-mp-bg px-4 py-2 text-xs font-bold text-mp-text"
          >
            + Widget
          </button>
          <button
            type="button"
            className="rounded-full border border-mp-border bg-mp-bg px-4 py-2 text-xs font-bold text-mp-text"
          >
            Créer
          </button>
        </div>
      </div>

      <div className="mt-8 mb-1 flex h-44 items-end justify-between gap-1 border-b border-mp-border pb-2 md:gap-2">
        {months.map((m, idx) => (
          <div key={idx} className="relative flex flex-1 flex-col items-center justify-end">
            {m.active && m.tooltipAmount != null && (
              <span className="absolute -top-8 left-1/2 z-10 max-w-[min(100vw-2rem,12rem)] -translate-x-1/2 truncate rounded-lg bg-black px-2 py-1 text-[10px] font-bold text-[#DFFF00] sf-card-shadow">
                {formatXof(m.tooltipAmount)}
              </span>
            )}
            <div
              className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                m.active ? "bg-[#DFFF00]" : "bg-neutral-200"
              }`}
              style={{ height: `${m.h}%` }}
            />
            <span className="mt-2 text-[10px] font-bold text-mp-muted">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
