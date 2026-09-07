import Link from "next/link";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import InView from "@/components/vp/InView";
import { SIGNUP_URL } from "@/lib/links";
import { getDictionary } from "@/i18n";
import { isLocale, localePath, languageAlternates, LOCALE_META } from "@/i18n/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { home } = await getDictionary(lang);
  const alts = languageAlternates("/");
  return {
    title: { absolute: home.meta.title },
    description: home.meta.description,
    alternates: { canonical: alts[LOCALE_META[lang].hreflang], languages: alts },
    openGraph: { title: home.meta.title, description: home.meta.description },
  };
}

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default async function Home({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { home: t, common } = await getDictionary(lang);
  const [c1, c2, c3] = t.cols;
  const [p1, p2, p3] = t.panel1.cards;
  const [q1, q2, q3] = t.panel2.cards;
  return (
    <>
      <Header lang={lang} t={common} />
      <main className="page-home">
        {/* ─────────────── HERO ─────────────── */}
        <section className="hero">
          <div className="wrap">
            <h1>{t.hero.title}</h1>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href={SIGNUP_URL}>{t.hero.cta}</a>
            </div>
            <p className="subnote">{t.hero.subnote}</p>
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
              <h3>{c1.title}</h3>
              <p>{c1.text}</p>
            </div>
            <div className="col">
              <div className="art">
                <div className="fig zen-fig">
                  <RawSvg html={M_ZEN_FIG_SVG} />
                </div>
              </div>
              <h3>{c2.title}</h3>
              <p>{c2.text}</p>
            </div>
            <div className="col">
              <div className="art">
                <div className="fig">
                  <RawSvg html={M_SUPPORT_SVG} />
                </div>
              </div>
              <h3>{c3.title}</h3>
              <p>{c3.text}</p>
            </div>
          </InView>
        </section>

        {/* ─────────────── FEATURE PANEL ─────────────── */}
        <section className="panel-sec">
          <div className="panel">
            <h2>{t.panel1.title[0]}<br />{t.panel1.title[1]}</h2>
            <div className="panel-cards">
              <div className="pcard">
                <h3>{p1.title}</h3>
                <p>{p1.text}</p>
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
                <h3>{p2.title}</h3>
                <p>{p2.text}</p>
                <div className="illo">
                  <div className="ill ill-phone2">
                    <div className="frame">
                      <div className="scr">
                        <div className="hdr">{t.panel1.phoneHeader}</div>
                        <div className="jrow"><span className="jdot"></span><span className="jbars"><i></i><i className="sm"></i></span></div>
                        <div className="jrow active"><span className="jdot"></span><span className="jbars"><i></i><i className="sm"></i></span><span className="jtime">00:42</span></div>
                        <div className="jrow"><span className="jdot"></span><span className="jbars"><i></i><i className="sm"></i></span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pcard">
                <h3>{p3.title}</h3>
                <p>{p3.text}</p>
                <div className="illo">
                  <div className="ill ill-bubble">
                    <div className="bub">
                      <span className="bub-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
                      </span>
                      <div className="bub-lines"><span></span><span className="sm"></span></div>
                    </div>
                    <span className="chip">{t.panel1.chip}</span>
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
              <img loading="lazy" className="help-photo" src="/design/support-svarer-telefon.jpg" alt={t.help.photoAlt} />
            </div>
            <div className="help-copy">
              <h2>{t.help.title}</h2>
              <p>{t.help.p1}</p>
              <p>{t.help.p2}</p>
            </div>
          </div>
        </section>

        {/* ─────────────── CTA-BANNER ─────────────── */}
        <section className="cta-sec">
          <div className="cta-banner">
            <a className="btn btn-primary" href={SIGNUP_URL}>{t.ctaBanner.cta}</a>
            <p>{t.ctaBanner.note}</p>
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
              <h2>{t.split1.title}</h2>
              <p>{t.split1.text}</p>
              <Link className="split-link" href={localePath(lang, "/ordresystem")}>{t.split1.link}
                <Arrow />
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
                <RawSvg html={M_ORDER_BYTT_SVG(t.mascot.free, t.mascot.switchNow)} />
              </div>
            </div>
            <div className="split-text">
              <h2>{t.split2.title[0]}<br />{t.split2.title[1]}</h2>
              <p>{t.split2.text}</p>
              <Link className="split-link" href={localePath(lang, "/pris")}>{t.split2.link}
                <Arrow />
              </Link>
            </div>
          </div>
        </section>

        {/* ─────────────── INTEGRASJONER ─────────────── */}
        <section className="split-sec">
          <div className="split-row integ-row">
            <div className="split-text">
              <h2>{t.integ.title}</h2>
              <p>{t.integ.text}</p>
              <Link className="split-link" href={localePath(lang, "/integrasjoner")}>{t.integ.link}
                <Arrow />
              </Link>
            </div>
            <div className="split-art" style={{ justifyItems: "end" }}>
              <div className="integ-groups">
                <div className="logo-grid">
                  <div className="logo-card"><img loading="lazy" src="/design/logos/fiken.svg" alt="Fiken" /></div>
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
            <h2>{t.panel2.title[0]}<br />{t.panel2.title[1]}</h2>
            <div className="panel-cards">
              <div className="pcard">
                <h3>{q1.title}</h3>
                <p>{q1.text}</p>
                <div className="illo">
                  <div className="ill ill-site">
                    <div className="win">
                      <div className="win-bar"><i></i><i></i><i></i><span className="win-url"></span></div>
                      <div className="ws-nav">
                        <span className="ws-brand">{t.panel2.wsBrand}</span>
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
                <h3>{q2.title}</h3>
                <p>{q2.text}</p>
                <div className="illo">
                  <div className="ill ill-book">
                    <div className="bk">
                      <div className="bk-hdr">{t.panel2.bkHeader}</div>
                      <span className="bk-plate">{t.panel2.bkPlate}</span>
                      <div className="bk-msg"><span></span><span></span><span className="sm"></span></div>
                      <span className="bk-btn">{t.panel2.bkButton}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pcard">
                <h3>{q3.title}</h3>
                <p>{q3.text}</p>
                <div className="illo">
                  <div className="ill ill-track">
                    <div className="tk">
                      <div className="tk-hdr">{t.panel2.tkHeader}</div>
                      <div className="tk-car">Volkswagen Caddy</div>
                      <div className="tk-reg">UX 58585</div>
                      <div className="tk-steps">
                        <div className="tk-step done"><span className="tk-dot"></span><span className="tk-lbl">{t.panel2.tkSteps[0]}</span></div>
                        <div className="tk-step done"><span className="tk-dot"></span><span className="tk-lbl">{t.panel2.tkSteps[1]}</span></div>
                        <div className="tk-step now"><span className="tk-dot"></span><span className="tk-lbl">{t.panel2.tkSteps[2]}</span></div>
                        <div className="tk-step"><span className="tk-dot"></span><span className="tk-lbl">{t.panel2.tkSteps[3]}</span></div>
                      </div>
                      <div className="tk-foot"><span className="tk-foot-lbl">{t.panel2.tkFoot}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-link-row">
              <Link href={localePath(lang, "/nettside-og-booking")}>{t.panel2.link}
                <Arrow />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} t={common} />
    </>
  );
}
