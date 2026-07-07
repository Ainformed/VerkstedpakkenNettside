"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { APP_URL, SIGNUP_URL } from "@/lib/links";

const NAV_LINKS = [
  { href: "/ordresystem", label: "Ordresystem" },
  { href: "/nettside-og-booking", label: "Nettside og booking" },
  { href: "/integrasjoner", label: "Integrasjoner" },
  { href: "/pris", label: "Pris" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Skjul ved scroll ned, vis ved scroll opp. Alltid synlig nær toppen og
  // så lenge footeren er i bildet.
  const footerVisible = useRef(false);
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const THRESHOLD = 8; // ignorer småbevegelser (touch-jitter)

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 4);
        const diff = y - lastY;
        if (y < 80 || footerVisible.current) {
          setHidden(false);
        } else if (diff > THRESHOLD) {
          setHidden(true);
        } else if (diff < -THRESHOLD) {
          setHidden(false);
        }
        if (Math.abs(diff) > THRESHOLD) lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Footer i viewport -> menyen frem igjen
    const foot = document.querySelector(".site-foot");
    let io: IntersectionObserver | undefined;
    if (foot) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            footerVisible.current = entry.isIntersecting;
            if (entry.isIntersecting) setHidden(false);
          }
        },
        { threshold: 0 },
      );
      io.observe(foot);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <>
      <header
        className={`nav${hidden ? " nav-hidden" : ""}${scrolled ? " nav-scrolled" : ""}`}
      >
        <div className="nav-inner">
          <Link className="brand" href="/" aria-label="Verkstedpakken">
            <Logo />
          </Link>
          <nav className="nav-links">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="nav-cta">
            <a className="btn btn-ghost login" href={APP_URL}>
              Logg inn
            </a>
            <a className="btn btn-primary primary-cta" href={SIGNUP_URL}>
              Prøv gratis
            </a>
            <button
              className="nav-burger"
              aria-label="Meny"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mm-overlay${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <aside className={`mobile-menu${menuOpen ? " open" : ""}`} aria-label="Meny">
        <div className="mm-top">
          <span className="mm-brand" aria-hidden="true">
            <Logo />
          </span>
          <button
            className="mm-close"
            aria-label="Lukk meny"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="mm-nav">
          {NAV_LINKS.map((l) => (
            <div className="mm-row" key={l.href}>
              <Link
                className="mm-link"
                href={l.href}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mm-foot">
          <a className="btn btn-ghost" href={APP_URL}>
            Logg inn
          </a>
          <a className="btn btn-primary" href={SIGNUP_URL}>
            Prøv gratis
          </a>
        </div>
      </aside>
    </>
  );
}
