import type { Operator, PublicTransactionDetail } from "@/lib/api/types";

export function computeStatsFromRows(rows: PublicTransactionDetail[]) {
  const volume = (list: PublicTransactionDetail[]) =>
    list.reduce((s, r) => s + (r.status === "success" ? r.amount : 0), 0);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const weekAgo = new Date(today);
  weekAgo.setUTCDate(weekAgo.getUTCDate() - 7);
  const monthAgo = new Date(today);
  monthAgo.setUTCMonth(monthAgo.getUTCMonth() - 1);

  const inRange = (from: Date) =>
    rows.filter((r) => new Date(r.receivedAt) >= from);

  const byOp = (list: PublicTransactionDetail[]) => {
    const acc: Record<Operator, { count: number; volume: number }> = {
      mtn: { count: 0, volume: 0 },
      moov: { count: 0, volume: 0 },
      celtiis: { count: 0, volume: 0 },
    };
    for (const r of list) {
      acc[r.operator].count += 1;
      if (r.status === "success") acc[r.operator].volume += r.amount;
    }
    return acc;
  };

  const byTypeFn = (list: PublicTransactionDetail[]) => {
    const acc: Record<string, { count: number; volume: number }> = {};
    for (const r of list) {
      if (!acc[r.type]) acc[r.type] = { count: 0, volume: 0 };
      acc[r.type].count += 1;
      if (r.status === "success") acc[r.type].volume += r.amount;
    }
    return acc;
  };

  const todayRows = inRange(today);
  const weekRows = inRange(weekAgo);
  const monthRows = inRange(monthAgo);

  return {
    volume: {
      today: volume(todayRows),
      week: volume(weekRows),
      month: volume(monthRows),
    },
    count: {
      today: todayRows.length,
      week: weekRows.length,
      month: monthRows.length,
    },
    byOperator: byOp(monthRows),
    byType: byTypeFn(monthRows),
    gatewayStatus: [
      {
        deviceId: "dev_demo_01",
        lastPing: new Date().toISOString(),
        isOnline: true,
      },
    ],
  };
}
