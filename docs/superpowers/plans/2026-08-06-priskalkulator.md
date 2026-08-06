# Priskalkulator på /pris — implementasjonsplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Besøkende på `/pris` stiller inn antall brukere med − og + og ser både totalpris per måned og pris per bruker, slik at volumrabatten viser seg av seg selv.

**Architecture:** Ren prislogikk i `src/lib/pricing.ts` (ingen React, ingen nettverk), serverlesing av prod-priser i `src/lib/pricing-server.ts`, og en klientkomponent `PrisKalkulator.tsx` som får trinnene som props. Server-komponenten `src/app/pris/page.tsx` binder det sammen med ISR. Prisene leses med anon-nøkkel bak en RLS-policy som åpner nøyaktig én rad — aldri service-role.

**Tech Stack:** Next.js 16.1.6 (App Router, Turbopack), React 19.2.3, TypeScript 5, `@supabase/supabase-js` 2.98, vitest (innføres i Task 2).

**Spec:** `docs/superpowers/specs/2026-08-06-priskalkulator-design.md`

## Global Constraints

- All brukersynlig tekst er på norsk (bokmål). Ingen engelske strenger i UI.
- **Ingen `NEXT_PUBLIC_`-prefiks på noen ny miljøvariabel.** Priser leses på server; klienten får ferdige tall som props, aldri en nøkkel.
- **`SUPABASE_SERVICE_ROLE_KEY` skal ikke settes på nettsidens Vercel-prosjekt.** Den omgår all RLS. Ny kode skal ikke referere den, og ikke importere `src/lib/supabase-admin.ts`.
- Prod-prosjektet `xrpqminsdtgktxschnci` er eneste priskilde. Testmiljøet `yijucnotjhxxphpuvkpl` har utdatert trapp (`1290 / 1090 / 890`) og skal aldri være `SUPABASE_URL` på nettsiden.
- Pengeformat: `Intl.NumberFormat("nb-NO")` + `,-` — «1 295,-» med hardt mellomrom (U+00A0).

  **Rettelse 2026-08-06:** planen påsto opprinnelig at siden skriver det med hardt mellomrom i dag. Det er feil — de hardkodede «1 295,-»-strengene i `src/app/pris/page.tsx` og `src/app/layout.tsx` bruker vanlig mellomrom (U+0020). Vi velger likevel U+00A0 i kalkulatoren, av en annen grunn enn den planen først ga: en pris skal ikke kunne brytes over to linjer midt i tallet. Utdata fra `Intl` normaliseres derfor eksplisitt, siden ulike ICU-versjoner har brukt både U+0020 og U+202F som tusenskille for `nb-NO`.
- Antall brukere: minimum `1`, maksimum `200`, steglengde alltid `1`.
- Git-forfatter må være `x@ainformed.com`. Annen forfatter gir BLOCKED deploy på Vercel.
- Repoet har ingen tester i dag. Vitest settes opp som del av Task 2.
- Pristrappa i prod per 2026-08-06: `1–3: 1295`, `4–10: 1195`, `11–20: 995`, `21–50: 895`, `51+: 795`.

---

## Task 1: Forarbeid i prod og på Vercel

Blokkerende og manuelt. Ingen kode i denne oppgaven kan skrives av en agent — den krever databasetilgang og hemmelighetshåndtering som et menneske må gjøre selv.

**Files:** Ingen. Endringer skjer i prod-databasen og i Vercel-prosjektets miljøvariabler.

**Interfaces:**
- Produces: `SUPABASE_URL` og `SUPABASE_ANON_KEY` tilgjengelig på server i produksjon, og en RLS-policy som lar `anon` lese raden `pricing_tiers`. Task 3 er avhengig av begge.

- [ ] **Step 1: Kjør RLS-policyen mot prod**

Kjøres i SQL-editoren for prosjekt `xrpqminsdtgktxschnci`. Verifisert utgangspunkt: RLS er aktivert, `anon` har `SELECT`-grant, men ingen policy slipper den gjennom — så `anon` ser 0 rader i dag.

```sql
create policy anon_read_pricing_tiers
  on public.platform_settings
  for select
  to anon
  using (setting_key = 'pricing_tiers');
```

- [ ] **Step 2: Herd tabellen mot skriving fra anon**

