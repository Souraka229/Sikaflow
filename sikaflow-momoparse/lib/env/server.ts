/**
 * Lecture des variables d’environnement côté serveur (routes API, Server Components).
 * Ne pas importer depuis du code client.
 */

import { getSupabaseAdminProjectUrl } from "@/lib/supabase/auth-env";

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/** Au moins une clé API explicite (hors fallback dev). */
export function hasConfiguredApiKeys(): boolean {
  const raw =
    process.env.SIKAFLOW_API_KEYS ?? process.env.SIKAFLOW_API_KEY ?? "";
  const keys = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return keys.length > 0;
}

/** Origine autorisée pour CORS sur les réponses JSON de l’API. `*` par défaut. */
export function getCorsAllowOrigin(): string {
  const o = process.env.SIKAFLOW_CORS_ORIGIN?.trim();
  return o && o.length > 0 ? o : "*";
}

/** Persistance API (service role) — même URL que lib/supabase/admin.ts */
export function isSupabaseConfigured(): boolean {
  const url = getSupabaseAdminProjectUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";
  return Boolean(url && key);
}

/**
 * Filtre optionnel pour les requêtes authentifiées par clé d’environnement (`SIKAFLOW_API_*`).
 * Doit correspondre à `tenant_id` en base (souvent l’UUID utilisateur Auth).
 * Les clés créées dans le tableau de bord appliquent automatiquement le bon tenant.
 */
export function getApiEnvTenantScope(): string | undefined {
  const t = process.env.SIKAFLOW_API_TENANT_ID?.trim();
  return t || undefined;
}
