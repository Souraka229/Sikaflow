import { createClient } from "@/lib/supabase/server";
import { formatXof } from "@/lib/format-currency";
import { isSupabaseAuthConfigured } from "@/lib/supabase/auth-env";

export type Operator = "mtn" | "moov" | "celtiis";
export type TxType = "received" | "sent" | "payment" | "withdrawal";
export type TxStatus = "success" | "failed" | "pending";

export interface Transaction {
  id: string;
  time: string;
  date: string;
  operator: Operator;
  type: TxType;
  amount: string;
  amountRaw: number;
  reference: string;
  status: TxStatus;
  rawSms: string;
  counterparty: string | null;
}

export interface DashboardStats {
  volume24h: number;
  transactions24h: number;
  parseRate: number;
  devicesOnline: number;
  devicesTotal: number;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }) + " " + formatTime(date);
}

export interface MonthVolumeBucket {
  yearMonth: string;
  label: string;
  volume: number;
}

function last12YearMonthKeys(): string[] {
  const keys: string[] = [];
  const d = new Date();
  d.setDate(1);
  for (let i = 11; i >= 0; i--) {
    const x = new Date(d.getFullYear(), d.getMonth() - i, 1);
    keys.push(
      `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}`,
    );
  }
  return keys;
}

/** Volume des transactions réussies, 12 derniers mois glissants (utilisateur connecté). */
export async function getVolumeLast12Months(): Promise<MonthVolumeBucket[]> {
  const keys = last12YearMonthKeys();
  const empty = keys.map((yearMonth) => ({
    yearMonth,
    label: new Date(
      `${yearMonth}-01T12:00:00`,
    ).toLocaleDateString("fr-FR", { month: "short" }),
    volume: 0,
  }));

  if (!isSupabaseAuthConfigured()) {
    return empty;
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return empty;
  }

  const start = keys[0] ? new Date(`${keys[0]}-01T00:00:00`) : new Date();
  const { data, error } = await supabase
    .from("sikaflow_transactions")
    .select("amount, status, received_at")
    .eq("tenant_id", userData.user.id)
    .gte("received_at", start.toISOString());

  if (error) {
    console.error("Error fetching monthly volume:", error);
    return empty;
  }

  const vol: Record<string, number> = Object.fromEntries(keys.map((k) => [k, 0]));
  for (const tx of data || []) {
    if (tx.status !== "success") continue;
    const d = new Date(tx.received_at);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (ym in vol) vol[ym] += Number(tx.amount) || 0;
  }

  return keys.map((yearMonth) => ({
    yearMonth,
    label: new Date(`${yearMonth}-01T12:00:00`).toLocaleDateString("fr-FR", {
      month: "short",
    }),
    volume: vol[yearMonth] ?? 0,
  }));
}

export async function getRecentTransactions(limit = 10): Promise<Transaction[]> {
  if (!isSupabaseAuthConfigured()) {
    return [];
  }

  const supabase = await createClient();
  
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return [];
  }

  const { data, error } = await supabase
    .from("sikaflow_transactions")
    .select("*")
    .eq("tenant_id", userData.user.id)
    .order("received_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }

  return (data || []).map((tx) => {
    const receivedAt = new Date(tx.received_at);
    return {
      id: tx.id,
      time: formatTime(receivedAt),
      date: formatDate(receivedAt),
      operator: (tx.operator?.toLowerCase() || "mtn") as Operator,
      type: (tx.type?.toLowerCase() || "received") as TxType,
      amount: formatXof(tx.amount || 0),
      amountRaw: tx.amount || 0,
      reference: tx.reference || tx.external_ref || "-",
      status: (tx.status?.toLowerCase() || "success") as TxStatus,
      rawSms: tx.raw_sms || "",
      counterparty: tx.counterparty,
    };
  });
}

export async function getLiveFeed(limit = 5): Promise<Transaction[]> {
  return getRecentTransactions(limit);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  if (!isSupabaseAuthConfigured()) {
    return {
      volume24h: 0,
      transactions24h: 0,
      parseRate: 0,
      devicesOnline: 0,
      devicesTotal: 0,
    };
  }

  const supabase = await createClient();
  
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return {
      volume24h: 0,
      transactions24h: 0,
      parseRate: 0,
      devicesOnline: 0,
      devicesTotal: 0,
    };
  }

  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  // Get transactions from last 24h
  const { data: transactions, error: txError } = await supabase
    .from("sikaflow_transactions")
    .select("amount, status")
    .eq("tenant_id", userData.user.id)
    .gte("received_at", twentyFourHoursAgo.toISOString());

  if (txError) {
    console.error("Error fetching stats:", txError);
  }

  const txList = transactions || [];
  const successTxs = txList.filter((tx) => tx.status === "success");
  const volume24h = successTxs.reduce((sum, tx) => sum + (tx.amount || 0), 0);
  const parseRate = txList.length > 0 ? (successTxs.length / txList.length) * 100 : 0;

  // Get devices
  const { data: devices, error: devError } = await supabase
    .from("devices")
    .select("is_active, last_ping_at")
    .eq("user_id", userData.user.id);

  if (devError) {
    console.error("Error fetching devices:", devError);
  }

  const deviceList = devices || [];
  const fiveMinutesAgo = new Date();
  fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
  
  const devicesOnline = deviceList.filter((d) => {
    if (!d.is_active || !d.last_ping_at) return false;
    return new Date(d.last_ping_at) > fiveMinutesAgo;
  }).length;

  return {
    volume24h,
    transactions24h: successTxs.length,
    parseRate: Math.round(parseRate * 10) / 10,
    devicesOnline,
    devicesTotal: deviceList.length,
  };
}

export async function getTransactionsByOperator(): Promise<Record<Operator, { count: number; volume: number }>> {
  if (!isSupabaseAuthConfigured()) {
    return {
      mtn: { count: 0, volume: 0 },
      moov: { count: 0, volume: 0 },
      celtiis: { count: 0, volume: 0 },
    };
  }

  const supabase = await createClient();
  
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return {
      mtn: { count: 0, volume: 0 },
      moov: { count: 0, volume: 0 },
      celtiis: { count: 0, volume: 0 },
    };
  }

  const { data, error } = await supabase
    .from("sikaflow_transactions")
    .select("operator, amount")
    .eq("tenant_id", userData.user.id);

  if (error) {
    console.error("Error fetching operator breakdown:", error);
    return {
      mtn: { count: 0, volume: 0 },
      moov: { count: 0, volume: 0 },
      celtiis: { count: 0, volume: 0 },
    };
  }

  const breakdown: Record<Operator, { count: number; volume: number }> = {
    mtn: { count: 0, volume: 0 },
    moov: { count: 0, volume: 0 },
    celtiis: { count: 0, volume: 0 },
  };

  for (const tx of data || []) {
    const op = (tx.operator?.toLowerCase() || "mtn") as Operator;
    if (op in breakdown) {
      breakdown[op].count++;
      breakdown[op].volume += tx.amount || 0;
    }
  }

  return breakdown;
}
