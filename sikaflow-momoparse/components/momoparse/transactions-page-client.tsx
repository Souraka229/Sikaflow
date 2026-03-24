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

      <div className="space-y-3 md:hidden">
        {rows.map((r) => {
          const isOpen = expanded === r.id;
          return (
            <div
              key={r.id}
              className="overflow-hidden rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface sf-card-shadow"
            >
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : r.id)}
                className="flex w-full items-center justify-between gap-2 px-4 py-4 text-left"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <OperatorBadge op={r.operator} />
                    <TypeBadge type={r.type} />
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="font-mono text-sm font-bold text-mp-text">{r.amount}</p>
                  <p className="truncate font-mono text-[11px] text-mp-muted">{r.reference}</p>
                </div>
                <Chevron open={isOpen} />
              </button>
              {isOpen && (
                <div className="border-t border-mp-border px-4 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-mp-muted">
                    SMS brut
                  </p>
                  <pre className="max-h-40 overflow-auto rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-bg p-3 font-mono text-[11px] leading-relaxed text-mp-text">
                    {r.rawSms}
                  </pre>
                  {r.status === "failed" && (
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#DFFF00] px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-[#c8e600]"
                    >
                      <RefreshIcon /> Re-parser
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="hidden overflow-hidden rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface sf-card-shadow md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-left text-sm">
            <thead>
              <tr className="cursor-pointer border-b border-mp-border text-[10px] font-bold uppercase tracking-wider text-mp-muted hover:bg-mp-bg">
                <th className="w-8 px-2 py-3" />
                <th className="px-4 py-3 font-bold">Date ↕</th>
                <th className="px-4 py-3 font-bold">Opérateur ↕</th>
                <th className="px-4 py-3 font-bold">Type ↕</th>
                <th className="px-4 py-3 text-right font-bold">Montant ↕</th>
                <th className="px-4 py-3 font-bold">Référence ↕</th>
                <th className="px-4 py-3 font-bold">Statut ↕</th>
                <th className="w-24 px-4 py-3 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const isOpen = expanded === r.id;
                return (
                  <Fragment key={r.id}>
                    <tr
                      className="cursor-pointer border-b border-mp-border transition-colors hover:bg-mp-bg"
                      onClick={() => setExpanded(isOpen ? null : r.id)}
                    >
                      <td className="px-2 py-2 text-mp-muted">
                        <Chevron open={isOpen} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs font-semibold text-mp-muted">
                        {r.date}
                      </td>
                      <td className="px-4 py-2.5">
                        <OperatorBadge op={r.operator} />
                      </td>
                      <td className="px-4 py-2.5">
                        <TypeBadge type={r.type} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-right font-mono text-sm font-bold text-mp-text">
                        {r.amount}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-xs text-mp-muted">{r.reference}</td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-4 py-2.5" onClick={(e) => e.stopPropagation()}>
                        {r.status === "failed" ? (
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-full border border-mp-border bg-mp-bg p-2 text-mp-muted transition-colors hover:border-black hover:text-mp-text"
                            title="Re-parser"
                          >
                            <RefreshIcon />
                          </button>
                        ) : (
                          <span className="text-mp-muted/40">—</span>
                        )}
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="bg-mp-bg">
                        <td colSpan={8} className="px-4 py-4">
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-mp-muted">
                            SMS brut
                          </p>
                          <pre className="max-h-48 overflow-auto rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-4 font-mono text-xs leading-relaxed text-mp-text">
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

      <div className="flex items-center justify-between border-t border-mp-border pt-4">
        <button
          type="button"
          className="rounded-full border border-mp-border bg-mp-surface px-5 py-2.5 text-sm font-semibold text-mp-muted transition-colors hover:border-mp-text hover:text-mp-text disabled:opacity-40"
          disabled
        >
          Précédent
        </button>
        <span className="font-mono text-xs text-mp-muted">Cursor: txn_7f2a…</span>
        <button
          type="button"
          className="rounded-full border border-mp-border bg-mp-surface px-5 py-2.5 text-sm font-bold text-mp-text transition-colors hover:border-[#DFFF00] hover:bg-[#DFFF00]/30"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
