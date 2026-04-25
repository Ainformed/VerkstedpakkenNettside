import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="ft-grid">
          <div className="ft-brand">
            <div className="logo">
              <span className="logo-mark">V</span>Verkstedpakken
            </div>
            <p>
              En komplett løsning med verkstedsystem, mekanikerportal, custom
              nettside og booking-moduler — for alle typer verksteder.
            </p>
          </div>
          <div className="ft-col">
            <h4>Produkt</h4>
            <a href="/#produkt">Produkt</a>
            <a href="/#roller">Roller</a>
            <a href="/#integrasjoner">Integrasjoner</a>
            <a href="/#interesse">Pris</a>
          </div>
          <div className="ft-col">
            <h4>Selskap</h4>
            <Link href="/om-oss">Om oss</Link>
            <a href="/#interesse">Meld interesse</a>
            <a href="mailto:x@verkstedpakken.no">Kontakt</a>
            <a href="https://verkstedpakken.app">Logg inn</a>
          </div>
          <div className="ft-col">
            <h4>Kontakt</h4>
            <a href="mailto:x@verkstedpakken.no">x@verkstedpakken.no</a>
            <a href="tel:+4793484220">934 84 220</a>
            <a href="#">Tordenskiolds gate 2, Oslo</a>
          </div>
        </div>
        <div className="ft-bottom">
          <span>© 2026 Verkstedpakken AS · Org.nr 937 000 847</span>
          <span>Verkstedsystemet som bare fungerer.</span>
        </div>
      </div>
    </footer>
  );
}
