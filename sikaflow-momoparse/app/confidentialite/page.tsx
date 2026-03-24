import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Politique de confidentialité et traitement des données — Sika FLOW.",
};

export default function ConfidentialitePage() {
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
          <h1 className="mt-6 text-3xl font-bold text-mp-text">Politique de confidentialité</h1>
          <p className="mt-2 text-sm font-medium text-mp-muted">
            Cadre type — à adapter à votre traitement réel (SMS, logs, sous-traitants, pays tiers).
          </p>
          <div className="mt-10 space-y-8 text-sm font-medium leading-relaxed text-mp-muted">
            <section>
              <h2 className="text-base font-bold text-mp-text">Données collectées</h2>
              <p className="mt-2">
                Compte (email), clés API, contenu des SMS traités pour le parsing, journaux techniques.
                Précisez les finalités et bases légales conformément au RGPD / lois locales.
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-mp-text">Conservation</h2>
              <p className="mt-2">
                Durées de rétention à définir par catégorie de données. Les administrateurs peuvent
                configurer la persistance (ex. base hébergée).
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-mp-text">Sous-traitants</h2>
              <p className="mt-2">
                Hébergeur (ex. Vercel), éventuellement prestataire de base de données (ex. Supabase).
                Listez les transferts hors UE si applicable.
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-mp-text">Vos droits</h2>
              <p className="mt-2">
                Accès, rectification, effacement, limitation, portabilité, opposition — et contact DPO
                ou autorité compétente.
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
