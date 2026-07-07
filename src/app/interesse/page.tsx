import type { Metadata } from "next";
import Header from "@/components/vp/Header";
import Footer from "@/components/vp/Footer";
import InterestForm from "./InterestForm";

export const metadata: Metadata = {
  title: "Book demo",
  description:
    "Book en kort demo — ca. 20 minutter der vi viser Verkstedpakken på en ekte jobb, ingen presentasjon.",
};

export default function InteressePage() {
  return (
    <>
      <Header />
      <main className="page-interesse">
        <section className="hero feat-hero">
          <div className="wrap" style={{ maxWidth: 940, margin: "0 auto", padding: "0 28px" }}>
            <h1>Vil du se det først?</h1>
            <p className="lead">
              Book en kort demo — ca. 20 minutter der vi viser Verkstedpakken på
              en ekte jobb, ingen presentasjon. Eller start gratis prøveperiode
              på app.verkstedpakken.no når du vil.
            </p>
          </div>
        </section>

        <section className="page-sec" style={{ paddingTop: 24 }}>
          <div className="interest-wrap">
            <ul className="check-chips" style={{ marginBottom: 36 }}>
              <li>
                <CheckIcon /> Uforpliktende — ingen press, ingen salgspitch
              </li>
              <li>
                <CheckIcon /> Kort og konkret — ca. 20 minutter
              </li>
              <li>
                <CheckIcon /> Eller bare test selv med gratis prøveperiode
              </li>
            </ul>
            <div className="interest-card">
              <InterestForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12l5 5L20 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
