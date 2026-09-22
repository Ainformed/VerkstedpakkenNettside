import type { IntegrasjonerDict } from "../nb";
const integrasjoner: IntegrasjonerDict = {
  meta: {
    title: "Integrationer",
    description:
      "Verkstedpakken er koblet til regnskab, betaling, reservedelsleverandører og køretøjsdata.",
  },
  hero: {
    title: "Ét program, der taler med resten",
    lead: "Verkstedpakken er koblet til de programmer, værkstedet allerede bruger: regnskab, betaling, dele og køretøjsdata.",
  },
  categories: {
    alle: "Alle",
    regnskap: "Regnskab",
    betaling: "Betaling",
    deler: "Dele",
    kjoretoy: "Køretøjsdata",
    ki: "AI",
  },
  integrations: {
    fiken: "Fakturaer og betalinger går direkte ind i regnskabet. Perfekt til værksteder, der selv fører regnskab.",
    poweroffice: "Automatisk overførsel af fakturagrundlag og betalingsstatus til jeres bogholder.",
    tripletex: "Fakturaer, kunder og betalinger holdes synkroniseret, uden manuel indtastning.",
    visma: "Send fakturaer og bilag direkte til Visma, klar til bogføring.",
    "24sevenoffice": "Overfør salg og betalinger automatisk til regnskabet.",
    systima: "Fakturagrundlag og betalinger går automatisk til bogføring i Systima.",
    conta: "Kobl til på et minut med API-nøgle. Salg og betalingsstatus lander direkte i Conta.",
    vipps: "Kunden betaler med Vipps, når bilen hentes.",
    stripe: "Kortbetaling på nettet. Kunden betaler med kort direkte fra fakturaen eller bookingen.",
    bilxtra: "Søg på nummerplade, se pris og lagerstatus, og bestil dele direkte fra ordren.",
    meca: "Reservedelskatalog og bestilling koblet til det job, delen skal bruges på.",
    meko: "Bestil fra MEKO-netværket med leveringstid synlig i ordrebilledet.",
    flak: "Værkstedsudstyr og forbrugsvarer fra Flak. Bestil med jobbet som reference.",
    romnes: "Dele og forbrugsvarer fra Romnes, med pris og tilgængelighed i ordrebilledet.",
    tpro: "Tesla-dele fra T-PRO. Hent kurven direkte ind på ordren, med værkstedspris ind og vejledende pris ud.",
    vegvesen: "Nummerpladeopslag henter mærke, model og synsfrist automatisk.",
    haynespro: "Tekniske data, reparationstider og servicedata til jobbet på liften.",
    macsdata: "Tekniske data fra Hella Gutmann: ledningsdiagrammer, reparationsvejledninger, servicedata og reparationstider for næsten alle mærker, direkte fra ordren.",
    autofrontal: "Reparationsbulletiner og fejlkoder med løsninger på kendte fejl, samlet fra tusindvis af værksteder.",
    bus: "Periodisk syn: hent køretøjsdata og send resultatet direkte fra ordren.",
    pkkhuset: "Periodisk syn via PKK Huset: start synet fra ordren og få resultatet tilbage på ordren, når det er indsendt.",
    claude: "Anthropics sprogmodel. En af modellerne bag Muttern, brugt til tekst, opsummeringer og svar.",
    chatgpt: "OpenAIs sprogmodel. Driver dele af Muttern, som udkast til beskeder og svar på spørgsmål.",
    gemini: "Googles sprogmodel. Muttern vælger den, når den løser opgaven bedst.",
  },
  api: {
    title: "Lav din egen kobling",
    textBefore: "Verkstedpakken har sit eget API til dig, der vil koble til noget, vi ikke har på listen. Send os en e-mail på",
    textAfter: ", så finder vi ud af det sammen.",
  },
};
export default integrasjoner;
