"use client";

import { useState, useEffect } from "react";

const words = [
  "Egen nettside med online booking",
  "Bookingportal med sanntidsstatus",
  "Ordrestyring med direktefakturering",
  "Mekanikerportal for verkstedgulvet",
  "Delebestilling rett fra jobben",
  "Lageroversikt med statusoppdatering",
  "Dekkhotell med sesongpåminnelser",
  "Kundechat og intern chat",
  "Timeføring og statistikk",
  "Alt koblet mot fakturaprogrammet",
];

const TYPING_SPEED = 60;
const DELETING_SPEED = 35;
const PAUSE_AFTER_TYPED = 1500;
const PAUSE_BETWEEN_WORDS = 400;

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, TYPING_SPEED);
        return () => clearTimeout(timeout);
      }
      // Finished typing — pause then start deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, PAUSE_AFTER_TYPED);
      return () => clearTimeout(timeout);
    }

    // Deleting
    if (displayText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, DELETING_SPEED);
      return () => clearTimeout(timeout);
    }

    // Finished deleting — pause then move to next word
    const timeout = setTimeout(() => {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }, PAUSE_BETWEEN_WORDS);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section className="relative overflow-hidden bg-bg-alt px-8 pt-40 pb-28 lg:px-12 lg:pt-52 lg:pb-36">
      {/* Subtle top grain texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      <div className="mx-auto max-w-[1200px]">
        <p className="animate-fade-up text-[13px] font-semibold uppercase tracking-[0.2em] text-primary">
          For alle typer verksteder
        </p>

        <h1 className="animate-fade-up delay-2 mt-5 max-w-[720px] font-[family-name:var(--font-bricolage)] text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.02] tracking-tight text-fg">
          Alt for en enklere verkstedhverdag
        </h1>

        <p className="animate-fade-up delay-3 mt-6 text-[17px] leading-[1.65] text-sub">
          I Verkstedpakken får du:{" "}
          <span className="font-semibold text-primary">{displayText}</span>
          <span className="animate-cursor text-primary">|</span>
        </p>

        <div className="animate-fade-up delay-4 mt-10 flex items-center gap-4">
          <a
            href="#interesse"
            className="rounded-full bg-primary px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:brightness-125"
          >
            Meld interesse
          </a>
          <a
            href="#funksjoner"
            className="rounded-full border border-line px-8 py-3.5 text-[15px] font-medium text-fg transition-all duration-200 hover:border-sub hover:bg-bg"
          >
            Se funksjoner
          </a>
        </div>
      </div>
    </section>
  );
}
