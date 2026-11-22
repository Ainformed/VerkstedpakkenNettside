import { describe, expect, it } from "vitest";
import {
  ADMIN_TRINN,
  MAKS_LISENSER,
  MAKS_TELLER,
  MEKANIKER_PRIS,
  MIN_ADMIN,
  MIN_MEKANIKERE,
  beregnManedspris,
  beregnPris,
  erGyldigKombinasjon,
  finnPris,
  formaterKr,
  formaterProsent,
  hardtMellomrom,
  klemAntall,
  rabattProsent,
} from "./pricing";

describe("ADMIN_TRINN", () => {
  it("er trappa fra superadmin per 2026-08-25", () => {
    expect(ADMIN_TRINN).toEqual([
      { min: 1, max: 3, pris: 1295 },
      { min: 4, max: 6, pris: 1095 },
      { min: 7, max: null, pris: 995 },
    ]);
  });
});

describe("finnPris", () => {
  it("treffer riktig trinn på hver overgang", () => {
    expect(finnPris(ADMIN_TRINN, 1)).toBe(1295);
    expect(finnPris(ADMIN_TRINN, 3)).toBe(1295);
    expect(finnPris(ADMIN_TRINN, 4)).toBe(1095);
    expect(finnPris(ADMIN_TRINN, 6)).toBe(1095);
    expect(finnPris(ADMIN_TRINN, 7)).toBe(995);
    expect(finnPris(ADMIN_TRINN, 200)).toBe(995);
  });

  it("tåler usortert trapp", () => {
    const usortert = [ADMIN_TRINN[2]!, ADMIN_TRINN[0]!, ADMIN_TRINN[1]!];
    expect(finnPris(usortert, 4)).toBe(1095);
    expect(finnPris(usortert, 7)).toBe(995);
  });
});

describe("beregnManedspris", () => {
  it("gir startprisen for én admin uten mekanikere", () => {
    expect(beregnManedspris(1, 0)).toEqual({ perAdmin: 1295, total: 1295 });
  });

  it("legger mekanikere til med flat pris", () => {
    // 1 + 1 = 2 lisenser — fortsatt første trinn.
    expect(beregnManedspris(1, 1)).toEqual({
      perAdmin: 1295,
      total: 1295 + 595,
    });
  });

  it("lar IKKE mekanikere telle mot trinnene — rabatten gjelder kun admin", () => {
    // 2 admin + 3 mekanikere: fortsatt bare 2 admin → første trinn.
    expect(beregnManedspris(2, 3)).toEqual({
      perAdmin: 1295,
      total: 2 * 1295 + 3 * 595,
    });
    expect(beregnManedspris(1, 6)).toEqual({
      perAdmin: 1295,
      total: 1295 + 6 * 595,
    });
  });

  it("treffer trinnene på antall admin alene", () => {
    expect(beregnManedspris(4, 3)).toEqual({
      perAdmin: 1095,
      total: 4 * 1095 + 3 * 595,
    });
    expect(beregnManedspris(7, 2)).toEqual({
      perAdmin: 995,
      total: 7 * 995 + 2 * 595,
    });
  });

  it("regner taket riktig", () => {
    expect(beregnManedspris(20, 0)).toEqual({ perAdmin: 995, total: 19900 });
  });
});

describe("MEKANIKER_PRIS og grenser", () => {
  it("holder tallene siden er bygget rundt", () => {
    expect(MEKANIKER_PRIS).toBe(595);
    expect(MIN_ADMIN).toBe(1);
    expect(MIN_MEKANIKERE).toBe(0);
    expect(MAKS_LISENSER).toBe(10);
    expect(MAKS_TELLER).toBe(99);
  });
});

