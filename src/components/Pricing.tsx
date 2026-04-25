export default function Pricing() {
  return (
    <section className="pricing section">
      <div className="wrap">
        <div className="pricing-card">
          <div className="pricing-left">
            <span className="eyebrow">Pris</span>
            <h2>
              Én månedspris
              <br />
              per ansatt. Alt inkludert.
            </h2>
            <p>
              Ingen oppstartskostnad, ingen skjulte tillegg, ingen bindingstid.
              Systemet, egen nettside, AI-hjelp, oppsett og support — alt
              ligger i prisen.
            </p>
          </div>
          <div className="pricing-right">
            <div className="pricing-points">
              <div className="pp-item">
                <div className="pp-ico">
                  <CheckIcon />
                </div>
                <div>
                  <b>Egen nettside inkludert</b>
                </div>
              </div>
              <div className="pp-item">
                <div className="pp-ico">
                  <CheckIcon />
                </div>
                <div>
                  <b>Oppsett og support</b>
                </div>
              </div>
              <div className="pp-item">
                <div className="pp-ico">
                  <CheckIcon />
                </div>
                <div>
                  <b>Ingen bindingstid</b>
                </div>
              </div>
            </div>
            <a href="#interesse" className="pricing-cta">
              Meld interesse
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <div className="pricing-note">
              Vi sender pris tilpasset deres størrelse etter en kort prat.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12l5 5L20 6"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
