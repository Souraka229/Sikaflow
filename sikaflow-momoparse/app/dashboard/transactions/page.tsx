import { TransactionsPageClient } from "@/components/momoparse/transactions-page-client";
import { recentTxMock } from "@/lib/mock-data";

export default function TransactionsPage() {
  return (
    <div className="mx-auto max-w-[1920px] space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-white/[0.92]">Transactions</h1>
        <p className="mt-1 text-sm text-white/55">
          Filtrez, développez le SMS brut, reparsing sur les échecs.
        </p>
      </div>
      <TransactionsPageClient rows={recentTxMock} />
    </div>
  );
}
