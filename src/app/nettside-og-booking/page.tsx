import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import { SIGNUP_URL } from "@/lib/links";
import "./booking.css";

export const metadata = {
  title: "Nettside og booking",
  description:
    "Ferdig nettside der kunden sender forespørsel når det passer dem, og får et tilbud tilbake. Dere svarer når det passer dere.",
  alternates: { canonical: "/nettside-og-booking" },
};

export default function NettsideOgBookingPage() {
  return (
    <>
      <Header />
      <main className="page-booking">
        {/* ── Hero ── */}
        <section className="hero feat-hero nb-hero-split">
          <div className="nb-hero-grid">
            <div className="nb-hero-copy">
              <h1>Nettside og booking, ferdig fra start</h1>
              <p className="lead">
                Ferdig nettside der kunden sender forespørsel når det passer
                dem, og får et tilbud tilbake. Dere svarer når det passer dere.
              </p>
              <div className="cta-row">
                <a className="btn btn-primary btn-lg" href={SIGNUP_URL}>
                  Prøv gratis i 14 dager
                </a>
              </div>
            </div>
            <div className="nb-hero-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="m-fig"
                src="/design/muttern-support-hei.svg"
                alt="Muttern med headset hilser velkommen"
              />
            </div>
          </div>
        </section>

        {/* ════════ 1 · NETTSIDE ════════ */}
        <section className="split-sec" style={{ paddingBottom: "30px" }}>
          <div className="split-row reverse">
            <div className="split-text">
              <h2>Ferdig nettside med deres profil</h2>
              <p>
                Logo, åpningstider og tjenester. Vi setter den opp for 495 kr i
                måneden.
              </p>
              <p>
                Siden fungerer like godt på mobil som på PC, og kundene finner
                dere når de søker.
              </p>
            </div>
            <div className="split-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mock-photo"
                src="/design/kundenettside-laptop.jpg"
                alt="Bolli Motors ferdige nettside på laptopen"
              />
            </div>
          </div>
        </section>

        {/* ════════ 2 · BOOKINGPORTAL ════════ */}
        <section className="split-sec" style={{ paddingTop: 0, paddingBottom: "30px" }}>
          <div className="split-row">
            <div className="split-text">
              <h2>Forespørsler hele døgnet</h2>
              <p>
                Bookingportalen er gratis og inkludert. Koble den til nettsiden
                dere har fra før, eller den vi lager for dere.
              </p>
              <p>
                Kunden fyller inn skiltnummer og velger tjeneste. Forespørselen
                kommer rett inn som en ordre.
              </p>
            </div>
            <div className="split-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mock-photo"
                src="/design/forespoersel-mobil.jpg"
                alt="Kunden sender forespørsel i bookingportalen på mobilen"
              />
            </div>
          </div>
        </section>

        {/* ════════ 3 · KUNDENS OPPLEVELSE ════════ */}
        <div className="nb-cx-head">
          <h2>Kunden godtar med ett trykk</h2>
          <p>Dere foreslår tid og pris. Kunden mottar varsel på SMS eller e-post.</p>
        </div>
        <section className="nb-cx-sec">
          <div className="nb-cx">
            <div className="nb-steps">
              <div className="nb-step">
                <span className="nb-dot">1</span>
                <h3>Dere foreslår tid og pris</h3>
                <p>Svar rett fra ordren i systemet.</p>
              </div>
              <div className="nb-step">
                <span className="nb-dot">2</span>
                <h3>Kunden får SMS eller e-post</h3>
                <p>Forslaget kommer dit kunden er.</p>
              </div>
              <div className="nb-step">
                <span className="nb-dot">3</span>
                <h3>Godtar eller avslår med ett trykk</h3>
                <p>Kunden åpner lenken og svarer uten innlogging.</p>
              </div>
              <div className="nb-step">
                <span className="nb-dot">4</span>
                <h3>Jobben ligger i kalenderen</h3>
                <p>Pris og tid er bekreftet, jobben står klar som ordre.</p>
              </div>
            </div>
            <div
              className="nb-phone"
              aria-label="SMS-samtale mellom verkstedet og kunden"
            >
              <div className="nb-ph-hdr">
                <span className="av">B</span>
                <div>
                  <div className="nm">Bakken Bilverksted</div>
                  <div className="sb">SMS · i dag 09:12</div>
                </div>
              </div>
              <div className="nb-ph-body">
                <div className="nb-bub in">
                  <span className="bt">Tilbud: EU-kontroll · BS 77410</span>
                  <span className="bs">
                    Foreslått: torsdag 16. kl. 08:00 · 990 kr
                  </span>
                  <span className="b-link">Se og svar på tilbudet</span>
                </div>
                <div className="nb-bub out">
                  <span className="bt">Tilbud godtatt</span>
                  <span className="bs">
                    Kommentar: «Kan dere også sjekke AC-en?»
                  </span>
                </div>
                <div className="nb-ph-status">Levert 09:14</div>
                <div className="nb-bub in">
                  Bestillingen er bekreftet: torsdag 16. kl. 08:00. Du får en
                  påminnelse dagen før.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Lyseblått felt ── */}
        <section className="less-sec">
          <div className="less-inner">
            <h2>
              Færre telefoner,
              <br />
              fullere kalender
            </h2>
            <p className="less-sub">
              Ingen kan ta telefonen døgnet rundt. Bookingportalen tar imot
              forespørsler også når verkstedet er stengt.
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
                <p>Forespørsler hele døgnet, også utenom åpningstid.</p>
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
                <p>Forespørsler og tilbud blir til ordre av seg selv.</p>
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
                <p>Kunden godtar eller avslår på SMS eller e-post.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
