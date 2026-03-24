"use client";

import { useState } from "react";
import { OperatorBadge, StatusBadge, TypeBadge } from "@/components/momoparse/badge";
import { SmsInsight } from "@/components/momoparse/sms-insight";
import type { Transaction } from "@/lib/data/transactions";

interface Row {
  id: string;
  date: string;
  operator: "mtn" | "moov" | "celtiis";
  type: "received" | "sent" | "payment" | "withdrawal";
  amount: string;
  reference: string;
  status: "success" | "failed" | "pending";
  rawSms?: string;
}

function getRawSms(r: Row | Transaction): string | undefined {
  if ("rawSms" in r && typeof r.rawSms === "string" && r.rawSms.length > 0) {
    return r.rawSms;
  }
  return undefined;
}

export function RecentTransactionsTable({ rows }: { rows: Row[] | Transaction[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="min-w-0 overflow-hidden rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface sf-card-shadow">
      <div className="border-b border-mp-border px-4 py-3">
        <h3 className="text-xs font-bold uppercase tracking-wide text-mp-muted">Transactions recentes</h3>
      </div>
      {rows.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-center">
          <div>
            <p className="text-sm text-mp-muted">Aucune transaction</p>
            <p className="mt-1 text-xs text-mp-muted/70">Vos transactions apparaitront ici</p>
          </div>
        </div>
      ) : (
        <>
          <div className="md:hidden">
            <ul className="divide-y divide-mp-border">
              {rows.map((r) => {
                const raw = getRawSms(r);
                const isOpen = openId === r.id;
                return (
                  <li key={r.id} className="min-w-0 px-4 py-3">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="min-w-0 flex-1 text-xs font-semibold text-mp-muted">{r.date}</span>
                      <OperatorBadge op={r.operator} />
                      <TypeBadge type={r.type} />
                      <span className="ml-auto shrink-0 font-mono text-sm font-bold text-mp-text">{r.amount}</span>
                    </div>
                    <div className="mt-2 flex min-w-0 flex-wrap items-center gap-2">
                      <span className="min-w-0 break-all font-mono text-[11px] text-mp-muted">{r.reference}</span>
                      <StatusBadge status={r.status} />
                    </div>
                    {raw && (
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : r.id)}
                        className="mt-2 text-left text-[11px] font-bold uppercase tracking-wide text-mp-text underline decoration-mp-border underline-offset-2"
                      >
                        {isOpen ? "Masquer l’analyse SMS" : "Lire / analyser le SMS"}
                      </button>
                    )}
                    {raw && isOpen && (
                      <div className="mt-3 space-y-2 border-t border-mp-border pt-3">
                        <SmsInsight rawSms={raw} />
                        <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-words rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-bg p-2 font-mono text-[10px] leading-relaxed text-mp-text">
                          {raw}
                        </pre>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-mp-border text-[10px] font-bold uppercase tracking-wider text-mp-muted">
                  <th className="px-4 py-3 font-bold">Date</th>
                  <th className="px-4 py-3 font-bold">Opérateur</th>
                  <th className="px-4 py-3 font-bold">Type</th>
                  <th className="px-4 py-3 text-right font-bold">Montant</th>
                  <th className="px-4 py-3 font-bold">Référence</th>
                  <th className="px-4 py-3 font-bold">Statut</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-mp-border transition-colors hover:bg-mp-bg"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-mp-muted">
                      {r.date}
                    </td>
                    <td className="px-4 py-3">
                      <OperatorBadge op={r.operator} />
                    </td>
                    <td className="px-4 py-3">
                      <TypeBadge type={r.type} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-sm font-bold text-mp-text">
                      {r.amount}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-mp-muted">{r.reference}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
