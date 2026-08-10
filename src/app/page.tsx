import Link from "next/link";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import InView from "@/components/vp/InView";
import { SIGNUP_URL } from "@/lib/links";
import {
  M_ORDER_NY_SVG,
  M_ZEN_FIG_SVG,
  M_SUPPORT_SVG,
  M_ORDER_BYTT_SVG,
} from "./home-svgs";
import "./home.css";

/* Statiske maskot-SVG-er (SMIL) inlines som design-assets — trygt, ingen brukerdata. */
function RawSvg({ html }: { html: string }) {
  return <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="page-home">
        {/* ─────────────── HERO ─────────────── */}
        <section className="hero">
          <div className="wrap">
            <h1>Verkstedprogrammet uten dobbeltarbeid</h1>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href={SIGNUP_URL}>Prøv gratis i 14 dager</a>
            </div>
            <p className="subnote">Bytter du fra et annet system? Du betaler ikke før oppsigelsestiden er ute.</p>
          </div>
        </section>

        {/* ─────────────── TRE KOLONNER ─────────────── */}
        <section className="cols-sec">
          {/* Lav terskel: på mobil er kolonnestabelen ~1800px høy, så en høy
              terskel (referansens 0.3) trigges først langt ned i scrollingen —
              figurene sto usynlige (opacity 0) til da. */}
          <InView className="cols" threshold={0.05}>
            <div className="col">
              <div className="art">
                <div className="fig">
                  <RawSvg html={M_ORDER_NY_SVG} />
                </div>
              </div>
              <h3>Lett å lære</h3>
              <p>Nye systemer pleier å bety kurs og frustrasjon. Her er du i gang med en gang.</p>
            </div>
            <div className="col">
              <div className="art">
                <div className="fig zen-fig">
                  <RawSvg html={M_ZEN_FIG_SVG} />
                </div>
              </div>
              <h3>Full kontroll</h3>
              <p>Ordre, timer, deler og status på ett sted. Du vet alltid hvor jobbene står.</p>
            </div>
            <div className="col">
              <div className="art">
                <div className="fig">
                  <RawSvg html={M_SUPPORT_SVG} />
                </div>
              </div>
              <h3>Hjelp koster ikke</h3>
              <p>Ring eller skriv, så svarer en som kan både systemet og verkstedhverdagen.</p>
            </div>
          </InView>
        </section>

        {/* ─────────────── FEATURE PANEL ─────────────── */}
        <section className="panel-sec">
          <div className="panel">
            <h2>Hele verkstedet<br />i ett system</h2>
            <div className="panel-cards">
              <div className="pcard">
                <h3>Du styrer verkstedet</h3>
                <p>Tildel jobber, følg status og kapasitet på én skjerm, uten å gå runden. Når jobben lukkes, ligger fakturagrunnlaget klart for regnskapet.</p>
                <div className="illo">
                  <div className="ill ill-orders">
                    <div className="oc oc3"></div>
                    <div className="oc oc2"></div>
                    <div className="oc oc1">
                      <div className="oc-top"><span className="oc-dot"></span><span className="oc-pill"></span></div>
                      <div className="oc-bar"></div>
                      <div className="oc-bar sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pcard">
                <h3>Laget for mekanikeren</h3>
                <p>Ledige jobber på mobilen eller felles skjerm. Plukk selv eller få tildelt. Tiden stemples der og da og havner rett på ordrelinjen.</p>
                <div className="illo">
                  <div className="ill ill-phone2">
                    <div className="frame">
                      <div className="scr">
                        <div className="hdr">Ledige jobber</div>
                        <div className="jrow"><span className="jdot"></span><span className="jbars"><i></i><i className="sm"></i></span></div>
                        <div className="jrow active"><span className="jdot"></span><span className="jbars"><i></i><i className="sm"></i></span><span className="jtime">00:42</span></div>
                        <div className="jrow"><span className="jdot"></span><span className="jbars"><i></i><i className="sm"></i></span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pcard">
                <h3>Kunden sender forespørsel</h3>
                <p>På telefon eller nett. Du foreslår pris og dato, kunden bekrefter. De følger bilen underveis og slipper å ringe.</p>
                <div className="illo">
                  <div className="ill ill-bubble">
                    <div className="bub">
                      <span className="bub-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
                      </span>
                      <div className="bub-lines"><span></span><span className="sm"></span></div>
                    </div>
                    <span className="chip">tir 24. juni · 1 490 kr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── HJELP / EKTE FOLK ─────────────── */}
        <section className="help-sec">
          <div className="help-grid">
            <div className="help-media">
              <img loading="lazy" className="help-photo" src="/design/support-svarer-telefon.jpg" alt="Supportmedarbeider svarer en kunde ved laptopen" />
            </div>
            <div className="help-copy">
              <h2>Support som kan verksted</h2>
              <p>Spør om stort eller smått. Det er alltid et menneske som svarer.</p>
              <p>Oppsett, opplæring og spørsmål underveis er inkludert. Du får aldri faktura for hjelp.</p>
            </div>
          </div>
        </section>

        {/* ─────────────── CTA-BANNER ─────────────── */}
        <section className="cta-sec">
          <div className="cta-banner">
            <a className="btn btn-primary" href={SIGNUP_URL}>Prøv gratis i 14 dager</a>
            <p>I gang på fem minutter. Ingen binding.</p>
            <div className="cta-mascot">
              <div className="fig zen-fig">
                <RawSvg html={M_ZEN_FIG_SVG} />
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── SPLIT-RADER ─────────────── */}
        <section className="split-sec">
          <div className="split-row">
            <div className="split-text">
              <h2>Formet etter driften din</h2>
              <p>Bil, anleggsmaskin, MC, båt eller landbruk. Du får egne ordremaler, prislister og felt for din bransje. Arbeidsordre, <Link href="/timeregistrering">timeregistrering</Link>, delelager og fakturering samlet på ett sted.</p>
              <Link className="split-link" href="/ordresystem">Slik fungerer ordresystemet
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
            <div className="split-art">
              <div className="fig fig-b">
                <RawSvg html={M_SUPPORT_SVG} />
              </div>
            </div>
          </div>

          <div className="split-row reverse">
            <div className="split-art">
              <div className="fig">
                <RawSvg html={M_ORDER_BYTT_SVG} />
              </div>
            </div>
            <div className="split-text">
              <h2>Lei av systemet<br />dere har?</h2>
              <p>Å bytte system skal være trygt. Derfor er Verkstedpakken gratis til oppsigelsestiden på det gamle systemet er over. Du betaler aldri for to systemer samtidig. Vi hjelper deg hele veien, og verkstedet går som normalt.</p>
              <Link className="split-link" href="/pris">Se priser
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ─────────────── INTEGRASJONER ─────────────── */}
        <section className="split-sec">
          <div className="split-row integ-row">
            <div className="split-text">
              <h2>Integrasjoner</h2>
              <p>Regnskap, deler og kjøretøydata. Verkstedpakken sender tallene dit de skal, så ingenting føres to ganger.</p>
              <Link className="split-link" href="/integrasjoner">Tjenester du kan koble til
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
            <div className="split-art" style={{ justifyItems: "end" }}>
              <div className="integ-groups">
                <div className="logo-grid">
                  <div className="logo-card"><img loading="lazy" className="logo-pad" src="/design/logos/fiken.png" alt="Fiken" /></div>
                  <div className="logo-card"><img loading="lazy" src="/design/logos/poweroffice.png" alt="PowerOffice GO" /></div>
                  <div className="logo-card"><img loading="lazy" src="/design/logos/tripletex.png" alt="Tripletex" /></div>
                  <div className="logo-card"><img loading="lazy" src="/design/logos/visma-eaccounting.png" alt="Visma eAccounting" /></div>
                  <div className="logo-card"><img loading="lazy" src="/design/logos/finago.png" alt="Finago (24SevenOffice)" /></div>
                  <div className="logo-card"><img loading="lazy" src="/design/logos/bilxtra.svg" alt="BilXtra" /></div>
                  <div className="logo-card"><img loading="lazy" src="/design/logos/meca.png" alt="MECA" /></div>
                  <div className="logo-card"><img loading="lazy" src="/design/logos/meko.png" alt="MEKO" /></div>
                  <div className="logo-card"><img loading="lazy" className="logo-tall" src="/design/logos/statens-vegvesen.png" alt="Statens vegvesen" /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── NETTSIDE OG BOOKING ─────────────── */}
        <section className="panel-sec">
          <div className="panel">
            <h2>Bli verkstedet<br />kundene velger</h2>
            <div className="panel-cards">
              <div className="pcard">
                <h3>Vær synlig</h3>
                <p>Dukk opp når kunder søker etter verksted på nett, og styr selv inntrykket de får. Vis hvem dere er, slik dere vil.</p>
                <div className="illo">
                  <div className="ill ill-site">
                    <div className="win">
                      <div className="win-bar"><i></i><i></i><i></i><span className="win-url"></span></div>
                      <div className="ws-nav">
                        <span className="ws-brand">Verkstedet ditt</span>
                        <span className="ws-links"><i></i><i></i><i></i></span>
                      </div>
                      <div className="ws-hero">
                        <div className="ws-h"></div>
                        <div className="ws-sub"></div>
                        <span className="ws-btn"></span>
                      </div>
                      <div className="ws-tiles"><span className="ws-tile"></span><span className="ws-tile"></span><span className="ws-tile"></span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pcard">
                <h3>Du bestemmer tiden</h3>
                <p>Kunden taster inn regnr og huker av hva som er galt. Du svarer med pris, dato og tid, så takker de ja eller nei.</p>
                <div className="illo">
                  <div className="ill ill-book">
                    <div className="bk">
                      <div className="bk-hdr">Ny forespørsel</div>
                      <span className="bk-plate">AA 11111 · Volkswagen Caddy</span>
                      <div className="bk-msg"><span></span><span></span><span className="sm"></span></div>
                      <span className="bk-btn">Send forespørsel</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pcard">
                <h3>Færre telefoner</h3>
                <p>Kunden ser selv hvor bilen er. Da slipper du oppringningene som bare lurer på en ting: er den ferdig snart?</p>
                <div className="illo">
                  <div className="ill ill-track">
                    <div className="tk">
                      <div className="tk-hdr">Følg bilen</div>
                      <div className="tk-car">Volkswagen Caddy</div>
                      <div className="tk-reg">UX 58585</div>
                      <div className="tk-steps">
                        <div className="tk-step done"><span className="tk-dot"></span><span className="tk-lbl">Bekreftet</span></div>
                        <div className="tk-step done"><span className="tk-dot"></span><span className="tk-lbl">Mottatt</span></div>
                        <div className="tk-step now"><span className="tk-dot"></span><span className="tk-lbl">Pågår</span></div>
                        <div className="tk-step"><span className="tk-dot"></span><span className="tk-lbl">Klar</span></div>
                      </div>
                      <div className="tk-foot"><span className="tk-foot-lbl">Du får beskjed når bilen er klar</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-link-row">
              <Link href="/nettside-og-booking">Mer om nettside og booking
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
