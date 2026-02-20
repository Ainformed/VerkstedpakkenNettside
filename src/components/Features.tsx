const features = [
  {
    title: "Bilhåndtering",
    description:
      "Registrer kjøretøy uansett type. Hold oversikt over servicehistorikk, og planlegg kommende arbeid. Alt samlet på ett sted.",
  },
  {
    title: "Kundeoppfølging",
    description:
      "Automatiske påminnelser, kommunikasjonslogg og enkel kontakthåndtering for alle dine kunder.",
  },
  {
    title: "Fakturering",
    description:
      "Opprett fakturaer direkte fra arbeidsordre og synkroniser med regnskapet automatisk.",
  },
  {
    title: "Lager og deler",
    description:
      "Følg med på lagerbeholdning, bestill deler direkte, og koble dem til spesifikke jobber.",
  },
];

export default function Features() {
  return (
    <section id="funksjoner" className="bg-surface px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[980px]">
        <div className="text-center">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-foreground">
            Alt et verksted trenger.
            <br />
            <span className="text-muted">Ingenting det ikke trenger.</span>
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-3xl bg-surface-alt p-10"
            >
              <h3 className="text-2xl font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {f.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
