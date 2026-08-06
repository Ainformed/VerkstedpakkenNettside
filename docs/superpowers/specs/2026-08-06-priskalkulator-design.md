# Interaktiv priskalkulator på /pris

**Dato:** 2026-08-06
**Status:** Godkjent design, klar for implementasjonsplan

## Målet

Besøkende på `/pris` skal selv kunne stille inn antall brukere og se hva det koster.
Volumrabatten forklarer seg selv ved at prisen per bruker faller når tallet krysser et
trinn — uten rabattabell, uten «du sparer»-tekst, uten oppsalgsdytt.

Spørsmålet kalkulatoren svarer på er det en verkstedeier faktisk stiller: *hva blir
regningen for oss, og hva koster hver bruker når vi er fire?*

## Prisgrunnlaget

Fasit ligger i prod (`platform_settings.pricing_tiers`, prosjekt `xrpqminsdtgktxschnci`),
verifisert 2026-08-06:

| Antall brukere | Pris per bruker |
| -------------- | --------------- |
| 1–3            | 1 295,-         |
| 4–10           | 1 195,-         |
| 11–20          | 995,-           |
| 21–50          | 895,-           |
| 51+            | 795,-           |

Alle beløp eks. mva. Valuta NOK, prøveperiode 14 dager — begge også fra
`platform_settings`, og begge stemmer med teksten på siden i dag.

### To feller vi kjenner

**Testmiljøet har en annen trapp.** Prosjekt `yijucnotjhxxphpuvkpl` har fortsatt den gamle
tretrinnsmodellen `1290 / 1090 / 890`. Peker nettsiden ved et uhell dit, annonserer den
1 290,- offentlig. Derfor er verifisering av `SUPABASE_URL` et blokkerende steg, ikke en
formalitet.

**VPapp har en foreldet hardkodet fallback.** `usePricingConfig.ts` faller tilbake på
`1290 / 1090 / 890` hvis `platform_settings`-raden mangler. Den er utenfor scope her, men
den er grunnen til at nettsiden ikke skal hardkode sin egen kopi av trappa.

## Datakilde

`/pris` er allerede en server-komponent. Den leser `pricing_tiers` fra prod ved bygg og
cacher med ISR, og sender trinnene som props til en klientkomponent.

### Autentisering: anon-nøkkel, ikke service-role

`platform_settings` har RLS aktivert (verifisert mot prod), og eneste lesepolicy krever
innlogget bruker (`auth_read_settings`: `auth.uid() IS NOT NULL`). Rollen `anon` har
`SELECT`-grant på tabellen, men ingen policy som slipper den gjennom — så uten en ny policy
får nettsiden tomt svar, ikke feilmelding. Det er verdt å merke seg: en manglende policy ser
ut som «ingen priser», ikke som «tilgang nektet», og valideringen under må derfor behandle
tomt svar som en feil.

Den enkle veien er en service-role-nøkkel, som omgår RLS. Vi velger den ikke. Service-role
gir full lese- og skrivetilgang til hele databasen, og en offentlig markedsside er et dårlig
sted å oppbevare den. Prisene er det minst hemmelige vi har — de er trykt på siden.

I stedet: en smal policy som lar `anon` lese kun prisraden.

```sql
-- Kjøres manuelt mot prod. Gir anon lesetilgang til ÉN rad, ingenting annet.
create policy anon_read_pricing_tiers
  on platform_settings
  for select
  to anon
  using (setting_key = 'pricing_tiers');
```

Nettsiden bruker da den publiserbare anon-nøkkelen.

### Miljøvariabler som må settes

Nettsidens produksjonsmiljø har i dag **bare** `RESEND_API_KEY`. Følgende må legges til på
Vercel-prosjektet `ainformed/verkstedpakkennettside`:

| Variabel                   | Verdi                                       |
| -------------------------- | ------------------------------------------- |
| `SUPABASE_URL`             | `https://xrpqminsdtgktxschnci.supabase.co`  |
| `SUPABASE_ANON_KEY`        | Anon-nøkkelen til samme prosjekt            |

Begge leses kun på server. Ingen `NEXT_PUBLIC_`-prefiks — trinnene sendes til klienten som
props, ikke som en nøkkel klienten bruker selv.

### Caching

