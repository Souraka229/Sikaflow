import type { Metadata } from "next";
import { DashboardBentoHero } from "@/components/momoparse/dashboard-bento-hero";
import { KpiCard } from "@/components/momoparse/kpi-card";
import { LiveTransactionsFeed } from "@/components/momoparse/live-feed";
import { OperatorBreakdown } from "@/components/momoparse/operator-breakdown";
import { RecentTransactionsTable } from "@/components/momoparse/recent-transactions-table";
import { VolumeBarChart } from "@/components/momoparse/volume-bar-chart";
import { formatXof } from "@/lib/format-currency";
import { liveFeedMock, recentTxMock } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Vue d’ensemble",
};

export default function DashboardOverviewPage() {
  return (
    <div className="mx-auto max-w-[1920px] space-y-6 pb-10 md:pb-8">
      <DashboardBentoHero />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Volume 24h" value={formatXof(245_000)} sub="+12 % vs hier" subVariant="trend" />
        <KpiCard title="Transactions 24h" value="42" sub="+8 % vs hier" subVariant="trend" />
        <KpiCard title="Taux de parse" value="98,5 %" sub="stable" subVariant="badge" />
        <KpiCard
          title="Passerelles"
          value="2 / 3"
          sub="2 en ligne · 1 hors ligne"
          subVariant="status"
        />
      </div>

      <VolumeBarChart />

      <div className="grid gap-4 lg:grid-cols-2">
        <OperatorBreakdown />
        <LiveTransactionsFeed items={liveFeedMock} />
      </div>

      <RecentTransactionsTable rows={recentTxMock} />

      <section className="rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-5 sf-card-shadow">
        <h3 className="text-xs font-bold uppercase tracking-wide text-mp-muted">Chargement (aperçu)</h3>
        <div className="mt-4 grid grid-cols-4 gap-3">
          <div className="mp-skeleton h-16" />
          <div className="mp-skeleton h-16" />
          <div className="mp-skeleton h-16" />
          <div className="mp-skeleton h-16" />
        </div>
      </section>
    </div>
  );
}
