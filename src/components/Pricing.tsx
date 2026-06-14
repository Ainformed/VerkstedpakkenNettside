import Mascot from "@/components/Mascot";
import {
  PRICE_LABEL,
  PRICE_SUFFIX,
  PRICE_NOTE,
  VOLUME_EXAMPLE,
  ETABLERING_LABEL,
} from "@/lib/pricing";
import { SIGNUP_URL } from "@/lib/links";

export default function Pricing() {
  return (
    <section className="pricing section" id="pris">
      <div className="wrap">
        <Mascot
          pose="present"
          size={108}
          bubble="Regnestykket står inni."
          className="pricing-mascot"
        />
        <div className="pricing-card">
          <div className="pricing-left">
            <span className="eyebrow">Åpen pris</span>
            <h2>
              Ingen oppstartskostnad.
              <br />
              Én månedspris, alt inkludert.
            </h2>
            <p>
              Du betaler ikke en krone for å komme i gang. Ingen skjulte moduler,
              ingen bindingstid. Systemet, online booking, AI-hjelp, oppsett og
              support ligger i én forutsigbar månedspris per ansatt — du har full
              kontroll fra dag én.
            </p>
          </div>
          <div className="pricing-right">
            <div className="pricing-figure">
              <span className="pricing-kicker">Fast månedspris, alt inkludert</span>
              <div className="pricing-amount">
                <b>{PRICE_LABEL}</b>
                <span>{PRICE_SUFFIX}</span>
              </div>
              <span className="pricing-pill">{ETABLERING_LABEL}</span>
              <span className="pricing-subnote">{PRICE_NOTE}</span>
              <span className="pricing-subnote">{VOLUME_EXAMPLE}</span>
            </div>
            <div className="pricing-divider" />
            <div className="pricing-points">
              <div className="pp-item">
                <div className="pp-ico">
                  <CheckIcon />
                </div>
                <div>
                  <b>Ingen oppstartskostnad</b>
                </div>
              </div>
              <div className="pp-item">
                <div className="pp-ico">
                  <CheckIcon />
                </div>
                <div>
                  <b>Online booking inkludert</b>
                </div>
              </div>
              <div className="pp-item">
                <div className="pp-ico">
                  <CheckIcon />
                </div>
                <div>
                  <b>Ingen bindingstid — si opp når du vil</b>
                </div>
              </div>
            </div>
            <a href={SIGNUP_URL} className="pricing-cta">
              Start gratis prøveperiode
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
              14 dager gratis — registrer dere selv på minutter, eller book en
              demo.
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
