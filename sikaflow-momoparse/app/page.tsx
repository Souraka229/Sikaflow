import type { Metadata } from "next";
import { HomeSections } from "@/components/landing/home-sections";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export const metadata: Metadata = {
  title: "Sika FLOW — Analytics & API Mobile Money",
  description:
    "Parsez MTN, Moov, Celtiis. Dashboard type fintech clair, accent citron, API X-Api-Key. Afrique de l'Ouest.",
  openGraph: {
    title: "Sika FLOW — Analytics & API Mobile Money",
    description:
      "Interface claire, cartes Bento, volume et transactions en direct — même esprit que votre maquette produit.",
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
