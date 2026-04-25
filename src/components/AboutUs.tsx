"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const team = [
  { name: "Oscar André Naas", role: "Daglig leder", desc: "6 års erfaring fra verkstedgulvet. Mannen bak produktkravene og den som vet hvordan hverdagen faktisk ser ut.", initials: "ON", color: "bg-primary", image: "/team/oscar.jpg" },
  { name: "Fredrik Øien", role: "Utvikler", desc: "Teknisk spesialist som bygger kjernen i systemet sammen med teamet.", initials: "FØ", color: "bg-amber-500", image: "/team/fredrik.jpg" },
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
      {/* Om oss + Historien */}
      <section className="px-8 pt-16 pb-24 lg:px-12 lg:pt-24 lg:pb-32">
        <div className="mx-auto max-w-[720px]">
          <p className="reveal inline-block rounded-full border border-line bg-bg px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">
            Om oss
          </p>
          <h1
            className="reveal mt-6 font-[family-name:var(--font-bricolage)] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-tight text-fg"
            style={{ transitionDelay: "80ms" }}
          >
            Fra en kaffeprat til bransjeløsning
          </h1>
          <p
            className="reveal mt-6 text-[16px] leading-[1.75] text-sub"
            style={{ transitionDelay: "160ms" }}
          >
            Verkstedpakken AS ble etablert 5. januar 2026 av fire gründere som
            var lei av systemer som ikke fungerte. Vi bygger løsningen vi selv
            savnet — med fokus på mer skruing og mindre tull.
          </p>

          <p
            className="reveal mt-4 text-[16px] leading-[1.75] text-sub"
            style={{ transitionDelay: "240ms" }}
          >
            Sommeren 2025 delte Oscar sin frustrasjon etter seks år på verkstedgulvet: Utdaterte systemer, manglende oversikt og ineffektive rutiner kostet rett og slett bedrifter penger.
          </p>

          <p
            className="reveal mt-4 text-[16px] leading-[1.75] text-sub"
            style={{ transitionDelay: "320ms" }}
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

          <figure
            className="reveal about-pullquote"
            style={{ transitionDelay: "440ms" }}
          >
            <blockquote>
              For et verksted som Bolli Motor, som skrur på alt fra personbiler
              og lastebiler til traktorer, var Verkstedpakken midt i blinken.
              Gjennom plattformen vår får de integrert nettside, bookingportal,
              mekanikerportal — og ikke minst total kontroll på kjøretøy,
              ordrer og fakturering. Med dette på plass, vil historien aldri
              gjenta seg for dem.
            </blockquote>
          </figure>

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
            I dag jobber vi tett med Bolli Motor, som kjører en pilotversjon av systemet vårt. Deres erfaringer hjelper oss med å luke ut feil og finpusse detaljene som forenkler verkstedhverdagen ytterligere. Vi har også bygget nettsiden til{" "}
            <a
              href="https://rglautomotive.no"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-fg underline-offset-2 hover:underline"
            >
              RGL Automotive
            </a>
            , som blir koblet på systemet når booking-modulen er klar.
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

      {/* Team — dark, matches finale/footer */}
      <section className="team-dark">
        <div className="wrap">
          <div className="team-dark-head">
            <span className="eyebrow">Teamet</span>
            <h2 className="team-dark-h">Folkene bak Verkstedpakken.</h2>
          </div>

          <div className="team-dark-grid">
            {team.map((member) => (
              <div key={member.name} className="team-dark-card">
                <div className="team-dark-photo">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="team-dark-initials">{member.initials}</div>
                  )}
                </div>
                <div className="team-dark-body">
                  <h3>{member.name}</h3>
                  <p className="team-dark-role">{member.role}</p>
                  <p>{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
