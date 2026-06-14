import Image from "next/image";

export default function Product() {
  return (
    <section className="product section" id="produkt">
      <div className="wrap">
        <span className="eyebrow">For verksteder som vil vokse</span>
        <h2 className="product-h">Hele driften på ett brett.</h2>
        <p className="product-sub">
          Verkstedoversikten — hjertet i systemet. Nye bookinger, utsendte
          prisforslag, påbegynte og ferdige jobber. Alt i sanntid, alt på ett
          sted.
        </p>

        <div className="product-shot">
          <Image
            src="/product-split-clean.png"
            alt="Verkstedoversikten i Verkstedpakken – Kanban- og listevisning"
            fill
            sizes="(max-width: 960px) 100vw, 1100px"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="feats">
          <Feature
            eyebrow="Kundechat"
            title="Chat og prisforslag i samme tråd"
            desc="Skriftlig og sporbart, koblet rett til ordren. Send et prisforslag kunden kan godta direkte — ingen tapte beskjeder, ingen glemt tilleggssalg."
            visual={<QuoteVisual />}
          />
          <Feature
            reverse
            eyebrow="Kundeportal"
            title="Kunden følger bilen live"
            desc="Fra bestilling til henteklar ser kunden status selv. Ingen telefoner, ingen «er den ferdig?»."
            visual={<StatusVisual />}
          />
          <Feature
            eyebrow="Kampanje & belegg"
            title="Fyll de stille periodene"
            desc="Se de ledige dagene i kalenderen — og send en sesongkampanje med ett klikk. Dekkhotell-påminnelser og tilbud som fyller de rolige periodene automatisk."
            visual={<CalendarVisual />}
          />
        </div>
      </div>
    </section>
  );
}

function Feature({
  eyebrow,
  title,
  desc,
  visual,
  reverse,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className={`feat${reverse ? " reverse" : ""}`}>
      <div className="feat-text">
        <span className="feat-eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className="feat-visual">{visual}</div>
    </div>
  );
}

function QuoteVisual() {
  return (
    <div className="qv">
      <div className="qv-head">
        <b>Prisforslag · #2047</b>
        <span>Gyldig 7 dager</span>
      </div>
      <div className="qv-row">
        <span>Bremseklosser foran</span>
        <b>1 890</b>
      </div>
      <div className="qv-row">
        <span>Arbeid (1,5 t)</span>
        <b>1 350</b>
      </div>
      <div className="qv-total">
        <span>Total inkl. mva</span>
        <b>4 440 kr</b>
      </div>
      <div className="qv-actions">
        <span className="qv-btn ghost">Avslå</span>
        <span className="qv-btn ok">Godta</span>
      </div>
    </div>
  );
}

function StatusVisual() {
  const steps = [
    { label: "Bekreftet", state: "done" },
    { label: "Mottatt", state: "done" },
    { label: "Pågår", state: "active" },
    { label: "Klar", state: "todo" },
  ];
  return (
    <div className="sv">
      <div className="sv-veh">
        <b>Volkswagen Caddy</b>
        <span>UX 58585</span>
      </div>
      <div className="sv-track">
        {steps.map((s, i) => (
          <div key={s.label} className={`sv-step ${s.state}`}>
            <span className="sv-dot" />
            <span className="sv-label">{s.label}</span>
            {i < steps.length - 1 ? <span className="sv-line" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarVisual() {
  const days = [
    "free", "busy", "busy", "half", "free", "free", "free",
    "busy", "busy", "busy", "busy", "half", "free", "free",
    "busy", "busy", "today", "busy", "busy", "free", "free",
    "half", "busy", "busy", "busy", "busy", "free", "free",
  ];
  return (
    <div className="cv">
      <div className="cv-camp">
        <span className="cv-camp-ic">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M3 11l16-7-3 16-5-5-3 4v-5l-5-3z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="cv-camp-txt">
          <b>Sesongkampanje · Dekkskift</b>
          <span>Sendt til 320 kunder → 41 nye bookinger</span>
        </div>
      </div>
      <div className="cv-head">
        <b>Mai 2026</b>
        <span>62 % booket</span>
      </div>
      <div className="cv-grid">
        {days.map((c, i) => (
          <span key={i} className={`cv-day ${c}`} />
        ))}
      </div>
      <div className="cv-legend">
        <span><i className="lg-busy" />Fullt</span>
        <span><i className="lg-half" />Delvis</span>
        <span><i className="lg-free" />Ledig</span>
      </div>
    </div>
  );
}
