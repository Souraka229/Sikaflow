"use client";

import Link from "next/link";
import { useState } from "react";
import { formatXof } from "@/lib/format-currency";

const initialChips = [
  { id: "mtn", label: "MTN MoMo" },
  { id: "moov", label: "Moov Money" },
  { id: "recv", label: "Reçus" },
];

const avatars = ["SK", "A", "M", "+2"];

export function DashboardBentoHero() {
  const [chips, setChips] = useState(initialChips);

  function removeChip(id: string) {
    setChips((c) => c.filter((x) => x.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c.id}
            className="inline-flex items-center gap-1.5 rounded-full border border-mp-border bg-mp-surface px-3 py-1.5 text-sm font-semibold text-mp-text sf-card-shadow"
          >
            {c.label}
            <button
              type="button"
              onClick={() => removeChip(c.id)}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-mp-bg text-mp-muted hover:text-mp-text"
              aria-label={`Retirer ${c.label}`}
            >
              ×
            </button>
          </span>
        ))}
        {chips.length === 0 && (
          <span className="text-sm text-mp-muted">Ajoutez des filtres depuis les transactions</span>
        )}
      </div>

      <div className="relative overflow-hidden rounded-[var(--radius-mp)] bg-[#DFFF00] sf-card-shadow-lg p-6 md:p-8">
        <div className="flex items-center pl-1">
          <div className="flex -space-x-2">
            {avatars.map((a, i) => (
              <span
                key={`${a}-${i}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-bold text-[#DFFF00] ring-2 ring-[#DFFF00]"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
        <h2 className="mt-5 text-xl font-bold text-black md:text-2xl">
          Performance Mobile Money
        </h2>
        <p className="mt-1 text-sm font-medium text-black/70">
          Volume parsé et transactions — dernières 24 h
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-[var(--radius-mp-inner)] bg-white/90 p-4 sf-card-shadow">
            <p className="text-[10px] font-bold uppercase tracking-wide text-mp-muted">Total volume</p>
            <p className="mt-1 text-2xl font-bold leading-tight tabular-nums tracking-tight text-mp-text">
              {formatXof(245_000)}
            </p>
          </div>
          <div className="rounded-[var(--radius-mp-inner)] bg-white/90 p-4 sf-card-shadow">
            <p className="text-[10px] font-bold uppercase tracking-wide text-mp-muted">Tendance</p>
            <p className="mt-1 text-2xl font-bold text-emerald-600">+12 %</p>
            <p className="text-xs font-semibold text-mp-muted">vs hier</p>
          </div>
        </div>

        <Link
          href="/dashboard/transactions"
          className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-black text-[#DFFF00] sf-card-shadow-lg transition-transform hover:scale-105"
          aria-label="Voir le détail"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
