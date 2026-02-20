export default function Hero() {
  return (
    <section className="bg-surface px-6 pt-36 pb-28 lg:pt-48 lg:pb-36">
      <div className="mx-auto max-w-[980px] text-center">
        <p className="animate-fade-up text-sm font-medium text-muted">
          For alle typer verksteder
        </p>
        <h1 className="animate-fade-up mx-auto mt-4 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.05] tracking-tight text-foreground [animation-delay:100ms]">
          Verkstedet ditt, fullstendig digitalisert
        </h1>
        <p className="animate-fade-up mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted [animation-delay:200ms]">
          Bil, båt, lastebil eller anleggsmaskiner — Verkstedpakken samler alt
          i&nbsp;én løsning. Fakturering, kundeoversikt, deler og integrasjoner.
        </p>
        <div className="animate-fade-up mt-8 flex justify-center gap-4 [animation-delay:300ms]">
          <a
            href="#kontakt"
            className="rounded-full bg-primary px-7 py-3 text-[14px] font-medium text-white transition-transform hover:scale-105"
          >
            Book en demo
          </a>
          <a
            href="#funksjoner"
            className="rounded-full border border-border px-7 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-surface-alt"
          >
            Les mer
          </a>
        </div>
      </div>
    </section>
  );
}
