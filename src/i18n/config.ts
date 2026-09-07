// Språkoppsett for nettsiden. Norsk (nb) er standard og ligger på rot-URL
// (verkstedpakken.no/pris). Andre språk får prefiks (verkstedpakken.no/en/pris).
export const LOCALES = ["nb", "en", "sv", "da", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "nb";

export const LOCALE_META: Record<
  Locale,
  { name: string; htmlLang: string; ogLocale: string; hreflang: string }
> = {
  nb: { name: "Norsk", htmlLang: "nb", ogLocale: "nb_NO", hreflang: "nb-NO" },
  en: { name: "English", htmlLang: "en", ogLocale: "en_GB", hreflang: "en" },
  sv: { name: "Svenska", htmlLang: "sv", ogLocale: "sv_SE", hreflang: "sv-SE" },
  da: { name: "Dansk", htmlLang: "da", ogLocale: "da_DK", hreflang: "da-DK" },
  de: { name: "Deutsch", htmlLang: "de", ogLocale: "de_DE", hreflang: "de-DE" },
};

export function isLocale(v: string | undefined): v is Locale {
  return LOCALES.includes(v as Locale);
}

/** Intern lenke med riktig språkprefiks. nb har ikke prefiks. */
export function localePath(lang: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  if (lang === DEFAULT_LOCALE) return clean || "/";
  return `/${lang}${clean}`;
}

/** Alle hreflang-varianter av en side, til metadata.alternates og sitemap. */
export function languageAlternates(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LOCALES) out[LOCALE_META[l].hreflang] = localePath(l, path);
  out["x-default"] = localePath(DEFAULT_LOCALE, path);
  return out;
}
