"use client";

import { useState } from "react";

type Integration = {
  name: string;
  cat: string;
  catLabel: string;
  desc: string;
  logo?: { src: string; alt: string; className?: string };
  logoText?: string;
};

const CATEGORIES = [
  { key: "alle", label: "Alle" },
  { key: "regnskap", label: "Regnskap" },
  { key: "betaling", label: "Betaling" },
  { key: "deler", label: "Deler" },
  { key: "kjoretoy", label: "Kjøretøydata" },
] as const;

const INTEGRATIONS: Integration[] = [
  {
    name: "Fiken",
    cat: "regnskap",
    catLabel: "Regnskap",
    logo: { src: "/design/logos/fiken.png", alt: "Fiken" },
    desc: "Fakturaer og betalinger går rett inn i regnskapet. Perfekt for verksteder som fører regnskapet selv.",
  },
  {
    name: "PowerOffice GO",
    cat: "regnskap",
    catLabel: "Regnskap",
    logo: { src: "/design/logos/poweroffice.png", alt: "PowerOffice GO" },
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
    name: "Vipps",
    cat: "betaling",
    catLabel: "Betaling",
    logoText: "vipps",
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
    logo: { src: "/design/logos/bilxtra.svg", alt: "BilXtra" },
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
    logo: { src: "/design/logos/meko.png", alt: "MEKO" },
    desc: "Bestill fra MEKO-nettverket med leveringstid synlig i ordrebildet.",
  },
  {
    name: "Statens vegvesen",
    cat: "kjoretoy",
    catLabel: "Kjøretøydata",
    logo: { src: "/design/logos/statens-vegvesen.png", alt: "Statens vegvesen", className: "logo-tall" },
    desc: "Skiltoppslag henter merke, modell og EU-frist automatisk.",
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
                      color: "#FF5B24",
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
