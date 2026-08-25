import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import PrisKalkulator from "./PrisKalkulator";
import "./pris.css";

export const metadata: Metadata = {
  title: "Pris på verkstedprogrammet",
  description:
    "Admin-lisens 1 295,- og mekaniker-lisens 595,- per måned (ekskl. mva). Alt inkludert, ingen bindingstid, ingen etableringskostnad. Prøv gratis i 14 dager.",
  alternates: { canonical: "/pris" },
};

export default function Pris() {
  return (
    <>
      <Header />
      <main className="page-pris">
        {/* ── Pris-hero: to lisenstyper, sett opp bedriften og se prisen ── */}
        <section className="price-hero">
          <div className="phero-innhold">
            <h1 className="phero-title">Pris for Verkstedpakken</h1>
            <PrisKalkulator />
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
                  <span className="pname">Flytting av innhold fra andre programmer</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">Support og opplæring</span>
                  <span className="pill pill-inc">Inkludert</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">
                    Bytter du fra et annet program? <small>gratis i hele oppsigelsestiden</small>
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
                <div className="prow-flat">
                  <span className="pname">
                    Nettside
                    <small>
                      Ferdig nettside for verkstedet, med booking innebygd. Vi setter den opp og
                      holder den oppdatert.
                    </small>
                  </span>
                  <span className="pill pill-price">495 kr / mnd</span>
                </div>
                <div className="prow-flat">
                  <span className="pname">
                    Kjøretøyoppslag med eieropplysninger
                    <small>
                      Statens vegvesen · Slå opp regnr og få bil- og eierdata rett inn i ordren.
                      Inntil 500 oppslag per dag.
                    </small>
                  </span>
                  <span className="pill pill-price">235 kr / mnd</span>
                </div>

                <div className="pgroup-label">Pris per bruk</div>
                <div className="prow-flat">
                  <span className="pname">SMS til kunder</span>
                  <span className="pill pill-price">2 kr / stk</span>
                </div>
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
              <summary>Hvordan regnes prisen?</summary>
              <div className="faq-body">
                Du betaler 1 295,- per admin og 595,- per mekaniker per måned. Prisen per admin
                blir lavere når dere er flere admin: 1 095,- fra den fjerde og 995,- fra den
                sjuende. Mekaniker-lisensen koster det samme uansett antall.
              </div>
            </details>
            <details className="faq">
              <summary>Hva er forskjellen på admin og mekaniker?</summary>
              <div className="faq-body">
                En admin — typisk kundemottakeren — har tilgang til hele programmet, og kan
                selvsagt også jobbe som mekaniker. En mekaniker-lisens er for mekanikere som utfører og registrerer
                arbeid i mekanikerportalen, på egen enhet eller innlogget på en felles enhet i
                verkstedet.
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
              <summary>Kan vi få hjelp til å flytte fra programmet vi har i dag?</summary>
              <div className="faq-body">
                Ja. Vi hjelper deg med å få over kunder, kjøretøy og historikk, og setter opp
                verkstedet klart til bruk. Bytter du fra et annet program, er Verkstedpakken gratis
                til oppsigelsestiden hos det gamle er over – du betaler aldri for to programmer
                samtidig.
              </div>
            </details>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
