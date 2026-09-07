import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/nb";

// Én ordbok per språk, lastet lat så bare det aktive språket havner i bundelen.
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  nb: () => import("./dictionaries/nb").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
  sv: () => import("./dictionaries/sv").then((m) => m.default),
  da: () => import("./dictionaries/da").then((m) => m.default),
  de: () => import("./dictionaries/de").then((m) => m.default),
};

export function getDictionary(lang: Locale): Promise<Dictionary> {
  return loaders[lang]();
}

export type { Dictionary };
export * from "./config";
