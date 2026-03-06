"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const team = [
  { name: "Oscar André Naas", role: "Daglig leder", desc: "6 års erfaring fra verkstedgulvet. Mannen bak produktkravene og den som vet hvordan hverdagen faktisk ser ut.", initials: "ON", color: "bg-primary", image: "/team/oscar.jpg" },
  { name: "Fredrik Øien", role: "Utvikler", desc: "Teknisk spesialist som bygger kjernen i systemet sammen med teamet.", initials: "FØ", color: "bg-amber-500" },
  { name: "Henrik Hayes", role: "Utvikler", desc: "Teknisk spesialist som sørger for at alt fungerer sømløst under panseret.", initials: "HH", color: "bg-violet-500", image: "/team/henrik.jpg" },
];

export default function AboutUs() {
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
    <div ref={ref}>
      {/* Hero */}
      <section className="bg-bg-alt px-8 pt-40 pb-28 lg:px-12 lg:pt-48 lg:pb-36">
        <div className="mx-auto max-w-[1200px]">
          <p className="reveal inline-block rounded-full border border-line bg-bg px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">
            Om oss
          </p>
          <h1
            className="reveal mt-6 max-w-2xl font-[family-name:var(--font-bricolage)] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-tight text-fg"
            style={{ transitionDelay: "80ms" }}
          >
            Startet med en kaffe og en frustrasjon
          </h1>
          <p
            className="reveal mt-6 max-w-xl text-[16px] leading-[1.7] text-sub"
            style={{ transitionDelay: "160ms" }}
          >
            Verkstedpakken AS ble etablert 5. januar 2026 av fire gründere som
            var lei av systemer som ikke fungerte. Vi bygger løsningen vi selv
            savnet — med fokus på mer skruing og mindre tull.
          </p>
        </div>
      </section>

      {/* Historien */}
      <section className="px-8 py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[720px]">
          <p className="reveal text-[13px] font-semibold uppercase tracking-[0.2em] text-primary">
            Historien
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
            className="reveal mt-4 rounded-lg border-l-4 border-primary bg-bg-alt p-6"
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
      </section>

      {/* Team */}
      <section className="bg-bg-alt px-8 py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-xl">
            <p className="reveal text-[13px] font-semibold uppercase tracking-[0.2em] text-primary">
              Teamet
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="reveal overflow-hidden rounded-2xl border border-line bg-bg transition-all duration-300 hover:border-primary/15 hover:shadow-md hover:shadow-primary/5"
                style={{ transitionDelay: `${200 + i * 80}ms` }}
              >
                {member.image ? (
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[3/4] items-center justify-center bg-bg-alt">
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-full ${member.color} text-[22px] font-bold text-white`}
                    >
                      {member.initials}
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-[15px] font-semibold text-fg">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium text-primary">{member.role}</p>
                  <p className="mt-2 text-[14px] leading-[1.65] text-sub">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
