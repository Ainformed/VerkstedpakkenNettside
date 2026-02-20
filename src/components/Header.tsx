"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-line/60 bg-bg/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-4 lg:px-12">
        <a
          href="/"
          className="font-[family-name:var(--font-bricolage)] text-[28px] font-extrabold tracking-tight text-primary"
        >
          Verkstedpakken
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          <a
            href="#funksjoner"
            className="text-[14px] text-sub transition-colors duration-200 hover:text-fg"
          >
            Funksjoner
          </a>
          <a
            href="#integrasjoner"
            className="text-[14px] text-sub transition-colors duration-200 hover:text-fg"
          >
            Integrasjoner
          </a>
          <a
            href="#kontakt"
            className="text-[14px] text-sub transition-colors duration-200 hover:text-fg"
          >
            Kontakt
          </a>
          <a
            href="https://verkstedpakken.app"
            className="text-[14px] font-medium text-fg transition-colors duration-200 hover:text-primary"
          >
            Logg inn
          </a>
          <a
            href="#kontakt"
            className="rounded-full bg-primary px-6 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:brightness-125"
          >
            Kom i gang
          </a>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 transition-colors hover:bg-bg-alt md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Meny"
        >
          <svg
            className="h-5 w-5 text-fg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed inset-x-0 top-0 z-50 bg-bg px-8 pb-10 pt-6 shadow-2xl transition-all duration-300 md:hidden ${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="font-[family-name:var(--font-bricolage)] text-[28px] font-extrabold tracking-tight text-primary"
            onClick={() => setOpen(false)}
          >
            Verkstedpakken
          </a>
          <button
            type="button"
            className="rounded-lg p-2 transition-colors hover:bg-bg-alt"
            onClick={() => setOpen(false)}
            aria-label="Lukk meny"
          >
            <svg className="h-5 w-5 text-fg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-8 flex flex-col gap-1">
          <a href="#funksjoner" className="rounded-xl px-4 py-3 text-[16px] text-sub transition-colors hover:bg-bg-alt hover:text-fg" onClick={() => setOpen(false)}>
            Funksjoner
          </a>
          <a href="#integrasjoner" className="rounded-xl px-4 py-3 text-[16px] text-sub transition-colors hover:bg-bg-alt hover:text-fg" onClick={() => setOpen(false)}>
            Integrasjoner
          </a>
          <a href="#kontakt" className="rounded-xl px-4 py-3 text-[16px] text-sub transition-colors hover:bg-bg-alt hover:text-fg" onClick={() => setOpen(false)}>
            Kontakt
          </a>
          <a href="https://verkstedpakken.app" className="rounded-xl px-4 py-3 text-[16px] font-medium text-fg transition-colors hover:bg-bg-alt" onClick={() => setOpen(false)}>
            Logg inn
          </a>
        </nav>
        <a
          href="#kontakt"
          className="mt-6 block rounded-full bg-primary py-3.5 text-center text-[15px] font-semibold text-white transition-all hover:brightness-125"
          onClick={() => setOpen(false)}
        >
          Kom i gang
        </a>
      </div>
    </header>
  );
}
