import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import NettsideOgBooking from "@/lerret/NettsideOgBooking";
import { lerretTekster } from "@/lerret/tekster";
import { getDictionary } from "@/i18n";
import { isLocale, languageAlternates, LOCALE_META } from "@/i18n/config";
import { notFound } from "next/navigation";

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

// Innholdet er flyttet fra lerretet (22.11.2026). Tekstene står på norsk i komponenten; de andre språkene slås opp i
// src/lerret/tekster. Metadataene over er som før.
export default async function Side({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { common } = await getDictionary(lang);
  return (
    <>
      <Header lang={lang} t={common} />
      <NettsideOgBooking lang={lang} tekster={lerretTekster(lang, "NettsideOgBooking")} />
      <Footer lang={lang} t={common} />
    </>
  );
}
