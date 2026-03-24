import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-mp-bg px-4">
      <div className="max-w-md text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-mp-muted">Sika FLOW</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-mp-text">404</h1>
        <p className="mt-2 text-base font-medium text-mp-muted">
          Cette page n’existe pas ou a été déplacée.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#DFFF00] px-8 text-sm font-bold text-black transition-colors hover:bg-[#c8e600]"
          >
            Accueil
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-full border border-mp-border bg-mp-surface px-8 text-sm font-bold text-mp-text transition-colors hover:border-black/20"
          >
            Tableau de bord
          </Link>
        </div>
        <p className="mt-8 text-sm">
          <Link href="/dashboard/docs" className="font-semibold text-mp-text underline decoration-[#DFFF00] decoration-2 underline-offset-4">
            Documentation API
          </Link>
        </p>
      </div>
    </div>
  );
}
