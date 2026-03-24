import type { PublicTransactionDetail } from "@/lib/api/types";
import { isSupabaseConfigured } from "@/lib/env/server";
import {
  computeStats,
  getTransactionById,
  listTransactions,
  tagTransaction,
} from "@/lib/api/store";
import {
  computeStatsSupabase,
  getTransactionByIdSupabase,
  listTransactionsSupabase,
  tagTransactionSupabase,
} from "@/lib/api/store-supabase";
import type { ListTransactionsFilters } from "@/lib/api/transaction-query";

function persistenceUsesSupabase(): boolean {
  return isSupabaseConfigured();
}

export async function svcListTransactions(
  filters: ListTransactionsFilters,
  tenantId?: string,
) {
  if (persistenceUsesSupabase()) return listTransactionsSupabase(filters, tenantId);
  return listTransactions(filters);
}

export async function svcGetTransactionById(
  id: string,
  tenantId?: string,
): Promise<PublicTransactionDetail | undefined> {
  if (persistenceUsesSupabase()) return getTransactionByIdSupabase(id, tenantId);
  return getTransactionById(id);
}

export async function svcTagTransaction(
  id: string,
  payload: { externalRef?: string; metadata?: Record<string, unknown> },
  tenantId?: string,
): Promise<PublicTransactionDetail | undefined> {
  if (persistenceUsesSupabase()) return tagTransactionSupabase(id, payload, tenantId);
  return tagTransaction(id, payload);
}

export async function svcComputeStats(tenantId?: string) {
  if (persistenceUsesSupabase()) return computeStatsSupabase(tenantId);
  return computeStats();
}
