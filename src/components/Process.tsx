type Step = {
  n: string;
  title: string;
  you: string;
  we: string[];
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Oppstart",
    you: "Registrer dere på app.verkstedpakken.no og start gratis.",
    we: [
      "Setter opp systemet og online booking",
      "Kobler til regnskap og registre dere allerede bruker",
      "Importerer data fra dagens løsning",
    ],
  },
  {
    n: "02",
    title: "Daglig drift",
    you: "Ta imot kunden og gjør jobben.",
    we: [
      "Booking, kundechat og prisforslag samlet på ett brett",
      "AI-hjelp for mekanikeren, koblet på registreringsnummeret",
      "Automatisk tidsregistrering og status til kunden",
    ],
  },
  {
    n: "03",
    title: "Oppfølging",
    you: "Godkjenn — så er du ferdig.",
    we: [
      "Fakturaen lager seg selv fra timer og ordrelinjer",
      "Sendes rett til regnskapssystemet deres",
      "Oversikt over belegg, produktivitet og økonomi",
    ],
  },
];

function CheckMini() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12l5 5L20 6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Process() {
  return (
    <section className="proc section" id="slik-fungerer-det">
      <div className="wrap">
        <span className="eyebrow">Slik fungerer det</span>
        <h2 className="h-section">
          Dere gjør lite.
          <br />
          Systemet gjør resten.
        </h2>

        <div className="proc-grid">
          {STEPS.map((s) => (
            <div className="proc-step" key={s.n}>
              <span className="proc-n">{s.n}</span>
              <h3 className="proc-title">{s.title}</h3>
              <div className="proc-you">
                <span className="proc-tag">Det dere gjør</span>
                <p>{s.you}</p>
              </div>
              <div className="proc-we">
                <span className="proc-tag we">Verkstedpakken gjør</span>
                <ul>
                  {s.we.map((w) => (
                    <li key={w}>
                      <span className="proc-check">
                        <CheckMini />
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
