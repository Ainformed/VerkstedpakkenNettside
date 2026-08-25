import { describe, expect, it } from "vitest";
import {
  ADMIN_TRINN,
  MAKS_LISENSER,
  MEKANIKER_PRIS,
  MIN_ADMIN,
  MIN_MEKANIKERE,
  beregnManedspris,
  finnPris,
  formaterKr,
  hardtMellomrom,
  klemAntall,
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
    expect(MAKS_LISENSER).toBe(20);
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
