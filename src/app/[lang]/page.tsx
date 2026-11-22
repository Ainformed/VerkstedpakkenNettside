import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import Forside from "@/lerret/Forside";
import { lerretTekster } from "@/lerret/tekster";
import { getDictionary } from "@/i18n";
import { isLocale, languageAlternates, LOCALE_META } from "@/i18n/config";
import { notFound } from "next/navigation";

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

// Innholdet er flyttet fra lerretet (22.11.2026). Tekstene står på norsk i komponenten; de andre språkene slås opp i
// src/lerret/tekster. Metadataene over er som før.
export default async function Side({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { common } = await getDictionary(lang);
  return (
    <>
      <Header lang={lang} t={common} />
      <Forside lang={lang} tekster={lerretTekster(lang, "Forside")} />
      <Footer lang={lang} t={common} />
    </>
  );
}
