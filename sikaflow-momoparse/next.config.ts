import type { NextConfig } from "next";
import path from "node:path";
import { resolvePublicSiteUrlForBuild } from "./lib/site-url-build";
import { buildSupabaseClientEnv } from "./lib/supabase/env-resolve";

const publicSiteFromBuild = resolvePublicSiteUrlForBuild();

/** Ancre Turbopack sur ce dossier (évite la détection d’un mauvais root si un lockfile parent existe). */
const nextConfig: NextConfig = {
  /**
   * Si Vercel ne fournit que SUPABASE_URL / SUPABASE_ANON_KEY (sans NEXT_PUBLIC_*),
   * on les recopie ici pour que le navigateur reçoive les bonnes valeurs au build.
   * NEXT_PUBLIC_SITE_URL : domaine canonique (emails). Sinon https://$VERCEL_URL sur Vercel.
   */
  env: {
    ...buildSupabaseClientEnv(),
    ...(publicSiteFromBuild
      ? { NEXT_PUBLIC_SITE_URL: publicSiteFromBuild }
      : {}),
  },
  /** Masque le bouton flottant « N » (dev indicator) en développement. */
  devIndicators: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
