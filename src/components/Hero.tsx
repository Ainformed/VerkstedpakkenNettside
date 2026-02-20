export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg-alt px-8 pt-40 pb-28 lg:px-12 lg:pt-52 lg:pb-36">
      {/* Subtle top grain texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      <div className="mx-auto max-w-[1200px]">
        <p className="animate-fade-up text-[13px] font-semibold uppercase tracking-[0.2em] text-primary">
          For alle typer verksteder
        </p>

        <h1 className="animate-fade-up delay-1 mt-5 max-w-[720px] font-[family-name:var(--font-bricolage)] text-[clamp(2.75rem,6vw,5rem)] leading-[1.02] tracking-tight text-fg">
          Én løsning for hele verkstedet
        </h1>

        <p className="animate-fade-up delay-2 mt-6 max-w-[480px] text-[17px] leading-[1.65] text-sub">
          Bil, båt, lastebil eller anleggsmaskiner. Kunder, jobber,
          deler og faktura samlet på ett sted.
        </p>

        <div className="animate-fade-up delay-3 mt-10 flex items-center gap-4">
          <a
            href="#kontakt"
            className="rounded-full bg-primary px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:brightness-125"
          >
            Kom i gang
          </a>
          <a
            href="#funksjoner"
            className="rounded-full border border-line px-8 py-3.5 text-[15px] font-medium text-fg transition-all duration-200 hover:border-sub hover:bg-bg"
          >
            Se funksjoner
          </a>
        </div>
      </div>
    </section>
  );
}
