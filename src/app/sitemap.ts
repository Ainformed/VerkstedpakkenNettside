import type { MetadataRoute } from "next";
import { LOCALES, LOCALE_META, localePath } from "@/i18n/config";

const SITE = "https://verkstedpakken.no";

const PAGES: { path: string; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/ordresystem", changeFrequency: "monthly", priority: 0.9 },
  { path: "/nettside-og-booking", changeFrequency: "monthly", priority: 0.9 },
  { path: "/integrasjoner", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pris", changeFrequency: "monthly", priority: 0.9 },
];

// Én oppføring per side per språk, med hreflang-alternates så Google ser
// at /en/pris og /pris er samme side på to språk.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.flatMap((p) => {
    const languages: Record<string, string> = {};
    for (const l of LOCALES) languages[LOCALE_META[l].hreflang] = `${SITE}${localePath(l, p.path)}`;
    languages["x-default"] = `${SITE}${localePath("nb", p.path)}`;
    return LOCALES.map((l) => ({
      url: `${SITE}${localePath(l, p.path)}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      // Norsk er hovedmarkedet; andre språk litt lavere.
      priority: l === "nb" ? p.priority : Math.round((p.priority - 0.2) * 10) / 10,
      alternates: { languages },
    }));
  });
}