`anon` har i dag `INSERT`, `UPDATE`, `DELETE` og `TRUNCATE`-grants på tabellen. RLS stopper dem (ingen policy tillater skriving for anon, og `is_superadmin()` returnerer `false` for anon — verifisert). Grantene er likevel en unødvendig andre dør: legger noen senere til en for bred policy, er det ingenting bak den. Fjern dem.

```sql
revoke insert, update, delete, truncate on public.platform_settings from anon;
```

- [ ] **Step 3: Verifiser at anon ser nøyaktig én rad og ikke kan skrive**

```sql
begin;
set local role anon;
select count(*) as skal_vaere_1 from public.platform_settings;
select setting_key from public.platform_settings;
rollback;
```

Forventet: `skal_vaere_1 = 1`, og eneste `setting_key` er `pricing_tiers`. Ser du flere rader, er policyen for bred — `using`-uttrykket må være `setting_key = 'pricing_tiers'`, ikke `true`.

- [ ] **Step 4: Legg inn miljøvariablene på Vercel**

Prosjektet `ainformed/verkstedpakkennettside` har i dag kun `RESEND_API_KEY`. Kjør disse selv — anon-nøkkelen hentes fra Supabase-dashboardet (Project Settings → API Keys → `anon` / publishable):

```bash
vercel env add SUPABASE_URL production
# lim inn: https://xrpqminsdtgktxschnci.supabase.co

vercel env add SUPABASE_ANON_KEY production
# lim inn anon-nøkkelen til SAMME prosjekt
```

Gjenta for `preview` hvis forhåndsvisninger skal vise ekte priser.

**Ikke legg inn `SUPABASE_SERVICE_ROLE_KEY`.** `src/lib/supabase-admin.ts:12-14` krever både URL og service-role for å bygge admin-klienten, så URL-en alene aktiverer ingenting. Legger noen inn service-role senere for å fikse interesse-skjemaet, får markedssiden plutselig en nøkkel med full databasetilgang.

- [ ] **Step 5: Verifiser at URL-en peker på prod**

```bash
vercel env pull .env.check --environment=production
grep SUPABASE_URL .env.check
rm .env.check
```

Forventet: `https://xrpqminsdtgktxschnci.supabase.co`. Står det `yijucnotjhxxphpuvkpl`, peker siden på testmiljøet og vil annonsere `1 290,-` offentlig. Slett `.env.check` etterpå uansett utfall — den inneholder hemmeligheter, og `.env*` er gitignorert men filen har ingenting å gjøre på disk.

---

## Task 2: Prislogikk som ren funksjon

**Files:**
- Create: `src/lib/pricing.ts`
- Create: `src/lib/pricing.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json` (devDependencies + `test`-script)

**Interfaces:**
- Consumes: ingenting.
- Produces:
  - `type Pristrinn = { min: number; max: number | null; pris: number }`
  - `const FALLBACK_TRINN: Pristrinn[]`
  - `const MIN_BRUKERE: 1`, `const MAKS_BRUKERE: 200`
  - `sorterTrinn(trinn: Pristrinn[]): Pristrinn[]`
  - `finnPris(trinn: Pristrinn[], antall: number): number`
  - `klemAntall(n: number): number`
  - `formaterKr(belop: number): string`
  - `parseTrinn(raa: unknown): Pristrinn[] | null`

  Task 3 bruker `parseTrinn`, `FALLBACK_TRINN` og `Pristrinn`. Task 4 bruker `finnPris`, `formaterKr`, `klemAntall`, `MIN_BRUKERE`, `MAKS_BRUKERE` og `Pristrinn`.

- [ ] **Step 1: Installer vitest**

```bash
npm install -D vitest jsdom
```

Jsdom trengs først i Task 4, men konfigurasjonen under setter `environment: "jsdom"` for hele suiten — så den må inn nå, ellers feiler første testkjøring på manglende miljø.

- [ ] **Step 2: Legg til vitest-konfigurasjon**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    // jsdom for alt, også ren logikk. Task 4 trenger det for komponenten,
    // og ett miljø for hele suiten er mindre å holde i hodet enn
    // per-fil-matching (som dessuten er deprecated i nyere vitest).
    environment: "jsdom",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
});
```


- [ ] **Step 3: Legg til test-script**

Modify `package.json`, i `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Skriv den feilende testen**

Create `src/lib/pricing.test.ts`:

```ts
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
```

- [ ] **Step 5: Kjør testen og se at den feiler**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./pricing"`.

