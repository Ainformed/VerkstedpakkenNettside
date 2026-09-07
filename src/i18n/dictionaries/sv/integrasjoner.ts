import type { IntegrasjonerDict } from "../nb";
const integrasjoner: IntegrasjonerDict = {
  meta: {
    title: "Integrationer",
    description:
      "Verkstedpakken är kopplat till bokföring, betalning, reservdelsleverantörer och fordonsdata.",
  },
  hero: {
    title: "Ett program som pratar med resten",
    lead: "Verkstedpakken är kopplat till programmen verkstaden redan använder: bokföring, betalning, delar och fordonsdata.",
  },
  categories: {
    alle: "Alla",
    regnskap: "Bokföring",
    betaling: "Betalning",
    deler: "Delar",
    kjoretoy: "Fordonsdata",
    ki: "AI",
  },
  integrations: {
    fiken: "Fakturor och betalningar går rakt in i bokföringen. Perfekt för verkstäder som sköter bokföringen själva.",
    poweroffice: "Automatisk överföring av fakturaunderlag och betalstatus till er redovisningskonsult.",
    tripletex: "Fakturor, kunder och betalningar hålls synkade, utan manuell inmatning.",
    visma: "Skicka fakturor och verifikat direkt till Visma, klara för bokföring.",
    "24sevenoffice": "För över försäljning och betalningar automatiskt till bokföringen.",
    systima: "Fakturaunderlag och betalningar går automatiskt till bokföring i Systima.",
    conta: "Koppla på en minut med API-nyckel. Försäljning och betalstatus hamnar direkt i Conta.",
    vipps: "Kunden betalar med Vipps när bilen hämtas.",
    stripe: "Kortbetalning på nätet. Kunden betalar med kort direkt från fakturan eller bokningen.",
    bilxtra: "Sök på regnummer, se pris och lagerstatus och beställ delar direkt från ordern.",
    meca: "Reservdelskatalog och beställning kopplad till jobbet delen ska användas på.",
    meko: "Beställ från MEKO-nätverket med leveranstid synlig i ordervyn.",
    flak: "Verkstadsutrustning och förbrukningsmaterial från Flak. Beställ med jobbet som referens.",
    romnes: "Delar och förbrukningsmaterial från Romnes, med pris och tillgänglighet i ordervyn.",
    vegvesen: "Regnummeruppslag hämtar märke, modell och besiktningsfrist automatiskt.",
    haynespro: "Tekniska data, reparationstider och servicedata för jobbet på lyften.",
    autofrontal: "Reparationsbulletiner och felkoder med lösningar på kända fel, samlade från tusentals verkstäder.",
    bus: "Kontrollbesiktning: hämta fordonsdata och skicka resultatet direkt från ordern.",
    claude: "Anthropics språkmodell. En av modellerna bakom Muttern, används till text, sammanfattningar och svar.",
    chatgpt: "OpenAIs språkmodell. Driver delar av Muttern, som utkast till meddelanden och svar på frågor.",
    gemini: "Googles språkmodell. Muttern väljer den när den löser uppgiften bäst.",
  },
  api: {
    title: "Bygg din egen koppling",
    textBefore: "Verkstedpakken har ett eget API för dig som vill koppla till något vi inte har på listan. Mejla oss på",
    textAfter: ", så löser vi det tillsammans.",
  },
};
export default integrasjoner;
