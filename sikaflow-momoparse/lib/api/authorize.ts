import type { NextResponse } from "next/server";
import { hashApiKeySecret } from "@/lib/api/api-key-hash";
import { validateApiKey, getApiKeyFromRequest } from "@/lib/api/auth";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { jsonError } from "@/lib/api/response";
import { hasConfiguredApiKeys, isProduction, isSupabaseConfigured } from "@/lib/env/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type AuthResult =
  | { ok: true; remaining: number; resetAt: number; tenantId?: string }
  | { ok: false; response: NextResponse };

export async function authorizeApiRequest(request: Request): Promise<AuthResult> {
  const persistenceOk = hasConfiguredApiKeys() || isSupabaseConfigured();
  if (isProduction() && !persistenceOk) {
    return {
      ok: false,
      response: jsonError(
        "API non configurée : définissez SIKAFLOW_API_KEYS (ou SIKAFLOW_API_KEY) et/ou Supabase (SUPABASE_SERVICE_ROLE_KEY) pour les clés créées dans l’application.",
        503,
      ),
    };
  }

  const key = getApiKeyFromRequest(request);
  if (!key || typeof key !== "string") {
    return { ok: false, response: jsonError("Invalid or missing X-Api-Key", 401) };
  }

  const trimmed = key.trim();

  if (validateApiKey(trimmed)) {
    const rl = checkRateLimit(`env:${hashApiKeySecret(trimmed)}`);
    if (!rl.ok) {
      return { ok: false, response: jsonError("Rate limit exceeded. Try again later.", 429) };
    }
    return { ok: true, remaining: rl.remaining, resetAt: rl.resetAt };
  }

  if (isSupabaseConfigured()) {
    try {
      const secretHash = hashApiKeySecret(trimmed);
      const admin = getSupabaseAdmin();
      const { data, error } = await admin
        .from("api_keys")
        .select("id, user_id")
        .eq("secret_hash", secretHash)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error("api_keys lookup:", error.message);
      } else if (data?.id) {
        const rl = checkRateLimit(`db:${data.id}`);
        if (!rl.ok) {
          return { ok: false, response: jsonError("Rate limit exceeded. Try again later.", 429) };
        }
        void admin
          .from("api_keys")
          .update({ last_used_at: new Date().toISOString() })
          .eq("id", data.id);
        return {
          ok: true,
          remaining: rl.remaining,
          resetAt: rl.resetAt,
          tenantId: data.user_id,
        };
      }
    } catch (e) {
      console.error("API key DB validation:", e);
    }
  }

  return { ok: false, response: jsonError("Invalid or missing X-Api-Key", 401) };
}
