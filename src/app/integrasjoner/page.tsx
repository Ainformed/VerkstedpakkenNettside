import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import IntegrationCatalog from "./IntegrationCatalog";

export const metadata: Metadata = {
  title: "Integrasjoner",
  description:
    "Verkstedpakken er koblet til regnskap, betaling, deleleverandører og kjøretøydata. Alt føres en gang, så er det på plass overalt.",
  alternates: { canonical: "/integrasjoner" },
};

export default function Integrasjoner() {
  return (
    <>
      <Header />
      <main className="page-integrasjoner">
        <section className="hero feat-hero">
          <div className="wrap">
            <h1>Ett program som snakker med resten</h1>
            <p className="lead">
              Verkstedpakken er koblet til programmene verkstedet allerede
              bruker: regnskap, betaling, deler og kjøretøydata. Alt føres
              en gang, så er det på plass overalt.
            </p>
          </div>
        </section>

        <IntegrationCatalog />

        <section className="page-sec" style={{ paddingTop: 0 }}>
          <div className="faq-wrap">
            <div className="sec-title-c">
              <h2>Lag din egen kobling</h2>
              <p>
                Verkstedpakken har et eget API for deg som vil koble til noe vi
                ikke har på lista. Send oss en e-post på{" "}
                <a
                  href="mailto:hei@verkstedpakken.no"
                  style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  hei@verkstedpakken.no
                </a>
                , så finner vi ut av det sammen.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
