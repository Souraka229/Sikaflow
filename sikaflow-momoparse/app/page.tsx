import type { Metadata } from "next";
import { HomeSections } from "@/components/landing/home-sections";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export const metadata: Metadata = {
  title: "MoMoParse — SMS Mobile Money → API structurée",
  description:
    "Parsez MTN MoMo, Moov Money et Celtiis. API REST, dashboard temps réel, clés API et devices. SikaFlow · Afrique de l'Ouest.",
  openGraph: {
    title: "MoMoParse — SMS Mobile Money → API structurée",
    description:
      "Ingestion sécurisée, parsing multi-opérateurs, API publique X-Api-Key. Pour les équipes produit en Afrique de l'Ouest.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-mp-bg">
      <SiteHeader />
      <main className="flex-1">
        <HomeSections />
      </main>
      <SiteFooter />
    </div>
  );
}
