import type { PrisDict } from "../nb";
const pris: PrisDict = {
  meta: {
    title: "Preise für die Werkstattsoftware",
    description:
      "Admin-Lizenz 1.295 NOK und Mechaniker-Lizenz 595 NOK pro Monat (zzgl. MwSt.). Alles inklusive, keine Bindung, keine Einrichtungsgebühr. 14 Tage kostenlos testen.",
  },
  title: "Preise für Verkstedpakken",
  priceFormat: { locale: "de-DE", prefix: "", suffix: " NOK" },
  calc: {
    totalLabel: "Ihr Preis pro Monat",
    exVat: "zzgl. MwSt.",
    perMonth: "Pro Monat",
    byAgreement: "Nach Vereinbarung",
    adminUnit: "Admin",
    mechanicOne: "Mechaniker",
    mechanicMany: "Mechaniker",
    cta: "14 Tage kostenlos testen",
    termsBold: "Keine Bindung",
    termsRest: "Keine Einrichtungsgebühr",
    adminCard: {
      name: "Admin / Serviceberater",
      per: "pro Nutzer/Monat",
      text: "Alles inklusive: Aufträge, Planung, Kunden, Rechnung, Teile und Lager. Ein Admin kann auch als Mechaniker arbeiten.",
      field: "Anzahl Admins",
      less: "Ein Admin weniger",
      more: "Ein Admin mehr",
    },
    mechanicCard: {
      name: "Mechaniker",
      per: "pro Mechaniker/Monat",
      text: "Führt Arbeiten aus und erfasst sie im Mechanikerportal. Auf dem eigenen Gerät oder angemeldet an einem gemeinsamen Gerät in der Werkstatt.",
      field: "Anzahl Mechaniker",
      less: "Ein Mechaniker weniger",
      more: "Ein Mechaniker mehr",
    },
    form: {
      thanks: "Danke! Wir melden uns und erstellen Ihnen ein Angebot.",
      intro: "Hinterlassen Sie Telefon oder E-Mail, und wir erstellen ein Angebot für Ihre Werkstatt.",
      contactLabel: "Telefon oder E-Mail",
      send: "Senden",
      sending: "Wird gesendet …",
      errors: {
        rate_limit: "Zu viele Versuche in kurzer Zeit. Bitte versuchen Sie es gleich noch einmal.",
        count: "Geben Sie an, wie viele Sie sind.",
        contact: "Geben Sie eine Telefonnummer oder E-Mail-Adresse an.",
        generic: "Etwas ist schiefgelaufen. Schreiben Sie uns stattdessen gern an x@verkstedpakken.no.",
      },
    },
  },
  included: {
    title: "All das ist inklusive",
    subtitle: "Was andere extra berechnen, ist bei uns Teil des Preises.",
    pill: "Inklusive",
    groups: [
      {
        label: "In der Werkstatt",
        items: [
          { name: "Werkstattaufträge und Planung" },
          { name: "Mechanikerportal", note: "der ganze Arbeitstag auf dem Handy" },
          { name: "Kiosk und Zeitstempel" },
          { name: "Kunden und Fahrzeuge" },
          { name: "Fahrzeugabfrage", note: "Kennzeichen eingeben — das Auto füllt sich selbst aus" },
          { name: "Teile und Lager", note: "mit Inventur und Warnung bei niedrigem Bestand" },
          { name: "Reifenhotel" },
        ],
      },
      {
        label: "Für Ihre Kunden",
        items: [
          { name: "Meine Garage", note: "die eigene Seite des Kunden mit Status und Historie" },
          { name: "E-Mail-Benachrichtigungen und Chat" },
        ],
      },
      {
        label: "Geld und Buchhaltung",
        items: [
          { name: "Rechnung und Zahlung" },
          { name: "Buchhaltungsintegration" },
          { name: "Stunden und Lohngrundlage" },
        ],
      },
      {
        label: "Loslegen",
        items: [
          { name: "Einrichtung der Software" },
          { name: "Einrichtung der Buchhaltungsintegration" },
          { name: "Übernahme von Inhalten aus anderen Programmen" },
          { name: "Support und Schulung" },
          { name: "Sie wechseln von einem anderen Programm?", note: "kostenlos während der gesamten Kündigungsfrist" },
        ],
      },
    ],
  },
  addons: {
    title: "Bei Bedarf dazubuchen",
    subtitle:
      "Dienste, die Sie bei Bedarf einschalten können. Keiner davon ist nötig, um Verkstedpakken zu nutzen.",
    groups: [
      {
        label: "Preis pro Monat",
        items: [
          {
            name: "Website",
            note: "Fertige Website für die Werkstatt, mit integrierter Buchung. Wir richten sie ein und halten sie aktuell.",
            price: "495 NOK / Monat",
            soon: false,
          },
          {
            name: "Fahrzeugabfrage mit Halterdaten",
            note: "Statens vegvesen (Norwegen) · Kennzeichen abfragen und Fahrzeug- und Halterdaten direkt in den Auftrag übernehmen. Bis zu 500 Abfragen pro Tag.",
            price: "235 NOK / Monat",
            soon: false,
          },
        ],
      },
      {
        label: "Preis pro Nutzung",
        items: [{ name: "SMS an Kunden", note: "", price: "2 NOK / Stück", soon: false }],
      },
      {
        label: "Von anderen Anbietern",
        items: [
          { name: "HaynesPro", note: "Technische Daten und Reparaturzeiten", price: "Nach Vereinbarung", soon: true },
          { name: "AutoFrontal", note: "Reparaturbulletins und Fehlercodes", price: "Nach Vereinbarung", soon: true },
          { name: "B.U.S.", note: "Hauptuntersuchung (norwegische EU-Kontrolle)", price: "Nach Vereinbarung", soon: true },
        ],
      },
    ],
    note: "Über das hier Aufgeführte hinaus kostet in Verkstedpakken nichts etwas.",
    fine: "Alle Preise zzgl. MwSt.",
  },
  faq: {
    title: "Noch Fragen?",
    items: [
      {
        q: "Gibt es eine Vertragsbindung?",
        a: "Nein. Sie zahlen Monat für Monat und können jederzeit kündigen.",
      },
      {
        q: "Wie wird der Preis berechnet?",
        a: "Sie zahlen 1.295 NOK pro Admin und 595 NOK pro Mechaniker pro Monat. Der Preis pro Admin sinkt bei mehreren Admins: 1.095 NOK ab dem vierten und 995 NOK ab dem siebten. Die Mechaniker-Lizenz kostet unabhängig von der Anzahl gleich viel.",
      },
      {
        q: "Was ist der Unterschied zwischen Admin und Mechaniker?",
        a: "Ein Admin — typischerweise der Serviceberater — hat Zugriff auf das ganze Programm und kann natürlich auch als Mechaniker arbeiten. Eine Mechaniker-Lizenz ist für Mechaniker, die Arbeiten im Mechanikerportal ausführen und erfassen, auf dem eigenen Gerät oder angemeldet an einem gemeinsamen Gerät in der Werkstatt.",
      },
      {
        q: "Was passiert nach der Testphase?",
        a: "Nichts, sofern Sie nicht weitermachen möchten. Die Testphase wird nicht zu einem automatischen Abonnement — Sie entscheiden.",
      },
      {
        q: "Bekommen wir Hilfe beim Umzug von unserem heutigen Programm?",
        a: "Ja. Wir helfen Ihnen, Kunden, Fahrzeuge und Historie zu übernehmen, und richten die Werkstatt einsatzbereit ein. Wechseln Sie von einem anderen Programm, ist Verkstedpakken kostenlos, bis die Kündigungsfrist beim alten abgelaufen ist – Sie zahlen nie für zwei Programme gleichzeitig.",
      },
    ],
  },
};
export default pris;
