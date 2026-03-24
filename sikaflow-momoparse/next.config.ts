import type { NextConfig } from "next";
import path from "node:path";

/** Ancre Turbopack sur ce dossier (évite la détection d’un mauvais root si un lockfile parent existe). */
const nextConfig: NextConfig = {
  /** Masque le bouton flottant « N » (dev indicator) en développement. */
  devIndicators: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
