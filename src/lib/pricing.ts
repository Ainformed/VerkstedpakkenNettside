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
 * Prisene gjelder opp til 10 lisenser totalt — over det skal verkstedet ha
 * eget tilbud: åpne priser over dette gir bort forhandlingsrommet på
 * kjedeavtaler. Tellerne fortsetter forbi 10 (opp til MAKS_TELLER), men da
 * bytter panelet til antall-kvittering og kontaktskjema.
 */
export const MAKS_LISENSER = 10;
export const MAKS_TELLER = 99;

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
 *  telleren alt har tatt av de 10 lisensene. */
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

export type Belopsformat = { locale: string; prefix: string; suffix: string };

/** Språkstyrt variant av formaterKr: «NOK 1,295» / «1.295 NOK» osv. */
export function formaterBelop(belop: number, f: Belopsformat): string {
  const tall = hardtMellomrom(
    new Intl.NumberFormat(f.locale, { maximumFractionDigits: 0 }).format(belop),
  );
  return `${f.prefix}${tall}${f.suffix}`;
}

/**
 * Bindingstid og betalingsfrekvens (besluttet 2026-10-22; mellomtrinnet
 * endret fra kvartal til 6 måneder og satsene satt av Henrik 2026-11-22).
 *
 * Begge valgene har tre trinn, og rabattene legges sammen:
 *   binding   1 måned / 6 måneder / 1 år   →  0 / 7,5 / 15 %
 *   betaling  månedlig / halvårlig / årlig →  0 / 7,5 / 15 %
 * 6 måneders binding gir 7,5 % månedlig og 15 % halvårlig. 1 års binding gir
 * 15 % månedlig, 22,5 % halvårlig og 30 % årlig.
 * Rabatten gjelder både admin- og mekanikerlisenser, og kommer oppå
 * mengderabatten på admin.
 *
 * Trinnene er indekser (0, 1, 2), ikke tekst, så språkfilene bare eier
 * navnene på dem.
 */
export type Trinn = 0 | 1 | 2;

export const BINDING_RABATT: readonly [number, number, number] = [0, 7.5, 15];
export const BETALING_RABATT: readonly [number, number, number] = [0, 7.5, 15];
/** Antall måneder per betalingsperiode: månedlig, halvårlig, årlig. */
export const BETALING_MANEDER: readonly [number, number, number] = [1, 6, 12];

/** Samlet rabatt i prosent. */
export function rabattProsent(binding: Trinn, betaling: Trinn): number {
  return BINDING_RABATT[binding] + BETALING_RABATT[betaling];
}

/** Man kan ikke betale for lengre perioder enn man har bundet seg til. */
export function erGyldigKombinasjon(binding: Trinn, betaling: Trinn): boolean {
  return betaling <= binding;
}

export type Prisberegning = {
  /** Samlet rabatt fra binding og betaling, i prosent. */
  prosent: number;
  /** Admin-prisen i mengdetrappa, før binding/betaling. */
  perAdminListe: number;
  /** Admin-prisen kunden betaler per måned (avrundet til hele kroner). */
  perAdmin: number;
  /** Mekaniker-prisen kunden betaler per måned (avrundet til hele kroner). */
  perMekaniker: number;
  /** Hva en admin koster uten noen rabatt: første trinn. */
  perAdminStart: number;
  /** Spart per admin / mekaniker mot startprisen, i prosent (nærmeste halve). */
  adminSparProsent: number;
  mekanikerSparProsent: number;
  totalManed: number;
  /** Totalen om alle hadde betalt startprisen uten rabatter. */
  startTotalManed: number;
  spartManed: number;
  /** Spart i prosent av startTotalManed (nærmeste halve). */
  sparProsent: number;
  /** Antall måneder i betalingsperioden: 1, 6 eller 12. */
  maneder: number;
  totalPeriode: number;
  spartPeriode: number;
};

function medRabatt(pris: number, prosent: number): number {
  return Math.round((pris * (100 - prosent)) / 100);
}

/**
 * Spart i prosent, avrundet til nærmeste halve. Satsene går i steg på 7,5,
 * og kroneavrundingen per lisens skal ikke gjøre 7,5 % om til 7 % eller 8 %.
 */
function sparProsentAv(start: number, ny: number): number {
  return start === 0 ? 0 : Math.round(((start - ny) / start) * 200) / 2;
}

/** «7,5» / «7.5» / «15» — prosenttall med språkets desimaltegn. */
export function formaterProsent(verdi: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(
    verdi,
  );
}

/**
 * Pris for en bedrift med valgt binding og betaling. Hver lisenspris
 * avrundes til hele kroner, og summen regnes av de avrundede prisene — da
 * stemmer kortene, kvitteringen og totalen alltid med hverandre.
 * En ugyldig kombinasjon (betaling lengre enn binding) regnes som månedlig.
 */
export function beregnPris(
  antallAdmin: number,
  antallMekanikere: number,
  binding: Trinn = 0,
  betaling: Trinn = 0,
): Prisberegning {
  const gyldigBetaling = erGyldigKombinasjon(binding, betaling) ? betaling : 0;
  const prosent = rabattProsent(binding, gyldigBetaling);
  const perAdminListe = finnPris(ADMIN_TRINN, antallAdmin);
  const perAdminStart = sorterTrinn(ADMIN_TRINN)[0]!.pris;
  const perAdmin = medRabatt(perAdminListe, prosent);
  const perMekaniker = medRabatt(MEKANIKER_PRIS, prosent);
  const totalManed = antallAdmin * perAdmin + antallMekanikere * perMekaniker;
  const startTotalManed =
    antallAdmin * perAdminStart + antallMekanikere * MEKANIKER_PRIS;
  const spartManed = startTotalManed - totalManed;
  const maneder = BETALING_MANEDER[gyldigBetaling];
  return {
    prosent,
    perAdminListe,
    perAdmin,
    perMekaniker,
    perAdminStart,
    adminSparProsent: sparProsentAv(perAdminStart, perAdmin),
    mekanikerSparProsent: sparProsentAv(MEKANIKER_PRIS, perMekaniker),
    totalManed,
    startTotalManed,
    spartManed,
    sparProsent: sparProsentAv(startTotalManed, totalManed),
    maneder,
    totalPeriode: totalManed * maneder,
    spartPeriode: spartManed * maneder,
  };
}
