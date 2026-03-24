"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#operateurs", label: "Opérateurs" },
  { href: "#api", label: "API" },
  { href: "#tarifs", label: "Tarifs" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-mp-bg">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link
          href="/"
          className="font-mono text-base font-semibold tracking-tight text-white/[0.92] md:text-lg"
        >
          MoMoParse
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-[6px] px-3 py-2 text-sm text-white/55 transition-colors hover:bg-white/[0.05] hover:text-white/[0.92]"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/dashboard/docs"
            className="rounded-[6px] px-3 py-2 text-sm text-white/55 transition-colors hover:bg-white/[0.05] hover:text-white/[0.92]"
          >
            Documentation
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-[8px] px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Connexion
          </Link>
          <Link
            href="/login"
            className="rounded-[8px] bg-[#FF6B35] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#E55A2A]"
          >
            Démarrer
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/[0.08] text-white/80 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <span className="text-lg leading-none">×</span>
          ) : (
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-white/[0.08] bg-mp-bg px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-[8px] px-3 py-3 text-sm text-white/80"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/dashboard/docs"
              className="rounded-[8px] px-3 py-3 text-sm text-white/80"
              onClick={() => setOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="/login"
              className="mt-2 rounded-[8px] bg-[#FF6B35] px-3 py-3 text-center text-sm font-semibold text-black"
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
