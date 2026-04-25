export default function Problems() {
  return (
    <section className="pain section" id="utfordringer">
      <div className="wrap">
        <span className="eyebrow">Hverdagen uten system</span>
        <h2 className="h-section">Kjenner du deg igjen?</h2>
        <p className="lede">
          De fleste verksteder drives fortsatt på lapper, telefoner og e-post.
          Her er det vi hører oftest.
        </p>

        <div className="pain-grid">
          <div className="pain-card big">
            <div className="pain-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                  stroke="#0c005a"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 10h8M8 13h5"
                  stroke="#0c005a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <h3>Beskjeder som forsvinner</h3>
              <p>
                Kommunikasjonen mellom kundemottaker, mekaniker og kunde blir en
                evig runddans. Lapper forsvinner, beskjeder glemmes — og ingen
                vet hvem som gjør hva.
              </p>
            </div>
          </div>

          <div className="pain-card">
            <div className="pain-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3v18M17 7H9a2 2 0 000 4h6a2 2 0 010 4H7"
                  stroke="#0c005a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <h3>Tapte inntekter</h3>
              <p>
                Fragmenterte systemer gjør at utført arbeid og deler ikke alltid
                faktureres. Penger forsvinner i sprekkene.
              </p>
            </div>
          </div>

          <div className="pain-card">
            <div className="pain-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.35 1.9.66 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.3 1.85.52 2.81.66A2 2 0 0122 16.92z"
                  stroke="#0c005a"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3>Telefonen spiser arbeidstiden</h3>
              <p>
                Ingen booking, ingen status, ingen selvbetjening. Resultatet er
                en endeløs strøm av telefoner kundemottaket ikke trenger.
              </p>
            </div>
          </div>
        </div>

        <div className="pain-more">
          <details className="pain-acc">
            <summary>Flere utfordringer vi løser</summary>
            <div className="pain-more-grid">
              <div className="pain-mini">
                <h4>Tomme luker i kalenderen</h4>
                <p>
                  Mye rykk og napp — arbeidsmengden svinger med sesong. Uten
                  enkel booking og påminnelser forblir stille perioder stille.
                </p>
              </div>
              <div className="pain-mini">
                <h4>Delebestilling er kaos</h4>
                <p>
                  Ring eller mail, kunden aner ikke om det er bestilt, og
                  verkstedet bruker tid på oppfølging som burde gått av seg
                  selv.
                </p>
              </div>
              <div className="pain-mini">
                <h4>Nettsiden gir kunden ingenting</h4>
                <p>
                  Små og mellomstore verksteder har nettsider som knapt viser
                  åpningstider. Ingen booking, ingen grunn til å komme tilbake.
                </p>
              </div>
              <div className="pain-mini">
                <h4>For mange systemer</h4>
                <p>
                  Utdatert programvare, gammel tankegang, papirlapper overalt —
                  og lite snakker sammen.
                </p>
              </div>
              <div className="pain-mini">
                <h4>Flyr blind på tallene</h4>
                <p>
                  Uten oversikt over omsetning, produktivitet og kapasitet er
                  det vanskelig å vite hvor pengene lekker — eller hvor dere
                  kan vokse.
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
