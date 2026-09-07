import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import { getDictionary } from "@/i18n";
import { isLocale, languageAlternates, LOCALE_META } from "@/i18n/config";
import { notFound } from "next/navigation";
import PrisKalkulator from "./PrisKalkulator";
import "./pris.css";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { pris } = await getDictionary(lang);
  const alts = languageAlternates("/pris");
  return {
    title: pris.meta.title,
    description: pris.meta.description,
    alternates: { canonical: alts[LOCALE_META[lang].hreflang], languages: alts },
    openGraph: { title: pris.meta.title, description: pris.meta.description },
  };
}

export default async function Pris({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { pris: t, common } = await getDictionary(lang);
  return (
    <>
      <Header lang={lang} t={common} />
      <main className="page-pris">
        {/* ── Pris-hero: to lisenstyper, sett opp bedriften og se prisen ── */}
        <section className="price-hero">
          <div className="phero-innhold">
            <h1 className="phero-title">{t.title}</h1>
            <PrisKalkulator lang={lang} t={t} />
          </div>
        </section>

        <div className="price-band">
          {/* ── Inkludert ── */}
          <section className="page-sec">
            <div className="plist-wrap">
              <div className="sec-title-c">
                <h2>{t.included.title}</h2>
                <p>{t.included.subtitle}</p>
              </div>
              <div className="plist">
                {t.included.groups.map((g) => (
                  <div key={g.label} style={{ display: "contents" }}>
                    <div className="pgroup-label">{g.label}</div>
                    {g.items.map((it) => (
                      <div className="prow-flat" key={it.name}>
                        <span className="pname">
                          {it.name}
                          {"note" in it && it.note ? <> <small>{it.note}</small></> : null}
                        </span>
                        <span className="pill pill-inc">{t.included.pill}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Tilleggstjenester ── */}
          <section className="page-sec" style={{ paddingTop: "20px" }}>
            <div className="plist-wrap">
              <div className="sec-title-c">
                <h2>{t.addons.title}</h2>
                <p>{t.addons.subtitle}</p>
              </div>
              <div className="plist">
                {t.addons.groups.map((g) => (
                  <div key={g.label} style={{ display: "contents" }}>
                    <div className="pgroup-label">{g.label}</div>
                    {g.items.map((it) => (
                      <div className="prow-flat" key={it.name}>
                        <span className="pname">
                          {it.name}
                          {it.note ? <small>{it.note}</small> : null}
                        </span>
                        <span className={`pill ${it.soon ? "pill-soon" : "pill-price"}`}>
                          {it.price}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="pnote">
                <span>{t.addons.note}</span>
              </div>
              <p className="pfine">{t.addons.fine}</p>
            </div>
          </section>
        </div>

        {/* ── FAQ ── */}
        <section className="page-sec" style={{ paddingTop: "20px" }}>
          <div className="faq-wrap">
            <div className="sec-title-c">
              <h2>{t.faq.title}</h2>
            </div>
            {t.faq.items.map((f) => (
              <details className="faq" key={f.q}>
                <summary>{f.q}</summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer lang={lang} t={common} />
    </>
  );
}
