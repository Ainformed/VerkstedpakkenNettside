"use client";

import { useState } from "react";

import type { IntegrasjonerDict } from "@/i18n/dictionaries/nb";

type CatKey = keyof IntegrasjonerDict["categories"];
type IntegId = keyof IntegrasjonerDict["integrations"];

type Integration = {
  id: IntegId;
  name: string;
  cat: Exclude<CatKey, "alle">;
  logo?: { src: string; alt: string; className?: string };
  logoText?: string;
  logoColor?: string;
};

const CATEGORIES: CatKey[] = ["alle", "regnskap", "betaling", "deler", "kjoretoy", "ki"];

const INTEGRATIONS: Integration[] = [
  {
    id: "fiken",
    name: "Fiken",
    cat: "regnskap",
    logo: { src: "/design/logos/fiken.svg", alt: "Fiken" },
  },
  {
    id: "poweroffice",
    name: "PowerOffice GO",
    cat: "regnskap",
    logo: { src: "/design/logos/poweroffice.png", alt: "PowerOffice GO", className: "logo-wide" },
  },
  {
    id: "tripletex",
    name: "Tripletex",
    cat: "regnskap",
    logo: { src: "/design/logos/tripletex.png", alt: "Tripletex" },
  },
  {
    id: "visma",
    name: "Visma eAccounting",
    cat: "regnskap",
    logo: { src: "/design/logos/visma-eaccounting.png", alt: "Visma eAccounting" },
  },
  {
    id: "24sevenoffice",
    name: "24SevenOffice",
    cat: "regnskap",
    logo: { src: "/design/logos/finago.png", alt: "24SevenOffice (Finago)" },
  },
  {
    id: "systima",
    name: "Systima",
    cat: "regnskap",
    logo: { src: "/design/logos/systima.png", alt: "Systima" },
  },
  {
    id: "conta",
    name: "Conta",
    cat: "regnskap",
    logo: { src: "/design/logos/conta.svg", alt: "Conta" },
  },
  {
    id: "vipps",
    name: "Vipps",
    cat: "betaling",
    logo: { src: "/design/logos/vipps.png", alt: "Vipps", className: "logo-wide" },
  },
  {
    id: "stripe",
    name: "Stripe",
    cat: "betaling",
    logo: { src: "/design/logos/stripe.png", alt: "Stripe" },
  },
  {
    id: "bilxtra",
    name: "BilXtra",
    cat: "deler",
    logo: { src: "/design/logos/bilxtra.svg", alt: "BilXtra", className: "logo-wide" },
  },
  {
    id: "meca",
    name: "MECA",
    cat: "deler",
    logo: { src: "/design/logos/meca.png", alt: "MECA" },
  },
  {
    id: "meko",
    name: "MEKO",
    cat: "deler",
    logo: { src: "/design/logos/meko.png", alt: "MEKO", className: "logo-wide" },
  },
  {
    id: "flak",
    name: "Flak",
    cat: "deler",
    logo: { src: "/design/logos/flak.png", alt: "Flak", className: "logo-compact" },
  },
  {
    id: "romnes",
    name: "Romnes",
    cat: "deler",
    logo: { src: "/design/logos/romnes.png", alt: "Romnes", className: "logo-wide" },
  },
  {
    id: "tpro",
    name: "T-PRO",
    cat: "deler",
    logo: { src: "/design/logos/t-pro.png", alt: "T-PRO" },
  },
  {
    id: "vegvesen",
    name: "Statens vegvesen",
    cat: "kjoretoy",
    logo: { src: "/design/logos/statens-vegvesen.png", alt: "Statens vegvesen", className: "logo-tall" },
  },
  {
    id: "haynespro",
    name: "HaynesPro",
    cat: "kjoretoy",
    logo: { src: "/design/logos/haynespro.png", alt: "HaynesPro", className: "logo-compact" },
  },
  {
    id: "autofrontal",
    name: "AutoFrontal",
    cat: "kjoretoy",
    logo: { src: "/design/logos/autofrontal.png", alt: "AutoFrontal", className: "logo-compact" },
  },
  {
    id: "bus",
    name: "BUS",
    cat: "kjoretoy",
    logo: { src: "/design/logos/bus.png", alt: "B.U.S." },
  },
  {
    id: "pkkhuset",
    name: "PKK Huset",
    cat: "kjoretoy",
    logo: { src: "/design/logos/pkkhuset.png", alt: "PKK Huset" },
  },
  {
    id: "claude",
    name: "Claude",
    cat: "ki",
    logo: { src: "/design/logos/claude.svg", alt: "Claude" },
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    cat: "ki",
    logo: { src: "/design/logos/chatgpt.png", alt: "ChatGPT" },
  },
  {
    id: "gemini",
    name: "Gemini",
    cat: "ki",
    logo: { src: "/design/logos/gemini.png", alt: "Gemini" },
  },
];

export default function IntegrationCatalog({ t }: { t: IntegrasjonerDict }) {
  const [active, setActive] = useState<CatKey>("alle");

  const visible = INTEGRATIONS.filter(
    (i) => active === "alle" || i.cat === active,
  );

  return (
    <section className="page-sec" style={{ paddingTop: "30px" }}>
      <div className="page-wrap">
        <div className="cat-chips" id="catChips">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className="cat-chip"
              aria-pressed={active === c}
              onClick={() => setActive(c)}
            >
              {t.categories[c]}
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
              <span className="ic-cat">{t.categories[card.cat]}</span>
              <h3>{card.name}</h3>
              <p>{t.integrations[card.id]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
