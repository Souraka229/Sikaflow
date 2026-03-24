import { authorizeApiRequest } from "@/lib/api/authorize";
import { apiOptionsResponse } from "@/lib/api/options";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import { svcGetTransactionById } from "@/lib/api/transaction-service";

type Ctx = { params: Promise<{ id: string }> };

export async function OPTIONS() {
  return apiOptionsResponse();
}

export async function GET(request: Request, context: Ctx) {
  const auth = authorizeApiRequest(request);
  if (!auth.ok) return auth.response;

  const { id } = await context.params;
  let row: Awaited<ReturnType<typeof svcGetTransactionById>>;
  try {
    row = await svcGetTransactionById(id);
  } catch {
    return jsonError("Erreur lors de la lecture de la transaction.", 500);
  }
  if (!row) {
    return jsonError("Transaction not found", 404);
  }

  return jsonSuccess(
    {
      success: true as const,
      data: row,
    },
    {
      headers: {
        "X-RateLimit-Remaining": String(auth.remaining),
      },
    }
  );
}