describe("klemAntall", () => {
  it("klemmer til oppgitt område", () => {
    expect(klemAntall(0, 1, 20)).toBe(1);
    expect(klemAntall(-5, 0, 20)).toBe(0);
    expect(klemAntall(1, 1, 20)).toBe(1);
    expect(klemAntall(20, 1, 20)).toBe(20);
    expect(klemAntall(21, 1, 20)).toBe(20);
    // Mekaniker-telleren kan gå til null …
    expect(klemAntall(-1, 0, 19)).toBe(0);
    // … og taket avhenger av den andre telleren.
    expect(klemAntall(999, 0, 17)).toBe(17);
  });

  it("kutter desimaler og håndterer NaN", () => {
    expect(klemAntall(4.9, 1, 20)).toBe(4);
    expect(klemAntall(Number.NaN, 1, 20)).toBe(1);
    expect(klemAntall(Number.POSITIVE_INFINITY, 1, 20)).toBe(1);
  });
});

describe("formaterKr", () => {
  it("skriver beløp som siden gjør i dag, med hardt mellomrom", () => {
    expect(formaterKr(1295)).toBe("1 295,-");
    expect(formaterKr(3975)).toBe("3 975,-");
    expect(formaterKr(595)).toBe("595,-");
  });

  it("bruker hardt mellomrom, uansett hva Intl gir oss", () => {
    expect(formaterKr(4780).charCodeAt(1)).toBe(0x00a0);
    expect(formaterKr(4780)).not.toMatch(/ /);
  });
});

describe("hardtMellomrom", () => {
  it("gjør vanlig mellomrom om til hardt", () => {
    expect(hardtMellomrom("1 295")).toBe("1 295");
  });

  it("gjør smalt hardt mellomrom om til hardt", () => {
    // U+202F er det CLDR i perioder har brukt som tusenskille for nb-NO.
    expect(hardtMellomrom("1 295")).toBe("1 295");
  });

  it("lar hardt mellomrom stå", () => {
    expect(hardtMellomrom("1 295")).toBe("1 295");
  });
});

describe("rabattProsent", () => {
  it("legger bindingsrabatt og betalingsrabatt sammen", () => {
    // Binding 1 måned / 6 måneder / 1 år, betaling månedlig / halvårlig / årlig.
    expect(rabattProsent(0, 0)).toBe(0);
    expect(rabattProsent(1, 0)).toBe(7.5);
    expect(rabattProsent(1, 1)).toBe(15);
    expect(rabattProsent(2, 0)).toBe(15);
    expect(rabattProsent(2, 1)).toBe(22.5);
    expect(rabattProsent(2, 2)).toBe(30);
  });
});

describe("erGyldigKombinasjon", () => {
  it("lar betalingen være like lang som bindingen, men ikke lengre", () => {
    expect(erGyldigKombinasjon(0, 0)).toBe(true);
    expect(erGyldigKombinasjon(0, 1)).toBe(false);
    expect(erGyldigKombinasjon(1, 1)).toBe(true);
    expect(erGyldigKombinasjon(1, 2)).toBe(false);
    expect(erGyldigKombinasjon(2, 2)).toBe(true);
    expect(erGyldigKombinasjon(2, 0)).toBe(true);
  });
});

