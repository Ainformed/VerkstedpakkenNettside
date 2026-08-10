import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";

export const metadata: Metadata = {
  title: "Ofte stilte spørsmål",
  description:
    "Svar på det verksteder oftest lurer på om Verkstedpakken. Pris, bindingstid, bytte av system, integrasjoner og support.",
  alternates: { canonical: "/faq" },
};

type Faq = { q: string; a: string };
type FaqGroup = { title: string; items: Faq[] };

/* Én kilde for både synlig FAQ og FAQPage-schema. Endres et svar her,
   oppdateres begge. */
const GROUPS: FaqGroup[] = [
  {
    title: "Pris og betingelser",
    items: [
      {
        q: "Hva koster Verkstedpakken?",
        a: "1 295 kroner per bruker per måned, eks. mva. Alt er inkludert i prisen, og prisen per bruker blir lavere fra fjerde ansatt.",
      },
      {
        q: "Er det bindingstid?",
        a: "Nei. Du betaler måned for måned, og kan si opp når du vil.",
      },
      {
        q: "Er det noen etableringskostnad?",
        a: "Nei. Oppsett av programvaren, regnskapsintegrasjonen og flytting av innhold fra andre systemer er inkludert.",
      },
      {
        q: "Hva skjer etter prøveperioden?",
        a: "Ingenting, hvis du ikke velger å fortsette. Prøveperioden blir ikke til et automatisk abonnement. Vi sender aldri faktura uten at du har sagt ja.",
      },
      {
        q: "Hva koster support og opplæring?",
        a: "Ingenting. Support, opplæring og hjelp underveis er inkludert i prisen. Du får aldri faktura for hjelp.",
      },
    ],
  },
  {
    title: "Kom i gang",
    items: [
      {
        q: "Kan vi flytte data fra systemet vi har i dag?",
        a: "Ja. Vi hjelper deg med å få over kunder, kjøretøy og historikk, og setter opp verkstedet klart til bruk.",
      },
      {
        q: "Må vi betale for to systemer mens vi bytter?",
        a: "Nei. Bytter du fra et annet system, er Verkstedpakken gratis til oppsigelsestiden hos det gamle er over.",
      },
    ],
  },
  {
    title: "I hverdagen",
    items: [
      {
        q: "Fungerer Verkstedpakken på mobil?",
        a: "Ja. Mekanikerportalen gir mekanikerne hele arbeidsdagen på mobilen, og du kan følge verkstedet fra både mobil, nettbrett og PC.",
      },
      {
        q: "Kan kundene bestille time på nett?",
        a: "Ja. Booking på nett er inkludert. Kunden får også Min garasje, en egen side med status og historikk på bilen sin.",
      },
      {
        q: "Kan vi sende SMS til kundene?",
        a: "Ja. Påminnelser og «bilen er klar»-meldinger koster 2 kroner per melding, uten månedsavgift. E-postvarsler og chat er inkludert.",
      },
      {
        q: "Har Verkstedpakken dekkhotell?",
        a: "Ja. Dekkhotell er inkludert i prisen, sammen med deler og lager, varetelling og lavt-beholdning-varsel.",
      },
    ],
  },
  {
    title: "Integrasjoner og data",
    items: [
      {
        q: "Hvem lager og drifter integrasjonene?",
        a: "Vi gjør det selv. Alle integrasjonene i Verkstedpakken er bygget og driftet in house, uten tredjepartsløsninger mellom deg og systemene dine. Får du et problem, fikser vi det selv i stedet for å vente på en leverandør.",
      },
      {
        q: "Hvilke regnskapssystemer kan vi koble til?",
        a: "Fiken, PowerOffice, Tripletex, Visma eAccounting og 24SevenOffice. Etablering av regnskapsintegrasjonen er inkludert.",
      },
      {
        q: "Kan vi slå opp kjøretøy automatisk?",
        a: "Ja. Skriv inn skiltet, så fyller bilen seg selv med data fra Statens vegvesen. Oppslag med eieropplysninger kan legges til som tilleggstjeneste.",
      },
      {
        q: "Kan vi bestille deler i systemet?",
        a: "Ja. Verkstedpakken er koblet til BilXtra, MECA og MEKO, så delene kommer rett inn i ordren.",
      },
      {
        q: "Hva om vi trenger en kobling dere ikke har?",
        a: "Verkstedpakken har et eget API. Send oss en e-post på hei@verkstedpakken.no, så finner vi ut av det sammen.",
      },
    ],
  },
];

function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GROUPS.flatMap((g) =>
      g.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      }))
    ),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="page-faq">
        <FaqJsonLd />
        <section className="hero feat-hero">
          <div className="wrap">
            <h1>Ofte stilte spørsmål</h1>
            <p className="lead">
              Svar på det verksteder oftest lurer på. Finner du ikke svaret,
              send en e-post til{" "}
              <a
                href="mailto:hei@verkstedpakken.no"
                style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                hei@verkstedpakken.no
              </a>{" "}
              eller ring <a href="tel:+4793484220">93 48 42 20</a>.
            </p>
          </div>
        </section>

        {GROUPS.map((group) => (
          <section
            key={group.title}
            className="page-sec"
            style={{ paddingTop: 0, paddingBottom: 56 }}
          >
            <div className="faq-wrap">
              <div className="sec-title-c" style={{ marginBottom: 24 }}>
                <h2>{group.title}</h2>
              </div>
              {group.items.map((f) => (
                <details key={f.q} className="faq">
                  <summary>{f.q}</summary>
                  <div className="faq-body">{f.a}</div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
