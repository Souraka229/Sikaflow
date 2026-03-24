import type { Metadata } from "next";
import { TransactionsPageClient } from "@/components/momoparse/transactions-page-client";
import { getRecentTransactions } from "@/lib/data/transactions";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function TransactionsPage() {
  const transactions = await getRecentTransactions(50);

  return (
    <div className="mx-auto max-w-[1920px] space-y-4 pb-10 md:pb-8">
      <div>
        <h1 className="text-xl font-bold text-mp-text">Transactions</h1>
        <p className="mt-1 text-sm font-medium text-mp-muted">
          Filtrez, developpez le SMS brut, reparsing sur les echecs.
        </p>
      </div>
      <TransactionsPageClient rows={transactions} />
    </div>
  );
}
