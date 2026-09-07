import type { HomeDict } from "../nb";
const home: HomeDict = {
  meta: {
    title: "Verkstedpakken — Verkstadsprogrammet utan dubbelarbete",
    description:
      "Verkstadsprogrammet utan dubbelarbete. Order, bokning, mekanikerportal och faktura i ett program. Admin 1 295 NOK och mekaniker 595 NOK per månad. Prova gratis i 14 dagar.",
  },
  hero: {
    title: "Verkstadsprogrammet utan dubbelarbete",
    cta: "Prova gratis i 14 dagar",
    subnote: "Byter du från ett annat program? Du betalar inget förrän uppsägningstiden är över.",
  },
  cols: [
    { title: "Lätt att lära", text: "Nya program brukar betyda kurser och frustration. Här kommer du igång direkt." },
    { title: "Full kontroll", text: "Order, timmar, delar och status på ett ställe. Du vet alltid var jobben står." },
    { title: "Hjälp kostar inget", text: "Ring eller skriv, så svarar någon som kan både programmet och verkstadsvardagen." },
  ],
  panel1: {
    title: ["Hela verkstaden", "i ett program"],
    cards: [
      { title: "Du styr verkstaden", text: "Fördela jobb, följ status och kapacitet på en skärm, utan att gå runt. När jobbet stängs ligger fakturaunderlaget klart för bokföringen." },
      { title: "Gjort för mekanikern", text: "Lediga jobb i mobilen eller på gemensam skärm. Plocka själv eller bli tilldelad. Tiden stämplas på plats och hamnar direkt på orderraden." },
      { title: "Kunden skickar förfrågan", text: "Per telefon eller på nätet. Du föreslår pris och datum, kunden bekräftar. De följer bilen under tiden och slipper ringa." },
    ],
    phoneHeader: "Lediga jobb",
    chip: "tis 24 juni · 1 490 NOK",
  },
  help: {
    title: "Support som kan verkstad",
    p1: "Fråga om stort eller smått. Det är alltid en människa som svarar.",
    p2: "Uppsättning, utbildning och frågor längs vägen ingår. Du får aldrig faktura för hjälp.",
    photoAlt: "Supportmedarbetare svarar en kund vid laptopen",
  },
  ctaBanner: {
    cta: "Prova gratis i 14 dagar",
    note: "Igång på fem minuter. Ingen bindning.",
  },
  mascot: { free: "GRATIS", switchNow: "BYT NU" },
  split1: {
    title: "Formad efter din verksamhet",
    text: "Bil, anläggningsmaskin, MC, båt eller lantbruk. Du får egna ordermallar, prislistor och fält för din bransch. Arbetsorder, tidrapportering, reservdelslager och fakturering samlat på ett ställe.",
    link: "Så fungerar orderprogrammet",
  },
  split2: {
    title: ["Trött på programmet", "ni har?"],
    text: "Att byta program ska vara tryggt. Därför är Verkstedpakken gratis tills uppsägningstiden på det gamla programmet är över. Du betalar aldrig för två program samtidigt. Vi hjälper dig hela vägen, och verkstaden rullar som vanligt.",
    link: "Se priser",
  },
  integ: {
    title: "Integrationer",
    text: "Bokföring, delar och fordonsdata. Verkstedpakken skickar siffrorna dit de ska, så inget förs två gånger.",
    link: "Tjänster du kan koppla till",
  },
  panel2: {
    title: ["Bli verkstaden", "kunderna väljer"],
    cards: [
      { title: "Syns", text: "Dyk upp när kunder söker verkstad på nätet, och styr själv intrycket de får. Visa vilka ni är, som ni vill." },
      { title: "Du bestämmer tiden", text: "Kunden knappar in regnr och bockar i vad som är fel. Du svarar med pris, datum och tid, så tackar de ja eller nej." },
      { title: "Färre telefonsamtal", text: "Kunden ser själv var bilen är. Då slipper du samtalen som bara undrar en sak: är den snart klar?" },
    ],
    wsBrand: "Din verkstad",
    bkHeader: "Ny förfrågan",
    bkPlate: "AA 11111 · Volkswagen Caddy",
    bkButton: "Skicka förfrågan",
    tkHeader: "Följ bilen",
    tkSteps: ["Bekräftad", "Mottagen", "Pågår", "Klar"],
    tkFoot: "Du får besked när bilen är klar",
    link: "Mer om hemsida och bokning",
  },
};
export default home;
