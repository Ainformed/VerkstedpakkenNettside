const FAQ_ITEMS = [
  {
    q: "Hva koster Verkstedpakken?",
    a: "Fast månedspris per ansatt, tilpasset størrelsen på verkstedet. Alt inkludert: systemet, egen nettside med booking, AI-hjelp, oppsett og support. Ingen oppstartskostnad, ingen skjulte tillegg.",
  },
  {
    q: "Hva er inkludert i prisen?",
    a: "Alt. Verkstedoversikten, ordrestyring med faktura, kundechat og ansattchat, delebestilling, dekkhotell, timeføring, statistikk, egen nettside med online booking, innebygd AI-hjelp. Og support fra oss når dere trenger det.",
  },
  {
    q: "Hvor lang tid tar det å komme i gang?",
    a: "Omtrent to uker. Vi setter opp systemet, importerer data fra dagens løsning og klargjør nettsiden. Innebygd AI-introduksjon guider hver ansatt gjennom sin rolle, så dere slipper manualer og lange kursøkter.",
  },
  {
    q: "Trenger mekanikerne opplæring?",
    a: "Minimalt. Hver ansatt får en interaktiv introduksjon tilpasset sin rolle, og alle har tilgang til en innebygd AI-chat som svarer på spørsmål underveis. De fleste er i gang på egenhånd etter kort tid.",
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
                href="mailto:x@verkstedpakken.no"
                style={{ textDecoration: "underline" }}
              >
                x@verkstedpakken.no
              </a>{" "}
              — vi kommer tilbake til deg.
            </p>
          </div>

          <div className="faq-list">
            <details className="faq-q" open>
              <summary>Hva koster Verkstedpakken?</summary>
              <div className="faq-a">
                Fast månedspris per ansatt, tilpasset størrelsen på verkstedet
                — alt inkludert: systemet, egen nettside med booking, AI-hjelp,
                oppsett og support. Ingen oppstartskostnad, ingen skjulte
                tillegg.
              </div>
            </details>
            <details className="faq-q">
              <summary>Hva er inkludert i prisen?</summary>
              <div className="faq-a">
                Alt. Verkstedoversikten, ordrestyring med faktura, kundechat og
                ansattchat, delebestilling, dekkhotell, timeføring, statistikk,
                egen nettside med online booking, innebygd AI-hjelp — og support
                fra oss når dere trenger det.
              </div>
            </details>
            <details className="faq-q">
              <summary>Hvor lang tid tar det å komme i gang?</summary>
              <div className="faq-a">
                Omtrent to uker. Vi setter opp systemet, importerer data fra
                dagens løsning og klargjør nettsiden. Innebygd AI-introduksjon
                guider hver ansatt gjennom sin rolle — så dere slipper manualer
                og lange kursøkter.
              </div>
            </details>
            <details className="faq-q">
              <summary>Trenger mekanikerne opplæring?</summary>
              <div className="faq-a">
                Minimalt. Hver ansatt får en interaktiv introduksjon tilpasset
                sin rolle, og alle har tilgang til en innebygd AI-chat som
                svarer på spørsmål underveis. De fleste er i gang på egenhånd
                etter kort tid.
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
