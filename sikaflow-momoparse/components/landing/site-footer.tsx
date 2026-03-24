import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-mp-bg">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-mono text-lg font-semibold text-white/[0.92]">MoMoParse</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
              Parsez les SMS MTN MoMo, Moov Money et Celtiis en données structurées. Une API fiable
              pour SikaFlow et vos propres produits en Afrique de l&apos;Ouest.
            </p>
            <p className="mt-4 font-mono text-xs text-white/35">
              Déployé avec SikaFlow ·{" "}
              <span className="text-white/50">app.sikaflow.com</span>
            </p>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-widest text-white/40">Produit</p>
            <ul className="mt-3 space-y-2 text-sm text-white/55">
              <li>
                <Link href="/dashboard" className="hover:text-[#FF6B35]">
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link href="/dashboard/docs" className="hover:text-[#FF6B35]">
                  Documentation API
                </Link>
              </li>
              <li>
                <a href="#tarifs" className="hover:text-[#FF6B35]">
                  Tarifs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-widest text-white/40">Compte</p>
            <ul className="mt-3 space-y-2 text-sm text-white/55">
              <li>
                <Link href="/login" className="hover:text-[#FF6B35]">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/dashboard/api-keys" className="hover:text-[#FF6B35]">
                  Clés API
                </Link>
              </li>
              <li>
                <Link href="/dashboard/devices" className="hover:text-[#FF6B35]">
                  Appareils
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-8 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} MoMoParse · SikaFlow</span>
          <span className="font-mono">XOF · API REST · Supabase · Vercel</span>
        </div>
      </div>
    </footer>
  );
}
