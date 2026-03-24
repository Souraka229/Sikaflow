/**
 * Résolution des variables Supabase au **build** (next.config) et côté serveur.
 * Ne pas importer depuis des composants client si vous y mettez des secrets.
 */

function pickTrimmedEnv(keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const v = process.env[key]?.trim();
    if (v) return v;
  }
  return undefined;
}

export function normalizeSupabaseProjectUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

/** Ordre : noms publics Next, puis intégrations Vercel / Supabase souvent sans NEXT_PUBLIC_. */
const URL_KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPERBASE_URL",
  "SUPABASE_URL",
  "SUPERBASE_URL",
] as const;

/** Clé **publique** uniquement (anon, publishable). Jamais service_role. */
const PUBLIC_KEY_KEYS = [
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPERBASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SUPERBASE_PUBLISHABLE_KEY",
  "SUPABASE_ANON_KEY",
  "SUPABASE_PUBLISHABLE_KEY",
  // Nom parfois généré par des templates (vérifier que la valeur est bien la clé publique)
  "SUPABASE_PUBLISHABLE_SECRET",
] as const;

/**
 * Pour `next.config` → `env` : expose au bundle client les mêmes valeurs sous
 * NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
export function buildSupabaseClientEnv(): Record<string, string> {
  const rawUrl = pickTrimmedEnv(URL_KEYS);
  const rawKey = pickTrimmedEnv(PUBLIC_KEY_KEYS);
  const out: Record<string, string> = {};
  if (rawUrl) {
    out.NEXT_PUBLIC_SUPABASE_URL = normalizeSupabaseProjectUrl(rawUrl);
  }
  if (rawKey) {
    out.NEXT_PUBLIC_SUPABASE_ANON_KEY = rawKey;
  }
  return out;
}

/** URL publique projet (toutes sources d’env connues). */
export function getResolvedSupabasePublicUrl(): string | undefined {
  const u = pickTrimmedEnv(URL_KEYS);
  return u ? normalizeSupabaseProjectUrl(u) : undefined;
}

/** Clé publique navigateur (anon / publishable / noms serveur repris au build). */
export function getResolvedSupabasePublicAnonKey(): string | undefined {
  return pickTrimmedEnv(PUBLIC_KEY_KEYS);
}
