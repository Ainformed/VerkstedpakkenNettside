export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Alt du trenger for å drive et{" "}
            <span className="text-primary">effektivt bilverksted</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
            Verkstedpakken samler bilhåndtering, kundeoppfølging, fakturering og
            delebestilling i én løsning. Spar tid og få full kontroll over
            verkstedet ditt.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#kontakt"
              className="w-full rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark sm:w-auto"
            >
              Book en demo
            </a>
            <a
              href="#funksjoner"
              className="w-full rounded-lg border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 sm:w-auto"
            >
              Se funksjoner
            </a>
          </div>
        </div>

        {/* Placeholder for illustration/mockup */}
        <div className="mt-16 flex justify-center" aria-hidden="true">
          <div className="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="h-24 rounded-lg bg-blue-50" />
              <div className="h-24 rounded-lg bg-blue-100" />
              <div className="h-24 rounded-lg bg-blue-50" />
              <div className="col-span-2 h-32 rounded-lg bg-gray-50" />
              <div className="h-32 rounded-lg bg-blue-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
