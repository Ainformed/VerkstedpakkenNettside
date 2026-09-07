import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import { getDictionary } from "@/i18n";
import { isLocale, languageAlternates, LOCALE_META } from "@/i18n/config";
import { notFound } from "next/navigation";
import ZenMascot from "@/components/vp/ZenMascot";
import { SIGNUP_URL } from "@/lib/links";
import "./ordresystem.css";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { ordresystem } = await getDictionary(lang);
  const alts = languageAlternates("/ordresystem");
  return {
    title: ordresystem.meta.title,
    description: ordresystem.meta.description,
    alternates: { canonical: alts[LOCALE_META[lang].hreflang], languages: alts },
    openGraph: { title: ordresystem.meta.title, description: ordresystem.meta.description },
  };
}

const QUOTE_CHIP = ["venter", "ok", "fakt"] as const;

export default async function Ordresystem({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { ordresystem: t, common } = await getDictionary(lang);
  const [r1, r2, r3, r4] = t.rows;
  return (
    <>
      <Header lang={lang} t={common} />
      <main className="page-ordresystem">
        <section className="hero feat-hero vo-hero-split">
          <div className="vo-hero-grid">
            <div className="vo-hero-copy">
              <h1>{t.hero.title}</h1>
              <p className="lead">{t.hero.lead}</p>
              <div className="cta-row">
                <a className="btn btn-primary btn-lg" href={SIGNUP_URL}>
                  {t.hero.cta}
                </a>
              </div>
            </div>
            <div className="vo-hero-art">
              <div className="fig">
                <img
                  className="m-fig m-order"
                  src="/design/muttern-holder-ordre.svg"
                  alt={t.hero.artAlt}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Split-rader: dybde ── */}
        <section className="split-sec">
          <div className="split-row reverse">
            <div className="split-text">
              <h2>{r1.title}</h2>
              <p>{r1.p1}</p>
              <p>{r1.p2}</p>
            </div>
            <div className="split-art">
              <img
                loading="lazy"
                className="mock-photo"
                src="/design/ordreoversikt-laptop.jpg"
                alt={r1.imgAlt}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="split-row">
            <div className="split-text">
              <h2>{r2.title}</h2>
              <p>{r2.p1}</p>
              <p>{r2.p2}</p>
            </div>
            <div className="split-art">
              <div className="ill ill-quotes" aria-hidden="true">
                {t.quotes.map((q, i) => (
                  <div className="qrow" key={q.num}>
                    <span className="q-num">{q.num}</span>
                    <span className="q-name">{q.name}</span>
                    <span className="q-price">{q.price}</span>
                    <span className={`q-chip ${QUOTE_CHIP[i]}`}>{q.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="split-row reverse">
            <div className="split-text">
              <h2>{r3.title}</h2>
              <p>{r3.p1}</p>
              <p>{r3.p2}</p>
            </div>
            <div className="split-art">
              <img
                loading="lazy"
                className="mock-photo"
                src="/design/mekaniker-med-telefon.png"
                alt={r3.imgAlt}
                style={{ objectFit: "cover", objectPosition: "50% 18%" }}
              />
            </div>
          </div>

          <div className="split-row">
            <div className="split-text">
              <h2>{r4.title}</h2>
              <p>{r4.p1}</p>
              <p>{r4.p2}</p>
            </div>
            <div className="split-art">
              <img
                loading="lazy"
                className="mock-photo"
                src="/design/verksted-paa-monitor.png"
                alt={r4.imgAlt}
                style={{ objectFit: "cover", objectPosition: "50% 32%" }}
              />
            </div>
          </div>
        </section>

        {/* ── CTA-banner midtveis ── */}
        <section className="cta-sec">
          <div className="cta-banner">
            <a className="btn btn-primary" href={SIGNUP_URL}>
              {t.ctaBanner.cta}
            </a>
            <p>{t.ctaBanner.note}</p>
            <div className="cta-mascot">
              <ZenMascot />
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} t={common} />
    </>
  );
}
