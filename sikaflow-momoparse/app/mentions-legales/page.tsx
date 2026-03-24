import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales Sika FLOW — éditeur, hébergement, propriété intellectuelle.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-mp-bg">
      <SiteHeader />
      <main className="flex-1 px-4 py-12 md:px-6">
        <article className="mx-auto max-w-2xl">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-widest text-mp-muted hover:text-mp-text"
          >
            ← Accueil
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-mp-text">Mentions légales</h1>
          <p className="mt-2 text-sm font-medium text-mp-muted">
            Document type — à compléter avec vos informations réelles avant mise en production.
          </p>
          <div className="mt-10 space-y-8 text-sm font-medium leading-relaxed text-mp-muted">
            <section>
              <h2 className="text-base font-bold text-mp-text">Éditeur</h2>
              <p className="mt-2">
                Raison sociale, forme juridique, capital, siège social, RCS — à renseigner.
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-mp-text">Directeur de publication</h2>
              <p className="mt-2">Nom et qualité du responsable — à renseigner.</p>
            </section>
            <section>
              <h2 className="text-base font-bold text-mp-text">Hébergement</h2>
              <p className="mt-2">
                Ce site peut être hébergé sur Vercel Inc. ou tout autre prestataire — précisez
                coordonnées et politique applicable.
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-mp-text">Propriété intellectuelle</h2>
              <p className="mt-2">
                L’ensemble des éléments du service (marque, interface, documentation) est protégé.
                Toute reproduction non autorisée est interdite.
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
