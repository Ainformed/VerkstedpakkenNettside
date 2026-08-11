import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import "./eu-kontroll.css";

export const metadata: Metadata = {
  title: "Når er det EU-kontroll? Frist, pris og tid",
  description:
    "Personbil: første EU-kontroll senest 4 år etter førstegangsregistrering, deretter hvert 2. år. Typiske priser, tidsbruk og hva som skjer ved glemt frist.",
  alternates: { canonical: "/eu-kontroll" },
};

const SITE = "https://verkstedpakken.no";
const OPPDATERT = "2026-08-11";

type Faq = { q: string; a: string };

/* Én kilde for både synlig FAQ og FAQPage-schema. Faktagrunnlag:
   vegvesen.no, lovdata.no (forskrift 2009-05-13-591) og naf.no,
   verifisert 11.08.2026. Pris/tid er typiske tall, ikke løfter. */
const FAQS: Faq[] = [
  {
    q: "Hvor mye koster en EU-kontroll?",
    a: "Det finnes ingen fastpris. Verkstedet setter prisen selv. For personbil er typisk pris 500 til 2000 kr i 2026, med et landssnitt rundt 1300 kr.",
  },
  {
    q: "Hvor ofte skal bilen på EU-kontroll?",
    a: "Personbil og varebil med tillatt totalvekt inntil 3500 kg: første gang senest 4 år etter førstegangsregistrering, deretter senest hvert 2. år. Tunge kjøretøy, buss, drosje og ambulanse kontrolleres hvert år.",
  },
  {
    q: "Kan jeg utsette EU-kontrollen?",
    a: "Nei. Hovedregelen er at fristen ikke kan utsettes. Eneste unntak er nylig oppstått alvorlig sykdom, dokumentert med legeerklæring.",
  },
  {
    q: "Hva koster etterkontroll?",
    a: "Etterkontroll prises separat og er billigere enn full kontroll. Hos NAF koster den 399 kr for medlemmer og 509 kr for ikke-medlemmer. Reparasjon av feil kommer i tillegg.",
  },
  {
    q: "Hvor lang tid tar EU-kontrollen?",
    a: "Typisk 45 til 60 minutter for personbil. Du kan vente på stedet. Etterkontroll går raskere fordi bare feilene fra forrige kontroll sjekkes.",
  },
  {
    q: "Kan alle verksteder utføre EU-kontroll?",
    a: "Nei. Bare godkjente kontrollorgan kan utføre EU-kontroll. Du finner godkjente verksteder på vegvesen.no.",
  },
  {
    q: "Må elbil ha EU-kontroll?",
    a: "Ja. Elbil registrert som personbil følger samme frister som andre personbiler. Ta med løs ladekabel til kontrollen.",
  },
  {
    q: "Hva skjer hvis fristen har gått ut?",
    a: "Bilen får bruksforbud og kan bli avskiltet ved kontroll. Bestill time hos et godkjent verksted straks, eller avregistrer bilen og bruk prøveskilt.",
  },
];

