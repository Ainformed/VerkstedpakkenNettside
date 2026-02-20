const integrations = [
  {
    name: "Fiken",
    category: "Regnskap",
    description: "Synkroniser fakturaer og bilag automatisk med Fiken.",
  },
  {
    name: "Tripletex",
    category: "Regnskap",
    description: "Sømløs overføring av fakturaer og økonomiske data.",
  },
  {
    name: "MEKO",
    category: "Bildeler",
    description: "Bestill deler direkte fra varekatalogen.",
  },
  {
    name: "Stripe",
    category: "Betaling",
    description: "Sikker kortbetaling på verkstedet og online.",
  },
];

export default function Integrations() {
  return (
    <section id="integrasjoner" className="bg-surface-alt px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[980px]">
        <div className="text-center">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-foreground">
            Integrasjoner som bare fungerer.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-muted">
            Kobles sømløst til regnskapet, deleleverandører og betaling — uten
            ekstra oppsett.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.map((item) => (
            <article
              key={item.name}
              className="rounded-3xl bg-surface p-8 text-center"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-muted">
                {item.category}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">
                {item.name}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
