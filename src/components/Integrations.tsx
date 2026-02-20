const integrations = [
  {
    name: "Fiken",
    category: "Regnskap",
    description:
      "Synkroniser fakturaer og bilag automatisk med Fiken. Spar tid på manuell bokføring og hold regnskapet oppdatert.",
  },
  {
    name: "Tripletex",
    category: "Regnskap",
    description:
      "Koble Verkstedpakken til Tripletex for sømløs overføring av fakturaer, kunder og økonomiske data.",
  },
  {
    name: "MEKO",
    category: "Bildeler",
    description:
      "Bestill bildeler direkte fra MEKO uten å forlate Verkstedpakken. Søk i varekatalog og følg leveranser.",
  },
  {
    name: "Stripe",
    category: "Betaling",
    description:
      "Ta imot kortbetalinger enkelt og sikkert med Stripe. Støtter både kortbetaling på verkstedet og online.",
  },
];

export default function Integrations() {
  return (
    <section id="integrasjoner" className="bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Integrasjoner som forenkler hverdagen
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Verkstedpakken kobles til verktøyene du allerede bruker, slik at alt
            fungerer sømløst sammen.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.map((integration) => (
            <article
              key={integration.name}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
                <span className="text-lg font-bold text-primary">
                  {integration.name.charAt(0)}
                </span>
              </div>
              <span className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">
                {integration.category}
              </span>
              <h3 className="text-lg font-semibold text-gray-900">
                {integration.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
                {integration.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
