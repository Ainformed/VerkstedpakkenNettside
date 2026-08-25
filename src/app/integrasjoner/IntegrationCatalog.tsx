"use client";

import { useState } from "react";

type Integration = {
  name: string;
  cat: string;
  catLabel: string;
  desc: string;
  logo?: { src: string; alt: string; className?: string };
  logoText?: string;
  logoColor?: string;
};

const CATEGORIES = [
  { key: "alle", label: "Alle" },
  { key: "regnskap", label: "Regnskap" },
  { key: "betaling", label: "Betaling" },
  { key: "deler", label: "Deler" },
  { key: "kjoretoy", label: "Kjøretøydata" },
  { key: "ki", label: "AI" },
] as const;

const INTEGRATIONS: Integration[] = [
  {
    name: "Fiken",
    cat: "regnskap",
    catLabel: "Regnskap",
    logo: { src: "/design/logos/fiken.svg", alt: "Fiken" },
    desc: "Fakturaer og betalinger går rett inn i regnskapet. Perfekt for verksteder som fører regnskapet selv.",
  },
  {
    name: "PowerOffice GO",
    cat: "regnskap",
    catLabel: "Regnskap",
    logo: { src: "/design/logos/poweroffice.png", alt: "PowerOffice GO", className: "logo-wide" },
    desc: "Automatisk overføring av fakturagrunnlag og betalingsstatus til regnskapsføreren deres.",
  },
  {
    name: "Tripletex",
    cat: "regnskap",
    catLabel: "Regnskap",
    logo: { src: "/design/logos/tripletex.png", alt: "Tripletex" },
    desc: "Fakturaer, kunder og betalinger holdes synkronisert — uten manuell punching.",
  },
  {
    name: "Visma eAccounting",
    cat: "regnskap",
    catLabel: "Regnskap",
    logo: { src: "/design/logos/visma-eaccounting.png", alt: "Visma eAccounting" },
    desc: "Send fakturaer og bilag rett til Visma, klare til bokføring.",
  },
  {
    name: "24SevenOffice",
    cat: "regnskap",
    catLabel: "Regnskap",
    logo: { src: "/design/logos/finago.png", alt: "24SevenOffice (Finago)" },
    desc: "Overfør salg og betalinger automatisk til regnskapet.",
  },
  {
    name: "Systima",
    cat: "regnskap",
    catLabel: "Regnskap",
    logo: { src: "/design/logos/systima.png", alt: "Systima" },
    desc: "Fakturagrunnlag og betalinger går automatisk til bokføring i Systima.",
  },
  {
    name: "Conta",
    cat: "regnskap",
    catLabel: "Regnskap",
    logo: { src: "/design/logos/conta.svg", alt: "Conta" },
    desc: "Koble til på minuttet med API-nøkkel — salg og betalingsstatus havner rett i Conta.",
  },
  {
    name: "Vipps",
    cat: "betaling",
    catLabel: "Betaling",
    logo: { src: "/design/logos/vipps.png", alt: "Vipps", className: "logo-wide" },
    desc: "Kunden betaler med Vipps når bilen hentes.",
  },
  {
    name: "Stripe",
    cat: "betaling",
    catLabel: "Betaling",
    logo: { src: "/design/logos/stripe.png", alt: "Stripe" },
    desc: "Kortbetaling på nett — kunden betaler med kort direkte fra fakturaen eller bookingen.",
  },
  {
    name: "BilXtra",
    cat: "deler",
    catLabel: "Deler",
    logo: { src: "/design/logos/bilxtra.svg", alt: "BilXtra", className: "logo-wide" },
    desc: "Søk på skiltnummer, se pris og lagerstatus, og bestill deler rett fra ordren.",
  },
  {
    name: "MECA",
    cat: "deler",
    catLabel: "Deler",
    logo: { src: "/design/logos/meca.png", alt: "MECA" },
    desc: "Delekatalog og bestilling koblet til jobben delen skal brukes på.",
  },
  {
    name: "MEKO",
    cat: "deler",
    catLabel: "Deler",
    logo: { src: "/design/logos/meko.png", alt: "MEKO", className: "logo-wide" },
    desc: "Bestill fra MEKO-nettverket med leveringstid synlig i ordrebildet.",
  },
  {
    name: "Flak",
    cat: "deler",
    catLabel: "Deler",
    logo: { src: "/design/logos/flak.png", alt: "Flak", className: "logo-compact" },
    desc: "Verkstedutstyr og rekvisita fra Flak — bestill med jobben som referanse.",
  },
  {
    name: "Romnes",
    cat: "deler",
    catLabel: "Deler",
    logo: { src: "/design/logos/romnes.png", alt: "Romnes", className: "logo-wide" },
    desc: "Deler og rekvisita fra Romnes, med pris og tilgjengelighet i ordrebildet.",
  },
  {
    name: "Statens vegvesen",
    cat: "kjoretoy",
    catLabel: "Kjøretøydata",
    logo: { src: "/design/logos/statens-vegvesen.png", alt: "Statens vegvesen", className: "logo-tall" },
    desc: "Skiltoppslag henter merke, modell og EU-frist automatisk.",
  },
  {
    name: "HaynesPro",
    cat: "kjoretoy",
    catLabel: "Kjøretøydata",
    logo: { src: "/design/logos/haynespro.png", alt: "HaynesPro", className: "logo-compact" },
    desc: "Tekniske data, reparasjonstider og servicedata for jobben på løfteren.",
  },
  {
    name: "AutoFrontal",
    cat: "kjoretoy",
    catLabel: "Kjøretøydata",
    logo: { src: "/design/logos/autofrontal.png", alt: "AutoFrontal", className: "logo-compact" },
    desc: "Reparasjonsbulletiner og feilkoder med løsninger på kjente feil, samlet fra tusenvis av verksteder.",
  },
  {
    name: "BUS",
    cat: "kjoretoy",
    catLabel: "Kjøretøydata",
    logo: { src: "/design/logos/bus.png", alt: "B.U.S." },
    desc: "EU-kontroll: hent kjøretøydata og send kontrollresultatet rett fra ordren.",
  },
  {
    name: "Claude",
    cat: "ki",
    catLabel: "AI",
    logo: { src: "/design/logos/claude.svg", alt: "Claude" },
    desc: "Anthropics språkmodell — en av modellene bak Muttern, brukt til tekst, oppsummeringer og svar.",
  },
  {
    name: "ChatGPT",
    cat: "ki",
    catLabel: "AI",
    logo: { src: "/design/logos/chatgpt.png", alt: "ChatGPT" },
    desc: "OpenAIs språkmodell — driver deler av Muttern, som utkast til meldinger og svar på spørsmål.",
  },
  {
    name: "Gemini",
    cat: "ki",
    catLabel: "AI",
    logo: { src: "/design/logos/gemini.png", alt: "Gemini" },
    desc: "Googles språkmodell — Muttern velger den når den løser oppgaven best.",
  },
];

export default function IntegrationCatalog() {
  const [active, setActive] = useState<string>("alle");

  const visible = INTEGRATIONS.filter(
    (i) => active === "alle" || i.cat === active,
  );

  return (
    <section className="page-sec" style={{ paddingTop: "30px" }}>
      <div className="page-wrap">
        <div className="cat-chips" id="catChips">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className="cat-chip"
              aria-pressed={active === c.key}
              onClick={() => setActive(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="integ-cards" id="integCards">
          {visible.map((card) => (
            <div className="integ-card" key={card.name} data-cat={card.cat}>
              <div className="ic-logo">
                {card.logo ? (
                  <img
                    src={card.logo.src}
                    alt={card.logo.alt}
                    className={card.logo.className}
                  />
                ) : (
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "24px",
                      letterSpacing: "-0.5px",
                      color: card.logoColor ?? "var(--ink)",
                    }}
                  >
                    {card.logoText}
                  </span>
                )}
              </div>
              <span className="ic-cat">{card.catLabel}</span>
              <h3>{card.name}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