`export const revalidate = 3600` på `/pris`. En prisendring i superadmin slår gjennom
innen en time. Det er godt nok for tall som endres et par ganger i året.

## Beregning

Ren funksjon, ingen React, egen fil — det er logikken som må være riktig, og den skal kunne
leses og testes uten en nettleser.

```ts
export type Pristrinn = { min: number; max: number | null; pris: number };

finnPris(trinn: Pristrinn[], antall: number): number
```

Regler:

1. **Sorter alltid på `min` stigende.** DB-JSON garanterer ingen rekkefølge. VPapp gjør
   samme forsvar av samme grunn.
2. Velg trinnet der `antall >= min && (max === null || antall <= max)`.
3. **Hull i trappa:** finnes ingen treff, bruk det siste trinnet med `min <= antall`.
   Er `antall` under første `min`, bruk første trinn. Ingen kombinasjon av
   feilkonfigurerte trinn skal kunne gi «ingen pris».
4. Total = `antall × pris`. Ingen avrunding — trinnprisene er hele kroner.

Formatering med `Intl.NumberFormat("nb-NO")`, som gir hardt mellomrom i tusenskillet og
matcher «1 295,-» slik siden skriver det i dag.

### Validering av DB-svaret

Parse JSON, og godta bare en ikke-tom array der hvert element har `min` og `pris` som
positive tall og `max` som tall eller `null`. Feiler noe av dette — nettverk, tom rad,
ugyldig JSON, uventet form — logges det og trappa fra tabellen over brukes som fallback.
Siden skal aldri rendre en kalkulator uten priser, og aldri en tom pris.

Fallback-konstanten er en nødløsning, ikke en andre sannhet. Den skal ha en kommentar som
sier at prod er kilden, og hvorfor VPapps tilsvarende fallback ble et problem.

## UI

Telleren ligger **under** prisen. Prisen treffer først — det er den `/pris` er til for — og
kontrollen sitter rett under tallet den endrer.

### I ro (1 bruker)

Identisk med dagens side. Ingen besøkende møter en endret pris, og meta-beskrivelsen
(«1 295,- per bruker per måned») fortsetter å stemme med det man ser.

```
        1 295,-
Per bruker per måned (ekskl. mva). Ingen bindingstid.

   −   [ 1 ]   +   brukere

[ Prøv gratis i 14 dager ]
Alt inkludert. Ingen etableringskostnad.
```

### Etter at man har tatt i telleren (4 brukere)

```
        4 780,-
per måned (ekskl. mva). Ingen bindingstid.
4 brukere × 1 195,- per bruker

   −   [ 4 ]   +   brukere

[ Prøv gratis i 14 dager ]
Alt inkludert. Ingen etableringskostnad.
```

Det store tallet blir totalen. To ting skifter når antallet går fra 1 til 2 eller mer:

- Linjen «4 brukere × 1 195,- per bruker» **dukker opp**. Ved én bruker ville den bare
  gjentatt tallet over seg.
- Ledeteksten endrer seg fra «Per bruker per måned» til «per måned», fordi det store tallet
  ikke lenger er en per-bruker-pris. Ved én bruker er de to det samme, og teksten skal stå
  ordrett som i dag.

### Boblen

Dagens tekst («Fra 4 ansatte får du lavere pris per bruker») blir, men omformuleres til å
peke på telleren fremfor å røpe poenget selv. Den er det eneste som får folk til å ta i
kontrollen i det hele tatt, siden den ligger under prisen.

Forslag: «Inkluderer alt verkstedet trenger i hverdagen og support uten timepris. Still inn
antall ansatte — prisen per bruker faller når dere blir flere.»

### FAQ

«Hvordan regnes prisen per bruker?» blir stående vag. Kalkulatoren *er* svaret; å liste
trappa i FAQ-en ville gitt to steder som må holdes i sync, og det er nøyaktig problemet vi
prøver å unngå.

## Interaksjon

**Steglengde 1, hele veien.** Ingen akselererende hopp — tallet skal alltid gjøre det man
forventer.

For at det skal være brukbart opp til 51+ trengs to ting:

- **Hold inne `−`/`+`:** repetisjon starter etter 400 ms, går hvert 120 ms, og strammes til
  40 ms etter to sekunder. Uten dette er de to øverste trinnene i praksis uoppnåelige.
