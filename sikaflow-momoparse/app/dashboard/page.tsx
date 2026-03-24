import type { Metadata } from "next";
import { DashboardBentoHero } from "@/components/momoparse/dashboard-bento-hero";
import { KpiCard } from "@/components/momoparse/kpi-card";
import { LiveTransactionsFeed } from "@/components/momoparse/live-feed";
import { OperatorBreakdown } from "@/components/momoparse/operator-breakdown";
import { RecentTransactionsTable } from "@/components/momoparse/recent-transactions-table";
import { VolumeBarChart } from "@/components/momoparse/volume-bar-chart";
import { formatXof } from "@/lib/format-currency";
import { getDashboardStats, getLiveFeed, getRecentTransactions } from "@/lib/data/transactions";

export const metadata: Metadata = {
  title: "Vue d'ensemble",
};

export default async function DashboardOverviewPage() {
  const [stats, liveFeed, recentTx] = await Promise.all([
    getDashboardStats(),
    getLiveFeed(5),
    getRecentTransactions(10),
  ]);

  const deviceStatus = stats.devicesTotal > 0
    ? `${stats.devicesOnline} en ligne · ${stats.devicesTotal - stats.devicesOnline} hors ligne`
    : "Aucun appareil";

  return (
    <div className="mx-auto max-w-[1920px] space-y-6 pb-10 md:pb-8">
      <DashboardBentoHero />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard 
          title="Volume 24h" 
          value={formatXof(stats.volume24h)} 
          sub={stats.volume24h > 0 ? "Transactions actives" : "Aucune transaction"} 
          subVariant="trend" 
        />
        <KpiCard 
          title="Transactions 24h" 
          value={String(stats.transactions24h)} 
          sub={stats.transactions24h > 0 ? "En cours" : "Aucune"} 
          subVariant="trend" 
        />
        <KpiCard 
          title="Taux de parse" 
          value={`${stats.parseRate} %`} 
          sub="stable" 
          subVariant="badge" 
        />
        <KpiCard
          title="Passerelles"
          value={`${stats.devicesOnline} / ${stats.devicesTotal}`}
          sub={deviceStatus}
          subVariant="status"
        />
      </div>

      <VolumeBarChart />

      <div className="grid gap-4 lg:grid-cols-2">
        <OperatorBreakdown />
        <LiveTransactionsFeed items={liveFeed} />
      </div>

      <RecentTransactionsTable rows={recentTx} />

      {recentTx.length === 0 && (
        <section className="rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-8 sf-card-shadow text-center">
          <div className="mx-auto max-w-md">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#DFFF00]/20">
              <svg className="h-8 w-8 text-[#DFFF00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-mp-text">Aucune transaction</h3>
            <p className="mt-2 text-sm text-mp-muted">
              Connectez une passerelle et commencez a recevoir des transactions Mobile Money.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
