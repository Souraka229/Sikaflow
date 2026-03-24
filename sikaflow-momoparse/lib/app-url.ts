/**
 * URL publique du site (redirections Supabase : email, OAuth).
 * Priorité : NEXT_PUBLIC_SITE_URL (fixée sur Vercel ou injectée depuis VERCEL_URL au build),
 * puis `window.location.origin` sur le navigateur.
 */
export function trimTrailingSlash(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

export function getPublicSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return trimTrailingSlash(fromEnv);
  if (typeof window !== "undefined") return trimTrailingSlash(window.location.origin);
  return "";
}

/** URL absolue du handler `/auth/callback` (requis par Supabase pour les emails). */
export function getAuthCallbackAbsoluteUrl(): string {
  const base = getPublicSiteUrl();
  if (base) return `${base}/auth/callback`;
  if (typeof window !== "undefined") {
    return `${trimTrailingSlash(window.location.origin)}/auth/callback`;
  }
  return "";
}
