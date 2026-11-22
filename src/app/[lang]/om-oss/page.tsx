import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import OmOss from "@/lerret/OmOss";
import { lerretTekst, lerretTekster } from "@/lerret/tekster";
import { getDictionary } from "@/i18n";
import { isLocale, languageAlternates, LOCALE_META } from "@/i18n/config";
import { notFound } from "next/navigation";

// Håndskriften på polaroidene (lerretet: «Caveat»)
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["600", "700"] });

type Params = { params: Promise<{ lang: string }> };

// Ny side fra lerretet (22.11.2026). Tekstene står på norsk i komponenten; de andre språkene slås opp i src/lerret/tekster.
const TITTEL = "Om oss";
const BESKRIVELSE = "Hils på teamet bak Verkstedpakken: Oscar, Fredrik, Henrik og Nichlas.";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const alts = languageAlternates("/om-oss");
  return {
    title: lerretTekst(lang, TITTEL),
    description: lerretTekst(lang, BESKRIVELSE),
    alternates: { canonical: alts[LOCALE_META[lang].hreflang], languages: alts },
    openGraph: { title: lerretTekst(lang, TITTEL), description: lerretTekst(lang, BESKRIVELSE) },
  };
}

export default async function OmOssSide({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { common } = await getDictionary(lang);
  return (
    <>
      <Header lang={lang} t={common} />
      <div className={caveat.variable}>
        <OmOss lang={lang} tekster={lerretTekster(lang, "OmOss")} />
      </div>
      <Footer lang={lang} t={common} />
    </>
  );
}
