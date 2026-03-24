"use client";

import { useState } from "react";
import { PlanBadge } from "@/components/momoparse/badge";

export function DashboardHeader({ plan = "PRO" }: { plan?: "PRO" | "FREE" }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.08] px-4 md:px-6">
      <div className="flex items-center gap-3">
        <span className="font-mono text-lg font-semibold tracking-tight text-white/[0.92]">
          MoMoParse
        </span>
        <PlanBadge plan={plan} />
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-[8px] border border-white/[0.08] bg-mp-surface px-2 py-1.5 text-left transition-colors hover:border-white/[0.12]"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#FF6B35]/20 font-mono text-xs font-bold text-[#FF6B35]">
            SK
          </span>
          <span className="hidden text-sm text-white/70 sm:block">SikaFlow</span>
          <svg
            className="h-4 w-4 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 cursor-default bg-transparent"
              aria-label="Fermer le menu"
              onClick={() => setOpen(false)}
            />
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-1 w-48 rounded-[8px] border border-white/[0.08] bg-[#141414] py-1 shadow-none"
            >
              <button
                type="button"
                role="menuitem"
                className="block w-full px-3 py-2 text-left text-sm text-white/80 hover:bg-white/[0.05]"
              >
                Profil
              </button>
              <button
                type="button"
                role="menuitem"
                className="block w-full px-3 py-2 text-left text-sm text-white/80 hover:bg-white/[0.05]"
              >
                Déconnexion
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
