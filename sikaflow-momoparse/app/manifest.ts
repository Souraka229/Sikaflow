import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sika FLOW — Mobile Money analytics",
    short_name: "Sika FLOW",
    description:
      "Parsez MTN, Moov, Celtiis. Tableau de bord et API — installable sur mobile (PWA).",
    start_url: "/",
    display: "standalone",
    background_color: "#efeff1",
    theme_color: "#dfff00",
    orientation: "portrait-primary",
    categories: ["finance", "business", "productivity"],
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
