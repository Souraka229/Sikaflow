"use client";

import { Fragment, useState } from "react";
import { OperatorBadge, StatusBadge, TypeBadge } from "@/components/momoparse/badge";
import { FilterBar } from "@/components/momoparse/filter-bar";
import type { LiveTx } from "@/lib/mock-data";

type Row = LiveTx & { date: string; rawSms: string };

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`transition-transform ${open ? "rotate-180" : ""}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function TransactionsPageClient({ rows }: { rows: Row[] }) {
  const [expanded, setExpanded] = useState<string | null>(rows[0]?.id ?? null);

  return (
    <div className="space-y-4">
      <FilterBar />

      {/* Mobile: cards */}
      <div className="space-y-2 md:hidden">
        {rows.map((r) => {
          const isOpen = expanded === r.id;
          return (
            <div
              key={r.id}
              className="rounded-[8px] border border-white/[0.08] bg-mp-surface"
            >
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : r.id)}
                className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <OperatorBadge op={r.operator} />
                    <TypeBadge type={r.type} />
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="font-mono text-sm text-white/[0.92]">{r.amount}</p>
                  <p className="truncate font-mono text-[11px] text-white/40">{r.reference}</p>
                </div>
                <Chevron open={isOpen} />
              </button>
              {isOpen && (
                <div className="border-t border-white/[0.08] px-3 py-3">
                  <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-white/40">
                    SMS brut
                  </p>
                  <pre className="max-h-40 overflow-auto rounded-[8px] border border-white/[0.08] bg-[#0C0C0C] p-3 font-mono text-[11px] leading-relaxed text-white/70">
                    {r.rawSms}
                  </pre>
                  {r.status === "failed" && (
                    <button
                      type="button"
                      className="mt-2 inline-flex items-center gap-2 rounded-[8px] border border-[#FF6B35]/40 bg-[#FF6B35]/10 px-3 py-1.5 text-xs font-mono text-[#FF6B35] transition-colors hover:bg-[#FF6B35]/20"
                    >
                      <RefreshIcon /> Re-parse
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-[8px] border border-white/[0.08] bg-mp-surface md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left text-sm">
            <thead>
              <tr className="cursor-pointer border-b border-white/[0.08] font-mono text-[10px] uppercase tracking-wider text-white/45 hover:bg-white/[0.02]">
                <th className="w-8 px-2 py-2" />
                <th className="px-4 py-2 font-medium">Date ↕</th>
                <th className="px-4 py-2 font-medium">Opérateur ↕</th>
                <th className="px-4 py-2 font-medium">Type ↕</th>
                <th className="px-4 py-2 text-right font-medium">Montant ↕</th>
                <th className="px-4 py-2 font-medium">Référence ↕</th>
                <th className="px-4 py-2 font-medium">Statut ↕</th>
                <th className="px-4 py-2 font-medium w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const isOpen = expanded === r.id;
                return (
                  <Fragment key={r.id}>
                    <tr
                      className="cursor-pointer border-b border-white/[0.06] transition-colors hover:bg-white/[0.03]"
                      onClick={() => setExpanded(isOpen ? null : r.id)}
                    >
                      <td className="px-2 py-2 text-white/45">
                        <Chevron open={isOpen} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-white/70">
                        {r.date}
                      </td>
                      <td className="px-4 py-2.5">
                        <OperatorBadge op={r.operator} />
                      </td>
                      <td className="px-4 py-2.5">
                        <TypeBadge type={r.type} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-right font-mono text-sm text-white/[0.92]">
                        {r.amount}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-xs text-white/45">{r.reference}</td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-4 py-2.5" onClick={(e) => e.stopPropagation()}>
                        {r.status === "failed" ? (
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-[6px] border border-white/[0.08] p-1.5 text-white/55 transition-colors hover:border-[#FF6B35]/40 hover:text-[#FF6B35]"
                            title="Re-parse"
                          >
                            <RefreshIcon />
                          </button>
                        ) : (
                          <span className="text-white/25">—</span>
                        )}
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="bg-[#0C0C0C]/80">
                        <td colSpan={8} className="px-4 py-4">
                          <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-white/40">
                            SMS brut
                          </p>
                          <pre className="max-h-48 overflow-auto rounded-[8px] border border-white/[0.08] bg-mp-surface p-4 font-mono text-xs leading-relaxed text-white/70">
                            {r.rawSms}
                          </pre>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
        <button
          type="button"
          className="rounded-[8px] border border-white/[0.08] px-4 py-2 text-sm text-white/55 transition-colors hover:border-white/[0.15] hover:text-white/90 disabled:opacity-40"
          disabled
        >
          Previous
        </button>
        <span className="font-mono text-xs text-white/40">Cursor: txn_7f2a…</span>
        <button
          type="button"
          className="rounded-[8px] border border-white/[0.08] px-4 py-2 text-sm text-white/[0.92] transition-colors hover:border-[#FF6B35]/40 hover:text-[#FF6B35]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