- **Tallet er redigerbart:** `<input inputMode="numeric">`. Klikk og skriv `25`. Bare
  siffer slipper inn; ved blur eller Enter klemmes verdien til gyldig område. Tømmes feltet,
  faller det tilbake til forrige verdi.

**Grenser:** minimum 1, maksimum 200. Taket er ikke en prisgrense, bare vern mot at et
fastlåst `+` gir 5 000 brukere. Ingen norsk verkstedkjede er i nærheten, så det er usynlig i
praksis. `−` er `disabled` ved 1.

**Tastatur:** pil opp/ned endrer med 1 når feltet har fokus.

**Skjermleser:** `<label>` «Antall brukere» på feltet, `aria-label` «Én bruker mindre» og
«Én bruker mer» på knappene. Pris og per-bruker-linje ligger i *én* `aria-live="polite"`-
region, slik at en endring leses opp som én beskjed og ikke to.

**Ingen URL-state, ingen lagring.** Antallet nullstilles ved reload. Å dele en lenke til
«pris for 12 brukere» er ikke et behov noen har uttrykt.

## Filer

| Fil                                | Ansvar                                                        |
| ---------------------------------- | ------------------------------------------------------------- |
| `src/lib/pricing.ts`               | `Pristrinn`-typen, `finnPris()`, formatering, fallback-trappa. Ren, ingen React, ingen nettverk. |
| `src/lib/pricing-server.ts`        | `hentPristrinn()`: leser prod, validerer, faller tilbake. Kun server. |
| `src/app/pris/PrisKalkulator.tsx`  | `"use client"`. Teller + prisvisning. Får `trinn` som props, eier ingen data selv. |
| `src/app/pris/page.tsx`            | Server-komponent. Henter trinn, setter `revalidate`, rendrer kalkulatoren i `.phero-copy`. |
| `src/app/pris/pris.css`            | Stil for teller og prisblokk. Ligger der prissidens stil ligger i dag. |

Skillet som betyr noe: `pricing.ts` vet hva en pris er, `pricing-server.ts` vet hvor den
kommer fra, `PrisKalkulator.tsx` vet hvordan den vises. Ingen av dem trenger å kjenne de
andres innmat.

## Responsivt

Prisen bruker allerede `clamp()` i `pris.css`. Telleren er en rad med to knapper og et smalt
felt — den får plass på 320px uten særtilfeller. Knappene skal være minst 44 × 44 px slik at
de treffes med tommel. Verifiseres på 320 / 375 / 390px, samme bredder som hero-fiksen
tidligere i dag.

## Testing

Nettside-repoet har ingen testrunner. `finnPris()` er ren logikk med reelle grensetilfeller
— trinnovergangene 3→4, 10→11, 20→21, 50→51, usorterte trinn, hull i trappa, `antall` = 1 —
og det er akkurat den typen kode som ikke bør verifiseres ved å klikke.

Implementasjonsplanen tar stilling til om vitest settes opp for dette. Uten runner
verifiseres trinnovergangene manuelt i nettleser mot tabellen øverst i dette dokumentet.

Manuelt uansett: at siden i ro er visuelt identisk med i dag, at hold-inne når 51, at
redigering av feltet klemmer riktig, og at prisene faktisk kommer fra prod og ikke fra
fallback (sjekkes ved å endre `pricing_tiers` i prod og se at siden følger etter innen
revalidate-vinduet).

## Utenfor scope

- Av/på for tilleggstjenestene (nettside 495,-, vegvesenoppslag 995,-, SMS 2,-/stk)
- Måned/år-veksler, rabattabell, «du sparer»-tekst
- VPapps foreldede fallback-trapp i `usePricingConfig.ts`
- At interesse-skjemaet ikke lagrer til database

De to siste er ekte funn fra dette arbeidet og bør bli egne saker.

## Åpne punkter

1. **Blokkerende:** `SUPABASE_URL` og `SUPABASE_ANON_KEY` må settes på Vercel-prosjektet, og
   URL-en må verifiseres til å være prod og ikke testmiljøet.
2. **Blokkerende:** RLS-policyen over må kjøres mot prod før siden kan lese noe.
3. Ordlyden i boblen — forslaget over er et forslag.
4. Om vitest settes opp for `finnPris()`.
