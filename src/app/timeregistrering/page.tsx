import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import ZenMascot from "@/components/vp/ZenMascot";
import { SIGNUP_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Timeregistrering for verksted og små bedrifter",
  description:
    "Elektronisk timeregistrering uten dobbeltarbeid. Mekanikeren stempler inn på mobil eller kiosk, timene havner rett på ordren, og lønnsgrunnlaget lager seg selv. Prøv gratis i 14 dager.",
  alternates: { canonical: "/timeregistrering" },
};

const SITE = "https://verkstedpakken.no";

type Faq = { q: string; a: string };

/* Én kilde for både synlig FAQ og FAQPage-schema. */
const FAQS: Faq[] = [
  {
    q: "Er timeregistrering lovpålagt?",
    a: "Ja. Arbeidsmiljøloven § 10-7 krever at arbeidsgiver har en oversikt som viser hvor mye den enkelte ansatte har arbeidet. Oversikten skal kunne vises til Arbeidstilsynet og de tillitsvalgte.",
  },
  {
    q: "Hva er kravene til timeregistrering for verksteder?",
    a: "To regelverk gjelder. Arbeidsmiljøloven krever oversikt over arbeidstiden til hver ansatt. I tillegg krever bokføringsforskriften § 5-14 at bedrifter som fakturerer etter tidsforbruk, dokumenterer utførte timer per dag, fordelt på de enkelte kundene og oppdragene. Det treffer de fleste verksteder.",
  },
  {
    q: "Hva bør en timeliste inneholde?",
    a: "Hvem som har jobbet, dato, når arbeidet startet og sluttet, pauser og eventuell overtid. Fakturerer du etter tid, bør timene også være knyttet til riktig kunde og oppdrag. I Verkstedpakken skjer det automatisk når mekanikeren stempler inn på ordren.",
  },
  {
    q: "Hva er elektronisk timeregistrering?",
    a: "At timene føres digitalt i stedet for på papir eller i regneark. De ansatte stempler inn og ut selv, og programmet regner sammen timer, overtid og lønnsgrunnlag. Du slipper å tyde håndskrevne lapper og taste alt inn på nytt.",
  },
  {
    q: "Finnes det en app for timeregistrering?",
    a: "Ja. I Verkstedpakken bruker mekanikerne mekanikerportalen på mobilen. Der stempler de inn og ut, ser dagens jobber og fører timene rett på ordren. Verkstedet kan også ha en felles kiosk-skjerm for innstempling.",
  },
  {
    q: "Hva koster timeregistrering?",
    a: "Timeregistrering er inkludert i Verkstedpakken, som koster 1 295 kroner per bruker per måned, eks. mva. Du kan prøve alt gratis i 14 dager, uten bindingstid.",
  },
  {
    q: "Passer det for små bedrifter?",
    a: "Ja. Du betaler per bruker, så et lite verksted betaler bare for de som faktisk jobber der. Oppsett og opplæring er inkludert, og det er ingen etableringskostnad eller bindingstid.",
  },
];