- [ ] **Step 6: Skriv implementasjonen**

Create `src/lib/pricing.ts`:

```ts
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
  return `${kroner.format(belop)},-`;
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
```

- [ ] **Step 7: Kjør testene og se at de passerer**

Run: `npm test`
Expected: PASS — alle beskrivelser grønne.

- [ ] **Step 8: Sjekk at typene holder**

Run: `npx tsc --noEmit`
Expected: ingen utskrift.

- [ ] **Step 9: Commit**

```bash
git add src/lib/pricing.ts src/lib/pricing.test.ts vitest.config.ts package.json package-lock.json
git commit -m "Prislogikk for /pris: finnPris, parseTrinn og vitest-oppsett"
```

---

### Godkjente avvik i Task 2 (lagt til under kjøring 2026-08-06)

Review-loopen avdekket to ting som ble rettet i en fix-runde. Koden i repoet avviker derfor med hensikt fra stegene over:

- **`formaterKr` normaliserer tusenskillet** til U+00A0 med `.replace(/\p{Zs}/gu, " ")`. Ikke i planen opprinnelig. Godkjent fordi `Intl` ikke gir samme tegn på alle ICU-versjoner, og prisen ikke skal brytes over to linjer.
- **`finnPris` kaster på tom trapp** i stedet for å feile med en uforståelig `TypeError`. Planens `sortert[0]!` løy til typesjekkeren om en liste som kan være tom. En tom trapp betyr at kalleren hoppet over fallback — det er en programmeringsfeil, ikke et datatilfelle, og skal si det tydelig.

---

## Task 3: Serverlesing av prod-priser

**Files:**
- Create: `src/lib/pricing-server.ts`

**Interfaces:**
- Consumes: `parseTrinn`, `FALLBACK_TRINN`, `Pristrinn` fra `src/lib/pricing.ts` (Task 2).
- Produces: `hentPristrinn(): Promise<Pristrinn[]>`. Task 5 kaller den fra server-komponenten.

Ingen automatisk test her. Funksjonen er ren I/O rundt `parseTrinn`, og all logikk som kan gå galt er alt dekket i Task 2. Å mocke Supabase-klienten ville testet mocken, ikke koden. Verifiseres i stedet ekte i Task 5 Step 7.

- [ ] **Step 1: Skriv modulen**

Create `src/lib/pricing-server.ts`:

```ts
import { createClient } from "@supabase/supabase-js";
import { FALLBACK_TRINN, parseTrinn, type Pristrinn } from "./pricing";

/**
 * Leser pristrappa fra prod-databasen.
 *
 * Bruker anon-nøkkelen, ikke service-role. Anon slipper bare til raden
 * setting_key = 'pricing_tiers' (RLS-policy anon_read_pricing_tiers), og har
 * ingen skrivetilgang. Service-role omgår all RLS, og en offentlig
 * markedsside skal ikke ha en nøkkel med full databasetilgang — prisene er
 * tross alt trykt på siden.
 *
 * Kalles kun fra server-komponenter. Nøkkelen skal aldri nå klienten;
 * kalleren sender ferdige tall videre som props.
 */
export async function hentPristrinn(): Promise<Pristrinn[]> {
  const url = process.env.SUPABASE_URL;
  const anonNokkel = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonNokkel) {
    console.error(
      "Priskalkulator: SUPABASE_URL eller SUPABASE_ANON_KEY mangler — viser fallback-trappa.",
    );
    return FALLBACK_TRINN;
  }

  try {
    const db = createClient(url, anonNokkel, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await db
      .from("platform_settings")
      .select("setting_value")
      .eq("setting_key", "pricing_tiers")
      .maybeSingle();

    if (error) throw error;
    if (!data?.setting_value) {
      throw new Error(
        "tomt svar på pricing_tiers — mangler RLS-policyen anon_read_pricing_tiers?",
      );
    }

    const trinn = parseTrinn(JSON.parse(data.setting_value));
    if (!trinn) throw new Error("pricing_tiers hadde uventet form");

    return trinn;
  } catch (e) {
    console.error("Priskalkulator: kunne ikke lese pricing_tiers:", e);
    return FALLBACK_TRINN;
  }
}
```

- [ ] **Step 2: Sjekk at typene holder**

Run: `npx tsc --noEmit`
Expected: ingen utskrift.

- [ ] **Step 3: Commit**

