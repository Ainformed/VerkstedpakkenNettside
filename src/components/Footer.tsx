export default function Footer() {
  return (
    <footer className="border-t border-line px-8 py-12 lg:px-12">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-[family-name:var(--font-bricolage)] text-[17px] font-bold text-fg">
          Verkstedpakken
        </span>
        <div className="flex gap-8 text-[13px] text-faint">
          <a href="#funksjoner" className="transition-colors duration-200 hover:text-fg">
            Funksjoner
          </a>
          <a href="#integrasjoner" className="transition-colors duration-200 hover:text-fg">
            Integrasjoner
          </a>
          <a href="mailto:salg@verkstedpakken.no" className="transition-colors duration-200 hover:text-fg">
            Kontakt
          </a>
        </div>
        <span className="text-[13px] text-faint">
          &copy; {new Date().getFullYear()} Verkstedpakken
        </span>
      </div>
    </footer>
  );
}
