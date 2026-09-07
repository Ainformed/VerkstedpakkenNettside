import type { OrdresystemDict } from "../nb";
const ordresystem: OrdresystemDict = {
  meta: {
    title: "Ordresystem til værksteder",
    description:
      "Ordresystemet til bilværksteder: opret ordrer og tilbud på sekunder, eller modtag forespørgsler fra hjemmesiden. Alt om jobbet samlet, fra forespørgsel til faktura.",
  },
  hero: {
    title: "Ordreprogrammet, der samler hele jobbet",
    lead: "Opret ordrer og tilbud på sekunder, eller modtag forespørgsler fra hjemmesiden. Alt om jobbet er samlet ét sted, fra forespørgsel til færdig faktura.",
    cta: "Prøv gratis i 14 dage",
    artAlt: "Maskotten Muttern holder en ordre",
  },
  rows: [
    {
      title: "Alt starter med en ny ordre",
      p1: "Kunden sender en forespørgsel på nettet, eller du opretter ordren, når telefonen ringer.",
      p2: "Ingen gule sedler og ingen løse e-mails. Hver arbejdsordre får kunde, bil og status fra start.",
      imgAlt: "Laptop med ordreoversigten i Verkstedpakken på skærmen",
    },
    {
      title: "Send tilbud direkte fra ordren",
      p1: "Sæt pris og dato, så får kunden et link på SMS eller e-mail. Der godkender de med ét tryk, uden login.",
      p2: "Siger kunden ja, er både pris og tid bekræftet, og jobbet ligger klar i kalenderen.",
      imgAlt: "",
    },
    {
      title: "Mekanikeren arbejder direkte på ordren",
      p1: "Stemple ind og ud, tilføj dele, tag billeder og skriv kommentarer. Alt fra mobilen eller en fælles skærm i værkstedet.",
      p2: "Tidsregistreringen sker direkte på ordren. Timerne rundes af, som I selv har valgt, og interne noter bliver hos jer. Det, kunden skal se, havner på ordrelinjen.",
      imgAlt: "Mekaniker registrerer jobbet på mobilen ved motorrummet",
    },
    {
      title: "Fra ordre til regnskab og faktura",
      p1: "Arbejde, dele og gebyrer ligger klar som ordrelinjer med den rigtige pris.",
      p2: "Når jobbet er færdigt, sender du ordren til fakturakontrol. Der rettes fejl og mangler, før alt går videre til det regnskabsprogram, I bruger. Det er derfra, fakturaen sendes.",
      imgAlt: "Ordren med ordrelinjer og priser på skærmen, klar til fakturakontrol",
    },
  ],
  quotes: [
    { num: "B-0027", name: "Syn + service", price: "3.450 NOK", status: "Venter svar" },
    { num: "B-0026", name: "Udskiftning af kobling", price: "12.800 NOK", status: "Accepteret" },
    { num: "B-0025", name: "Hjulskift", price: "1.250 NOK", status: "Faktureret" },
  ],
  ctaBanner: {
    cta: "Prøv gratis i 14 dage",
    note: "I gang på fem minutter. Ingen binding.",
  },
};
export default ordresystem;
