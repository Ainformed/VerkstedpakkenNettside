export default function CTA() {
  return (
    <section id="kontakt" className="bg-surface px-6 py-28 lg:py-36">
      <div className="mx-auto max-w-[980px] text-center">
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-foreground">
          Klar for å prøve?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-muted">
          Ta kontakt for en uforpliktende demo tilpasset ditt verksted.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="mailto:salg@verkstedpakken.no"
            className="rounded-full bg-primary px-8 py-3.5 text-[14px] font-medium text-white transition-transform hover:scale-105"
          >
            salg@verkstedpakken.no
          </a>
          <a
            href="tel:+4793484220"
            className="rounded-full border border-border px-8 py-3.5 text-[14px] font-medium text-foreground transition-colors hover:bg-surface-alt"
          >
            934 84 220
          </a>
        </div>
      </div>
    </section>
  );
}
