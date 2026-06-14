import { PRICE_LABEL } from "@/lib/pricing";

const FAQ_ITEMS = [
  {
    q: "Er det oppstartskostnad eller bindingstid?",
    a: "Nei. Du betaler ingenting for å komme i gang, og det er ingen bindingstid. Én forutsigbar månedspris per ansatt — ingen skjulte moduler som dukker opp etter signering.",
  },
  {
    q: "Passer dette for små verksteder eller meg som driver privat?",
    a: "Ja. Verkstedpakken er bygget for små og mellomstore verksteder — og for deg som driver på hobbybasis og vil ta steget videre. Uten oppstartskostnad kan du begynne i det små og la systemet vokse med deg.",
  },
  {
    q: "Hva koster Verkstedpakken?",
    a: `Fast ${PRICE_LABEL} per ansatt i måneden, alt inkludert — og billigere per bruker fra og med fjerde ansatt. Ingen oppstartskostnad, ingen skjulte tillegg.`,
  },
  {
    q: "Hva er inkludert i prisen?",
    a: "Alt. Verkstedoversikten, ordrestyring med faktura, kundechat og ansattchat, delebestilling, dekkhotell, timeføring, statistikk og online booking. Egen nettside, Muttern AI-assistent og kjøretøyoppslag er rimelige tillegg du kan koble på ved behov. Support fra oss er alltid inkludert.",
  },
  {
    q: "Hvor lang tid tar det å komme i gang?",
    a: "Omtrent to uker. Vi setter opp systemet, importerer data fra dagens løsning og kobler til regnskapssystemet deres — ingen konsulentprosjekt, ingen lang ventetid.",
  },
  {
    q: "Trenger mekanikerne opplæring?",
    a: "Minimalt. Hver ansatt får en interaktiv introduksjon tilpasset sin rolle, og mekanikerne har innebygd AI-hjelp som er koblet på registreringsnummeret — den foreslår fremgangsmåte og deler for akkurat det kjøretøyet. De fleste er i gang på egenhånd etter kort tid.",
  },
];

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section className="faq section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="wrap">
        <div className="faq-top">
          <div>
            <span className="eyebrow">Spørsmål og svar</span>
            <h2 className="h-section">
              Ofte stilte
              <br />
              spørsmål.
            </h2>
            <p className="lede">
              Finner du ikke svaret? Skriv til oss på{" "}
              <a
                href="mailto:hei@verkstedpakken.no"
                style={{ textDecoration: "underline" }}
              >
                hei@verkstedpakken.no
              </a>{" "}
              — vi kommer tilbake til deg.
            </p>
          </div>

          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <details className="faq-q" key={item.q} open={i === 0}>
                <summary>{item.q}</summary>
                <div className="faq-a">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
