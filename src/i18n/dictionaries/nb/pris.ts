const pris = {
  meta: {
    title: "Pris på verkstedprogrammet",
    description:
      "Admin-lisens 1 295,- og mekaniker-lisens 595,- per måned (ekskl. mva). Gratis oppstart og support. Månedlig uten binding, eller rabatt med binding. Prøv gratis i 14 dager.",
  },
  title: "Pris for Verkstedpakken",
  /** Beløpsformat: Intl-locale + tekst rundt tallet. nb: «1 295,-». */
  priceFormat: { locale: "nb-NO", prefix: "", suffix: ",-" },
  calc: {
    exVat: "eks. mva",
    byAgreement: "Etter avtale",
    adminUnit: "admin",
    mechanicOne: "mekaniker",
    mechanicMany: "mekanikere",
    cta: "Prøv gratis i 14 dager",
    termsRest: "Ingen etableringskostnad",
    choices: {
      bindingTitle: "Bindingstid",
      bindingOptions: ["1 måned", "6 måneder", "1 år"],
      /** Betingelseslinjen under CTA-en, én per bindingstid. */
      bindingTerms: ["Ingen bindingstid", "6 måneders bindingstid", "1 års bindingstid"],
      paymentTitle: "Betalingsfrekvens",
      /** Hva man betaler for hver gang — Henriks ordlyd 22.11.2026. */
      paymentOptions: ["Betal per mnd", "Betal for 6 måneder", "Betal for 1 år"],
      /** Sumraden når prisen er «Etter avtale» (over 10 lisenser). Ellers
       *  bruker sumraden samme tekst som valget i paymentOptions. */
      periodLabels: ["Per måned", "Per 6 måneder", "Per år"],
      /** Regnestykket ved lengre betalingsperiode. {n} = antall måneder. */
      months: " × {n} mnd",
      /** Sparelinjen. {pct} = prosent, hel eller halv («15» / «7,5»). */
      saving: "Du sparer {pct} %",
      badge: "−{pct} %",
    },
    adminCard: {
      name: "Admin / kundemottaker",
      per: "per bruker/mnd",
      text: "Alt inkludert: ordre, planlegging, kunder, faktura, deler og lager. En admin kan også jobbe som mekaniker.",
      field: "Antall admin",
      less: "Én admin mindre",
      more: "Én admin mer",
    },
    mechanicCard: {
      name: "Mekaniker",
      per: "per mekaniker/mnd",
      text: "Utfører og registrerer arbeid i mekanikerportalen. På egen enhet eller innlogget på felles enhet i verkstedet.",
      field: "Antall mekanikere",
      less: "Én mekaniker mindre",
      more: "Én mekaniker mer",
    },
    form: {
      thanks: "Takk! Vi tar kontakt og setter opp et tilbud til dere.",
      intro: "Legg igjen telefon eller e-post, så setter vi opp et tilbud til verkstedet deres.",
      contactLabel: "Telefon eller e-post",
      send: "Send",
      sending: "Sender …",
      errors: {
        rate_limit: "For mange forsøk på kort tid. Prøv igjen om litt.",
        count: "Oppgi hvor mange dere er.",
        contact: "Oppgi et telefonnummer eller en e-postadresse.",
        generic: "Noe gikk galt. Send oss gjerne en e-post på x@verkstedpakken.no i stedet.",
      },
    },
  },
  included: {
    title: "Alt dette er inkludert",
    subtitle: "Ting andre tar betalt for, er gratis hos oss.",
    pill: "Inkludert",
    groups: [
      {
        label: "I verkstedet",
        items: [
          { name: "Verkstedordre og planlegging" },
          { name: "Mekanikerportal", note: "hele arbeidsdagen på mobilen" },
          { name: "Kiosk og innstempling" },
          { name: "Kunder og kjøretøy" },
          { name: "Kjøretøyoppslag", note: "skriv inn skiltet — bilen fyller seg selv" },
          { name: "Deler og lager", note: "med varetelling og lavt-beholdning-varsel" },
          { name: "Dekkhotell" },
        ],
      },
      {
        label: "For kundene dine",
        items: [
          { name: "Min garasje", note: "kundens egen side med status og historikk" },
          { name: "E-postvarsler og chat" },
        ],
      },
      {
        label: "Penger og regnskap",
        items: [
          { name: "Faktura og betaling" },
          { name: "Regnskapsintegrasjon" },
          { name: "Timeregistrering og lønnsgrunnlag" },
        ],
      },
      {
        label: "Kom i gang",
        items: [
          { name: "Etablering av programvare" },
          { name: "Etablering av regnskapsintegrasjon" },
          { name: "Flytting av innhold fra andre programmer" },
          { name: "Support og opplæring" },
          { name: "Bytter du fra et annet system?", note: "Gratis Verkstedpakken i oppsigelsestiden (inntil 3 måneder)" },
        ],
      },
    ],
  },
  addons: {
    title: "Legg til hvis du vil",
    subtitle:
      "Tjenester du kan skru på ved behov. Ingen av dem er nødvendige for å bruke Verkstedpakken.",
    groups: [
      {
        label: "Pris per måned",
        items: [
          {
            name: "Nettside",
            note: "Ferdig nettside for verkstedet, med booking innebygd. Vi setter den opp og holder den oppdatert.",
            price: "495 kr / mnd",
            soon: false,
          },
          {
            name: "Kjøretøyoppslag med eieropplysninger",
            note: "Statens vegvesen · Slå opp regnr og få bil- og eierdata rett inn i ordren. Inntil 500 oppslag per dag.",
            price: "235 kr / mnd",
            soon: false,
          },
        ],
      },
      {
        label: "Pris per bruk",
        items: [{ name: "SMS til kunder", note: "", price: "2 kr / stk", soon: false }],
      },
      {
        label: "Fra andre leverandører",
        items: [
          { name: "HaynesPro", note: "Tekniske data og reparasjonstider", price: "Etter avtale", soon: true },
          { name: "AutoFrontal", note: "Reparasjonsbulletiner og feilkoder", price: "Etter avtale", soon: true },
          { name: "B.U.S.", note: "EU-kontroll", price: "Etter avtale", soon: true },
        ],
      },
    ],
    note: "Utover det som står her, er det ingenting i Verkstedpakken som koster noe.",
    fine: "Alle priser er eks. mva.",
  },
  faq: {
    title: "Lurer du på noe?",
    items: [
      {
        q: "Er det bindingstid?",
        a: "Du velger selv. Standard er én måned, og da kan du si opp når du vil. Velger du 6 måneders bindingstid, får du 7,5 % rabatt. Velger du 1 års bindingstid, får du 15 %. Betaler du i tillegg for 6 måneder, får du 7,5 % til. Betaler du for 1 år, får du 15 % til. Du kan ikke betale for lengre tid enn bindingstiden du har valgt. Høyeste rabatt er 30 %: 1 års bindingstid og betaling for 1 år. Rabatten gjelder både admin og mekaniker.",
      },
      {
        q: "Hvordan regnes prisen?",
        a: "Du betaler 1 295,- per admin og 595,- per mekaniker per måned. Prisen per admin blir lavere når dere er flere admin: 1 095,- fra den fjerde og 995,- fra den sjuende. Mekaniker-lisensen koster det samme uansett antall. Velger du lengre bindingstid, eller betaler for 6 måneder eller 1 år, kommer rabatten oppå dette.",
      },
      {
        q: "Hva er forskjellen på admin og mekaniker?",
        a: "En admin — typisk kundemottakeren — har tilgang til hele programmet, og kan selvsagt også jobbe som mekaniker. En mekaniker-lisens er for mekanikere som utfører og registrerer arbeid i mekanikerportalen, på egen enhet eller innlogget på en felles enhet i verkstedet.",
      },
      {
        q: "Hva skjer etter prøveperioden?",
        a: "Ingenting, hvis du ikke velger å fortsette. Prøveperioden blir ikke til et automatisk abonnement — du bestemmer selv.",
      },
      {
        q: "Kan vi få hjelp til å flytte fra programmet vi har i dag?",
        a: "Ja. Vi hjelper deg med å få over kunder, kjøretøy og historikk, og setter opp verkstedet klart til bruk. Bytter du fra et annet program, er Verkstedpakken gratis i oppsigelsestiden hos det gamle, inntil 3 måneder.",
      },
    ],
  },
};
export default pris;
