export default function CTA() {
  return (
    <section id="kontakt" className="bg-primary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Klar for å effektivisere verkstedet ditt?
          </h2>
          <p className="mt-4 text-lg leading-8 text-blue-100">
            Ta kontakt med oss for en uforpliktende demo. Vi viser deg hvordan
            Verkstedpakken kan tilpasses ditt verksted.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:kontakt@verkstedpakken.no"
              className="w-full rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-sm transition-colors hover:bg-blue-50 sm:w-auto"
            >
              Send e-post
            </a>
            <a
              href="tel:+4712345678"
              className="w-full rounded-lg border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Ring oss
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
