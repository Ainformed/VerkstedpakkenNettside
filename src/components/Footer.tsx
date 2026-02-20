export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo & description */}
          <div>
            <span className="text-xl font-bold text-primary">
              Verkstedpakken
            </span>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Alt-i-ett-løsningen for bilverksteder. Effektiviser driften med
              smarte verktøy og sømløse integrasjoner.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer-navigasjon">
            <h3 className="text-sm font-semibold text-gray-900">Navigasjon</h3>
            <ul className="mt-3 space-y-2" role="list">
              <li>
                <a
                  href="#funksjoner"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  Funksjoner
                </a>
              </li>
              <li>
                <a
                  href="#integrasjoner"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  Integrasjoner
                </a>
              </li>
              <li>
                <a
                  href="#kontakt"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Kontakt</h3>
            <ul className="mt-3 space-y-2" role="list">
              <li>
                <a
                  href="mailto:kontakt@verkstedpakken.no"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  kontakt@verkstedpakken.no
                </a>
              </li>
              <li>
                <a
                  href="tel:+4712345678"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  +47 123 45 678
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Verkstedpakken. Alle rettigheter
          reservert.
        </div>
      </div>
    </footer>
  );
}
