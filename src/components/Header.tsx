"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      if (window.location.hash) {
        history.replaceState(null, "", "/");
      }
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="nav">
      <div className="wrap nav-in">
        <Link href="/" className="logo" onClick={handleLogoClick}>
          Verkstedpakken
        </Link>
        <div className="nav-links">
          <a href="/#utfordringer">Utfordringer</a>
          <a href="/#produkt">Produkt</a>
          <a href="/#roller">Roller</a>
          <a href="/#integrasjoner">Integrasjoner</a>
          <Link href="/om-oss">Om oss</Link>
        </div>
        <div className="nav-spacer" />
        <div className="nav-cta">
          <a className="btn btn-ghost btn-sm" href="https://verkstedpakken.app">
            Logg inn
          </a>
          <a className="btn btn-primary btn-sm" href="/#interesse">
            Meld interesse
          </a>
          <button
            type="button"
            className="nav-burger"
            aria-label={open ? "Lukk meny" : "Åpne meny"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`nav-mobile${open ? " open" : ""}`}>
        <a href="/#utfordringer" onClick={() => setOpen(false)}>
          Utfordringer
        </a>
        <a href="/#produkt" onClick={() => setOpen(false)}>
          Produkt
        </a>
        <a href="/#roller" onClick={() => setOpen(false)}>
          Roller
        </a>
        <a href="/#integrasjoner" onClick={() => setOpen(false)}>
          Integrasjoner
        </a>
        <Link href="/om-oss" onClick={() => setOpen(false)}>
          Om oss
        </Link>
        <a href="https://verkstedpakken.app" onClick={() => setOpen(false)}>
          Logg inn
        </a>
        <a
          href="/#interesse"
          className="btn btn-primary"
          onClick={() => setOpen(false)}
        >
          Meld interesse
        </a>
      </div>
    </nav>
  );
}
