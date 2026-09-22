import type { IntegrasjonerDict } from "../nb";
const integrasjoner: IntegrasjonerDict = {
  meta: {
    title: "Integrationen",
    description:
      "Verkstedpakken ist mit Buchhaltung, Zahlung, Teilelieferanten und Fahrzeugdaten verbunden.",
  },
  hero: {
    title: "Ein Programm, das mit dem Rest spricht",
    lead: "Verkstedpakken ist mit den Programmen verbunden, die die Werkstatt schon nutzt: Buchhaltung, Zahlung, Teile und Fahrzeugdaten.",
  },
  categories: {
    alle: "Alle",
    regnskap: "Buchhaltung",
    betaling: "Zahlung",
    deler: "Teile",
    kjoretoy: "Fahrzeugdaten",
    ki: "KI",
  },
  integrations: {
    fiken: "Rechnungen und Zahlungen gehen direkt in die Buchhaltung. Ideal für Werkstätten, die selbst buchen.",
    poweroffice: "Automatische Übertragung von Rechnungsgrundlage und Zahlungsstatus an Ihren Buchhalter.",
    tripletex: "Rechnungen, Kunden und Zahlungen bleiben synchron, ohne manuelle Eingabe.",
    visma: "Rechnungen und Belege direkt an Visma senden, fertig zur Buchung.",
    "24sevenoffice": "Verkäufe und Zahlungen automatisch in die Buchhaltung übertragen.",
    systima: "Rechnungsgrundlage und Zahlungen gehen automatisch zur Buchung in Systima.",
    conta: "In einer Minute per API-Schlüssel verbinden. Verkäufe und Zahlungsstatus landen direkt in Conta.",
    vipps: "Der Kunde zahlt mit Vipps, wenn er das Auto abholt.",
    stripe: "Kartenzahlung online. Der Kunde zahlt mit Karte direkt aus der Rechnung oder der Buchung.",
    bilxtra: "Nach Kennzeichen suchen, Preis und Lagerbestand sehen und Teile direkt aus dem Auftrag bestellen.",
    meca: "Teilekatalog und Bestellung verknüpft mit dem Auftrag, für den das Teil gebraucht wird.",
    meko: "Aus dem MEKO-Netzwerk bestellen, mit Lieferzeit sichtbar in der Auftragsansicht.",
    flak: "Werkstattausrüstung und Verbrauchsmaterial von Flak. Bestellen mit dem Auftrag als Referenz.",
    romnes: "Teile und Verbrauchsmaterial von Romnes, mit Preis und Verfügbarkeit in der Auftragsansicht.",
    tpro: "Tesla-Teile von T-PRO. Warenkorb direkt in den Auftrag übernehmen, mit Werkstattpreis im Einkauf und UVP im Verkauf.",
    vegvesen: "Die Kennzeichenabfrage holt Marke, Modell und Prüffrist automatisch.",
    haynespro: "Technische Daten, Reparaturzeiten und Servicedaten für den Auftrag auf der Hebebühne.",
    macsdata: "Technische Daten von Hella Gutmann: Schaltpläne, Reparaturanleitungen, Servicedaten und Reparaturzeiten für fast alle Marken, direkt aus dem Auftrag.",
    autofrontal: "Reparaturbulletins und Fehlercodes mit Lösungen für bekannte Fehler, gesammelt aus Tausenden Werkstätten.",
    bus: "Hauptuntersuchung: Fahrzeugdaten holen und das Prüfergebnis direkt aus dem Auftrag senden.",
    pkkhuset: "Hauptuntersuchung über PKK Huset: Prüfung aus dem Auftrag starten und das Ergebnis nach dem Einreichen direkt im Auftrag erhalten.",
    claude: "Das Sprachmodell von Anthropic. Eines der Modelle hinter Muttern, genutzt für Texte, Zusammenfassungen und Antworten.",
    chatgpt: "Das Sprachmodell von OpenAI. Treibt Teile von Muttern an, etwa Nachrichtenentwürfe und Antworten auf Fragen.",
    gemini: "Das Sprachmodell von Google. Muttern wählt es, wenn es die Aufgabe am besten löst.",
  },
  api: {
    title: "Eigene Anbindung bauen",
    textBefore: "Verkstedpakken hat eine eigene API für alle, die etwas anbinden wollen, das nicht auf der Liste steht. Schreiben Sie uns an",
    textAfter: ", dann finden wir gemeinsam eine Lösung.",
  },
};
export default integrasjoner;
