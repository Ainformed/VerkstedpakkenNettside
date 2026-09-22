import type { PrisDict } from "../nb";
const pris: PrisDict = {
  meta: {
    title: "Pris på værkstedsprogrammet",
    description:
      "Admin-licens 1.295 NOK og mekanikerlicens 595 NOK pr. måned (ekskl. moms). Alt inkluderet, ingen binding, ingen oprettelsesgebyr. Prøv gratis i 14 dage.",
  },
  title: "Pris for Verkstedpakken",
  priceFormat: { locale: "da-DK", prefix: "", suffix: " NOK" },
  calc: {
    totalLabel: "Din pris pr. måned",
    exVat: "ekskl. moms",
    perMonth: "Pr. måned",
    byAgreement: "Efter aftale",
    adminUnit: "admin",
    mechanicOne: "mekaniker",
    mechanicMany: "mekanikere",
    cta: "Prøv gratis i 14 dage",
    termsBold: "Ingen binding",
    termsRest: "Intet oprettelsesgebyr",
    adminCard: {
      name: "Admin / kundemodtager",
      per: "pr. bruger/md.",
      text: "Alt inkluderet: ordrer, planlægning, kunder, faktura, dele og lager. En admin kan også arbejde som mekaniker.",
      field: "Antal admin",
      less: "Én admin mindre",
      more: "Én admin mere",
    },
    mechanicCard: {
      name: "Mekaniker",
      per: "pr. mekaniker/md.",
      text: "Udfører og registrerer arbejde i mekanikerportalen. På egen enhed eller logget ind på fælles enhed i værkstedet.",
      field: "Antal mekanikere",
      less: "Én mekaniker mindre",
      more: "Én mekaniker mere",
    },
    form: {
      thanks: "Tak! Vi kontakter jer og laver et tilbud.",
      intro: "Skriv telefon eller e-mail, så laver vi et tilbud til jeres værksted.",
      contactLabel: "Telefon eller e-mail",
      send: "Send",
      sending: "Sender …",
      errors: {
        rate_limit: "For mange forsøg på kort tid. Prøv igen om lidt.",
        count: "Angiv hvor mange I er.",
        contact: "Angiv et telefonnummer eller en e-mailadresse.",
        generic: "Noget gik galt. Send os gerne en e-mail på x@verkstedpakken.no i stedet.",
      },
    },
  },
  included: {
    title: "Alt dette er inkluderet",
    subtitle: "Det, andre tager betaling for, er en del af prisen hos os.",
    pill: "Inkluderet",
    groups: [
      {
        label: "I værkstedet",
        items: [
          { name: "Værkstedsordrer og planlægning" },
          { name: "Mekanikerportal", note: "hele arbejdsdagen på mobilen" },
          { name: "Kiosk og indstempling" },
          { name: "Kunder og køretøjer" },
          { name: "Køretøjsopslag", note: "tast nummerpladen — bilen udfylder sig selv" },
          { name: "Dele og lager", note: "med optælling og advarsel ved lav beholdning" },
          { name: "Dækhotel" },
        ],
      },
      {
        label: "Til dine kunder",
        items: [
          { name: "Min garage", note: "kundens egen side med status og historik" },
          { name: "E-mailnotifikationer og chat" },
        ],
      },
      {
        label: "Penge og regnskab",
        items: [
          { name: "Faktura og betaling" },
          { name: "Regnskabsintegration" },
          { name: "Timer og løngrundlag" },
        ],
      },
      {
        label: "Kom i gang",
        items: [
          { name: "Opsætning af software" },
          { name: "Opsætning af regnskabsintegration" },
          { name: "Flytning af indhold fra andre programmer" },
          { name: "Support og oplæring" },
          { name: "Skifter du fra et andet program?", note: "gratis i hele opsigelsesperioden" },
        ],
      },
    ],
  },
  addons: {
    title: "Tilføj hvis du vil",
    subtitle:
      "Tjenester, du kan slå til efter behov. Ingen af dem er nødvendige for at bruge Verkstedpakken.",
    groups: [
      {
        label: "Pris pr. måned",
        items: [
          {
            name: "Hjemmeside",
            note: "Færdig hjemmeside til værkstedet med indbygget booking. Vi sætter den op og holder den opdateret.",
            price: "495 NOK / md.",
            soon: false,
          },
          {
            name: "Køretøjsopslag med ejeroplysninger",
            note: "Statens vegvesen (Norge) · Slå nummerpladen op og få bil- og ejerdata direkte i ordren. Op til 500 opslag pr. dag.",
            price: "235 NOK / md.",
            soon: false,
          },
        ],
      },
      {
        label: "Pris pr. brug",
        items: [{ name: "SMS til kunder", note: "", price: "2 NOK / stk.", soon: false }],
      },
      {
        label: "Fra andre leverandører",
        items: [
          { name: "HaynesPro", note: "Tekniske data og reparationstider", price: "Efter aftale", soon: true },
          { name: "AutoFrontal", note: "Reparationsbulletiner og fejlkoder", price: "Efter aftale", soon: true },
          { name: "B.U.S.", note: "Periodisk syn (norsk EU-kontrol)", price: "Efter aftale", soon: true },
        ],
      },
    ],
    note: "Ud over det, der står her, er der intet i Verkstedpakken, der koster noget.",
    fine: "Alle priser er ekskl. moms.",
  },
  faq: {
    title: "Er der noget, du undrer dig over?",
    items: [
      {
        q: "Er der binding?",
        a: "Nej. Du betaler måned for måned og kan opsige, når du vil.",
      },
      {
        q: "Hvordan beregnes prisen?",
        a: "Du betaler 1.295 NOK pr. admin og 595 NOK pr. mekaniker pr. måned. Prisen pr. admin bliver lavere, når I er flere admin: 1.095 NOK fra den fjerde og 995 NOK fra den syvende. Mekanikerlicensen koster det samme uanset antal.",
      },
      {
        q: "Hvad er forskellen på admin og mekaniker?",
        a: "En admin — typisk kundemodtageren — har adgang til hele programmet og kan selvfølgelig også arbejde som mekaniker. En mekanikerlicens er til mekanikere, der udfører og registrerer arbejde i mekanikerportalen, på egen enhed eller logget ind på en fælles enhed i værkstedet.",
      },
      {
        q: "Hvad sker der efter prøveperioden?",
        a: "Ingenting, medmindre du vælger at fortsætte. Prøveperioden bliver ikke til et automatisk abonnement — du bestemmer selv.",
      },
      {
        q: "Kan vi få hjælp til at flytte fra det program, vi har i dag?",
        a: "Ja. Vi hjælper dig med at få kunder, køretøjer og historik over og sætter værkstedet klar til brug. Skifter du fra et andet program, er Verkstedpakken gratis, indtil opsigelsesperioden hos det gamle er udløbet – du betaler aldrig for to programmer samtidig.",
      },
    ],
  },
};
export default pris;
