import { authorizeApiRequest } from "@/lib/api/authorize";
import { apiOptionsResponse } from "@/lib/api/options";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import { svcComputeStats } from "@/lib/api/transaction-service";

export async function OPTIONS() {
  return apiOptionsResponse();
}

export async function GET(request: Request) {
  const auth = authorizeApiRequest(request);
  if (!auth.ok) return auth.response;

  let stats: Awaited<ReturnType<typeof svcComputeStats>>;
  try {
    stats = await svcComputeStats();
  } catch {
    return jsonError("Erreur lors du calcul des statistiques.", 500);
  }

  return jsonSuccess(
    {
      success: true as const,
      data: stats,
    },
    {
      headers: {
        "X-RateLimit-Remaining": String(auth.remaining),
      },
    }
  );
}