function JsonLd() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE}/eu-kontroll`,
      name: "Når er det EU-kontroll? Frist, pris og tid",
      url: `${SITE}/eu-kontroll`,
      inLanguage: "nb-NO",
      dateModified: OPPDATERT,
      isPartOf: { "@id": `${SITE}/#website` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Verkstedpakken", item: SITE },
        {
          "@type": "ListItem",
          position: 2,
          name: "EU-kontroll",
          item: `${SITE}/eu-kontroll`,
        },
      ],
    },
  ];
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default function EuKontroll() {
  return (
    <>
      <Header />
      <main className="page-eu">
        <JsonLd />
        <section className="hero feat-hero">
          <div className="wrap">
            <h1>EU-kontroll: frist, pris og hvor lang tid det tar</h1>
            <p className="lead">
              Personbil skal på første EU-kontroll senest 4 år etter
              førstegangsregistrering, deretter senest hvert 2. år. Typisk pris
              er 500 til 2000 kr, og kontrollen tar rundt 45 til 60 minutter.
              Fristen din sjekker du gratis hos Statens vegvesen. Er bilen ikke
              godkjent innen fristen, får den bruksforbud.
            </p>
          </div>
        </section>

        <section className="page-sec" style={{ paddingTop: 0 }}>
          <div className="eu-artikkel">
            <h2>Når er det EU-kontroll?</h2>
            <p>
              Personbil og varebil med tillatt totalvekt inntil 3500 kg skal på
              første EU-kontroll senest 4 år etter førstegangsregistrering.
              Deretter senest hvert 2. år. Tunge kjøretøy over 3500 kg, buss,
              drosje og ambulanse kontrolleres første gang senest 12 måneder
              etter førstegangsregistrering, deretter hvert år.
            </p>
            <p>
              Fristen finner du med registreringsnummeret hos{" "}
              <a
                href="https://www.vegvesen.no/kjoretoy/eie-og-vedlikeholde/eu-kontroll/kontrollfrist/"
                rel="noopener"
              >
                Statens vegvesen
              </a>
              . Oppslaget er gratis, og du kan også søke med understellsnummer
              eller personlig skilt.
            </p>
            <p>
              Bobil registrert som personbil med tillatt totalvekt inntil 7500
              kg følger personbilregelen: 4 år, deretter hvert 2. år. Bobil over
              7500 kg skal kontrolleres hvert år. Forslaget om årlig EU-kontroll
              for biler over ti år er trolig skrinlagt per 2026. Ingen
              regelendring er vedtatt.
            </p>

            <h2>Når skal bilen på EU-kontroll?</h2>
            <p>
              Bilen skal være godkjent innen fristen som er registrert hos
              Statens vegvesen. Du kan ta kontrollen når som helst før fristen.
              Tar du den mer enn 2 måneder før, regnes neste frist fra
              kontrolldatoen. Tar du den mindre enn 2 måneder før, beholder du
              den opprinnelige fristen.
            </p>
            <p>
              I praksis er de siste 2 månedene før fristen et fritt vindu. Tar
              du kontrollen der, beholder du fristen og taper ingenting på å
              være tidlig ute.
            </p>
            <p>
              Hovedregelen er at fristen ikke kan utsettes. Eneste unntak er
              nylig oppstått alvorlig sykdom, dokumentert med legeerklæring.
            </p>

            <h2>Hva koster EU-kontroll?</h2>
            <p>
              Det finnes ingen fastpris på EU-kontroll. Verkstedet setter prisen
              selv. For personbil er typisk pris mellom 500 og 2000 kr i 2026.
              Landssnittet ligger rundt 1300 kr. Etterkontroll er billigere og
              prises separat. Reparasjon av eventuelle feil kommer i tillegg.
            </p>
            <table className="eu-tabell">
              <thead>
                <tr>
                  <th>Hva</th>
                  <th>Typisk pris (2026)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>EU-kontroll, personbil</td>
                  <td>500–2000 kr</td>
                </tr>
                <tr>
                  <td>Landssnitt, personbil</td>
                  <td>ca. 1300 kr</td>
                </tr>
                <tr>
                  <td>NAF-senter</td>
                  <td>1419 kr medlem / 1619 kr ikke medlem</td>
                </tr>
                <tr>
                  <td>Etterkontroll hos NAF</td>
                  <td>399 kr medlem / 509 kr ikke medlem</td>
                </tr>
              </tbody>
            </table>
            <p>
              Tallene er typiske priser, ikke en prisliste. Verkstedet ditt
              oppgir eksakt pris.
            </p>
            <p>
              Prisen varierer med kjøretøystørrelse, drivstofftype og lokal
              konkurranse. Fordi verkstedene priser fritt, kan det lønne seg å
              sjekke pris hos flere. Finner kontrollen feil, avtaler du
              reparasjonen med verkstedet. Den kommer i tillegg til selve
              kontrollen.
            </p>

            <h2>Hvor lang tid tar en EU-kontroll?</h2>
            <p>
              En EU-kontroll tar typisk 45 til 60 minutter for personbil. Du kan
              som regel vente på stedet mens kontrollen pågår. Etterkontroll går
              raskere, fordi verkstedet bare sjekker feilene fra forrige
              kontroll på nytt. Må feil repareres, kommer den tiden i tillegg.
            </p>
            <p>
              Regn med at hele besøket tar rundt en time hvis bilen er i orden.
              Blir det funnet mangler, får du beskjed om hva som må rettes og
              fristen for etterkontroll.
            </p>

            <h2>Hva sjekkes på EU-kontrollen?</h2>
            <p>
              Kontrollen har to deler. Trafikksikkerhet dekker lys, sikt, hjul,
              belter og bremser. Miljø dekker støy og avgasser. Fra 1. januar
              2025 leses også data om bilens faktiske drivstofforbruk. Etter
              kontrollen får du kontrollseddel med kilometerstand, neste frist
              og eventuelle mangler.
            </p>
            <p>
              Har du elbil, tar du med løs ladekabel. Du trenger bare ett
              dekksett, ikke begge.
            </p>
            <p>
              Tallene fra Statens vegvesen for 2024 viser hvor vanlig feil er.
              Av 1,4 millioner kontrollerte lette kjøretøy hadde 676 000 mangler
              som måtte utbedres. Vanligst var bremsefeil med 27 prosent,
              deretter lykter, reflekser og elektrisk utstyr med 25 prosent, og
              aksler, hjul, dekk og hjuloppheng med 22 prosent. Elbiler har
              høyere andel bremsefeil enn andre biler.
            </p>

            <h2>Hva skjer hvis bilen ikke blir godkjent?</h2>
            <p>
              Mangler med kode 2 eller kode 3 må rettes og godkjennes i
              etterkontroll. Fristen er den opprinnelige kontrollfristen eller
              senest 2 måneder etter kontrollen. Det som kommer først, gjelder.
              Kode 3 er trafikkfarlige feil, for eksempel på bremser eller
              styring. Da får bilen bruksforbud med en gang.
            </p>
            <p>
              Etterkontrollen kan tas hos samme verksted eller et annet godkjent
              verksted. Du kan ikke ta en helt ny EU-kontroll hos et annet
              verksted i stedet.
            </p>

            <h2>Hva skjer hvis du glemmer EU-kontrollen?</h2>
            <p>
              Er bilen ikke godkjent innen fristen, kjører du ulovlig. Bilen får
              bruksforbud og kan bli{" "}
              <a
                href="https://www.vegvesen.no/kjoretoy/eie-og-vedlikeholde/eu-kontroll/glemt-eu-kontroll/"
                rel="noopener"
              >
                avskiltet ved kontroll
              </a>
              . Løsningen er å bestille time hos et godkjent verksted straks.
              Alternativet er å avregistrere bilen og bruke prøveskilt til den
              er godkjent.
            </p>
            <p>
              Fristen kan som hovedregel ikke utsettes. Har du oversittet den,
              hjelper det ikke å vente. Bestill første ledige time.
            </p>

            <h2>Hvor kan du ta EU-kontroll?</h2>
            <p>
              Ikke alle verksteder har lov til å utføre EU-kontroll. Bare
              godkjente kontrollorgan kan gjennomføre den. Du velger fritt blant
              godkjente verksteder. Statens vegvesen utfører ikke EU-kontroller
              selv, men godkjenner verkstedene og fører tilsyn. Oversikt over
              godkjente verksteder finner du på vegvesen.no.
            </p>
            <p>
              Siden prisen settes fritt av hvert verksted, er valget ditt. Mange
              velger verkstedet de allerede bruker til service, fordi verkstedet
              da kjenner bilens historikk.
            </p>

            <h2>Slipp å huske fristen</h2>
            <p>Fristen kommer annethvert år. Det er lett å glemme.</p>
            <p>
              Verksteder som bruker Verkstedpakken kan sette opp
              EU-kontroll-varsel. Da får du automatisk beskjed fra verkstedet
              ditt når kontrollen nærmer seg, på e-post eller SMS. Du booker
              time på nett når varselet kommer.
            </p>
            <p>
              Du får også «Min garasje», din egen oversikt over bilen din hos
              verkstedet. Bruker verkstedet ditt Verkstedpakken, er dette
              allerede på plass. Hvis ikke, spør dem.
            </p>
            <p>
              <b>Driver du verksted?</b> Se hvordan EU-kontroll-varsel,{" "}
              <a href="/nettside-og-booking">booking på nett</a> og Min garasje
              fungerer i <a href="/">Verkstedpakken</a>.
            </p>

            <p className="eu-oppdatert">Sist oppdatert 11. august 2026.</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="page-sec" style={{ paddingTop: 20 }}>
          <div className="faq-wrap">
            <div className="sec-title-c">
              <h2>Spørsmål om EU-kontroll</h2>
            </div>
            {FAQS.map((f) => (
              <details key={f.q} className="faq">
                <summary>{f.q}</summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
            <p className="eu-kilder" style={{ border: 0 }}>
              Kilder:{" "}
              <a
                href="https://www.vegvesen.no/kjoretoy/eie-og-vedlikeholde/eu-kontroll/"
                rel="noopener"
              >
                Statens vegvesen
              </a>
              ,{" "}
              <a
                href="https://lovdata.no/dokument/SF/forskrift/2009-05-13-591"
                rel="noopener"
              >
                forskrift om periodisk kontroll av kjøretøy
              </a>{" "}
              og{" "}
              <a
                href="https://www.naf.no/bilverksted-og-tester/eu-kontroll"
                rel="noopener"
              >
                NAF
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
