import type { Operator, PublicTransactionDetail, TxStatus, TxType } from "@/lib/api/types";
import { listTransactionsFromRows, type ListTransactionsFilters } from "@/lib/api/transaction-query";
import { computeStatsFromRows } from "@/lib/api/stats-compute";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const TABLE = "sikaflow_transactions";
const FETCH_CAP = 5000;

type DbRow = {
  id: string;
  tenant_id: string;
  operator: string;
  type: string;
  status: string;
  amount: number;
  currency: string;
  reference: string;
  counterparty: string | null;
  received_at: string;
  raw_sms: string;
  external_ref: string | null;
  metadata: Record<string, unknown> | null;
};

function assertOperator(s: string): Operator {
  if (s === "mtn" || s === "moov" || s === "celtiis") return s;
  return "mtn";
}

function assertTxType(s: string): TxType {
  if (
    s === "received" ||
    s === "sent" ||
    s === "payment" ||
    s === "withdrawal"
  ) {
    return s;
  }
  return "received";
}

function assertStatus(s: string): TxStatus {
  if (s === "success" || s === "failed" || s === "pending") return s;
  return "pending";
}

function fromDbRow(r: DbRow): PublicTransactionDetail {
  return {
    id: r.id,
    operator: assertOperator(r.operator),
    type: assertTxType(r.type),
    status: assertStatus(r.status),
    amount: Number(r.amount),
    currency: "XOF",
    reference: r.reference,
    counterparty: r.counterparty,
    receivedAt: new Date(r.received_at).toISOString(),
    rawSms: r.raw_sms,
    externalRef: r.external_ref,
    metadata: r.metadata,
  };
}

async function loadRowsForList(
  tenantId?: string,
): Promise<PublicTransactionDetail[]> {
  const client = getSupabaseAdmin();
  let q = client
    .from(TABLE)
    .select("*")
    .order("received_at", { ascending: false })
    .limit(FETCH_CAP);
  if (tenantId) {
    q = q.eq("tenant_id", tenantId);
  }
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return (data as DbRow[] | null)?.map(fromDbRow) ?? [];
}

export async function listTransactionsSupabase(
  filters: ListTransactionsFilters,
  tenantId?: string,
) {
  const rows = await loadRowsForList(tenantId);
  return listTransactionsFromRows(rows, filters);
}

export async function getTransactionByIdSupabase(
  id: string,
  tenantId?: string,
): Promise<PublicTransactionDetail | undefined> {
  const client = getSupabaseAdmin();
  let q = client.from(TABLE).select("*").eq("id", id);
  if (tenantId) {
    q = q.eq("tenant_id", tenantId);
  }
  const { data, error } = await q.maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return undefined;
  return fromDbRow(data as DbRow);
}

export async function tagTransactionSupabase(
  id: string,
  payload: { externalRef?: string; metadata?: Record<string, unknown> },
  tenantId?: string,
): Promise<PublicTransactionDetail | undefined> {
  const client = getSupabaseAdmin();
  const existing = await getTransactionByIdSupabase(id, tenantId);
  if (!existing) return undefined;

  const nextExternal =
    payload.externalRef !== undefined
      ? payload.externalRef
      : existing.externalRef;
  const nextMeta =
    payload.metadata != null
      ? { ...(existing.metadata ?? {}), ...payload.metadata }
      : existing.metadata;

  let updateQ = client
    .from(TABLE)
    .update({
      external_ref: nextExternal,
      metadata: nextMeta,
    })
    .eq("id", id);
  if (tenantId) {
    updateQ = updateQ.eq("tenant_id", tenantId);
  }
  const { data, error } = await updateQ.select("*").single();

  if (error) throw new Error(error.message);
  if (!data) return undefined;
  return fromDbRow(data as DbRow);
}

export async function computeStatsSupabase(tenantId?: string) {
  const rows = await loadRowsForList(tenantId);
  return computeStatsFromRows(rows);
}
