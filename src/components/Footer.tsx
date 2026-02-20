export default function Footer() {
  return (
    <footer className="bg-surface-alt px-6 py-8">
      <div className="mx-auto max-w-[980px]">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Verkstedpakken. Alle rettigheter reservert.
          </p>

          <nav aria-label="Footer-navigasjon">
            <ul className="flex gap-6 text-xs text-muted" role="list">
              <li><a href="#funksjoner" className="transition-colors hover:text-foreground">Funksjoner</a></li>
              <li><a href="#integrasjoner" className="transition-colors hover:text-foreground">Integrasjoner</a></li>
              <li><a href="mailto:salg@verkstedpakken.no" className="transition-colors hover:text-foreground">Kontakt</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
