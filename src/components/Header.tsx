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

      {open && (
        <div className="border-t border-line bg-bg px-8 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4 text-[15px]">
            <a href="#funksjoner" className="text-sub" onClick={() => setOpen(false)}>
              Funksjoner
            </a>
            <a href="#integrasjoner" className="text-sub" onClick={() => setOpen(false)}>
              Integrasjoner
            </a>
            <a href="#kontakt" className="text-sub" onClick={() => setOpen(false)}>
              Kontakt
            </a>
            <a
              href="https://verkstedpakken.app"
              className="font-medium text-fg"
              onClick={() => setOpen(false)}
            >
              Logg inn
            </a>
            <a
              href="#kontakt"
              className="mt-1 rounded-full bg-primary py-2.5 text-center text-[14px] font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Kom i gang
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
