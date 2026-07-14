import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import ZenMascot from "@/components/vp/ZenMascot";
import { SIGNUP_URL } from "@/lib/links";
import "./ordresystem.css";

export const metadata: Metadata = {
  title: "Ordresystem",
  description:
    "Lag ordre og tilbud på sekunder, eller ta imot forespørsler fra nettsiden. Alt om jobben er samlet på ett sted, fra forespørsel til ferdig faktura.",
  alternates: { canonical: "/ordresystem" },
};

export default function Ordresystem() {
  return (
    <>
      <Header />
      <main className="page-ordresystem">
        <section className="hero feat-hero vo-hero-split">
          <div className="vo-hero-grid">
            <div className="vo-hero-copy">
              <h1>Hele jobben på én ordre</h1>
              <p className="lead">
                Lag ordre og tilbud på sekunder, eller ta imot forespørsler
                fra nettsiden. Alt om jobben er samlet på ett sted, fra
                forespørsel til ferdig faktura.
              </p>
              <div className="cta-row">
                <a className="btn btn-primary btn-lg" href={SIGNUP_URL}>
                  Prøv gratis i 14 dager
                </a>
              </div>
            </div>
            <div className="vo-hero-art">
              <div className="fig">
                <img
                  className="m-fig m-order"
                  src="/design/muttern-holder-ordre.svg"
                  alt="Muttern holder en ordre"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Split-rader: dybde ── */}
        <section className="split-sec">
          <div className="split-row reverse">
            <div className="split-text">
              <h2>Alt starter med en ny ordre</h2>
              <p>
                Kunden sender forespørsel på nett, eller du legger inn ordren
                når telefonen ringer.
              </p>
              <p>
                Ingen gule lapper og ingen løse e-poster. Hver jobb får kunde,
                bil og status fra start.
              </p>
            </div>
            <div className="split-art">
              <img
                className="mock-photo"
                src="/design/ordreoversikt-laptop.jpg"
                alt="Laptop med ordreoversikten i Verkstedpakken på skjermen"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="split-row">
            <div className="split-text">
              <h2>Send tilbud rett fra ordren</h2>
              <p>
                Sett pris og dato, så får kunden en lenke på SMS eller e-post.
                Der godkjenner de med ett trykk, uten innlogging.
              </p>
              <p>
                Sier kunden ja, er både pris og tid bekreftet, og jobben ligger
                klar i kalenderen.
              </p>
            </div>
            <div className="split-art">
              <div className="ill ill-quotes" aria-hidden="true">
                <div className="qrow">
                  <span className="q-num">B-0027</span>
                  <span className="q-name">EU-kontroll + service</span>
                  <span className="q-price">3 450 kr</span>
                  <span className="q-chip venter">Venter svar</span>
                </div>
                <div className="qrow">
                  <span className="q-num">B-0026</span>
                  <span className="q-name">Bytte av clutch</span>
                  <span className="q-price">12 800 kr</span>
                  <span className="q-chip ok">Akseptert</span>
                </div>
                <div className="qrow">
                  <span className="q-num">B-0025</span>
                  <span className="q-name">Hjulskift</span>
                  <span className="q-price">1 250 kr</span>
                  <span className="q-chip fakt">Fakturert</span>
                </div>
              </div>
            </div>
          </div>

          <div className="split-row reverse">
            <div className="split-text">
              <h2>Mekanikeren jobber rett på ordren</h2>
              <p>
                Stemple inn og ut, legg til deler, ta bilder og skriv
                kommentarer. Alt fra mobilen eller en felles skjerm i
                verkstedet.
              </p>
              <p>
                Timene rundes av slik dere selv har valgt, og interne notater
                blir hos dere. Det kunden skal se, havner på ordrelinjen.
              </p>
            </div>
            <div className="split-art">
              <img
                className="mock-photo"
                src="/design/mekaniker-med-telefon.png"
                alt="Mekaniker registrerer jobben på mobilen ved motorrommet"
                style={{ objectFit: "cover", objectPosition: "50% 18%" }}
              />
            </div>
          </div>

          <div className="split-row">
            <div className="split-text">
              <h2>Fra ordre til regnskap og faktura</h2>
              <p>
                Arbeid, deler og gebyrer ligger klare som ordrelinjer med riktig
                pris.
              </p>
              <p>
                Når jobben er ferdig, sender du ordren til fakturakontroll. Der
                rettes feil og mangler, før alt går videre til
                regnskapsprogrammet dere bruker. Det er der fakturaen sendes fra.
              </p>
            </div>
            <div className="split-art">
              <img
                className="mock-photo"
                src="/design/verksted-paa-monitor.png"
                alt="Ordren med ordrelinjer og priser på skjermen, klar til fakturakontroll"
                style={{ objectFit: "cover", objectPosition: "50% 32%" }}
              />
            </div>
          </div>
        </section>

        {/* ── CTA-banner midtveis ── */}
        <section className="cta-sec">
          <div className="cta-banner">
            <a className="btn btn-primary" href={SIGNUP_URL}>
              Prøv gratis i 14 dager
            </a>
            <p>I gang på fem minutter. Ingen binding.</p>
            <div className="cta-mascot">
              <ZenMascot />
            </div>
          </div>
        </section>

        {/* ── Mindre papirarbeid ── */}
        <section className="less-sec">
          <div className="less-inner">
            <h2>
              Mindre papirarbeid,
              <br />
              mer verksted
            </h2>
            <p className="less-sub">
              Når alt henger sammen i ordren, forsvinner dobbeltføringen, og
              tiden går til bilene i stedet.
            </p>
            <div className="less-points">
              <div className="less-point">
                <span className="lp-check">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <p>Timer og deler telles automatisk med på jobben.</p>
              </div>
              <div className="less-point">
                <span className="lp-check">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <p>Ingen tall skrives inn to ganger. Ordren blir til faktura.</p>
              </div>
              <div className="less-point">
                <span className="lp-check">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <p>Full oversikt over hva som er gjort, og hva som gjenstår.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
