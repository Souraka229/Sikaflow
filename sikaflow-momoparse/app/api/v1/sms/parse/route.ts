import { authorizeApiRequest } from "@/lib/api/authorize";
import { apiOptionsResponse } from "@/lib/api/options";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import { analyzeMobileMoneySms } from "@/lib/momoparse/sms-parser";
import { z } from "zod";

const bodySchema = z.object({
  rawSms: z.string().min(1).max(8000),
});

export async function OPTIONS() {
  return apiOptionsResponse();
}

export async function POST(request: Request) {
  const auth = await authorizeApiRequest(request);
  if (!auth.ok) return auth.response;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return jsonError("Corps JSON invalide.", 400);
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return jsonError(parsed.error.issues.map((i) => i.message).join("; "), 400);
  }

  const result = analyzeMobileMoneySms(parsed.data.rawSms);

  return jsonSuccess(
    {
      success: true as const,
      data: result,
    },
    {
      headers: {
        "X-RateLimit-Remaining": String(auth.remaining),
        "X-RateLimit-Reset": String(auth.resetAt),
      },
    },
  );
}
