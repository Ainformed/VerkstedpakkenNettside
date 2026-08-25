/**
 * Prislogikk for /pris. Ren — ingen React, ingen nettverk, ingen env.
 *
 * Prisene er hardkodet her (besluttet 2026-08-25, samtidig med at
 * prod-lesingen via pricing-server.ts ble fjernet). Endrer dere priser i
 * superadmin, må denne fila oppdateres i samme slengen — nettsiden følger
 * ikke lenger databasen.
 */

export type Pristrinn = {
  min: number;
  max: number | null;
  pris: number;
};

/**
 * Admin-lisensens trapp. Trinnet bestemmes av antall ADMIN alene —
 * mekaniker-lisenser gir ingen rabatt og teller ikke mot trinnene
 * (besluttet 25.08; superadmin-skjermen sa «totalt antall lisenser»,
 * men Henrik overstyrte: rabatt kun på admin).
 */
export const ADMIN_TRINN: Pristrinn[] = [
  { min: 1, max: 3, pris: 1295 },
  { min: 4, max: 6, pris: 1095 },
  { min: 7, max: null, pris: 995 },
];

/** Mekaniker-lisens: flat pris uansett antall. */
export const MEKANIKER_PRIS = 595;

export const MIN_ADMIN = 1;
export const MIN_MEKANIKERE = 0;

/**
 * Kalkulatoren stopper på 20 lisenser totalt — verksteder med flere skal ta
 * kontakt og få tilbud: åpne priser over dette gir bort forhandlingsrommet
 * på kjedeavtaler.
 */
export const MAKS_LISENSER = 20;

/** Trappa garanterer ingen rekkefølge der den brukes. Sorter før oppslag. */
function sorterTrinn(trinn: Pristrinn[]): Pristrinn[] {
  return [...trinn].sort((a, b) => a.min - b.min);
}

/**
 * Pris per admin ved gitt totalt antall lisenser. Returnerer alltid et tall
 * for en ikke-tom trapp: hull eller rare grenser gir nærmeste lavere trinn.
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

/**
 * Månedsprisen for en bedrift: admin-prisen følger trappa målt mot antall
 * admin alene, mekanikere legges til flatt uten å påvirke trinnet.
 */
export function beregnManedspris(
  antallAdmin: number,
  antallMekanikere: number,
): { perAdmin: number; total: number } {
  const perAdmin = finnPris(ADMIN_TRINN, antallAdmin);
  return {
    perAdmin,
    total: antallAdmin * perAdmin + antallMekanikere * MEKANIKER_PRIS,
  };
}

/** Grensene er tellerens ansvar: min per teller, maks etter hva den andre
 *  telleren alt har tatt av de 20 lisensene. */
export function klemAntall(n: number, min: number, maks: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(maks, Math.max(min, Math.trunc(n)));
}

const kroner = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 });

/** Normaliserer alle Unicode-mellomromsseparatorer til hardt mellomrom.
 *  Ulike ICU-versjoner har brukt både vanlig mellomrom (U+0020) og smalt
 *  hardt mellomrom (U+202F) som tusenskille for nb-NO. Prisen skal aldri
 *  brytes over to linjer, uansett hva Intl gir oss. */
export function hardtMellomrom(tekst: string): string {
  return tekst.replace(/\p{Zs}/gu, " ");
}

/** «3 975,-» — samme form som resten av prissiden. */
export function formaterKr(belop: number): string {
  return `${hardtMellomrom(kroner.format(belop))},-`;
}
