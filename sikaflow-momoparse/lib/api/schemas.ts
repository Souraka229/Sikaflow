import { z } from "zod";

export const listTransactionsQuery = z.object({
  operator: z.enum(["mtn", "moov", "celtiis"]).optional(),
  type: z.enum(["received", "sent", "payment", "withdrawal"]).optional(),
  status: z.enum(["success", "failed", "pending"]).optional(),
  limit: z.coerce.number().int().min(1).max(500).default(50),
  cursor: z.string().min(1).optional(),
  reference: z.string().min(1).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export const tagBodySchema = z.object({
  external_ref: z.string().max(512).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export function parseOptionalIso(s: string | undefined): Date | undefined {
  if (!s) return undefined;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? undefined : d;
}
