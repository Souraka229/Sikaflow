import { KpiCard } from "@/components/momoparse/kpi-card";
import { LiveTransactionsFeed } from "@/components/momoparse/live-feed";
import { OperatorBreakdown } from "@/components/momoparse/operator-breakdown";
import { RecentTransactionsTable } from "@/components/momoparse/recent-transactions-table";
import { liveFeedMock, recentTxMock } from "@/lib/mock-data";

export default function DashboardOverviewPage() {
  return (
    <div className="mx-auto max-w-[1920px] space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-white/[0.92]">Overview</h1>
        <p className="mt-1 text-sm text-white/55">Volume, parsing health, gateways — dernières 24h.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Volume 24h" value="245.000 FCFA" sub="+12% vs hier" subVariant="trend" />
        <KpiCard title="Transactions 24h" value="42" sub="+8% vs hier" subVariant="trend" />
        <KpiCard title="Parse rate" value="98.5%" sub="stable" subVariant="badge" />
        <KpiCard
          title="Gateway status"
          value="2 / 3"
          sub="2 en ligne · 1 hors ligne"
          subVariant="status"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <OperatorBreakdown />
        <LiveTransactionsFeed items={liveFeedMock} />
      </div>

      <RecentTransactionsTable rows={recentTxMock} />

      <section className="rounded-[8px] border border-white/[0.08] bg-mp-surface p-4">
        <h3 className="text-[11px] font-mono uppercase tracking-widest text-white/45">
          Loading state (skeleton)
        </h3>
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
