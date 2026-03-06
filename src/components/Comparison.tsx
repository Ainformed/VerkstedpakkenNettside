"use client";

import { useEffect, useRef } from "react";

const rows = [
  {
    without: "Feil som koster timer å rette opp",
    with: "Sporbar kommunikasjon — færre feil, raskere jobber",
  },
  {
    without: "Inntekt som forsvinner i sprekkene",
    with: "Alt faktureres — deler og timer rett fra arbeidsordren",
  },
  {
    without: "Mottaket bundet opp i telefonen",
    with: "Kunder hjelper seg selv — mottaket fokuserer på inntekt",
  },
  {
    without: "Beslutninger basert på magefølelse",
    with: "Kapasitetsstyring i sanntid — fullt utnyttet verksted",
  },
  {
    without: "Luker som forblir tomme",
    with: "Automatiske påminnelser fyller opp kalenderen",
  },
  {
    without: "Systemkaos som bremser alle",
    with: "Én plattform — raskere opplæring, mindre friksjon",
  },
];

export default function Comparison() {
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
      { threshold: 0.15 },
    );

    el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sammenligning" className="px-8 py-28 lg:px-12 lg:py-36" ref={ref}>
      <div className="mx-auto max-w-[960px]">
        <p className="reveal text-[13px] font-semibold uppercase tracking-[0.2em] text-primary">
          Forskjellen
        </p>
        <h2
          className="reveal mt-3 font-[family-name:var(--font-bricolage)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-fg"
          style={{ transitionDelay: "80ms" }}
        >
          Før og etter Verkstedpakken
        </h2>

        {/* Column headers — hidden on mobile */}
        <div
          className="reveal mt-14 hidden grid-cols-2 gap-8 border-b border-line pb-4 md:grid"
          style={{ transitionDelay: "160ms" }}
        >
          <p className="text-[14px] font-semibold text-sub">Uten Verkstedpakken</p>
          <p className="text-[14px] font-semibold text-primary">Med Verkstedpakken</p>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className="reveal grid grid-cols-1 gap-3 border-b border-line py-6 transition-colors duration-200 hover:bg-bg-alt/50 md:grid-cols-2 md:gap-8"
            style={{ transitionDelay: `${200 + i * 80}ms` }}
          >
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              <span className="text-[14px] leading-[1.65] text-sub">{row.without}</span>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <span className="text-[14px] font-medium leading-[1.65] text-fg">{row.with}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
