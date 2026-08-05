import Link from "next/link";
import Logo from "./Logo";
import ZenMascot from "./ZenMascot";
import { SIGNUP_URL } from "@/lib/links";

/* Footer-CTA («Prøv gratis i 14 dager» + zen-maskot) og mørkeblå footer.
   NB: designreferansen oppga org.nr 913 412 354, men det reelle org.nr-et
   fra dagens side (937 000 847) beholdes — juridiske fakta følger ikke
   design-copy. */
export default function Footer() {
  return (
    <>
      <section className="foot-cta-sec">
        <div className="foot-cta-inner">
          <div className="foot-cta-card">
            <a className="btn btn-primary" href={SIGNUP_URL}>
              Prøv gratis i 14 dager
            </a>
            <p>Prøveperioden stopper av seg selv. Vi sender aldri faktura uten at du har sagt ja.</p>
          </div>
          <div className="foot-cta-mascot">
            <ZenMascot />
          </div>
        </div>
      </section>

      <footer className="site-foot">
        <div className="foot-inner">
          <div className="foot-brand">
            <Link href="/" aria-label="Verkstedpakken">
              <Logo />
            </Link>
            <p>Bygget for at du enkelt skal ha full kontroll.</p>
          </div>
          <div className="foot-col">
            <h4>Produkt</h4>
            <ul>
              <li>
                <Link href="/ordresystem">Verkstedprogram</Link>
              </li>
              <li>
                <Link href="/nettside-og-booking">Nettside og booking</Link>
              </li>
              <li>
                <Link href="/integrasjoner">Integrasjoner</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>Verkstedpakken AS&nbsp;&nbsp;·&nbsp;&nbsp;Org.nr 937 000 847</span>
          <span>
            Send e-post til{" "}
            <a href="mailto:hei@verkstedpakken.no">hei@verkstedpakken.no</a>,
            eller ring oss på <a href="tel:+4793484220">93 48 42 20</a>
          </span>
        </div>
      </footer>
    </>
  );
}