function JsonLd() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Verkstedpakken", item: SITE },
        {
          "@type": "ListItem",
          position: 2,
          name: "Timeregistrering",
          item: `${SITE}/timeregistrering`,
        },
      ],
    },
  ];
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default function Timeregistrering() {
  return (
    <>
      <Header />
      <main className="page-timeregistrering">
        <JsonLd />
        <section className="hero feat-hero">
          <div className="wrap">
            <h1>Timeregistrering uten ekstra arbeid</h1>
            <p className="lead">
              Mekanikeren stempler inn på mobilen eller kiosken. Timene havner
              rett på ordren, og lønnsgrunnlaget lager seg selv. Ingen lapper,
              ingen regneark, ingenting som føres to ganger.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href={SIGNUP_URL}>
                Prøv gratis i 14 dager
              </a>
            </div>
          </div>
        </section>

        {/* ── Slik fungerer det ── */}
        <section className="split-sec">
          <div className="split-row reverse">
            <div className="split-text">
              <h2>Stemple inn der jobben er</h2>
              <p>
                Elektronisk timeregistrering betyr at ingen fører timer i
                etterkant. Mekanikeren stempler inn og ut på mobilen, eller på
                en felles kiosk-skjerm i verkstedet.
              </p>
              <p>
                Tiden registreres der og da, mens jobben gjøres. Ikke på slutten
                av uka, etter hukommelsen.
              </p>
            </div>
            <div className="split-art">
              <img
                loading="lazy"
                className="mock-photo"
                src="/design/mekaniker-med-telefon.png"
                alt="Mekaniker stempler inn timer på mobilen ved motorrommet"
                style={{ objectFit: "cover", objectPosition: "50% 18%" }}
              />
            </div>
          </div>

          <div className="split-row">
            <div className="split-text">
              <h2>Timene havner rett på ordren</h2>
              <p>
                Hver time knyttes til jobben den gjelder. Når ordren er ferdig,
                ligger arbeidstiden klar som ordrelinjer med riktig pris, og
                timene rundes av slik dere selv har valgt.
              </p>
              <p>
                Det er også det bokføringsforskriften krever av verksteder som
                fakturerer etter tid: utførte timer dokumentert per dag, fordelt
                på kunde og oppdrag. Her skjer det av seg selv.
              </p>
            </div>
            <div className="split-art">
              <img
                loading="lazy"
                className="mock-photo"
                src="/design/verksted-paa-monitor.png"
                alt="Ordre med registrerte timer og priser på skjermen"
                style={{ objectFit: "cover", objectPosition: "50% 32%" }}
              />
            </div>
          </div>

          <div className="split-row reverse">
            <div className="split-text">
              <h2>Fra timer til lønnsgrunnlag</h2>
              <p>
                Programmet holder oversikt over hvor mye hver ansatt har jobbet,
                slik arbeidsmiljøloven krever. Ved lønnskjøring ligger
                grunnlaget klart.
              </p>
              <p>
                Du ser også forskjellen på fakturerbar tid og intern tid, så du
                vet hvor timene faktisk blir av.
              </p>
            </div>
            <div className="split-art">
              <img
                loading="lazy"
                className="mock-photo"
                src="/design/ordreoversikt-laptop.jpg"
                alt="Oversikt over registrerte timer i Verkstedpakken på laptop"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        {/* ── CTA-banner midtveis ── */}
        <section className="cta-sec">
          <div className="cta-banner">
            <a className="btn btn-primary" href={SIGNUP_URL}>
              Prøv gratis i 14 dager
            </a>
            <p>Timeregistrering er inkludert. Ingen binding.</p>
            <div className="cta-mascot">
              <ZenMascot />
            </div>
          </div>
        </section>

        {/* ── Regelverk ── */}
        <section className="page-sec">
          <div className="faq-wrap">
            <div className="sec-title-c">
              <h2>Krav til timeregistrering</h2>
              <p>
                Timeføring er ikke valgfritt. To regelverk stiller krav til
                norske verksteder.
              </p>
            </div>
            <details className="faq">
              <summary>Arbeidsmiljøloven: oversikt over arbeidstid</summary>
              <div className="faq-body">
                Arbeidsmiljøloven § 10-7 krever at det finnes en oversikt som
                viser hvor mye den enkelte ansatte har arbeidet. Oversikten skal
                kunne legges frem for Arbeidstilsynet og de tillitsvalgte. Med
                elektronisk timeregistrering er den alltid oppdatert.
              </div>
            </details>
            <details className="faq">
              <summary>Bokføringsforskriften: timer per kunde og oppdrag</summary>
              <div className="faq-body">
                Fakturerer verkstedet etter tidsforbruk, krever
                bokføringsforskriften § 5-14 at utførte timer dokumenteres per
                dag, fordelt på intern tid og de enkelte kundene og oppdragene.
                I Verkstedpakken er hver time allerede knyttet til riktig ordre,
                så dokumentasjonen finnes uten at noen fører den.
              </div>
            </details>
            <details className="faq">
              <summary>Hva en timeliste bør vise</summary>
              <div className="faq-body">
                Hvem som har jobbet, dato, start og slutt, pauser og overtid.
                For fakturerbar tid også hvilken kunde og hvilket oppdrag timene
                gjelder. Alt dette registreres automatisk når mekanikeren
                stempler inn på ordren.
              </div>
            </details>
          </div>
        </section>

        {/* ── For verksteder ── */}
        <section className="less-sec">
          <div className="less-inner">
            <h2>
              Laget for verksteder,
              <br />
              ikke for kontoret
            </h2>
            <p className="less-sub">
              Generelle timeregistrering-programmer stopper ved timelisten. I et
              verksted er timene bare halve jobben. De skal også bli til
              faktura.
            </p>
            <div className="less-points">
              <div className="less-point">
                <span className="lp-check">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <p>Timene stemples rett på ordren, ikke i et eget program.</p>
              </div>
              <div className="less-point">
                <span className="lp-check">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <p>Arbeidstid blir til ordrelinjer med riktig pris.</p>
              </div>
              <div className="less-point">
                <span className="lp-check">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <p>Lønnsgrunnlag og fakturagrunnlag fra samme innstempling.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="page-sec">
          <div className="faq-wrap">
            <div className="sec-title-c">
              <h2>Spørsmål om timeregistrering</h2>
            </div>
            {FAQS.map((f) => (
              <details key={f.q} className="faq">
                <summary>{f.q}</summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
