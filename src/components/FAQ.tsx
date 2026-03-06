"use client";

import { useEffect, useRef, useState } from "react";

type Category = "Alle" | "Pris og pakker" | "Oppstart" | "Daglig bruk";

const categories: Category[] = ["Alle", "Pris og pakker", "Oppstart", "Daglig bruk"];

const faqs: { q: string; a: string; cat: Category }[] = [
  // — Pris og pakker —
  {
    q: "Hva koster Verkstedpakken?",
    a: "Fast månedspris per ansatt — fra 1 000 kr/mnd for store verksteder til 1 500 kr/mnd for de minste. Prisen inkluderer alt: systemet, egen nettside med booking, AI-hjelp, oppsett og support. Ingen oppstartskostnad, ingen skjulte tillegg.",
    cat: "Pris og pakker",
  },
  {
    q: "Er vi bundet til en avtale?",
    a: "Nei. Månedlig betaling, ingen bindingstid. Dere kan avslutte når som helst. Vi tror på at systemet skal beholde dere fordi det fungerer — ikke fordi dere er låst inne.",
    cat: "Pris og pakker",
  },
  {
    q: "Hva er inkludert i prisen?",
    a: "Alt. Verkstedoversikten, ordrestyring med faktura, kundechat og ansattchat, delebestilling, dekkhotell, timeføring, statistikk, egen nettside med online booking, innebygd AI-hjelp — og support fra oss når dere trenger det.",
    cat: "Pris og pakker",
  },
  // — Oppstart —
  {
    q: "Hvor lang tid tar det å komme i gang?",
    a: "Omtrent to uker. Vi setter opp systemet, importerer data fra dagens løsning og klargjør nettsiden. Innebygd AI-introduksjon guider hver ansatt gjennom sin rolle — så dere slipper manualer og lange kursøkter.",
    cat: "Oppstart",
  },
  {
    q: "Trenger mekanikerne opplæring?",
    a: "Minimalt. Ved oppstart får hver ansatt en interaktiv introduksjon tilpasset sin rolle, hvor de lærer seg systemet i eget tempo. I tillegg har alle tilgang til en innebygd AI-chat som svarer på spørsmål underveis — så ingen trenger å vente på hjelp fra andre. De fleste er i gang på egenhånd etter kort tid.",
    cat: "Oppstart",
  },
  {
    q: "Hva skjer med dataene våre fra dagens system?",
    a: "Vi håndterer migrering som en del av oppstarten — kundedata, kjøretøy og jobbhistorikk flyttes over. Bilhistorikken blir lagret slik at dere ser hva som er gjort tidligere og unngår dobbeltarbeid.",
    cat: "Oppstart",
  },
  {
    q: "Fungerer det for vår type verksted?",
    a: "Ja. Systemet er bygget for bil, motorsykkel, båt, buss, lastebil og anleggsmaskiner — uavhengig av størrelse. Gjennom oppstarten velger dere selv hva dere trenger, slik at systemet blir skreddersydd til akkurat deres verksted. Tre rollebaserte portaler (kundemottaker, mekaniker, admin) gjør at hver person bare ser det som er relevant for sin jobb.",
    cat: "Oppstart",
  },
  {
    q: "Vi har prøvd andre systemer som ikke fungerte. Hvorfor er dette annerledes?",
    a: "Verkstedpakken er bygget fra verkstedgulvet, ikke et kontor. Hvert skjermbilde er laget for folk som har travelt og ikke har tid til å lete. Rollebaserte portaler betyr at mekanikeren aldri ser adminfunksjoner, og admin aldri trenger å rote i mekanikervyer. Det gjør at folk faktisk bruker det.",
    cat: "Oppstart",
  },
  // — Daglig bruk —
  {
    q: "Hvordan unngår vi at timer og deler glipper fra fakturaen?",
    a: "Timer stemples direkte på ordren, og deler registreres underveis. Når jobben er ferdig, er fakturagrunnlaget allerede komplett — ingen manuell punching, ingenting som faller mellom stolene.",
    cat: "Daglig bruk",
  },
  {
    q: "Hvordan fungerer kommunikasjonen med kundene?",
    a: "Kunden har en chat koblet direkte til ordren sin — tilgjengelig både via nettleseren og vanlig meldingsapp på telefonen. Prisforslag sendes i chatten, godkjennes der, og kobles rett til faktura. Alt er skriftlig og sporbart — ingen glemte beskjeder eller telefoner som ikke blir besvart.",
    cat: "Daglig bruk",
  },
  {
    q: "Kan vi bruke det med regnskapssystemet vårt?",
    a: "Ja. Statistikk og økonomi er koblet mot regnskap, så dere slipper dobbeltføring. Verkstedpakken integreres med de vanligste regnskapssystemene i Norge.",
    cat: "Daglig bruk",
  },
  {
    q: "Følger det med nettside?",
    a: "Ja. Dere får en profesjonell verkstednettside med online booking. Kundehistorikk lagres på telefonnummer, så kunder som har vært hos dere før slipper å fylle inn info på nytt. Nettsiden er klar til bruk — ingenting dere trenger å bygge selv.",
    cat: "Daglig bruk",
  },
  {
    q: "Vi har allerede en nettside vi er fornøyde med?",
    a: "Ikke noe problem. Da kan vi enkelt koble opp bookingverktøyet vårt direkte på den eksisterende nettsiden deres.",
    cat: "Daglig bruk",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<Category>("Alle");
  const [showAll, setShowAll] = useState(false);

  const filtered = activeCat === "Alle" ? faqs : faqs.filter((f) => f.cat === activeCat);
  const visible = showAll ? filtered : filtered.slice(0, 5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [activeCat, showAll]);

  return (
    <section id="faq" className="bg-bg-alt px-8 py-28 lg:px-12 lg:py-36" ref={ref}>
      <div className="mx-auto max-w-[1200px]">
        {/* Header — centered */}
        <div className="mx-auto max-w-xl text-center">
          <p className="reveal text-[13px] font-semibold uppercase tracking-[0.2em] text-primary">
            Spørsmål og svar
          </p>
          <h2
            className="reveal mt-3 font-[family-name:var(--font-bricolage)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-fg"
            style={{ transitionDelay: "80ms" }}
          >
            Ofte stilte spørsmål
          </h2>
          <p
            className="reveal mt-4 text-[15px] leading-[1.65] text-sub"
            style={{ transitionDelay: "160ms" }}
          >
            Finner du ikke svaret du leter etter? Kontakt oss, så kommer vi tilbake til deg!
          </p>

          {/* Contact row */}
          <div
            className="reveal mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            style={{ transitionDelay: "220ms" }}
          >
            <a
              href="mailto:hei@verkstedpakken.no"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-fg transition-colors hover:text-primary"
            >
              <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              hei@verkstedpakken.no
            </a>
          </div>
        </div>

        {/* Category tabs */}
        <div
          className="reveal mt-12 flex flex-wrap justify-center gap-2"
          style={{ transitionDelay: "280ms" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCat(cat);
                setOpen(null);
                setShowAll(false);
              }}
              className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-colors ${
                activeCat === cat
                  ? "bg-primary text-white"
                  : "border border-line bg-bg text-sub hover:border-primary/40 hover:text-fg"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="mt-10 mx-auto max-w-[720px]">
          {visible.map((faq, i) => (
            <div
              key={faq.q}
              className="reveal rounded-xl border border-line bg-bg mb-3 transition-all duration-300 hover:border-primary/15 hover:shadow-md hover:shadow-primary/5"
              style={{ transitionDelay: `${320 + i * 60}ms` }}
            >
              <button
                onClick={() => setOpen(open === faq.q ? null : faq.q)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-[15px] font-semibold text-fg">
                  {faq.q}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-sub transition-transform duration-200 ${open === faq.q ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
              <div
                className={`grid transition-all duration-200 ${open === faq.q ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-[14px] leading-[1.65] text-sub">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {!showAll && filtered.length > 5 && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-4 w-full rounded-xl border border-line bg-bg px-6 py-4 text-[14px] font-semibold text-sub transition-colors hover:border-primary/40 hover:text-fg"
            >
              Se flere spørsmål ({filtered.length - 5} til)
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
