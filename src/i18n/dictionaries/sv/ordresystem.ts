import type { OrdresystemDict } from "../nb";
const ordresystem: OrdresystemDict = {
  meta: {
    title: "Ordersystem för verkstad",
    description:
      "Ordersystemet för bilverkstad: skapa order och offerter på sekunder, eller ta emot förfrågningar från hemsidan. Allt om jobbet samlat, från förfrågan till faktura.",
  },
  hero: {
    title: "Orderprogrammet som samlar hela jobbet",
    lead: "Skapa order och offerter på sekunder, eller ta emot förfrågningar från hemsidan. Allt om jobbet är samlat på ett ställe, från förfrågan till färdig faktura.",
    cta: "Prova gratis i 14 dagar",
    artAlt: "Maskoten Muttern håller en order",
  },
  rows: [
    {
      title: "Allt börjar med en ny order",
      p1: "Kunden skickar förfrågan på nätet, eller så lägger du in ordern när telefonen ringer.",
      p2: "Inga gula lappar och inga lösa mejl. Varje arbetsorder får kund, bil och status från start.",
      imgAlt: "Laptop med orderöversikten i Verkstedpakken på skärmen",
    },
    {
      title: "Skicka offert direkt från ordern",
      p1: "Sätt pris och datum, så får kunden en länk via SMS eller e-post. Där godkänner de med ett tryck, utan inloggning.",
      p2: "Säger kunden ja är både pris och tid bekräftade, och jobbet ligger klart i kalendern.",
      imgAlt: "",
    },
    {
      title: "Mekanikern jobbar direkt på ordern",
      p1: "Stämpla in och ut, lägg till delar, ta bilder och skriv kommentarer. Allt från mobilen eller en gemensam skärm i verkstaden.",
      p2: "Tidrapporteringen sker direkt på ordern. Timmarna avrundas som ni själva valt, och interna anteckningar stannar hos er. Det kunden ska se hamnar på orderraden.",
      imgAlt: "Mekaniker registrerar jobbet på mobilen vid motorrummet",
    },
    {
      title: "Från order till bokföring och faktura",
      p1: "Arbete, delar och avgifter ligger klara som orderrader med rätt pris.",
      p2: "När jobbet är klart skickar du ordern till fakturakontroll. Där rättas fel och brister, innan allt går vidare till bokföringsprogrammet ni använder. Det är därifrån fakturan skickas.",
      imgAlt: "Ordern med orderrader och priser på skärmen, klar för fakturakontroll",
    },
  ],
  quotes: [
    { num: "B-0027", name: "Besiktning + service", price: "3 450 NOK", status: "Väntar svar" },
    { num: "B-0026", name: "Byte av koppling", price: "12 800 NOK", status: "Accepterad" },
    { num: "B-0025", name: "Hjulbyte", price: "1 250 NOK", status: "Fakturerad" },
  ],
  ctaBanner: {
    cta: "Prova gratis i 14 dagar",
    note: "Igång på fem minuter. Ingen bindning.",
  },
};
export default ordresystem;
