import type { PublicTransactionDetail } from "@/lib/api/types";
import { computeStatsFromRows } from "@/lib/api/stats-compute";
import {
  listTransactionsFromRows,
  type ListTransactionsFilters,
} from "@/lib/api/transaction-query";

type Row = PublicTransactionDetail;

declare global {
  var __sikaApiStore: Map<string, Row> | undefined;
}

function getMap(): Map<string, Row> {
  if (!globalThis.__sikaApiStore) {
    globalThis.__sikaApiStore = new Map<string, Row>();
  }
  return globalThis.__sikaApiStore;
}

function sortedRows(): Row[] {
  return [...getMap().values()].sort(
    (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime(),
  );
}

export function listTransactions(filters: ListTransactionsFilters) {
  return listTransactionsFromRows(sortedRows(), filters);
}

export function getTransactionById(id: string): Row | undefined {
  const r = getMap().get(id);
  return r ? { ...r } : undefined;
}

export function tagTransaction(
  id: string,
  payload: { externalRef?: string; metadata?: Record<string, unknown> },
): Row | undefined {
  const m = getMap();
  const row = m.get(id);
  if (!row) return undefined;
  const next: Row = {
    ...row,
    externalRef: payload.externalRef ?? row.externalRef,
    metadata:
      payload.metadata != null
        ? { ...(row.metadata ?? {}), ...payload.metadata }
        : row.metadata,
  };
  m.set(id, next);
  return { ...next };
}

export function computeStats() {
  return computeStatsFromRows(sortedRows());
}
