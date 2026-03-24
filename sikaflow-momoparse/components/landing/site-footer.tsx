import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-mp-border bg-mp-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-lg font-bold text-mp-text">Sika FLOW</p>
            <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-mp-muted">
              Mobile Money analytics &amp; API — MTN, Moov, Celtiis. Design clair, accent citron, pensé
              pour les équipes produit en Afrique de l&apos;Ouest.
            </p>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-mp-muted">
              app.sikaflow.com
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-mp-muted">Produit</p>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-mp-muted">
              <li>
                <Link href="/dashboard" className="hover:text-mp-text">
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link href="/dashboard/docs" className="hover:text-mp-text">
                  Documentation API
                </Link>
              </li>
              <li>
                <Link href="/#tarifs" className="hover:text-mp-text">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-mp-text">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-mp-muted">Compte</p>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-mp-muted">
              <li>
                <Link href="/login" className="hover:text-mp-text">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/dashboard/api-keys" className="hover:text-mp-text">
                  Clés API
                </Link>
              </li>
              <li>
                <Link href="/dashboard/devices" className="hover:text-mp-text">
                  Appareils
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-mp-border pt-8 text-xs font-medium text-mp-muted md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-6">
          <span>© {new Date().getFullYear()} Sika FLOW</span>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/mentions-legales" className="hover:text-mp-text">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-mp-text">
              Confidentialité
            </Link>
            <span className="hidden sm:inline">·</span>
            <span>XOF · API REST · Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
