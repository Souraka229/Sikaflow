import type { NextResponse } from "next/server";
import { validateApiKey, getApiKeyFromRequest } from "@/lib/api/auth";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { jsonError } from "@/lib/api/response";
import { hasConfiguredApiKeys, isProduction } from "@/lib/env/server";

export type AuthResult =
  | { ok: true; remaining: number }
  | { ok: false; response: NextResponse };

export function authorizeApiRequest(request: Request): AuthResult {
  if (isProduction() && !hasConfiguredApiKeys()) {
    return {
      ok: false,
      response: jsonError(
        "API non configurée : définissez SIKAFLOW_API_KEYS (ou SIKAFLOW_API_KEY) sur l’environnement de production.",
        503
      ),
    };
  }
  const key = getApiKeyFromRequest(request);
  if (!key || !validateApiKey(key)) {
    return { ok: false, response: jsonError("Invalid or missing X-Api-Key", 401) };
  }
  const rl = checkRateLimit(key);
  if (!rl.ok) {
    return { ok: false, response: jsonError("Rate limit exceeded. Try again later.", 429) };
  }
  return { ok: true, remaining: rl.remaining };
}
