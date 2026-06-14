export default function Problems() {
  return (
    <section className="pain section" id="utfordringer">
      <div className="wrap">
        <span className="eyebrow">Problemet med de gamle systemene</span>
        <h2 className="h-section">Regningen som aldri stopper.</h2>
        <p className="lede">
          Verkstedsystemet er kjøpt, men kostnadene fortsetter å komme. Det er
          ikke selve driften som er problemet — det er prislappen, modulene og
          kontrakten rundt den.
        </p>

        <div className="pain-grid">
          <div className="pain-card big">
            <div className="pain-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#241d44" strokeWidth="1.8" />
                <path
                  d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"
                  stroke="#241d44"
                  strokeWidth="1.8"
                />
                <path
                  d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"
                  stroke="#241d44"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
            <div>
              <h3>Tunge oppstartskostnader</h3>
              <p>
                Du betaler dyrt før du har skrevet en eneste ordrelinje.
                Lisenser, oppsett og konsulenttimer som spiser opp budsjettet —
                lenge før systemet tjener deg en krone.
              </p>
            </div>
          </div>

          <div className="pain-card">
            <div className="pain-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3l9 5-9 5-9-5 9-5z"
                  stroke="#241d44"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 12l9 5 9-5"
                  stroke="#241d44"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 16l9 5 9-5"
                  stroke="#241d44"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3>Skjulte modulpriser</h3>
              <p>
                Grunnpakken ser grei ut — helt til du innser at det du faktisk
                trenger ligger bak fire ekstra moduler, hver med sin egen
                prislapp.
              </p>
            </div>
          </div>

          <div className="pain-card">
            <div className="pain-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect
                  x="5"
                  y="11"
                  width="14"
                  height="9"
                  rx="2"
                  stroke="#241d44"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 11V7a4 4 0 018 0v4"
                  stroke="#241d44"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <h3>Bindingstid og lang oppstart</h3>
              <p>
                Måneder med implementering og lange kontrakter. Du låses inn før
                du vet om systemet i det hele tatt passer verkstedet ditt.
              </p>
            </div>
          </div>
        </div>

        <div className="pain-more">
          <details className="pain-acc">
            <summary>Flere ting de gamle systemene overser</summary>
            <div className="pain-more-grid">
              <div className="pain-mini">
                <h4>Ingen nettside til kunden</h4>
                <p>
                  De tradisjonelle systemene er bygget for innsiden av
                  verkstedet. Kunden din sitter fortsatt og ringer for å bestille
                  time.
                </p>
              </div>
              <div className="pain-mini">
                <h4>Bygget for en annen tid</h4>
                <p>
                  Solide verktøy for selve driften, men laget før kundene
                  forventet å booke på mobilen. Bileiere oppfører seg annerledes
                  i dag.
                </p>
              </div>
              <div className="pain-mini">
                <h4>Beskjeder som forsvinner</h4>
                <p>
                  Når systemet ikke binder sammen mottak, mekaniker og kunde blir
                  det lapper, telefoner og e-post — og ingen vet hvem som gjør
                  hva.
                </p>
              </div>
              <div className="pain-mini">
                <h4>Tapte inntekter</h4>
                <p>
                  Fragmenterte løsninger gjør at utført arbeid og deler ikke
                  alltid faktureres. Penger forsvinner i sprekkene.
                </p>
              </div>
              <div className="pain-mini">
                <h4>Flyr blind på tallene</h4>
                <p>
                  Uten oversikt over omsetning, produktivitet og kapasitet er det
                  vanskelig å vite hvor pengene lekker — eller hvor dere kan
                  vokse.
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
