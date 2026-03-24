import Link from "next/link";
import { formatXof } from "@/lib/format-currency";

export function DashboardBentoHero(props: {
  volume24h: number;
  transactions24h: number;
  parseRate: number;
}) {
  const { volume24h, transactions24h, parseRate } = props;

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-mp)] bg-[#DFFF00] sf-card-shadow-lg p-6 md:p-8">
      <h2 className="text-xl font-bold text-black md:text-2xl">Vue d’ensemble Mobile Money</h2>
      <p className="mt-1 text-sm font-medium text-black/70">
        Données réelles — dernières 24 h (connecté à votre espace)
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-[var(--radius-mp-inner)] bg-white/90 p-4 sf-card-shadow">
          <p className="text-[10px] font-bold uppercase tracking-wide text-mp-muted">Volume 24 h</p>
          <p className="mt-1 text-2xl font-bold leading-tight tabular-nums tracking-tight text-mp-text">
            {formatXof(volume24h)}
          </p>
        </div>
        <div className="rounded-[var(--radius-mp-inner)] bg-white/90 p-4 sf-card-shadow">
          <p className="text-[10px] font-bold uppercase tracking-wide text-mp-muted">Transactions 24 h</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-mp-text">{transactions24h}</p>
          <p className="text-xs font-semibold text-mp-muted">
            Taux parse {parseRate} %{transactions24h === 0 ? " · en attente de données" : ""}
          </p>
        </div>
      </div>

      <Link
        href="/dashboard/transactions"
        className="absolute bottom-20 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-[#DFFF00] sf-card-shadow-lg transition-transform hover:scale-105 md:bottom-5 md:right-5 md:h-14 md:w-14"
        aria-label="Voir les transactions"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}
