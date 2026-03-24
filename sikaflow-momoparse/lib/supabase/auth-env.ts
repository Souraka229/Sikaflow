/** Évite les doubles slashes et les URLs mal formées côté client Supabase. */
export function normalizeSupabaseUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

/** URL projet pour auth navigateur + SSR (@supabase/ssr). */
export function getSupabasePublicUrl(): string | undefined {
  const u = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!u) return undefined;
  return normalizeSupabaseUrl(u);
}

/**
 * URL projet pour le client **service role** (serveur uniquement).
 * Préfère `SUPABASE_URL` si défini (sans exposer au bundle client), sinon l’URL publique.
 */
export function getSupabaseAdminProjectUrl(): string | undefined {
  const direct = process.env.SUPABASE_URL?.trim();
  if (direct) return normalizeSupabaseUrl(direct);
  return getSupabasePublicUrl();
}

/**
 * Clé publique côté client : `anon` (JWT classique) ou `publishable` (appellation récente du dashboard Supabase).
 * Les deux remplissent le même rôle pour @supabase/ssr en navigateur.
 */
export function getSupabasePublicAnonKey(): string | undefined {
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const publishable = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
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
    return (
      "Supabase n’est pas configuré. Ajoutez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY " +
      "(ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) dans .env.local " +
      "(voir .env.example), puis redémarrez le serveur de développement."
    );
  }
  return (
    "L’inscription et la connexion par compte ne sont pas actives sur ce déploiement : " +
    "les variables NEXT_PUBLIC_SUPABASE_URL et une clé publique (NEXT_PUBLIC_SUPABASE_ANON_KEY ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ne sont pas présentes dans le build. " +
    "Si vous administrez le site : dans l’hébergeur (ex. Vercel → Project → Settings → Environment Variables), " +
    "vérifiez ces noms exacts, enregistrez, puis lancez un nouveau déploiement — " +
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
