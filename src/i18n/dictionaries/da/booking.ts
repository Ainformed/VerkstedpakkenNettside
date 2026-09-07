import type { BookingDict } from "../nb";
const booking: BookingDict = {
  meta: {
    title: "Hjemmeside og booking",
    description:
      "Færdig hjemmeside, hvor kunden sender en forespørgsel, når det passer dem, og får et tilbud tilbage. I svarer, når det passer jer.",
  },
  hero: {
    title: "Hjemmeside og booking, klar fra start",
    lead: "Færdig hjemmeside, hvor kunden sender en forespørgsel, når det passer dem, og får et tilbud tilbage. I svarer, når det passer jer.",
    cta: "Prøv gratis i 14 dage",
    artAlt: "Muttern med headset byder velkommen",
  },
  site: {
    title: "Færdig hjemmeside med jeres profil",
    p1: "Logo, åbningstider og ydelser. Vi sætter den op for 495 NOK om måneden.",
    p2: "Siden fungerer lige så godt på mobil som på pc, og kunderne finder jer, når de søger.",
    photoAlt: "Bolli Motors' færdige hjemmeside på laptoppen",
  },
  portal: {
    title: "Forespørgsler døgnet rundt",
    p1: "Bookingportalen er gratis og inkluderet. Kobl den til den hjemmeside, I har i forvejen, eller den, vi laver til jer.",
    p2: "Kunden indtaster nummerpladen og vælger ydelse. Forespørgslen kommer direkte ind som en ordre.",
    photoAlt: "Kunden sender en forespørgsel i bookingportalen på mobilen",
  },
  cx: {
    title: "Kunden accepterer med ét tryk",
    sub: "I foreslår tid og pris. Kunden får besked på SMS eller e-mail.",
    steps: [
      { title: "I foreslår tid og pris", text: "Svar direkte fra ordren i programmet." },
      { title: "Kunden får SMS eller e-mail", text: "Forslaget når kunden, hvor de end er." },
      { title: "Accepterer eller afviser med ét tryk", text: "Kunden åbner linket og svarer uden login." },
      { title: "Jobbet ligger i kalenderen", text: "Pris og tid er bekræftet, og jobbet står klar som ordre." },
    ],
    phone: {
      aria: "SMS-samtale mellem værkstedet og kunden",
      name: "Bakken Bilverksted",
      sub: "SMS · i dag 09:12",
      offerTitle: "Tilbud: Periodisk syn · BS 77410",
      offerSub: "Foreslået: torsdag d. 16. kl. 08:00 · 990 NOK",
      offerLink: "Se og svar på tilbuddet",
      acceptedTitle: "Tilbud accepteret",
      acceptedSub: "Kommentar: »Kan I også tjekke AC'en?«",
      delivered: "Leveret 09:14",
      confirmed: "Bestillingen er bekræftet: torsdag d. 16. kl. 08:00. Du får en påmindelse dagen før.",
    },
  },
  less: {
    title: ["Færre opkald,", "fyldigere kalender"],
    sub: "Ingen kan tage telefonen døgnet rundt. Bookingportalen tager imod forespørgsler, også når værkstedet er lukket.",
    points: [
      "Forespørgsler døgnet rundt, også uden for åbningstiden.",
      "Forespørgsler og tilbud bliver til ordrer af sig selv.",
      "Kunden accepterer eller afviser på SMS eller e-mail.",
    ],
  },
};
export default booking;
