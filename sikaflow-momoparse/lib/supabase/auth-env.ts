/**
 * Variables canoniques (documentation Supabase / Vercel) vs faute fréquente SUPERBASE.
 * Les valeurs sont résolues via `env-resolve.ts` (y compris SUPABASE_URL / SUPABASE_ANON_KEY sans NEXT_PUBLIC,
 * propagées au client par `next.config.ts` au build).
 */
import {
  getResolvedSupabasePublicAnonKey,
  getResolvedSupabasePublicUrl,
  normalizeSupabaseProjectUrl,
} from "@/lib/supabase/env-resolve";

const ENV_PUBLIC_URL_OK = "NEXT_PUBLIC_SUPABASE_URL";
const ENV_PUBLIC_URL_TYPO = "NEXT_PUBLIC_SUPERBASE_URL";
const ENV_PUBLIC_ANON_OK = "NEXT_PUBLIC_SUPABASE_ANON_KEY";
const ENV_PUBLIC_ANON_TYPO = "NEXT_PUBLIC_SUPERBASE_ANON_KEY";
const ENV_PUBLIC_PUB_OK = "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY";
const ENV_PUBLIC_PUB_TYPO = "NEXT_PUBLIC_SUPERBASE_PUBLISHABLE_KEY";
const ENV_SERVER_URL_OK = "SUPABASE_URL";
const ENV_SERVER_URL_TYPO = "SUPERBASE_URL";

/** @deprecated alias — utiliser normalizeSupabaseProjectUrl */
export function normalizeSupabaseUrl(url: string): string {
  return normalizeSupabaseProjectUrl(url);
}

function firstTrimmedEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const v = process.env[key]?.trim();
    if (v) return v;
  }
  return undefined;
}

function envHas(key: string): boolean {
  return Boolean(process.env[key]?.trim());
}

/**
 * Conseils pour aligner Vercel sur les noms officiels `SUPABASE` (avec P).
 * Vide si tout est déjà au bon nom ou si les variables manquent.
 */
export function getSupabaseEnvRenameHints(): readonly string[] {
  const hints: string[] = [];
  if (envHas(ENV_PUBLIC_URL_TYPO) && !envHas(ENV_PUBLIC_URL_OK)) {
    hints.push(`Renommez ${ENV_PUBLIC_URL_TYPO} → ${ENV_PUBLIC_URL_OK}`);
  }
  if (envHas(ENV_PUBLIC_ANON_TYPO) && !envHas(ENV_PUBLIC_ANON_OK)) {
    hints.push(`Renommez ${ENV_PUBLIC_ANON_TYPO} → ${ENV_PUBLIC_ANON_OK}`);
  }
  if (envHas(ENV_PUBLIC_PUB_TYPO) && !envHas(ENV_PUBLIC_PUB_OK)) {
    hints.push(`Renommez ${ENV_PUBLIC_PUB_TYPO} → ${ENV_PUBLIC_PUB_OK}`);
  }
  if (envHas(ENV_SERVER_URL_TYPO) && !envHas(ENV_SERVER_URL_OK)) {
    hints.push(`Renommez ${ENV_SERVER_URL_TYPO} → ${ENV_SERVER_URL_OK}`);
  }
  return hints;
}

export function usesTypoSupabaseEnvNames(): boolean {
  return getSupabaseEnvRenameHints().length > 0;
}

/** URL projet pour auth navigateur + SSR (@supabase/ssr). */
export function getSupabasePublicUrl(): string | undefined {
  return getResolvedSupabasePublicUrl();
}

/**
 * URL projet pour le client **service role** (serveur uniquement).
 * Préfère `SUPABASE_URL` si défini (sans exposer au bundle client), sinon l’URL publique.
 */
export function getSupabaseAdminProjectUrl(): string | undefined {
  const direct = firstTrimmedEnv(ENV_SERVER_URL_OK, ENV_SERVER_URL_TYPO);
  if (direct) return normalizeSupabaseProjectUrl(direct);
  return getResolvedSupabasePublicUrl();
}

/**
 * Clé publique côté client : `anon` (JWT classique) ou `publishable` (appellation récente du dashboard Supabase).
 * Les deux remplissent le même rôle pour @supabase/ssr en navigateur.
 */
export function getSupabasePublicAnonKey(): string | undefined {
  return getResolvedSupabasePublicAnonKey();
}

/**
 * Détecte si l’auth Supabase (proxy, session, login navigateur) est utilisable.
 * Utilisable côté client, proxy et serveur (variables NEXT_PUBLIC_* injectées au build).
 */
export function isSupabaseAuthConfigured(): boolean {
  return Boolean(getSupabasePublicUrl() && getSupabasePublicAnonKey());
}

/** Message utilisateur final (pas de jargon Vercel / NEXT_PUBLIC). */
export const USER_MSG_AUTH_UNAVAILABLE =
  "Connexion indisponible pour le moment. Réessayez plus tard.";

export const USER_MSG_SIGNUP_UNAVAILABLE =
  "Inscription indisponible pour le moment. Réessayez plus tard.";

/**
 * Détail pour logs / erreurs serveur (Server Components, API). Les écrans utilisateur passent par `/api/config/supabase-public`.
 */
export function getSupabaseAuthMissingMessage(): string {
  const hints = getSupabaseEnvRenameHints();
  const hint = hints.length ? ` Renommages conseillés : ${hints.join(" ; ")}.` : "";
  if (process.env.NODE_ENV === "development") {
    return (
      "[dev] Supabase incomplet : URL + clé publique (anon ou publishable). Voir .env.example." + hint
    );
  }
  return "[serveur] Configuration Supabase incomplète (URL + clé publique). Vérifier les variables d’environnement et redéployer." + hint;
}

/** @deprecated Utiliser USER_MSG_* + useSupabaseBrowser sur les formulaires client. */
export function getSupabaseDemoLoginHint(): string {
  if (isSupabaseAuthConfigured()) {
    return "Utilisez vos identifiants pour accéder au tableau de bord.";
  }
  return USER_MSG_AUTH_UNAVAILABLE;
}
