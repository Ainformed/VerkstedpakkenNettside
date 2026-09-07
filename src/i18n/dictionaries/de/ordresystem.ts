import type { OrdresystemDict } from "../nb";
const ordresystem: OrdresystemDict = {
  meta: {
    title: "Auftragssystem für Werkstätten",
    description:
      "Das Auftragssystem für Kfz-Werkstätten: Aufträge und Angebote in Sekunden erstellen oder Anfragen von der Website annehmen. Alles zum Auftrag an einem Ort, von der Anfrage bis zur Rechnung.",
  },
  hero: {
    title: "Das Auftragsprogramm, das den ganzen Auftrag zusammenhält",
    lead: "Erstellen Sie Aufträge und Angebote in Sekunden oder nehmen Sie Anfragen von der Website an. Alles zum Auftrag liegt an einem Ort, von der Anfrage bis zur fertigen Rechnung.",
    cta: "14 Tage kostenlos testen",
    artAlt: "Das Maskottchen Muttern hält einen Auftrag",
  },
  rows: [
    {
      title: "Alles beginnt mit einem neuen Auftrag",
      p1: "Der Kunde sendet eine Anfrage online, oder Sie legen den Auftrag an, wenn das Telefon klingelt.",
      p2: "Keine Klebezettel und keine losen E-Mails. Jeder Arbeitsauftrag hat von Anfang an Kunde, Fahrzeug und Status.",
      imgAlt: "Laptop mit der Auftragsübersicht in Verkstedpakken auf dem Bildschirm",
    },
    {
      title: "Angebote direkt aus dem Auftrag senden",
      p1: "Preis und Termin festlegen, und der Kunde bekommt einen Link per SMS oder E-Mail. Dort bestätigt er mit einem Klick, ohne Anmeldung.",
      p2: "Sagt der Kunde ja, sind Preis und Termin bestätigt, und der Auftrag steht im Kalender.",
      imgAlt: "",
    },
    {
      title: "Der Mechaniker arbeitet direkt im Auftrag",
      p1: "Ein- und ausstempeln, Teile hinzufügen, Fotos machen und Kommentare schreiben. Alles vom Handy oder einem gemeinsamen Bildschirm in der Werkstatt.",
      p2: "Die Zeiterfassung passiert direkt im Auftrag. Die Stunden werden so gerundet, wie Sie es festgelegt haben, und interne Notizen bleiben bei Ihnen. Was der Kunde sehen soll, landet auf der Auftragszeile.",
      imgAlt: "Mechaniker erfasst den Auftrag am Handy neben dem Motorraum",
    },
    {
      title: "Vom Auftrag zu Buchhaltung und Rechnung",
      p1: "Arbeit, Teile und Gebühren liegen als Auftragszeilen mit dem richtigen Preis bereit.",
      p2: "Ist der Auftrag fertig, schicken Sie ihn zur Rechnungsprüfung. Dort werden Fehler und Lücken behoben, bevor alles an Ihre Buchhaltungssoftware geht. Von dort wird die Rechnung versendet.",
      imgAlt: "Der Auftrag mit Auftragszeilen und Preisen auf dem Bildschirm, bereit zur Rechnungsprüfung",
    },
  ],
  quotes: [
    { num: "B-0027", name: "HU + Service", price: "3.450 NOK", status: "Wartet auf Antwort" },
    { num: "B-0026", name: "Kupplungswechsel", price: "12.800 NOK", status: "Angenommen" },
    { num: "B-0025", name: "Radwechsel", price: "1.250 NOK", status: "Abgerechnet" },
  ],
  ctaBanner: {
    cta: "14 Tage kostenlos testen",
    note: "In fünf Minuten startklar. Keine Bindung.",
  },
};
export default ordresystem;
