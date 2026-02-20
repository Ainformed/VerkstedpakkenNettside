"use client";

import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Hovednavigasjon"
      >
        <a href="/" className="text-xl font-bold text-primary">
          Verkstedpakken
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex" role="list">
          <li>
            <a
              href="#funksjoner"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
            >
              Funksjoner
            </a>
          </li>
          <li>
            <a
              href="#integrasjoner"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
            >
              Integrasjoner
            </a>
          </li>
          <li>
            <a
              href="#kontakt"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
            >
              Kontakt
            </a>
          </li>
          <li>
            <a
              href="#kontakt"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Kom i gang
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Åpne meny"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4" role="list">
            <li>
              <a
                href="#funksjoner"
                className="block text-sm font-medium text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Funksjoner
              </a>
            </li>
            <li>
              <a
                href="#integrasjoner"
                className="block text-sm font-medium text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Integrasjoner
              </a>
            </li>
            <li>
              <a
                href="#kontakt"
                className="block text-sm font-medium text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt
              </a>
            </li>
            <li>
              <a
                href="#kontakt"
                className="inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kom i gang
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