describe("beregnPris", () => {
  it("gir samme tall som beregnManedspris uten valg", () => {
    const p = beregnPris(2, 3, 0, 0);
    expect(p.perAdmin).toBe(1295);
    expect(p.perMekaniker).toBe(595);
    expect(p.totalManed).toBe(2 * 1295 + 3 * 595);
    expect(p.prosent).toBe(0);
    expect(p.spartManed).toBe(0);
    expect(p.sparProsent).toBe(0);
    expect(p.totalPeriode).toBe(p.totalManed);
    expect(p.maneder).toBe(1);
  });

  it("runder hver lisenspris til hele kroner og summerer de avrundede prisene", () => {
    // 1 år + månedlig = 15 %: 1295 → 1100,75 → 1101 og 595 → 505,75 → 506.
    const p = beregnPris(2, 2, 2, 0);
    expect(p.prosent).toBe(15);
    expect(p.perAdmin).toBe(1101);
    expect(p.perMekaniker).toBe(506);
    expect(p.totalManed).toBe(2 * 1101 + 2 * 506);
    expect(p.spartManed).toBe(3780 - p.totalManed);
  });

  it("ganger totalen opp til betalingsperioden", () => {
    const halvaar = beregnPris(2, 2, 2, 1);
    expect(halvaar.maneder).toBe(6);
    expect(halvaar.totalPeriode).toBe(halvaar.totalManed * 6);
    expect(halvaar.spartPeriode).toBe(halvaar.spartManed * 6);

    const aar = beregnPris(2, 2, 2, 2);
    expect(aar.prosent).toBe(30);
    expect(aar.maneder).toBe(12);
    expect(aar.totalPeriode).toBe(aar.totalManed * 12);
  });

  it("regner mengderabatten på admin med i sparingen, målt mot startprisen", () => {
    // 4 admin → trinn 1 095. Uten valg: sparer (1295 − 1095) × 4 = 800.
    const p = beregnPris(4, 0, 0, 0);
    expect(p.perAdminListe).toBe(1095);
    expect(p.perAdmin).toBe(1095);
    expect(p.spartManed).toBe(800);
    expect(p.sparProsent).toBe(15.5); // 800 / 5180 = 15,4 % → nærmeste halve
    // Med 1 år: 1095 × 0,85 = 930,75 → 931.
    const medBinding = beregnPris(4, 0, 2, 0);
    expect(medBinding.perAdmin).toBe(931);
    expect(medBinding.spartManed).toBe(4 * 1295 - 4 * 931);
  });

  it("lar mekaniker-prisen få bindings- og betalingsrabatt, men ikke mengderabatt", () => {
    const p = beregnPris(7, 1, 2, 2);
    expect(p.perMekaniker).toBe(417); // 595 × 0,7 = 416,5
    expect(p.perAdminListe).toBe(995);
    expect(p.perAdmin).toBe(697); // 995 × 0,7 = 696,5
  });

  it("avviser ugyldige kombinasjoner ved å regne betalingen som månedlig", () => {
    expect(beregnPris(1, 0, 0, 2)).toEqual(beregnPris(1, 0, 0, 0));
  });

  it("holder de halve satsene hele veien: 7,5 % og 22,5 % blir ikke rundet bort", () => {
    // 6 måneder + månedlig = 7,5 %: 1295 → 1197,875 → 1198 og 595 → 550,375 → 550.
    const seks = beregnPris(1, 1, 1, 0);
    expect(seks.prosent).toBe(7.5);
    expect(seks.perAdmin).toBe(1198);
    expect(seks.perMekaniker).toBe(550);
    expect(seks.adminSparProsent).toBe(7.5);
    expect(seks.mekanikerSparProsent).toBe(7.5);
    expect(seks.sparProsent).toBe(7.5);
    // 6 måneder + halvårlig = 15 %.
    expect(beregnPris(1, 1, 1, 1).prosent).toBe(15);
    // 1 år + halvårlig = 22,5 %: 1295 → 1003,625 → 1004 og 595 → 461,125 → 461.
    const aar = beregnPris(1, 1, 2, 1);
    expect(aar.prosent).toBe(22.5);
    expect(aar.perAdmin).toBe(1004);
    expect(aar.perMekaniker).toBe(461);
    expect(aar.adminSparProsent).toBe(22.5);
    expect(aar.mekanikerSparProsent).toBe(22.5);
    expect(aar.sparProsent).toBe(22.5);
    // 1 år + årlig = 30 %: 1295 → 906,5 → 907 og 595 → 416,5 → 417.
    const maks = beregnPris(1, 1, 2, 2);
    expect(maks.perAdmin).toBe(907);
    expect(maks.perMekaniker).toBe(417);
    expect(maks.adminSparProsent).toBe(30);
    expect(maks.mekanikerSparProsent).toBe(30);
  });
});

describe("formaterProsent", () => {
  it("skriver halve prosent med språkets desimaltegn og hele uten desimal", () => {
    expect(formaterProsent(7.5, "nb-NO")).toBe("7,5");
    expect(formaterProsent(22.5, "de-DE")).toBe("22,5");
    expect(formaterProsent(7.5, "en-GB")).toBe("7.5");
    expect(formaterProsent(15, "nb-NO")).toBe("15");
    expect(formaterProsent(30, "sv-SE")).toBe("30");
  });
});
