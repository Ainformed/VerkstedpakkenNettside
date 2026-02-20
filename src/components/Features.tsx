"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    title: "Kjøretøy og jobber",
    text: "Full oversikt over pågående og tidligere arbeid.",
  },
  {
    title: "Kunder",
    text: "Kundekort, historikk og automatiske påminnelser.",
  },
  {
    title: "Faktura",
    text: "Fra arbeidsordre til faktura på sekunder.",
  },
  {
    title: "Deler og lager",
    text: "Lagerstatus, bestilling og kobling til jobber.",
  },
  {
    title: "Delebestilling",
    text: "Bestill deler direkte fra systemet.",
  },
  {
    title: "Dekkhotell",
    text: "Lagring, sporing og sesongbytte for dekk.",
  },
  {
    title: "Leiebil",
    text: "Administrer leiebiler og utlån til kunder.",
  },
  {
    title: "Rapporter",
    text: "Innsikt i omsetning, timer og produktivitet.",
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="funksjoner" className="px-8 py-28 lg:px-12 lg:py-36" ref={ref}>
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-xl">
          <p className="reveal text-[13px] font-semibold uppercase tracking-[0.2em] text-primary">
            Funksjoner
          </p>
          <h2 className="reveal mt-3 font-[family-name:var(--font-bricolage)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-fg" style={{ transitionDelay: "80ms" }}>
            Alt et verksted trenger
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal bg-bg p-8 transition-colors duration-300 hover:bg-bg-alt"
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <h3 className="text-[15px] font-semibold text-fg">{f.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-sub">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
