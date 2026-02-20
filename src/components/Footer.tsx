export default function Footer() {
  return (
    <footer className="border-t border-line px-8 py-14 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <span className="font-[family-name:var(--font-bricolage)] text-[28px] font-extrabold tracking-tight text-primary">
              Verkstedpakken
            </span>
            <p className="mt-3 text-[13px] text-faint">
              Verkstedsystemet som bare fungerer.
            </p>
            <div className="mt-3 space-y-1 text-[13px] text-faint">
              <p>Org.nr: 937 000 847</p>
              <p>Tordenskiolds gate 2, 0160 Oslo</p>
            </div>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-sub">Sider</p>
              <div className="mt-3 flex flex-col gap-2 text-[13px] text-faint">
                <a href="#funksjoner" className="transition-colors duration-200 hover:text-fg">Funksjoner</a>
                <a href="#integrasjoner" className="transition-colors duration-200 hover:text-fg">Integrasjoner</a>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wider text-sub">Kontakt</p>
              <div className="mt-3 flex flex-col gap-2 text-[13px] text-faint">
                <a href="mailto:salg@verkstedpakken.no" className="transition-colors duration-200 hover:text-fg">salg@verkstedpakken.no</a>
                <a href="tel:+4793484220" className="transition-colors duration-200 hover:text-fg">934 84 220</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-[13px] text-faint">
          &copy; {new Date().getFullYear()} Verkstedpakken AS
        </div>
      </div>
    </footer>
  );
}
