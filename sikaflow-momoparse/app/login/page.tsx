import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/landing/login-form";
import { formatXof } from "@/lib/format-currency";

export const metadata: Metadata = {
  title: "Connexion",
  description:
    "Connectez-vous à Sika FLOW — tableau de bord Mobile Money, clés API et documentation.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-mp-bg md:flex-row">
      <div className="relative hidden flex-1 flex-col justify-center border-b border-mp-border bg-mp-bg p-10 md:flex md:border-b-0 md:border-r lg:p-12">
        <div className="relative z-10 max-w-xl space-y-8">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-mp-border bg-mp-surface px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-mp-muted sf-card-shadow">
              Sika FLOW · Mobile Money
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-mp-text lg:text-4xl">
              Du SMS brut aux{" "}
              <span className="rounded-lg bg-[#DFFF00] px-1 text-black">analytics claires</span>
            </h2>
            <p className="max-w-md text-sm font-medium leading-relaxed text-mp-muted">
              Tableau de bord, API et passerelles Android — MTN, Moov, Celtiis. Une expérience pensée
              comme votre maquette : claire, rapide, énergique.
            </p>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-mp)] bg-[#DFFF00] p-6 sf-card-shadow-lg">
            <p className="text-sm font-bold text-black">Performance aperçu</p>
            <p className="mt-4 text-4xl font-bold tabular-nums text-black">{formatXof(90_744)}</p>
            <p className="text-xs font-bold text-black/60">Volume indicatif (démo)</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-[var(--radius-mp-inner)] bg-white/90 p-3 sf-card-shadow">
                <p className="text-[10px] font-bold uppercase text-mp-muted">Parse</p>
                <p className="text-lg font-bold text-mp-text">98,5 %</p>
              </div>
              <div className="rounded-[var(--radius-mp-inner)] bg-white/90 p-3 sf-card-shadow">
                <p className="text-[10px] font-bold uppercase text-mp-muted">Tx / 24h</p>
                <p className="text-lg font-bold text-mp-text">42</p>
              </div>
            </div>
          </div>
        </div>
        <p className="absolute bottom-8 left-10 text-[10px] font-bold uppercase tracking-widest text-mp-muted lg:left-12">
          © {new Date().getFullYear()} Sika FLOW
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-center bg-mp-surface px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-md space-y-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-mp-text">Sika FLOW</h1>
            <p className="text-base font-medium text-mp-muted">Connexion à votre espace</p>
          </header>

          <LoginForm />

          <footer className="space-y-4 pt-4 text-center">
            <p className="text-sm font-medium text-mp-muted">
              Nouveau ?{" "}
              <Link
                href="/dashboard"
                className="font-bold text-mp-text underline decoration-[#DFFF00] decoration-2 underline-offset-4"
              >
                Ouvrir le tableau de bord
              </Link>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="text-[10px] font-bold uppercase tracking-widest text-mp-muted hover:text-mp-text"
              >
                Accueil
              </Link>
              <Link
                href="/dashboard/docs"
                className="text-[10px] font-bold uppercase tracking-widest text-mp-muted hover:text-mp-text"
              >
                Documentation
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
