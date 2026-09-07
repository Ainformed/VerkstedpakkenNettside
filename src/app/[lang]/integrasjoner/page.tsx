import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import { getDictionary } from "@/i18n";
import { isLocale, languageAlternates, LOCALE_META } from "@/i18n/config";
import { notFound } from "next/navigation";
import IntegrationCatalog from "./IntegrationCatalog";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { integrasjoner: t } = await getDictionary(lang);
  const alts = languageAlternates("/integrasjoner");
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: alts[LOCALE_META[lang].hreflang], languages: alts },
    openGraph: { title: t.meta.title, description: t.meta.description },
  };
}

export default async function Integrasjoner({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { integrasjoner: t, common } = await getDictionary(lang);
  return (
    <>
      <Header lang={lang} t={common} />
      <main className="page-integrasjoner">
        <section className="hero feat-hero">
          <div className="wrap">
            <h1>{t.hero.title}</h1>
            <p className="lead">{t.hero.lead}</p>
          </div>
        </section>

        <IntegrationCatalog t={t} />

        <section className="page-sec" style={{ paddingTop: 0 }}>
          <div className="faq-wrap">
            <div className="sec-title-c">
              <h2>{t.api.title}</h2>
              <p>
                {t.api.textBefore}{" "}
                <a
                  href="mailto:hei@verkstedpakken.no"
                  style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  hei@verkstedpakken.no
                </a>
                {t.api.textAfter}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} t={common} />
    </>
  );
}
