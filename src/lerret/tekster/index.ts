import nokler from "./nokler.json";
import en from "./en.json";
import sv from "./sv.json";
import da from "./da.json";
import de from "./de.json";
import type { Locale } from "@/i18n/config";

/* Tekstene på sidene fra lerretet står på norsk i komponentene (src/lerret/*.jsx). På de andre språkene slås hver
   tekst opp i <språk>.json, med den norske teksten som nøkkel. nokler.json lages av gen/til_react.py og viser hvilke
   tekster hver side bruker; testen i tekster.test.ts passer på at alle er oversatt. */
export type LerretSide = keyof typeof nokler;
type Ordbok = Record<string, string>;

const SPRAAK: Partial<Record<Locale, Ordbok>> = { en, sv, da, de };

/** Oversettelsene en side trenger på språket. Norsk gir undefined: da vises teksten som står i komponenten. */
export function lerretTekster(lang: Locale, side: LerretSide): Ordbok | undefined {
  const ordbok = SPRAAK[lang];
  if (!ordbok) return undefined;
  const ut: Ordbok = {};
  for (const k of nokler[side]) if (ordbok[k]) ut[k] = ordbok[k];
  return ut;
}

/** Én tekst på språket, med norsk som reserve (brukes til metadata). */
export function lerretTekst(lang: Locale, s: string): string {
  return SPRAAK[lang]?.[s] || s;
}
