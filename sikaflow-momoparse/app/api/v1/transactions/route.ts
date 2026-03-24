import { authorizeApiRequest } from "@/lib/api/authorize";
import { apiOptionsResponse } from "@/lib/api/options";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import { listTransactionsQuery, parseOptionalIso } from "@/lib/api/schemas";
import { svcListTransactions } from "@/lib/api/transaction-service";

export async function OPTIONS() {
  return apiOptionsResponse();
}

export async function GET(request: Request) {
  const auth = authorizeApiRequest(request);
  if (!auth.ok) return auth.response;

  const raw = Object.fromEntries(new URL(request.url).searchParams);
  const parsed = listTransactionsQuery.safeParse(raw);
  if (!parsed.success) {
    return jsonError(parsed.error.issues.map((i) => i.message).join("; "), 400);
  }

  const q = parsed.data;
  const from = parseOptionalIso(q.from);
  const to = parseOptionalIso(q.to);

  try {
    const { items, total, nextCursor } = await svcListTransactions({
      operator: q.operator,
      type: q.type,
      status: q.status,
      reference: q.reference,
      from,
      to,
      limit: q.limit,
      cursor: q.cursor,
    });
    return jsonSuccess(
      {
        success: true as const,
        data: items,
        meta: {
          total,
          hasMore: nextCursor != null,
          nextCursor,
        },
      },
      {
        headers: {
          "X-RateLimit-Remaining": String(auth.remaining),
          "X-RateLimit-Reset": String(auth.resetAt),
        },
      }
    );
  } catch {
    return jsonError("Erreur lors de la lecture des transactions.", 500);
  }
}
