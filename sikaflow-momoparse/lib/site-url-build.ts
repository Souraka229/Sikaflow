/**
 * Utilisé par `next.config.ts` au build (Vercel fournit `VERCEL_URL`).
 * Évite les liens de confirmation email vers localhost quand `NEXT_PUBLIC_SITE_URL` n’est pas défini.
 */
export function resolvePublicSiteUrlForBuild(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_URL?.trim();
  if (!vercel) return undefined;
  const host = vercel.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  return `https://${host}`;
}