```bash
git add src/lib/pricing-server.ts
git commit -m "Les pristrappa fra prod med anon-nokkel, aldri service-role"
```

---

## Task 4: Kalkulatorkomponenten

**Files:**
- Create: `src/app/pris/PrisKalkulator.tsx`
- Create: `src/app/pris/PrisKalkulator.test.tsx`
- Modify: `vitest.config.ts` (jsdom for `.test.tsx`)
- Modify: `package.json` (devDependencies)

**Interfaces:**
- Consumes: `finnPris`, `formaterKr`, `klemAntall`, `MIN_BRUKERE`, `MAKS_BRUKERE`, `Pristrinn` fra `src/lib/pricing.ts` (Task 2).
- Produces: `export default function PrisKalkulator({ trinn }: { trinn: Pristrinn[] })`. Task 5 rendrer den i `.phero-copy`.

- [ ] **Step 1: Installer testverktøy for komponenter**

```bash
npm install -D @testing-library/react @testing-library/dom @vitejs/plugin-react
```

- [ ] **Step 2: Legg React-pluginen til vitest-konfigurasjonen**

JSX i testfiler må transformeres. Modify `vitest.config.ts` — hele filen blir:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
});
```

- [ ] **Step 3: Skriv de feilende testene**

Create `src/app/pris/PrisKalkulator.test.tsx`:

```tsx
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import PrisKalkulator from "./PrisKalkulator";
import type { Pristrinn } from "@/lib/pricing";

const TRAPP: Pristrinn[] = [
  { min: 1, max: 3, pris: 1295 },
  { min: 4, max: 10, pris: 1195 },
  { min: 11, max: 20, pris: 995 },
  { min: 21, max: 50, pris: 895 },
  { min: 51, max: null, pris: 795 },
];

afterEach(cleanup);

const pluss = () => screen.getByRole("button", { name: "Én bruker mer" });
const minus = () => screen.getByRole("button", { name: "Én bruker mindre" });
const felt = () => screen.getByLabelText("Antall brukere") as HTMLInputElement;

describe("PrisKalkulator i ro", () => {
  it("viser dagens pris og dagens ledetekst ved én bruker", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    expect(screen.getByText("1 295,-")).toBeDefined();
    expect(screen.getByText(/Per bruker per måned/)).toBeDefined();
  });

  it("skjuler per-bruker-linja ved én bruker", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    expect(screen.queryByText(/per bruker$/)).toBeNull();
  });

  it("har «−» avslått ved én bruker", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    expect(minus().hasAttribute("disabled")).toBe(true);
  });
});

describe("PrisKalkulator ved flere brukere", () => {
  it("viser total og pris per bruker fra to brukere", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.pointerDown(pluss());
    fireEvent.pointerUp(pluss());
    expect(screen.getByText("2 590,-")).toBeDefined();
    expect(
      screen.getByText("2 brukere × 1 295,- per bruker"),
    ).toBeDefined();
    expect(screen.getByText(/^Per måned/)).toBeDefined();
  });

  it("faller til neste trinn ved fjerde bruker", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "4" } });
    fireEvent.blur(felt());
    expect(screen.getByText("4 780,-")).toBeDefined();
    expect(
      screen.getByText("4 brukere × 1 195,- per bruker"),
    ).toBeDefined();
  });
});

describe("PrisKalkulator — redigering av feltet", () => {
  it("godtar innskrevet tall", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "25" } });
    fireEvent.blur(felt());
    // 25 × 895
    expect(screen.getByText("22 375,-")).toBeDefined();
  });

  it("klemmer for store tall ned til taket", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "999" } });
    fireEvent.blur(felt());
    expect(felt().value).toBe("200");
    // 200 × 795
    expect(screen.getByText("159 000,-")).toBeDefined();
  });

  it("ignorerer bokstaver", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "1a2b" } });
    expect(felt().value).toBe("12");
  });

  it("faller tilbake til forrige verdi når feltet tømmes", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "7" } });
    fireEvent.blur(felt());
    fireEvent.change(felt(), { target: { value: "" } });
    fireEvent.blur(felt());
    expect(felt().value).toBe("7");
  });

  it("commit-er på Enter", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.change(felt(), { target: { value: "11" } });
    fireEvent.keyDown(felt(), { key: "Enter" });
    // 11 × 995
    expect(screen.getByText("10 945,-")).toBeDefined();
  });

  it("endrer med piltaster", () => {
    render(<PrisKalkulator trinn={TRAPP} />);
    fireEvent.keyDown(felt(), { key: "ArrowUp" });
    expect(felt().value).toBe("2");
    fireEvent.keyDown(felt(), { key: "ArrowDown" });
    expect(felt().value).toBe("1");
  });
});

