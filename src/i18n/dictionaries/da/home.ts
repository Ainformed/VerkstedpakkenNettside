import type { HomeDict } from "../nb";
const home: HomeDict = {
  meta: {
    title: "Verkstedpakken — Værkstedsprogrammet uden dobbeltarbejde",
    description:
      "Værkstedsprogrammet uden dobbeltarbejde. Ordrer, booking, mekanikerportal og faktura i ét program. Admin 1.295 NOK og mekaniker 595 NOK pr. måned. Prøv gratis i 14 dage.",
  },
  hero: {
    title: "Værkstedsprogrammet uden dobbeltarbejde",
    cta: "Prøv gratis i 14 dage",
    subnote: "Skifter du fra et andet program? Du betaler ikke, før opsigelsesperioden er udløbet.",
  },
  cols: [
    { title: "Let at lære", text: "Nye programmer plejer at betyde kurser og frustration. Her er du i gang med det samme." },
    { title: "Fuld kontrol", text: "Ordrer, timer, dele og status ét sted. Du ved altid, hvor jobbene står." },
    { title: "Hjælp koster ikke", text: "Ring eller skriv, så svarer en, der kender både programmet og værkstedshverdagen." },
  ],
  panel1: {
    title: ["Hele værkstedet", "i ét program"],
    cards: [
      { title: "Du styrer værkstedet", text: "Tildel jobs, følg status og kapacitet på én skærm uden at gå runden. Når jobbet lukkes, ligger fakturagrundlaget klar til regnskabet." },
      { title: "Lavet til mekanikeren", text: "Ledige jobs på mobilen eller fælles skærm. Vælg selv eller bliv tildelt. Tiden stemples med det samme og lander direkte på ordrelinjen." },
      { title: "Kunden sender forespørgsel", text: "Pr. telefon eller på nettet. Du foreslår pris og dato, kunden bekræfter. De følger bilen undervejs og slipper for at ringe." },
    ],
    phoneHeader: "Ledige jobs",
    chip: "tir. 24. juni · 1.490 NOK",
  },
  help: {
    title: "Support, der kender værksteder",
    p1: "Spørg om stort eller småt. Det er altid et menneske, der svarer.",
    p2: "Opsætning, oplæring og spørgsmål undervejs er inkluderet. Du får aldrig faktura for hjælp.",
    photoAlt: "Supportmedarbejder svarer en kunde ved laptoppen",
  },
  ctaBanner: {
    cta: "Prøv gratis i 14 dage",
    note: "I gang på fem minutter. Ingen binding.",
  },
  mascot: { free: "GRATIS", switchNow: "SKIFT NU" },
  split1: {
    title: "Formet efter din drift",
    text: "Bil, entreprenørmaskine, MC, båd eller landbrug. Du får egne ordreskabeloner, prislister og felter til din branche. Arbejdsordrer, tidsregistrering, reservedelslager og fakturering samlet ét sted.",
    link: "Sådan fungerer ordreprogrammet",
  },
  split2: {
    title: ["Træt af programmet,", "I har?"],
    text: "At skifte program skal være trygt. Derfor er Verkstedpakken gratis, indtil opsigelsesperioden på det gamle program er udløbet. Du betaler aldrig for to programmer samtidig. Vi hjælper dig hele vejen, og værkstedet kører som normalt.",
    link: "Se priser",
  },
  integ: {
    title: "Integrationer",
    text: "Regnskab, dele og køretøjsdata. Verkstedpakken sender tallene derhen, hvor de skal, så intet indtastes to gange.",
    link: "Tjenester du kan koble til",
  },
  panel2: {
    title: ["Bliv værkstedet,", "kunderne vælger"],
    cards: [
      { title: "Vær synlig", text: "Dukk op, når kunder søger efter værksted på nettet, og styr selv det indtryk, de får. Vis hvem I er, som I vil." },
      { title: "Du bestemmer tiden", text: "Kunden taster nummerpladen ind og krydser af, hvad der er galt. Du svarer med pris, dato og tid, og de siger ja eller nej." },
      { title: "Færre opkald", text: "Kunden ser selv, hvor bilen er. Så slipper du for opkaldene, der kun spørger om én ting: er den snart færdig?" },
    ],
    wsBrand: "Dit værksted",
    bkHeader: "Ny forespørgsel",
    bkPlate: "AA 11111 · Volkswagen Caddy",
    bkButton: "Send forespørgsel",
    tkHeader: "Følg bilen",
    tkSteps: ["Bekræftet", "Modtaget", "I gang", "Klar"],
    tkFoot: "Du får besked, når bilen er klar",
    link: "Mere om hjemmeside og booking",
  },
};
export default home;
