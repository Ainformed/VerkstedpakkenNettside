/**
 * Prislogikk for /pris. Ren — ingen React, ingen nettverk, ingen env.
 * Formen `{ min, max, pris }` speiler prod-tabellen platform_settings,
 * der feltet heter `price`. Oversettelsen skjer i parseTrinn().
 */

export type Pristrinn = {
  min: number;
  max: number | null;
  pris: number;
};

/**
 * Nødfallback hvis prod ikke svarer, eller svarer med noe vi ikke stoler på.
 * Speiler prod per 2026-08-06.
 *
 * Dette er IKKE en andre sannhet. VPapp har en tilsvarende fallback i
 * usePricingConfig.ts som ble stående utdatert (1290/1090/890) og som ville
 * priset feil i stillhet hvis DB-raden forsvant. Endrer du priser i
 * superadmin, oppdater denne i samme slengen — men les alltid prod.
 */
export const FALLBACK_TRINN: Pristrinn[] = [
  { min: 1, max: 3, pris: 1295 },
  { min: 4, max: 10, pris: 1195 },
  { min: 11, max: 20, pris: 995 },
  { min: 21, max: 50, pris: 895 },
  { min: 51, max: null, pris: 795 },
];

export const MIN_BRUKERE = 1;

/**
 * Taket er ikke en prisgrense, bare vern mot at et fastlåst «+» gir
 * 5 000 brukere. Ingen norsk verkstedkjede er i nærheten.
 */
export const MAKS_BRUKERE = 200;

/** Databasens JSON garanterer ingen rekkefølge. Sorter alltid før oppslag. */
export function sorterTrinn(trinn: Pristrinn[]): Pristrinn[] {
  return [...trinn].sort((a, b) => a.min - b.min);
}

/**
 * Pris per bruker ved gitt antall. Skal alltid returnere et tall:
 * hull eller rare grenser i trappa gir nærmeste lavere trinn, ikke
 * undefined.
 */
export function finnPris(trinn: Pristrinn[], antall: number): number {
  const sortert = sorterTrinn(trinn);
  const treff = sortert.find(
    (t) => antall >= t.min && (t.max === null || antall <= t.max),
  );
  if (treff) return treff.pris;

  let naermeste: Pristrinn | undefined;
  for (const t of sortert) {
    if (t.min <= antall) naermeste = t;
  }
  return (naermeste ?? sortert[0]!).pris;
}

export function klemAntall(n: number): number {
  if (!Number.isFinite(n)) return MIN_BRUKERE;
  return Math.min(MAKS_BRUKERE, Math.max(MIN_BRUKERE, Math.trunc(n)));
}

const kroner = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 });

/** «4 780,-» — samme form som resten av prissiden. */
export function formaterKr(belop: number): string {
  return `${kroner.format(belop).replace(/ /g, " ")},-`;
}

/**
 * Validerer ukjent JSON fra databasen. Returnerer null hvis noe skurrer,
 * og kalleren faller tilbake på FALLBACK_TRINN.
 *
 * Tom liste er en feil, ikke et gyldig svar: mangler RLS-policyen som gir
 * anon lesetilgang, får vi tomt resultat uten feilmelding. Det skal ikke
 * kunne bli en tom prisside.
 */
export function parseTrinn(raa: unknown): Pristrinn[] | null {
  if (!Array.isArray(raa) || raa.length === 0) return null;

  const trinn: Pristrinn[] = [];
  for (const rad of raa) {
    if (typeof rad !== "object" || rad === null) return null;
    const { min, max, price } = rad as Record<string, unknown>;

    if (typeof min !== "number" || !Number.isFinite(min) || min < 1) return null;
    if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
      return null;
    }
    if (
      max !== null &&
      (typeof max !== "number" || !Number.isFinite(max) || max < min)
    ) {
      return null;
    }

    trinn.push({ min, max: max === null ? null : max, pris: price });
  }

  return sorterTrinn(trinn);
}
