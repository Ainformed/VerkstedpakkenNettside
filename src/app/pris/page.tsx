import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import { SIGNUP_URL } from "@/lib/links";
import "./pris.css";

export const metadata: Metadata = {
  title: "Pris",
  description:
    "Alt inkludert i en fast pris: 1 295,- per bruker per måned (ekskl. mva). Ingen bindingstid, ingen etableringskostnad. Prøv gratis i 14 dager.",
};

export default function Pris() {
  return (
    <>
      <Header />
      <main className="page-pris">
        {/* ── Pris-hero ── */}
        <section className="price-hero">
          <div className="phero-grid">
            <div className="phero-copy">
              <div className="amt">1 295,-</div>
              <p className="per">
                Per bruker per måned (ekskl. mva). <b>Ingen bindingstid.</b>
              </p>
              <div className="cta-row">
                <a className="btn btn-primary btn-lg" href={SIGNUP_URL}>
                  Prøv gratis i 14 dager
                </a>
              </div>
              <p className="subnote">Alt inkludert. Ingen etableringskostnad.</p>
            </div>
            <div className="phero-mascot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/design/muttern-zen-grunnposisjon.svg"
                alt="Muttern i ro"
              />
            </div>
          </div>
          <div className="phero-bubble">
            <span>
              Inkluderer alt verkstedet trenger i hverdagen og support uten timepris. Fra 4 ansatte
              får du lavere pris per bruker.
            </span>
          </div>
        </section>

        <div className="price-band">
          {/* ── Inkludert ── */}
          <section className="page-sec">
            <div className="plist-wrap">
              <div className="sec-title-c">
                <h2>Alt dette er inkludert</h2>
                <p>Ting andre tar betalt for, er en del av prisen hos oss.</p>
              </div>
              <div className="plist">
                <div className="pgroup-label">I verkstedet</div>
                <div className="prow-flat">
                  <span className="pname">Verkstedordre og planlegging</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">
                    Mekanikerportal <small>hele arbeidsdagen på mobilen</small>
                  </span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">Kiosk og innstempling</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">Kunder og kjøretøy</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">
                    Kjøretøyoppslag <small>skriv inn skiltet — bilen fyller seg selv</small>
                  </span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">
                    Deler og lager <small>med varetelling og lavt-beholdning-varsel</small>
                  </span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">Dekkhotell</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>

                <div className="pgroup-label">For kundene dine</div>
                <div className="prow-flat">
                  <span className="pname">Booking på nett</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">
                    Min garasje <small>kundens egen side med status og historikk</small>
                  </span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">E-postvarsler og chat</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>

                <div className="pgroup-label">Penger og regnskap</div>
                <div className="prow-flat">
                  <span className="pname">Faktura og betaling</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">Regnskapsintegrasjon</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">Timer og lønnsgrunnlag</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>

                <div className="pgroup-label">Kom i gang</div>
                <div className="prow-flat">
                  <span className="pname">Etablering av programvare</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">Etablering av regnskapsintegrasjon</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">Flytting av innhold fra andre systemer</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">Support og opplæring</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">
                    Bytter du fra et annet system? <small>få 3 måneder gratis</small>
                  </span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Tilleggstjenester ── */}
          <section className="page-sec">
            <div className="plist-wrap">
              <div className="sec-title-c">
                <h2>Legg til hvis du vil</h2>
                <p>
                  Tjenester du kan skru på ved behov. Ingen av dem er nødvendige for å bruke
                  Verkstedpakken.
                </p>
              </div>
              <div className="plist">
                <div className="pgroup-label">Pris per måned</div>
                <details className="prow">
                  <summary>
                    <span className="pname">Nettside</span>
                    <span className="pill pill-price">495 kr / mnd</span>
                  </summary>
                  <div className="prow-body">
                    Ferdig nettside for verkstedet, med booking innebygd. Vi setter den opp og holder
                    den oppdatert.
                  </div>
                </details>
                <details className="prow">
                  <summary>
                    <span className="pname">
                      Kjøretøyoppslag med eieropplysninger <small>Statens vegvesen</small>
                    </span>
                    <span className="pill pill-price">995 kr / mnd</span>
                  </summary>
                  <div className="prow-body">
                    Slå opp regnr og få bil- og eierdata rett inn i ordren. Inntil 1 000 oppslag per
                    måned.
                  </div>
                </details>

                <div className="pgroup-label">Pris per bruk</div>
                <details className="prow">
                  <summary>
                    <span className="pname">Muttern — AI-assistent</span>
                    <span className="pill pill-price">Betal kun for bruk</span>
                  </summary>
                  <div className="prow-body">
                    Svarer på spørsmål og hjelper til i systemet. Du betaler bare for det du bruker,
                    med et månedstak du setter selv.
                  </div>
                </details>
                <details className="prow">
                  <summary>
                    <span className="pname">SMS til kunder</span>
                    <span className="pill pill-price">2 kr / stk</span>
                  </summary>
                  <div className="prow-body">
                    Send påminnelser og «bilen er klar»-meldinger. Ingen månedsavgift — du betaler
                    bare per melding.
                  </div>
                </details>
              </div>
              <div className="pnote">
                <span>Utover dette er det ingenting i Verkstedpakken som koster noe.</span>
              </div>
              <p className="pfine">Alle priser er eks. mva.</p>
            </div>
          </section>
        </div>

        {/* ── FAQ ── */}
        <section className="page-sec" style={{ paddingTop: "20px" }}>
          <div className="faq-wrap">
            <div className="sec-title-c">
              <h2>Lurer du på noe?</h2>
            </div>
            <details className="faq">
              <summary>Er det bindingstid?</summary>
              <div className="faq-body">
                Nei. Du betaler måned for måned, og kan si opp når du vil.
              </div>
            </details>
            <details className="faq">
              <summary>Hvordan regnes prisen per bruker?</summary>
              <div className="faq-body">
                Du betaler per bruker, og prisen per bruker blir lavere fra fjerde ansatt.
              </div>
            </details>
            <details className="faq">
              <summary>Hva skjer etter prøveperioden?</summary>
              <div className="faq-body">
                Ingenting, hvis du ikke velger å fortsette. Prøveperioden blir ikke til et automatisk
                abonnement — du bestemmer selv.
              </div>
            </details>
            <details className="faq">
              <summary>Kan vi få hjelp til å flytte fra systemet vi har i dag?</summary>
              <div className="faq-body">
                Ja. Vi henter kunder, kjøretøy og historikk fra det gamle systemet, og setter opp
                verkstedet klart til bruk. Bytter du fra et annet system, er de tre første månedene
                med Verkstedpakken gratis.
              </div>
            </details>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
