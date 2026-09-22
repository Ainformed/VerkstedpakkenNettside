import Link from "next/link";
import Logo from "./Logo";
import ZenMascot from "./ZenMascot";
import LangSwitcher from "./LangSwitcher";
import { SIGNUP_URL } from "@/lib/links";
import { localePath, type Locale } from "@/i18n/config";
import type { CommonDict } from "@/i18n/dictionaries/nb";

/* Footer-CTA («Prøv gratis i 14 dager» + zen-maskot) og mørkeblå footer.
   NB: designreferansen oppga org.nr 913 412 354, men det reelle org.nr-et
   fra dagens side (937 000 847) beholdes — juridiske fakta følger ikke
   design-copy. */
export default function Footer({ lang, t }: { lang: Locale; t: CommonDict }) {
  return (
    <>
      <section className="foot-cta-sec">
        <div className="foot-cta-inner">
          <div className="foot-cta-card">
            <a className="btn btn-primary" href={SIGNUP_URL}>
              {t.footer.ctaButton}
            </a>
            <p>{t.footer.ctaNote}</p>
          </div>
          <div className="foot-cta-mascot">
            <ZenMascot />
          </div>
        </div>
      </section>

      <footer className="site-foot">
        <div className="foot-inner">
          <div className="foot-brand">
            <Link href={localePath(lang, "/")} aria-label="Verkstedpakken">
              <Logo />
            </Link>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="foot-col">
            <h4>{t.footer.product}</h4>
            <ul>
              <li>
                <Link href={localePath(lang, "/ordresystem")}>{t.nav.ordresystem}</Link>
              </li>
              <li>
                <Link href={localePath(lang, "/nettside-og-booking")}>{t.nav.booking}</Link>
              </li>
              <li>
                <Link href={localePath(lang, "/integrasjoner")}>{t.nav.integrasjoner}</Link>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>{t.nav.language}</h4>
            <LangSwitcher lang={lang} label={t.nav.language} className="lang-switch-foot" />
          </div>
        </div>
        <div className="foot-bottom">
          <span>{t.footer.orgLine}</span>
          <span>
            {t.footer.contactPrefix}{" "}
            <a href="mailto:x@verkstedpakken.no">x@verkstedpakken.no</a>
            {t.footer.contactMiddle} <a href="tel:+4793484220">93 48 42 20</a>
          </span>
        </div>
      </footer>
    </>
  );
}
