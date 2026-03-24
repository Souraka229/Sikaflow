import type { Metadata } from "next";
import { TransactionsPageClient } from "@/components/momoparse/transactions-page-client";
import { recentTxMock } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Transactions",
};

export default function TransactionsPage() {
  return (
    <div className="mx-auto max-w-[1920px] space-y-4 pb-10 md:pb-8">
      <div>
        <h1 className="text-xl font-bold text-mp-text">Transactions</h1>
        <p className="mt-1 text-sm font-medium text-mp-muted">
          Filtrez, développez le SMS brut, reparsing sur les échecs.
        </p>
      </div>
      <TransactionsPageClient rows={recentTxMock} />
    </div>
  );
}
