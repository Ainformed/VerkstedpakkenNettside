import { describe, expect, it } from "vitest";
import {
  FALLBACK_TRINN,
  finnPris,
  formaterKr,
  klemAntall,
  parseTrinn,
  sorterTrinn,
  type Pristrinn,
} from "./pricing";

// Prod-trappa per 2026-08-06. Testene her er fasit for trinnovergangene.
const TRAPP: Pristrinn[] = [
  { min: 1, max: 3, pris: 1295 },
  { min: 4, max: 10, pris: 1195 },
  { min: 11, max: 20, pris: 995 },
  { min: 21, max: 50, pris: 895 },
  { min: 51, max: null, pris: 795 },
];

describe("finnPris", () => {
  it("treffer riktig trinn på hver overgang", () => {
    expect(finnPris(TRAPP, 1)).toBe(1295);
    expect(finnPris(TRAPP, 3)).toBe(1295);
    expect(finnPris(TRAPP, 4)).toBe(1195);
    expect(finnPris(TRAPP, 10)).toBe(1195);
    expect(finnPris(TRAPP, 11)).toBe(995);
    expect(finnPris(TRAPP, 20)).toBe(995);
    expect(finnPris(TRAPP, 21)).toBe(895);
    expect(finnPris(TRAPP, 50)).toBe(895);
    expect(finnPris(TRAPP, 51)).toBe(795);
    expect(finnPris(TRAPP, 200)).toBe(795);
  });

  it("tåler usorterte trinn fra databasen", () => {
    const usortert = [TRAPP[4]!, TRAPP[1]!, TRAPP[3]!, TRAPP[0]!, TRAPP[2]!];
    expect(finnPris(usortert, 4)).toBe(1195);
    expect(finnPris(usortert, 51)).toBe(795);
  });

  it("faller på nærmeste lavere trinn når trappa har hull", () => {
    const medHull: Pristrinn[] = [
      { min: 1, max: 3, pris: 1295 },
      { min: 6, max: null, pris: 995 },
    ];
    // 4 og 5 er ikke dekket av noe trinn — skal aldri gi «ingen pris».
    expect(finnPris(medHull, 4)).toBe(1295);
    expect(finnPris(medHull, 5)).toBe(1295);
    expect(finnPris(medHull, 6)).toBe(995);
  });

  it("bruker første trinn når antallet er under trappas start", () => {
    const fraTo: Pristrinn[] = [{ min: 2, max: null, pris: 995 }];
    expect(finnPris(fraTo, 1)).toBe(995);
  });

  it("fallback-trappa gir samme priser som prod", () => {
    expect(finnPris(FALLBACK_TRINN, 1)).toBe(1295);
    expect(finnPris(FALLBACK_TRINN, 4)).toBe(1195);
    expect(finnPris(FALLBACK_TRINN, 11)).toBe(995);
    expect(finnPris(FALLBACK_TRINN, 21)).toBe(895);
    expect(finnPris(FALLBACK_TRINN, 51)).toBe(795);
  });
});

describe("sorterTrinn", () => {
  it("muterer ikke inndata", () => {
    const inn: Pristrinn[] = [TRAPP[2]!, TRAPP[0]!];
    const ut = sorterTrinn(inn);
    expect(inn[0]).toBe(TRAPP[2]);
    expect(ut[0]).toBe(TRAPP[0]);
  });
});

describe("klemAntall", () => {
  it("klemmer til gyldig område", () => {
    expect(klemAntall(0)).toBe(1);
    expect(klemAntall(-5)).toBe(1);
    expect(klemAntall(1)).toBe(1);
    expect(klemAntall(200)).toBe(200);
    expect(klemAntall(999)).toBe(200);
  });

  it("kutter desimaler og håndterer NaN", () => {
    expect(klemAntall(4.9)).toBe(4);
    expect(klemAntall(Number.NaN)).toBe(1);
    expect(klemAntall(Number.POSITIVE_INFINITY)).toBe(1);
  });
});

describe("formaterKr", () => {
  it("skriver beløp som siden gjør i dag, med hardt mellomrom", () => {
    expect(formaterKr(1295)).toBe("1 295,-");
    expect(formaterKr(4780)).toBe("4 780,-");
    expect(formaterKr(159000)).toBe("159 000,-");
    expect(formaterKr(795)).toBe("795,-");
  });
});

describe("parseTrinn", () => {
  it("oversetter databasens price-felt til pris", () => {
    const raa = [{ min: 1, max: 3, price: 1295 }];
    expect(parseTrinn(raa)).toEqual([{ min: 1, max: 3, pris: 1295 }]);
  });

  it("sorterer resultatet", () => {
    const raa = [
      { min: 4, max: null, price: 1195 },
      { min: 1, max: 3, price: 1295 },
    ];
    expect(parseTrinn(raa)?.map((t) => t.min)).toEqual([1, 4]);
  });

  it("avviser tom liste — manglende RLS-policy gir tomt svar, ikke feil", () => {
    expect(parseTrinn([])).toBeNull();
  });

  it("avviser alt som ikke er en gyldig trapp", () => {
    expect(parseTrinn(null)).toBeNull();
    expect(parseTrinn("[]")).toBeNull();
    expect(parseTrinn({ min: 1, price: 1295 })).toBeNull();
    expect(parseTrinn([null])).toBeNull();
    expect(parseTrinn([{ min: 1, max: 3 }])).toBeNull();
    expect(parseTrinn([{ min: 1, max: 3, price: "1295" }])).toBeNull();
    expect(parseTrinn([{ min: 0, max: 3, price: 1295 }])).toBeNull();
    expect(parseTrinn([{ min: 1, max: 3, price: 0 }])).toBeNull();
    expect(parseTrinn([{ min: 1, max: 3, price: -100 }])).toBeNull();
    expect(parseTrinn([{ min: 5, max: 3, price: 1295 }])).toBeNull();
  });
});
