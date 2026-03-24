/**
 * Variables canoniques (documentation Supabase / Vercel) vs faute fréquente SUPERBASE.
 * L’app lit les deux pour ne pas casser les déploiements existants ; il faut renommer sur l’hébergeur.
 */
const ENV_PUBLIC_URL_OK = "NEXT_PUBLIC_SUPABASE_URL";
const ENV_PUBLIC_URL_TYPO = "NEXT_PUBLIC_SUPERBASE_URL";
const ENV_PUBLIC_ANON_OK = "NEXT_PUBLIC_SUPABASE_ANON_KEY";
const ENV_PUBLIC_ANON_TYPO = "NEXT_PUBLIC_SUPERBASE_ANON_KEY";
const ENV_PUBLIC_PUB_OK = "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY";
const ENV_PUBLIC_PUB_TYPO = "NEXT_PUBLIC_SUPERBASE_PUBLISHABLE_KEY";
const ENV_SERVER_URL_OK = "SUPABASE_URL";
const ENV_SERVER_URL_TYPO = "SUPERBASE_URL";

/** Évite les doubles slashes et les URLs mal formées côté client Supabase. */
export function normalizeSupabaseUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
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
  const u = firstTrimmedEnv(ENV_PUBLIC_URL_OK, ENV_PUBLIC_URL_TYPO);
  if (!u) return undefined;
  return normalizeSupabaseUrl(u);
}

/**
 * URL projet pour le client **service role** (serveur uniquement).
 * Préfère `SUPABASE_URL` si défini (sans exposer au bundle client), sinon l’URL publique.
 */
export function getSupabaseAdminProjectUrl(): string | undefined {
  const direct = firstTrimmedEnv(ENV_SERVER_URL_OK, ENV_SERVER_URL_TYPO);
  if (direct) return normalizeSupabaseUrl(direct);
  return getSupabasePublicUrl();
}

/**
 * Clé publique côté client : `anon` (JWT classique) ou `publishable` (appellation récente du dashboard Supabase).
 * Les deux remplissent le même rôle pour @supabase/ssr en navigateur.
 */
export function getSupabasePublicAnonKey(): string | undefined {
  const anon = firstTrimmedEnv(ENV_PUBLIC_ANON_OK, ENV_PUBLIC_ANON_TYPO);
  const publishable = firstTrimmedEnv(ENV_PUBLIC_PUB_OK, ENV_PUBLIC_PUB_TYPO);
  return anon || publishable || undefined;
}

/**
 * Détecte si l’auth Supabase (proxy, session, login navigateur) est utilisable.
 * Utilisable côté client, proxy et serveur (variables NEXT_PUBLIC_* injectées au build).
 */
export function isSupabaseAuthConfigured(): boolean {
  return Boolean(getSupabasePublicUrl() && getSupabasePublicAnonKey());
}

/**
 * Démo locale (`next dev` uniquement) : données fictives + accès dashboard sans mot de passe.
 * En production (Vercel, `next start`), toujours false — connexion et données réelles uniquement via Supabase.
 */
export function isDevDemoWithoutSupabase(): boolean {
  return process.env.NODE_ENV === "development" && !isSupabaseAuthConfigured();
}

/**
 * Instructions quand Supabase n’est pas configuré.
 * En production, ne pas citer `.env.local` (inexistant sur Vercel) ; rappeler le redeploy après NEXT_PUBLIC_*.
 */
export function getSupabaseAuthMissingMessage(): string {
  if (process.env.NODE_ENV === "development") {
    const typo = getSupabaseEnvRenameHints();
    const typoLine =
      typo.length > 0
        ? ` Vous avez des variables en SUPERBASE : ${typo.join(" ; ")}.`
        : "";
    return (
      "Supabase n’est pas configuré. Ajoutez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY " +
      "(ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) dans .env.local — orthographe SUPABASE (avec P), pas SUPERBASE." +
      typoLine +
      " (voir .env.example), puis redémarrez le serveur de développement."
    );
  }
  return (
    "L’inscription et la connexion par compte ne sont pas actives sur ce déploiement : " +
    "les variables NEXT_PUBLIC_SUPABASE_URL et une clé publique (NEXT_PUBLIC_SUPABASE_ANON_KEY ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ne sont pas présentes dans le build. " +
    "Vérifiez l’orthographe : SUPABASE (avec un P), pas SUPERBASE. " +
    "Dans l’hébergeur (ex. Vercel → Settings → Environment Variables), corrigez les noms si besoin, enregistrez, puis redéployez — " +
    "les variables NEXT_PUBLIC_* sont figées au moment du build."
  );
}

/** Texte court sous le formulaire de connexion. */
export function getSupabaseDemoLoginHint(): string {
  if (isSupabaseAuthConfigured()) {
    return "Utilisez vos identifiants Supabase pour accéder au tableau de bord.";
  }
  if (isDevDemoWithoutSupabase()) {
    return "Mode démo (dev uniquement) : sans Supabase dans .env.local, « Se connecter » ouvre le tableau de bord sans vérifier email/mot de passe.";
  }
  return "La connexion sécurisée nécessite Supabase sur ce serveur (NEXT_PUBLIC_SUPABASE_URL + clé publique), puis un redéploiement.";
}
