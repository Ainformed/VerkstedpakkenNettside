import type { BookingDict } from "../nb";
const booking: BookingDict = {
  meta: {
    title: "Hemsida och bokning",
    description:
      "Färdig hemsida där kunden skickar förfrågan när det passar dem och får en offert tillbaka. Ni svarar när det passar er.",
  },
  hero: {
    title: "Hemsida och bokning, klart från start",
    lead: "Färdig hemsida där kunden skickar förfrågan när det passar dem och får en offert tillbaka. Ni svarar när det passar er.",
    cta: "Prova gratis i 14 dagar",
    artAlt: "Muttern med headset hälsar välkommen",
  },
  site: {
    title: "Färdig hemsida med er profil",
    p1: "Logotyp, öppettider och tjänster. Vi sätter upp den för 495 NOK i månaden.",
    p2: "Sidan fungerar lika bra på mobilen som på datorn, och kunderna hittar er när de söker.",
    photoAlt: "Bolli Motors färdiga hemsida på laptopen",
  },
  portal: {
    title: "Förfrågningar dygnet runt",
    p1: "Bokningsportalen är gratis och ingår. Koppla den till hemsidan ni redan har, eller den vi gör åt er.",
    p2: "Kunden fyller i registreringsnummer och väljer tjänst. Förfrågan kommer direkt in som en order.",
    photoAlt: "Kunden skickar förfrågan i bokningsportalen på mobilen",
  },
  cx: {
    title: "Kunden godkänner med ett tryck",
    sub: "Ni föreslår tid och pris. Kunden får en avisering via SMS eller e-post.",
    steps: [
      { title: "Ni föreslår tid och pris", text: "Svara direkt från ordern i programmet." },
      { title: "Kunden får SMS eller e-post", text: "Förslaget kommer dit kunden är." },
      { title: "Godkänner eller avböjer med ett tryck", text: "Kunden öppnar länken och svarar utan inloggning." },
      { title: "Jobbet ligger i kalendern", text: "Pris och tid är bekräftade, jobbet står klart som order." },
    ],
    phone: {
      aria: "SMS-konversation mellan verkstaden och kunden",
      name: "Bakken Bilverksted",
      sub: "SMS · i dag 09:12",
      offerTitle: "Offert: Kontrollbesiktning · BS 77410",
      offerSub: "Föreslaget: torsdag 16 kl. 08:00 · 990 NOK",
      offerLink: "Se och svara på offerten",
      acceptedTitle: "Offert godkänd",
      acceptedSub: "Kommentar: ”Kan ni även kolla AC:n?”",
      delivered: "Levererat 09:14",
      confirmed: "Bokningen är bekräftad: torsdag 16 kl. 08:00. Du får en påminnelse dagen innan.",
    },
  },
  less: {
    title: ["Färre telefonsamtal,", "fullare kalender"],
    sub: "Ingen kan svara i telefon dygnet runt. Bokningsportalen tar emot förfrågningar även när verkstaden är stängd.",
    points: [
      "Förfrågningar dygnet runt, även utanför öppettiderna.",
      "Förfrågningar och offerter blir till order av sig själva.",
      "Kunden godkänner eller avböjer via SMS eller e-post.",
    ],
  },
};
export default booking;
