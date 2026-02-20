"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-xl backdrop-saturate-150">
      <nav
        className="mx-auto flex max-w-[980px] items-center justify-between px-6 py-3"
        aria-label="Hovednavigasjon"
      >
        <a
          href="/"
          className="font-[family-name:var(--font-bricolage)] text-2xl font-bold text-foreground"
        >
          Verkstedpakken
        </a>

        <ul className="hidden items-center gap-7 md:flex" role="list">
          <li>
            <a href="#funksjoner" className="text-xs text-muted transition-colors hover:text-foreground">
              Funksjoner
            </a>
          </li>
          <li>
            <a href="#integrasjoner" className="text-xs text-muted transition-colors hover:text-foreground">
              Integrasjoner
            </a>
          </li>
          <li>
            <a href="#kontakt" className="text-xs text-muted transition-colors hover:text-foreground">
              Kontakt
            </a>
          </li>
          <li>
            <a
              href="https://verkstedpakken.app"
              className="text-xs font-medium text-foreground transition-colors hover:text-primary"
            >
              Logg inn
            </a>
          </li>
          <li>
            <a
              href="#kontakt"
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-80"
            >
              Kom i gang
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Meny"
        >
          <svg className="h-[18px] w-[18px] text-foreground" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="bg-surface/95 px-6 pb-8 pt-2 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-6" role="list">
            <li><a href="#funksjoner" className="text-sm text-foreground" onClick={() => setOpen(false)}>Funksjoner</a></li>
            <li><a href="#integrasjoner" className="text-sm text-foreground" onClick={() => setOpen(false)}>Integrasjoner</a></li>
            <li><a href="#kontakt" className="text-sm text-foreground" onClick={() => setOpen(false)}>Kontakt</a></li>
            <li>
              <a href="https://verkstedpakken.app" className="text-sm font-medium text-foreground" onClick={() => setOpen(false)}>
                Logg inn
              </a>
            </li>
            <li>
              <a href="#kontakt" className="inline-block rounded-full bg-primary px-5 py-2 text-sm font-medium text-white" onClick={() => setOpen(false)}>
                Kom i gang
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
