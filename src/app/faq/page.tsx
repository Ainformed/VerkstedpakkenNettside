import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import { SIGNUP_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Ofte stilte spørsmål",
  description:
    "Svar på det verksteder oftest lurer på om Verkstedpakken. Pris, bindingstid, bytte av program, integrasjoner og support.",
  alternates: { canonical: "/faq" },
};

type Faq = { q: string; a: string };
type FaqGroup = { title: string; items: Faq[] };

/* Svar kan inneholde [tekst](url)-lenker. På siden vises de som lenker,
   i FAQPage-schemaet strippes de til ren tekst. */
const LENKE_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

function utenLenker(s: string) {
  return s.replace(LENKE_RE, "$1");
}

function MedLenker({ tekst }: { tekst: string }) {
  const deler: React.ReactNode[] = [];
  let sist = 0;
  const re = new RegExp(LENKE_RE);
  let m: RegExpExecArray | null;
  while ((m = re.exec(tekst)) !== null) {
    if (m.index > sist) deler.push(tekst.slice(sist, m.index));
    deler.push(
      <a
        key={m.index}
        href={m[2]}
        style={{
          color: "var(--purple-2)",
          fontWeight: 500,
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        {m[1]}
      </a>
    );
    sist = m.index + m[0].length;
  }
  if (sist < tekst.length) deler.push(tekst.slice(sist));
  return <>{deler}</>;
}

/* Én kilde for både synlig FAQ og FAQPage-schema. Endres et svar her,
   oppdateres begge. */
const GROUPS: FaqGroup[] = [
  {
    title: "Om Verkstedpakken",
    items: [
      {
        q: "Hva er Verkstedpakken?",
        a: "Verkstedpakken er et norsk verkstedprogram som samler hele driften i ett program. Verkstedordre og planlegging, timeregistrering, mekanikerportal på mobil, deler og lager, dekkhotell, booking på nett og faktura via regnskapsprogrammet ditt. Prisen er 1 295 kroner per bruker per måned eks. mva, alt inkludert, uten bindingstid.",
      },
      {
        q: "Hvem passer Verkstedpakken for?",
        a: "Så å si alle typer verksteder. Bil, MC, båt, anleggsmaskiner, transport og landbruk. Du får egne ordremaler, prislister og felt for din bransje, så programmet passer jobben dere faktisk gjør.",
      },
    ],
  },
  {
    title: "Velge verkstedprogram",
    items: [
      {
        q: "Hvilket verkstedprogram er best?",
        a: `Det finnes ikke ett verkstedprogram som er best for alle verksteder. Sjekk fem ting: om prisen vises åpent, hva som er inkludert, om det er bindingstid, hvilke integrasjoner som følger med, og om support koster ekstra. Verkstedpakken viser prisen åpent: 1 295 kr per bruker per måned eks mva, alt inkludert, uten bindingstid.\n\nHelios og Norbits viste ikke prisen for verkstedprogrammet på nettsidene sine da vi sjekket i august 2026. Test selv med [14 dager gratis prøve](${SIGNUP_URL}), uten automatisk abonnement.`,
      },
      {
        q: "Hvordan velge verkstedprogram?",
        a: `Velg etter hverdagen og totalkostnaden, ikke etter demoen. Sjekk fem ting: om prisen vises åpent, hva som er inkludert i prisen, bindingstid og etableringskostnad, hvilke integrasjoner som følger med, og om du kan teste programmet i egen drift før du bestemmer deg.\n\n1. Åpen pris. Får du ikke prisen før demo, kan du ikke sammenligne.\n\n2. Hva som er inkludert. Support, opplæring, oppsett og dataflytting kan koste ekstra. Spør om totalprisen.\n\n3. Bindingstid og etableringskostnad. Begge gjør det dyrere å velge feil.\n\n4. Integrasjoner. Regnskap, betaling og delekataloger må henge sammen med ordre og faktura.\n\n5. Test i egen drift. En demo viser det leverandøren vil vise. En prøveperiode viser hverdagen din.\n\nHos Verkstedpakken står prisen på nettsiden, med kalkulator. Support, opplæring, oppsett, dataflytting og alle integrasjoner er inkludert. Integrasjonene er bygget og driftet av oss, uten tredjepart. Ingen bindingstid, ingen etableringskostnad. [Prøv gratis i 14 dager](${SIGNUP_URL}), uten automatisk abonnement.`,
      },
    ],
  },
  {
    title: "Pris og betingelser",
    items: [
      {
        q: "Hva koster et verkstedprogram?",
        a: "Mange leverandører oppgir ikke pris. Du må ofte booke demo for å få et tilbud. Verkstedpakken koster 1 295 kr per bruker per måned eks mva. Alt er inkludert: support, opplæring, oppsett, dataflytting og alle integrasjoner. Prisen per bruker faller fra fjerde ansatt.\n\nIngen etableringskostnad, ingen bindingstid. Regn ut prisen for ditt verksted med [kalkulatoren på prissiden](/pris).",
      },
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
        a: "Nei. Oppsett av programvaren, regnskapsintegrasjonen og flytting av innhold fra andre programmer er inkludert.",
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
        q: "Kan vi flytte data fra programmet vi har i dag?",
        a: "Ja. Vi hjelper deg med å få over kunder, kjøretøy og historikk, og setter opp verkstedet klart til bruk.",
      },
      {
        q: "Må vi betale for to programmer mens vi bytter?",
        a: "Nei. Bytter du fra et annet program, er Verkstedpakken gratis til oppsigelsestiden hos det gamle er over.",
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
        q: "Hva er Min garasje?",
        a: "Min garasje er kundens egen side hos verkstedet. Der har kunden komplett oversikt over bilene sine: full historikk på alt som er gjort, status på jobber som pågår, og alt samlet på ett sted. Kunden slipper å ringe for å spørre, og verkstedet slipper avbrytelsene. Min garasje er inkludert i prisen.",
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
        a: "Vi gjør det selv. Alle integrasjonene i Verkstedpakken er bygget og driftet in house, uten tredjepartsløsninger mellom deg og programmene dine. Får du et problem, fikser vi det selv i stedet for å vente på en leverandør.",
      },
      {
        q: "Hvilke regnskapsprogrammer kan vi koble til?",
        a: "Fiken, PowerOffice, Tripletex, Visma eAccounting og 24SevenOffice. Etablering av regnskapsintegrasjonen er inkludert.",
      },
      {
        q: "Kan vi slå opp kjøretøy automatisk?",
        a: "Ja. Skriv inn skiltet, så fyller bilen seg selv med data fra Statens vegvesen. Oppslag med eieropplysninger kan legges til som tilleggstjeneste.",
      },
      {
        q: "Kan vi bestille deler i programmet?",
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
        acceptedAnswer: { "@type": "Answer", text: utenLenker(f.a) },
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
                  <div className="faq-body">
                    {f.a.split("\n\n").map((avsnitt, i) => (
                      <p key={i} style={{ margin: i === 0 ? 0 : "10px 0 0" }}>
                        <MedLenker tekst={avsnitt} />
                      </p>
                    ))}
                  </div>
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