describe("PrisKalkulator — hold inne", () => {
  it("repeterer så lenge knappen holdes, og stopper ved slipp", () => {
    vi.useFakeTimers();
    try {
      render(<PrisKalkulator trinn={TRAPP} />);
      fireEvent.pointerDown(pluss());
      expect(felt().value).toBe("2"); // første klikk teller med en gang

      vi.advanceTimersByTime(400 + 120 * 5);
      const etterHold = Number(felt().value);
      expect(etterHold).toBeGreaterThan(5);

      fireEvent.pointerUp(pluss());
      vi.advanceTimersByTime(2000);
      expect(Number(felt().value)).toBe(etterHold);
    } finally {
      vi.useRealTimers();
    }
  });

  it("stanser på taket selv om knappen holdes lenge", () => {
    vi.useFakeTimers();
    try {
      render(<PrisKalkulator trinn={TRAPP} />);
      fireEvent.pointerDown(pluss());
      vi.advanceTimersByTime(60_000);
      expect(felt().value).toBe("200");
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("PrisKalkulator — tilgjengelighet", () => {
  it("melder prisendringer i én aria-live-region", () => {
    const { container } = render(<PrisKalkulator trinn={TRAPP} />);
    const regioner = container.querySelectorAll("[aria-live]");
    expect(regioner.length).toBe(1);
    expect(regioner[0]!.textContent).toContain("1 295,-");
  });
});
```

- [ ] **Step 4: Kjør testene og se at de feiler**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./PrisKalkulator"`.

- [ ] **Step 5: Skriv komponenten**

Create `src/app/pris/PrisKalkulator.tsx`:

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MAKS_BRUKERE,
  MIN_BRUKERE,
  finnPris,
  formaterKr,
  klemAntall,
  type Pristrinn,
} from "@/lib/pricing";

/** Hold inne: pause før repetisjonen starter, så jevn takt, så raskere. */
const FORSINKELSE_MS = 400;
const TAKT_MS = 120;
const RASK_TAKT_MS = 40;
const RASK_ETTER_MS = 2000;

export default function PrisKalkulator({ trinn }: { trinn: Pristrinn[] }) {
  const [antall, setAntall] = useState(MIN_BRUKERE);
  /** Rå tekst mens feltet redigeres. null = feltet viser `antall`. */
  const [utkast, setUtkast] = useState<string | null>(null);

  const timerRef = useRef<number | undefined>(undefined);

  const stopp = useCallback(() => {
    if (timerRef.current !== undefined) {
      window.clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const endre = useCallback((delta: number) => {
    setAntall((n) => klemAntall(n + delta));
  }, []);

  const startGjenta = useCallback(
    (delta: number) => {
      stopp();
      endre(delta);
      let gaatt = 0;
      const planlegg = (om: number) => {
        timerRef.current = window.setTimeout(() => {
          gaatt += om;
          endre(delta);
          planlegg(gaatt > RASK_ETTER_MS ? RASK_TAKT_MS : TAKT_MS);
        }, om);
      };
      planlegg(FORSINKELSE_MS);
    },
    [endre, stopp],
  );

  // Slipper man knappen utenfor sitt eget område, skal repetisjonen likevel dø.
  useEffect(() => {
    window.addEventListener("pointerup", stopp);
    window.addEventListener("pointercancel", stopp);
    return () => {
      window.removeEventListener("pointerup", stopp);
      window.removeEventListener("pointercancel", stopp);
      stopp();
    };
  }, [stopp]);

  const commitUtkast = useCallback(() => {
    setUtkast((tekst) => {
      if (tekst === null) return null;
      if (tekst !== "") setAntall(klemAntall(Number(tekst)));
      return null;
    });
  }, []);

  const prisPerBruker = finnPris(trinn, antall);
  const total = prisPerBruker * antall;
  const flere = antall > 1;

  return (
    <>
      <div className="pris-blokk" aria-live="polite">
        <div className="amt">{formaterKr(total)}</div>
        <p className="per">
          {flere ? "Per måned" : "Per bruker per måned"} (ekskl. mva).{" "}
          <b>Ingen bindingstid.</b>
        </p>
        {flere && (
          <p className="per-bruker">
            {antall} brukere × {formaterKr(prisPerBruker)} per bruker
          </p>
        )}
      </div>

      <div className="teller">
        <button
          type="button"
          className="teller-btn"
          aria-label="Én bruker mindre"
          disabled={antall <= MIN_BRUKERE}
          onPointerDown={() => startGjenta(-1)}
          onPointerUp={stopp}
          onPointerLeave={stopp}
        >
          −
        </button>

        <label className="teller-felt">
          <span className="sr-only">Antall brukere</span>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={utkast ?? String(antall)}
            onChange={(e) => setUtkast(e.target.value.replace(/[^0-9]/g, ""))}
            onBlur={commitUtkast}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commitUtkast();
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setUtkast(null);
                endre(1);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setUtkast(null);
                endre(-1);
              }
            }}
          />
        </label>

        <button
          type="button"
          className="teller-btn"
          aria-label="Én bruker mer"
          disabled={antall >= MAKS_BRUKERE}
          onPointerDown={() => startGjenta(1)}
          onPointerUp={stopp}
          onPointerLeave={stopp}
        >
          +
        </button>

        <span className="teller-tekst">brukere</span>
      </div>
    </>
  );
}
```

- [ ] **Step 6: Kjør testene og se at de passerer**

Run: `npm test`
Expected: PASS — alle beskrivelser grønne, både `pricing.test.ts` og `PrisKalkulator.test.tsx`.

- [ ] **Step 7: Sjekk at typene holder**

Run: `npx tsc --noEmit`
Expected: ingen utskrift.

- [ ] **Step 8: Commit**

```bash
git add src/app/pris/PrisKalkulator.tsx src/app/pris/PrisKalkulator.test.tsx vitest.config.ts package.json package-lock.json
git commit -m "Priskalkulator: teller med hold-inne, redigerbart felt og aria-live"
```

---

## Task 5: Koble kalkulatoren inn på prissiden

**Files:**
- Modify: `src/app/pris/page.tsx:14-45` (import, `revalidate`, `.phero-copy`, boble-tekst)
- Modify: `src/app/pris/pris.css` (stil for teller og per-bruker-linje)

**Interfaces:**
- Consumes: `hentPristrinn()` fra `src/lib/pricing-server.ts` (Task 3), `PrisKalkulator` fra `./PrisKalkulator` (Task 4).
- Produces: ferdig side.

- [ ] **Step 1: Gjør prissiden til en async server-komponent som henter trinn**

Modify `src/app/pris/page.tsx`. Legg til importer øverst, ved siden av de som finnes:

```tsx
import PrisKalkulator from "./PrisKalkulator";
import { hentPristrinn } from "@/lib/pricing-server";
```

Legg til under `metadata`-blokken:

```tsx
/** Prisene leses fra prod. En endring i superadmin slår gjennom innen en time. */
export const revalidate = 3600;
```

Endre komponentsignaturen fra:

```tsx
export default function Pris() {
```

til:

```tsx
export default async function Pris() {
  const trinn = await hentPristrinn();
```

- [ ] **Step 2: Bytt ut det statiske prisblokka med kalkulatoren**

Modify `src/app/pris/page.tsx`. Erstatt disse to elementene inne i `<div className="phero-copy">`:

```tsx
              <div className="amt">1 295,-</div>
              <p className="per">
                Per bruker per måned (ekskl. mva). <b>Ingen bindingstid.</b>
              </p>
```

med:

```tsx
              <PrisKalkulator trinn={trinn} />
```

`.cta-row` og `.subnote` under står urørt — telleren kommer mellom prisen og knappen fordi komponenten rendrer begge deler.

- [ ] **Step 3: Omformuler boblen slik at den peker på telleren**

Modify `src/app/pris/page.tsx`. Erstatt innholdet i `.phero-bubble`:

```tsx
              Inkluderer alt verkstedet trenger i hverdagen og support uten timepris. Fra 4 ansatte
              får du lavere pris per bruker.
```

med:

```tsx
              Inkluderer alt verkstedet trenger i hverdagen og support uten timepris. Still inn
              antall ansatte — prisen per bruker faller når dere blir flere.
```

- [ ] **Step 4: Legg til stilen**

Modify `src/app/pris/pris.css`, legg til på slutten:

```css
/* ── Priskalkulator ─────────────────────── */
.per-bruker {
  margin-top: 6px;
  font-size: 16px;
  color: var(--ink-2);
}

.teller {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
}

.teller-btn {
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 1.5px solid var(--line);
  background: #fff;
  color: var(--ink);
  font-family: var(--sans);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  transition: border-color 160ms ease-out, color 160ms ease-out;
  /* Hindrer at hold-inne markerer tegnet eller trigger lupe på iOS. */
  user-select: none;
  touch-action: manipulation;
}
.teller-btn:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}
.teller-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

.teller-felt input {
  width: 64px;
  height: 44px;
  text-align: center;
  border-radius: 12px;
  border: 1.5px solid var(--line);
  background: #fff;
  font-family: var(--sans);
  font-size: 18px;
  font-weight: 600;
  color: var(--ink);
}
.teller-felt input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.teller-tekst {
  font-family: var(--sans);
  font-size: 17px;
  color: var(--ink-2);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

`.sr-only` finnes ikke noe sted i repoet per 2026-08-06 (verifisert mot `src/styles/vp-site.css`, `src/app/globals.css` og `src/app/pris/pris.css`), så den må legges til her.

Innpakningen `.pris-blokk` rundt prisen er trygg: `src/styles/vp-site.css:795-798` bruker etterkommer-selektorer (`.price-hero .amt`, `.price-hero .per`), ikke direkte barn. Prisen og ledeteksten beholder stilen sin uendret.

- [ ] **Step 5: Kjør testene og typesjekken**

Run: `npm test && npx tsc --noEmit`
Expected: PASS, ingen typefeil.

- [ ] **Step 6: Bygg**

Run: `npm run build`
Expected: bygget går gjennom. `/pris` skal listes som en ISR-rute med revalidate 3600, ikke som statisk.

- [ ] **Step 7: Verifiser mot ekte data lokalt**

Legg prod-verdiene i `.env.local` (gitignorert via `.gitignore:34`) og start dev-serveren på nytt — `next dev` leser env kun ved oppstart:

```bash
vercel env pull .env.local --environment=production
# stopp kjørende next dev, start på nytt
```

Bekreft at siden svarer og at prisen er der:

```bash
curl -s http://localhost:3001/pris | grep -c "295,-"
```

Expected: minst `1`. Er den `0`, rendres ikke prisen i det hele tatt — sjekk terminalen for feil.

Forventet i nettleseren på `http://localhost:3001/pris`:
- I ro: `1 295,-` og «Per bruker per måned (ekskl. mva). Ingen bindingstid.» — visuelt identisk med i dag
- Ved 4: `4 780,-`, «Per måned (ekskl. mva).» og «4 brukere × 1 195,- per bruker»
- Ved 11: `10 945,-` og «995,- per bruker»
- Ved 21: `18 795,-` og «895,- per bruker»
- Ved 51: `40 545,-` og «795,- per bruker»

Ser du priser fra fallback selv om env er satt, sjekk terminalen for «Priskalkulator:»-loggen — den sier hvorfor.

- [ ] **Step 8: Verifiser på smale skjermer**

Sjekk `/pris` på 320, 375 og 390px bredde. Krav: telleren bryter ikke ut av `.phero-copy`, knappene er minst 44 × 44 px, og ingen horisontal scroll på `document.documentElement`.

Mål det i konsollen:

```js
document.documentElement.scrollWidth - document.documentElement.clientWidth
```

Expected: `0` på alle tre bredder.

- [ ] **Step 9: Commit**

```bash
git add src/app/pris/page.tsx src/app/pris/pris.css
git commit -m "Koble priskalkulatoren inn i prissidens hero"
```

---

## Task 6: Sikkerhetsverifisering før push

Brukerens eksplisitte krav: ingen hemmelighet skal kunne føre til at databasen blir hacket. Denne oppgaven beviser det på bygget artefaktet i stedet for å stole på at koden ser riktig ut.

**Files:** Ingen endringer. Kun verifisering.

- [ ] **Step 1: Bekreft at ingen nøkkel havnet i klientbundelen**

```bash
npm run build
grep -rl "SUPABASE_ANON_KEY\|service_role\|SUPABASE_SERVICE_ROLE" .next/static 2>/dev/null && echo "FUNN — STOPP" || echo "rent: ingen nokkelnavn i klientbundelen"
```

Expected: `rent: ingen nokkelnavn i klientbundelen`.

Så, med `.env.local` på plass, søk etter selve nøkkelverdien — navnet kan mangle selv om verdien er inlinet:

```bash
NOKKEL=$(grep '^SUPABASE_ANON_KEY=' .env.local | cut -d= -f2- | tr -d '"')
if [ -n "$NOKKEL" ]; then
  grep -rlF "$NOKKEL" .next/static 2>/dev/null && echo "FUNN — STOPP" || echo "rent: nokkelverdien er ikke i klientbundelen"
fi
```

Expected: `rent: nokkelverdien er ikke i klientbundelen`.

- [ ] **Step 2: Bekreft at ingen ny variabel er klientsynlig**

```bash
grep -rn "NEXT_PUBLIC" src || echo "rent: ingen NEXT_PUBLIC-variabler i src"
```

Expected: `rent: ingen NEXT_PUBLIC-variabler i src`.

- [ ] **Step 3: Bekreft at ny kode ikke rører service-role**

```bash
grep -rn "supabase-admin\|SERVICE_ROLE" src/lib/pricing.ts src/lib/pricing-server.ts src/app/pris || echo "rent: kalkulatoren bruker ikke service-role"
```

Expected: `rent: kalkulatoren bruker ikke service-role`.

- [ ] **Step 4: Bekreft at anon fortsatt bare ser prisraden**

Kjør mot prod:

```sql
begin;
set local role anon;
select count(*) as antall_rader, string_agg(setting_key, ', ') as noekler
from public.platform_settings;
rollback;
```

Expected: `antall_rader = 1`, `noekler = pricing_tiers`.

- [ ] **Step 5: Bekreft at anon ikke kan skrive**

```sql
begin;
set local role anon;
-- Skal feile med «permission denied for table platform_settings»
-- etter revoke-en i Task 1 Step 2.
update public.platform_settings set setting_value = setting_value
where setting_key = 'pricing_tiers';
rollback;
```

Expected: feilmelding om manglende rettighet. Går setningen gjennom og rapporterer 0 rader, er `revoke`-en i Task 1 Step 2 ikke kjørt — kjør den før du går videre. Transaksjonen rulles tilbake uansett, så prisraden kan ikke endres av denne sjekken.

- [ ] **Step 6: Rydd bort lokale hemmeligheter**

```bash
rm -f .env.local .env.check
git status --short
```

Expected: `.env.local` og `.env.check` borte, og `git status` viser ingen spor av dem (begge dekkes av `.env*` i `.gitignore:34`).

- [ ] **Step 7: Push og verifiser i produksjon**

```bash
git log --format='%an <%ae>' -6 | sort -u
```

Expected: kun `BLAZE <x@ainformed.com>` — annen forfatter gir BLOCKED deploy.

```bash
git push origin main
```

Følg deployen. Merk at `verkstedpakken.no` redirecter til `www.verkstedpakken.no` — bruk `-L` eller www-adressen, ellers ser en sjekk ut som om den feiler.

Når deployen er READY, bekreft at prod ikke viser testmiljøets priser:

```bash
curl -sL https://www.verkstedpakken.no/pris | grep -c "1 290,-"
```

Expected: `0`. Får du treff, peker `SUPABASE_URL` på testmiljøet `yijucnotjhxxphpuvkpl` — rull tilbake deployen og fiks Task 1 Step 5 før du prøver igjen.

Åpne så `https://www.verkstedpakken.no/pris` og kontroller alle fem trinnovergangene mot tabellen i Global Constraints.

---

## Etterpå — egne saker, ikke del av denne planen

Begge er ekte funn fra dette arbeidet:

- **VPapps fallback-trapp er utdatert.** `src/features/platform-settings/hooks/usePricingConfig.ts` i VPapp faller tilbake på `1290 / 1090 / 890`. Forsvinner `platform_settings`-raden, priser appen feil i stillhet.
- **Interesse-skjemaet lagrer ingenting.** `src/app/actions/interest.ts:284` skriver til `interest_submissions`, en tabell som ikke finnes i noen av Supabase-prosjektene, og nettsiden har aldri hatt `SUPABASE_SERVICE_ROLE_KEY` satt. Leads kommer kun som e-post. Fikser du det, bruk en smal insert-policy for `anon` eller en `security definer`-RPC — ikke service-role på markedssiden.
