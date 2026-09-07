import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import { getDictionary } from "@/i18n";
import { isLocale, languageAlternates, LOCALE_META } from "@/i18n/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SIGNUP_URL } from "@/lib/links";
import "./booking.css";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { booking } = await getDictionary(lang);
  const alts = languageAlternates("/nettside-og-booking");
  return {
    title: booking.meta.title,
    description: booking.meta.description,
    alternates: { canonical: alts[LOCALE_META[lang].hreflang], languages: alts },
    openGraph: { title: booking.meta.title, description: booking.meta.description },
  };
}

const Check = () => (
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
);

export default async function NettsideOgBookingPage({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { booking: t, common } = await getDictionary(lang);
  return (
    <>
      <Header lang={lang} t={common} />
      <main className="page-booking">
        {/* ── Hero ── */}
        <section className="hero feat-hero nb-hero-split">
          <div className="nb-hero-grid">
            <div className="nb-hero-copy">
              <h1>{t.hero.title}</h1>
              <p className="lead">{t.hero.lead}</p>
              <div className="cta-row">
                <a className="btn btn-primary btn-lg" href={SIGNUP_URL}>
                  {t.hero.cta}
                </a>
              </div>
            </div>
            <div className="nb-hero-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="m-fig"
                src="/design/muttern-support-hei.svg"
                alt={t.hero.artAlt}
              />
            </div>
          </div>
        </section>

        {/* ════════ 1 · NETTSIDE ════════ */}
        <section className="split-sec" style={{ paddingBottom: "30px" }}>
          <div className="split-row reverse">
            <div className="split-text">
              <h2>{t.site.title}</h2>
              <p>{t.site.p1}</p>
              <p>{t.site.p2}</p>
            </div>
            <div className="split-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                className="mock-photo"
                src="/design/kundenettside-laptop-2.jpg"
                alt={t.site.photoAlt}
              />
            </div>
          </div>
        </section>

        {/* ════════ 2 · BOOKINGPORTAL ════════ */}
        <section className="split-sec" style={{ paddingTop: 0, paddingBottom: "30px" }}>
          <div className="split-row">
            <div className="split-text">
              <h2>{t.portal.title}</h2>
              <p>{t.portal.p1}</p>
              <p>{t.portal.p2}</p>
            </div>
            <div className="split-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                className="mock-photo"
                src="/design/forespoersel-mobil.jpg"
                alt={t.portal.photoAlt}
              />
            </div>
          </div>
        </section>

        {/* ════════ 3 · KUNDENS OPPLEVELSE ════════ */}
        <div className="nb-cx-head">
          <h2>{t.cx.title}</h2>
          <p>{t.cx.sub}</p>
        </div>
        <section className="nb-cx-sec">
          <div className="nb-cx">
            <div className="nb-steps">
              {t.cx.steps.map((s, i) => (
                <div className="nb-step" key={i}>
                  <span className="nb-dot">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
            <div
              className="nb-phone"
              aria-label={t.cx.phone.aria}
            >
              <div className="nb-ph-hdr">
                <span className="av">B</span>
                <div>
                  <div className="nm">{t.cx.phone.name}</div>
                  <div className="sb">{t.cx.phone.sub}</div>
                </div>
              </div>
              <div className="nb-ph-body">
                <div className="nb-bub in">
                  <span className="bt">{t.cx.phone.offerTitle}</span>
                  <span className="bs">{t.cx.phone.offerSub}</span>
                  <span className="b-link">{t.cx.phone.offerLink}</span>
                </div>
                <div className="nb-bub out">
                  <span className="bt">{t.cx.phone.acceptedTitle}</span>
                  <span className="bs">{t.cx.phone.acceptedSub}</span>
                </div>
                <div className="nb-ph-status">{t.cx.phone.delivered}</div>
                <div className="nb-bub in">{t.cx.phone.confirmed}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Lyseblått felt ── */}
        <section className="less-sec">
          <div className="less-inner">
            <h2>
              {t.less.title[0]}
              <br />
              {t.less.title[1]}
            </h2>
            <p className="less-sub">{t.less.sub}</p>
            <div className="less-points">
              {t.less.points.map((p) => (
                <div className="less-point" key={p}>
                  <span className="lp-check">
                    <Check />
                  </span>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} t={common} />
    </>
  );
}
