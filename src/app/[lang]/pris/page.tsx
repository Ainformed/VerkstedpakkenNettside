import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import Pris from "@/lerret/Pris";
import { lerretTekster } from "@/lerret/tekster";
import { getDictionary } from "@/i18n";
import { isLocale, languageAlternates, LOCALE_META } from "@/i18n/config";
import { notFound } from "next/navigation";
import { SIGNUP_URL } from "@/lib/links";
import { sjekkRabattkode } from "@/app/actions/rabattkode";
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

// Kalkulatoren øverst er Henriks fra verkstedpakken.no (PrisKalkulator.tsx fra main, uendret; stilene i pris.css
// ligger i .page-pris-kalk så de ikke blander seg med lerretets). Oscar 22.11.2026: «denne som er ute på verkstedpakken
// nå er helt perfekt egentlig bruk den». Resten av siden (Alt dette er gratis, tillegg, spørsmål) kommer fra lerretet,
// uten lerretets egen kalkulator (gen/patch_pris_henrik_kalk.py). Prisene og rabattsatsene står i src/lib/pricing.ts.
export default async function PrisSide({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { pris: t, common } = await getDictionary(lang);
  return (
    <>
      <Header lang={lang} t={common} />
      <main>
        <div className="page-pris-kalk">
          <section className="price-hero">
            <div className="phero-innhold">
              <h1 className="phero-title">{t.title}</h1>
              <PrisKalkulator lang={lang} t={t} />
            </div>
          </section>
        </div>
        <Pris
          lang={lang}
          skjema={t.calc.form}
          prisformat={t.priceFormat}
          tekster={lerretTekster(lang, "Pris")}
          signupUrl={SIGNUP_URL}
          sjekkKode={sjekkRabattkode}
        />
      </main>
      <Footer lang={lang} t={common} />
    </>
  );
}
