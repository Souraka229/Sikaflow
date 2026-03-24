import { NextResponse } from "next/server";
import {
  hasConfiguredApiKeys,
  isProduction,
  isSupabaseConfigured,
} from "@/lib/env/server";
import {
  getSupabaseEnvRenameHints,
  isSupabaseAuthConfigured,
  usesTypoSupabaseEnvNames,
} from "@/lib/supabase/auth-env";

/**
 * Prêt pour le trafic : en production, exige des clés API env et/ou Supabase service role
 * (pour les clés créées dans l’application).
 */
export async function GET() {
  const apiKeysOk =
    !isProduction() || hasConfiguredApiKeys() || isSupabaseConfigured();
  const supabaseAuth = isSupabaseAuthConfigured();
  const body = {
    ok: apiKeysOk,
    production: isProduction(),
    apiKeysConfigured: hasConfiguredApiKeys(),
    supabaseAuthConfigured: supabaseAuth,
    supabaseUsesTypoEnvNames: usesTypoSupabaseEnvNames(),
    supabaseRenameHints: [...getSupabaseEnvRenameHints()],
    persistence: isSupabaseConfigured() ? "supabase" : "memory",
    time: new Date().toISOString(),
  };
  return NextResponse.json(body, { status: apiKeysOk ? 200 : 503 });
}
