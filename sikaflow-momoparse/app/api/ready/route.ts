import { NextResponse } from "next/server";
import {
  hasConfiguredApiKeys,
  isProduction,
  isSupabaseConfigured,
} from "@/lib/env/server";
import { isSupabaseAuthConfigured } from "@/lib/supabase/auth-env";

/**
 * Prêt pour le trafic : en production, exige des clés API configurées.
 * Utile pour les checks de déploiement (Vercel, K8s, etc.).
 */
export async function GET() {
  const apiKeysOk = !isProduction() || hasConfiguredApiKeys();
  const supabaseAuth = isSupabaseAuthConfigured();
  const body = {
    ok: apiKeysOk,
    production: isProduction(),
    apiKeysConfigured: hasConfiguredApiKeys(),
    supabaseAuthConfigured: supabaseAuth,
    persistence: isSupabaseConfigured() ? "supabase" : "memory",
    time: new Date().toISOString(),
  };
  return NextResponse.json(body, { status: apiKeysOk ? 200 : 503 });
}
