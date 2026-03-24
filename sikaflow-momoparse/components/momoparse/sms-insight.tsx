"use client";

import { useMemo } from "react";
import {
  analyzeMobileMoneySms,
  type FraudRisk,
} from "@/lib/momoparse/sms-parser";

function riskStyles(risk: FraudRisk): string {
  if (risk === "high") return "bg-red-100 text-red-800 border-red-200";
  if (risk === "medium") return "bg-amber-100 text-amber-900 border-amber-200";
  return "bg-emerald-50 text-emerald-900 border-emerald-200";
}

function riskLabel(risk: FraudRisk): string {
  if (risk === "high") return "Élevé";
  if (risk === "medium") return "Modéré";
  return "Faible";
}

export function SmsInsight({ rawSms }: { rawSms: string }) {
  const a = useMemo(() => analyzeMobileMoneySms(rawSms), [rawSms]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-mp-muted">
          Lecture auto du SMS
        </span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${riskStyles(a.fraudRisk)}`}
        >
          Fraude : {riskLabel(a.fraudRisk)}
        </span>
        <span className="text-[10px] font-mono text-mp-muted">
          Fiabilité {Math.round(a.confidence * 100)} %
        </span>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-mp-text">
        {a.operator !== "unknown" && (
          <span>
            <span className="font-bold text-mp-muted">Opérateur :</span> {a.operator.toUpperCase()}
          </span>
        )}
        {a.type !== "unknown" && (
          <span>
            <span className="font-bold text-mp-muted">Type :</span> {a.type}
          </span>
        )}
        {a.amountCfa != null && (
          <span>
            <span className="font-bold text-mp-muted">Montant détecté :</span>{" "}
            {a.amountCfa.toLocaleString("fr-FR")} FCFA
          </span>
        )}
        {a.reference && (
          <span className="min-w-0 break-all">
            <span className="font-bold text-mp-muted">Réf. :</span> {a.reference}
          </span>
        )}
      </div>
      {a.fraudReasons.length > 0 && (
        <ul className="list-inside list-disc space-y-0.5 rounded-[var(--radius-mp-inner)] border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-[11px] text-amber-950">
          {a.fraudReasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
