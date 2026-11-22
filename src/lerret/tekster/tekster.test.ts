import { describe, expect, it } from "vitest";
import nokler from "./nokler.json";
import en from "./en.json";
import sv from "./sv.json";
import da from "./da.json";
import de from "./de.json";

// Alle tekstene på sidene fra lerretet skal finnes på alle språk, uten lange tankestreker (– og —).
const SPRAAK: Record<string, Record<string, string>> = { en, sv, da, de };
const alle = [...new Set(Object.values(nokler).flat())];

describe("Tekstene fra lerretet", () => {
  it("norsk: ingen lange tankestreker", () => {
    expect(alle.filter((k) => /[–—]/.test(k))).toEqual([]);
  });
  for (const [lang, ordbok] of Object.entries(SPRAAK)) {
    it(`${lang}: alle tekstene er oversatt`, () => {
      expect(alle.filter((k) => !ordbok[k]?.trim())).toEqual([]);
    });
    it(`${lang}: ingen tekster som ikke brukes lenger`, () => {
      const brukt = new Set(alle);
      expect(Object.keys(ordbok).filter((k) => !brukt.has(k))).toEqual([]);
    });
    it(`${lang}: ingen lange tankestreker`, () => {
      expect(Object.entries(ordbok).filter(([, v]) => /[–—]/.test(v))).toEqual([]);
    });
  }
});
