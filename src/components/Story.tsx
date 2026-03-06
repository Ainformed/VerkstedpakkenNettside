"use client";

import { useEffect, useRef } from "react";

const team = [
  {
    name: "Oscar André Naas",
    role: "Daglig leder",
    desc: "6 års erfaring fra verkstedgulvet. Mannen bak produktkravene og den som vet hvordan hverdagen faktisk ser ut.",
  },
  {
    name: "Fredrik Øien",
    role: "Utvikler",
    desc: "Teknisk spesialist som bygger kjernen i systemet sammen med teamet.",
  },
  {
    name: "Henrik Hayes",
    role: "Utvikler",
    desc: "Teknisk spesialist som sørger for at alt fungerer sømløst under panseret.",
  },
];

export default function Story() {
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
    <section id="om-oss" className="bg-bg-alt px-8 py-28 lg:px-12 lg:py-36" ref={ref}>
      <div className="mx-auto max-w-[720px]">
        <p className="reveal text-[13px] font-semibold uppercase tracking-[0.2em] text-primary">
          Historien vår
        </p>

        <h2
          className="reveal mt-3 font-[family-name:var(--font-bricolage)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-fg"
          style={{ transitionDelay: "80ms" }}
        >
          Fra en kaffeprat til bransjeløsning
        </h2>

        <p
          className="reveal mt-6 text-[16px] leading-[1.75] text-sub"
          style={{ transitionDelay: "160ms" }}
        >
          Sommeren 2025 delte Oscar sin frustrasjon etter seks år på verkstedgulvet: Utdaterte systemer, manglende oversikt og ineffektive rutiner kostet rett og slett bedrifter penger.
        </p>

        <p
          className="reveal mt-4 text-[16px] leading-[1.75] text-sub"
          style={{ transitionDelay: "240ms" }}
        >
          Sammen med resten av gründerteamet og deres tekniske ekspertise, startet arbeidet med å bygge systemet bransjen faktisk trenger. Et system som fungerer.
        </p>

        {/* Bolli Motor */}
        <h3
          className="reveal mt-10 font-[family-name:var(--font-bricolage)] text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.2] tracking-tight text-fg"
          style={{ transitionDelay: "380ms" }}
        >
          Kundecaset som beviste behovet
        </h3>

        <p
          className="reveal mt-4 text-[16px] leading-[1.75] text-sub"
          style={{ transitionDelay: "400ms" }}
        >
          Et viktig vendepunkt kom i møte med Bolli Motor. Verkstedet hadde tidligere opplevd de alvorlige konsekvensene av å ikke ha et system som ga full oversikt over driften. Da de skulle starte opp på nytt, var de tydelige: Det finnes ingen eksisterende systemer med det fokuset vi trenger. Tradisjonell programvare er ofte for rigid og utelukkende tilpasset personbil.
        </p>

        <div
          className="reveal mt-4 rounded-lg border-l-4 border-primary bg-bg p-6"
          style={{ transitionDelay: "440ms" }}
        >
          <p className="text-[15px] leading-[1.75] text-fg">
            For et verksted som Bolli Motor, som skrur på alt fra personbiler og lastebiler til traktorer, var Verkstedpakken midt i blinken. Gjennom plattformen vår får de integrert nettside, bookingportal, mekanikerportal – og ikke minst total kontroll på kjøretøy, ordrer og fakturering. Med dette på plass, vil historien aldri gjenta seg for dem.
          </p>
        </div>

        <h3
          className="reveal mt-10 font-[family-name:var(--font-bricolage)] text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.2] tracking-tight text-fg"
          style={{ transitionDelay: "480ms" }}
        >
          Veien videre
        </h3>

        <p
          className="reveal mt-4 text-[16px] leading-[1.75] text-sub"
          style={{ transitionDelay: "500ms" }}
        >
          I dag jobber vi tett med Bolli Motor, som kjører en pilotversjon av systemet vårt. Deres erfaringer hjelper oss med å luke ut feil og finpusse detaljene som forenkler verkstedhverdagen ytterligere.
        </p>

        <p
          className="reveal mt-4 text-[16px] leading-[1.75] text-sub"
          style={{ transitionDelay: "540ms" }}
        >
          Vi lanserer ikke Verkstedpakken for fullt før vi er 100 % sikre på at produktet leverer på alle fronter. Meld din interesse allerede nå, så tar vi kontakt når systemet er lanseringsklart.
        </p>

        <p
          className="reveal mt-4 text-[16px] font-medium leading-[1.75] text-fg"
          style={{ transitionDelay: "580ms" }}
        >
          Vårt fokus er og forblir enkelt: Mer skruing, mindre tull.
        </p>
      </div>

      {/* Team */}
      <div className="mx-auto mt-24 max-w-[960px]">
        <p className="reveal text-[13px] font-semibold uppercase tracking-[0.2em] text-primary">
          Teamet
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t, i) => (
            <div
              key={t.name}
              className="reveal rounded-2xl border border-line bg-bg p-6"
              style={{ transitionDelay: `${160 + i * 80}ms` }}
            >
              <p className="text-[15px] font-semibold text-fg">{t.name}</p>
              <p className="mt-1 text-[13px] font-medium text-primary">{t.role}</p>
              <p className="mt-3 text-[14px] leading-[1.65] text-sub">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
