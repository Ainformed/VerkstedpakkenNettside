import type { PrisDict } from "../nb";
const pris: PrisDict = {
  meta: {
    title: "Pris för verkstadsprogrammet",
    description:
      "Admin-licens 1 295 NOK och mekanikerlicens 595 NOK per månad (exkl. moms). Allt ingår, ingen bindningstid, ingen startavgift. Prova gratis i 14 dagar.",
  },
  title: "Pris för Verkstedpakken",
  priceFormat: { locale: "sv-SE", prefix: "", suffix: " NOK" },
  calc: {
    totalLabel: "Ditt pris per månad",
    exVat: "exkl. moms",
    perMonth: "Per månad",
    byAgreement: "Enligt avtal",
    adminUnit: "admin",
    mechanicOne: "mekaniker",
    mechanicMany: "mekaniker",
    cta: "Prova gratis i 14 dagar",
    termsBold: "Ingen bindningstid",
    termsRest: "Ingen startavgift",
    adminCard: {
      name: "Admin / kundmottagare",
      per: "per användare/mån",
      text: "Allt ingår: order, planering, kunder, faktura, delar och lager. En admin kan också jobba som mekaniker.",
      field: "Antal admin",
      less: "En admin mindre",
      more: "En admin mer",
    },
    mechanicCard: {
      name: "Mekaniker",
      per: "per mekaniker/mån",
      text: "Utför och registrerar arbete i mekanikerportalen. På egen enhet eller inloggad på gemensam enhet i verkstaden.",
      field: "Antal mekaniker",
      less: "En mekaniker mindre",
      more: "En mekaniker mer",
    },
    form: {
      thanks: "Tack! Vi hör av oss och tar fram en offert till er.",
      intro: "Lämna telefon eller e-post, så tar vi fram en offert till er verkstad.",
      contactLabel: "Telefon eller e-post",
      send: "Skicka",
      sending: "Skickar …",
      errors: {
        rate_limit: "För många försök på kort tid. Försök igen om en stund.",
        count: "Ange hur många ni är.",
        contact: "Ange ett telefonnummer eller en e-postadress.",
        generic: "Något gick fel. Skicka gärna ett mejl till x@verkstedpakken.no i stället.",
      },
    },
  },
  included: {
    title: "Allt detta ingår",
    subtitle: "Sådant andra tar betalt för är en del av priset hos oss.",
    pill: "Ingår",
    groups: [
      {
        label: "I verkstaden",
        items: [
          { name: "Verkstadsorder och planering" },
          { name: "Mekanikerportal", note: "hela arbetsdagen i mobilen" },
          { name: "Kiosk och instämpling" },
          { name: "Kunder och fordon" },
          { name: "Fordonsuppslag", note: "skriv in regnr — bilen fyller i sig själv" },
          { name: "Delar och lager", note: "med inventering och varning vid lågt saldo" },
          { name: "Däckhotell" },
        ],
      },
      {
        label: "För dina kunder",
        items: [
          { name: "Mitt garage", note: "kundens egen sida med status och historik" },
          { name: "E-postaviseringar och chatt" },
        ],
      },
      {
        label: "Pengar och bokföring",
        items: [
          { name: "Faktura och betalning" },
          { name: "Bokföringsintegration" },
          { name: "Timmar och löneunderlag" },
        ],
      },
      {
        label: "Kom igång",
        items: [
          { name: "Uppsättning av programvara" },
          { name: "Uppsättning av bokföringsintegration" },
          { name: "Flytt av innehåll från andra program" },
          { name: "Support och utbildning" },
          { name: "Byter du från ett annat program?", note: "gratis under hela uppsägningstiden" },
        ],
      },
    ],
  },
  addons: {
    title: "Lägg till om du vill",
    subtitle:
      "Tjänster du kan slå på vid behov. Ingen av dem krävs för att använda Verkstedpakken.",
    groups: [
      {
        label: "Pris per månad",
        items: [
          {
            name: "Hemsida",
            note: "Färdig hemsida för verkstaden, med bokning inbyggd. Vi sätter upp den och håller den uppdaterad.",
            price: "495 NOK / mån",
            soon: false,
          },
          {
            name: "Fordonsuppslag med ägaruppgifter",
            note: "Statens vegvesen (Norge) · Slå upp regnr och få bil- och ägardata direkt in i ordern. Upp till 500 uppslag per dag.",
            price: "235 NOK / mån",
            soon: false,
          },
        ],
      },
      {
        label: "Pris per användning",
        items: [{ name: "SMS till kunder", note: "", price: "2 NOK / st", soon: false }],
      },
      {
        label: "Från andra leverantörer",
        items: [
          { name: "HaynesPro", note: "Tekniska data och reparationstider", price: "Enligt avtal", soon: true },
          { name: "AutoFrontal", note: "Reparationsbulletiner och felkoder", price: "Enligt avtal", soon: true },
          { name: "B.U.S.", note: "Kontrollbesiktning (norsk EU-kontroll)", price: "Enligt avtal", soon: true },
        ],
      },
    ],
    note: "Utöver det som står här kostar inget i Verkstedpakken något.",
    fine: "Alla priser exkl. moms.",
  },
  faq: {
    title: "Undrar du något?",
    items: [
      {
        q: "Finns det bindningstid?",
        a: "Nej. Du betalar månad för månad och kan säga upp när du vill.",
      },
      {
        q: "Hur räknas priset?",
        a: "Du betalar 1 295 NOK per admin och 595 NOK per mekaniker per månad. Priset per admin blir lägre när ni är fler admin: 1 095 NOK från den fjärde och 995 NOK från den sjunde. Mekanikerlicensen kostar lika mycket oavsett antal.",
      },
      {
        q: "Vad är skillnaden mellan admin och mekaniker?",
        a: "En admin — typiskt kundmottagaren — har tillgång till hela programmet och kan förstås också jobba som mekaniker. En mekanikerlicens är för mekaniker som utför och registrerar arbete i mekanikerportalen, på egen enhet eller inloggad på en gemensam enhet i verkstaden.",
      },
      {
        q: "Vad händer efter provperioden?",
        a: "Ingenting, om du inte väljer att fortsätta. Provperioden blir inte ett automatiskt abonnemang — du bestämmer själv.",
      },
      {
        q: "Kan vi få hjälp att flytta från programmet vi har i dag?",
        a: "Ja. Vi hjälper dig att få över kunder, fordon och historik, och sätter upp verkstaden klar att använda. Byter du från ett annat program är Verkstedpakken gratis tills uppsägningstiden hos det gamla är över – du betalar aldrig för två program samtidigt.",
      },
    ],
  },
};
export default pris;
