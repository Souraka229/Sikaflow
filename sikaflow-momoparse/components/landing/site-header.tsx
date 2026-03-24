"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#operateurs", label: "Opérateurs" },
  { href: "#api", label: "API" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-mp-border bg-mp-surface sf-card-shadow">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:h-16 md:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-mp-text md:text-xl">
          Sika FLOW
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-mp-muted transition-colors hover:bg-mp-bg hover:text-mp-text"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/dashboard/docs"
            className="rounded-full px-3 py-2 text-sm font-semibold text-mp-muted transition-colors hover:bg-mp-bg hover:text-mp-text"
          >
            Documentation
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-bold text-mp-text transition-colors hover:bg-mp-bg"
          >
            Connexion
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-[#DFFF00] px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#c8e600]"
          >
            Démarrer
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-mp-border text-mp-text md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <span className="text-xl leading-none">×</span> : <span className="text-lg">☰</span>}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-mp-border bg-mp-surface px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-3 text-sm font-semibold text-mp-text"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/dashboard/docs"
              className="rounded-full px-3 py-3 text-sm font-semibold text-mp-text"
              onClick={() => setOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="/login"
              className="mt-2 rounded-full bg-[#DFFF00] px-3 py-3 text-center text-sm font-bold text-black"
              onClick={() => setOpen(false)}
            >
              Connexion / Démarrer
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
