import type { BookingDict } from "../nb";
const booking: BookingDict = {
  meta: {
    title: "Website und Buchung",
    description:
      "Fertige Website, auf der Kunden eine Anfrage senden, wann es ihnen passt, und ein Angebot zurückbekommen. Sie antworten, wann es Ihnen passt.",
  },
  hero: {
    title: "Website und Buchung, fertig von Anfang an",
    lead: "Fertige Website, auf der Kunden eine Anfrage senden, wann es ihnen passt, und ein Angebot zurückbekommen. Sie antworten, wann es Ihnen passt.",
    cta: "14 Tage kostenlos testen",
    artAlt: "Muttern mit Headset heißt willkommen",
  },
  site: {
    title: "Fertige Website mit Ihrem Profil",
    p1: "Logo, Öffnungszeiten und Leistungen. Wir richten sie für 495 NOK im Monat ein.",
    p2: "Die Seite funktioniert auf dem Handy genauso gut wie am PC, und Kunden finden Sie, wenn sie suchen.",
    photoAlt: "Die fertige Website von Bolli Motors auf dem Laptop",
  },
  portal: {
    title: "Anfragen rund um die Uhr",
    p1: "Das Buchungsportal ist kostenlos und inklusive. Verbinden Sie es mit Ihrer bestehenden Website oder mit der, die wir für Sie erstellen.",
    p2: "Der Kunde gibt das Kennzeichen ein und wählt eine Leistung. Die Anfrage landet direkt als Auftrag im Programm.",
    photoAlt: "Ein Kunde sendet eine Anfrage im Buchungsportal auf dem Handy",
  },
  cx: {
    title: "Der Kunde bestätigt mit einem Tipp",
    sub: "Sie schlagen Termin und Preis vor. Der Kunde wird per SMS oder E-Mail benachrichtigt.",
    steps: [
      { title: "Sie schlagen Termin und Preis vor", text: "Antworten Sie direkt aus dem Auftrag im Programm." },
      { title: "Der Kunde bekommt SMS oder E-Mail", text: "Der Vorschlag erreicht den Kunden, wo er gerade ist." },
      { title: "Annehmen oder ablehnen mit einem Tipp", text: "Der Kunde öffnet den Link und antwortet ohne Anmeldung." },
      { title: "Der Auftrag steht im Kalender", text: "Preis und Termin sind bestätigt, der Auftrag ist fertig angelegt." },
    ],
    phone: {
      aria: "SMS-Unterhaltung zwischen Werkstatt und Kunde",
      name: "Bakken Bilverksted",
      sub: "SMS · heute 09:12",
      offerTitle: "Angebot: Hauptuntersuchung · BS 77410",
      offerSub: "Vorgeschlagen: Donnerstag, 16. um 08:00 · 990 NOK",
      offerLink: "Angebot ansehen und antworten",
      acceptedTitle: "Angebot angenommen",
      acceptedSub: "Kommentar: „Können Sie auch die Klimaanlage prüfen?“",
      delivered: "Zugestellt 09:14",
      confirmed: "Ihre Buchung ist bestätigt: Donnerstag, 16. um 08:00. Sie erhalten am Vortag eine Erinnerung.",
    },
  },
  less: {
    title: ["Weniger Anrufe,", "vollerer Kalender"],
    sub: "Niemand kann rund um die Uhr ans Telefon gehen. Das Buchungsportal nimmt Anfragen auch dann an, wenn die Werkstatt geschlossen ist.",
    points: [
      "Anfragen rund um die Uhr, auch außerhalb der Öffnungszeiten.",
      "Anfragen und Angebote werden von selbst zu Aufträgen.",
      "Der Kunde nimmt per SMS oder E-Mail an oder lehnt ab.",
    ],
  },
};
export default booking;
