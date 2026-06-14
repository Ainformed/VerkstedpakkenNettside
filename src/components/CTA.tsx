import { SIGNUP_URL } from "@/lib/links";

export default function CTA() {
  return (
    <section className="finale">
      <div className="wrap finale-in">
        <h2>
          Verkstedsystemet
          <br />
          som bare fungerer.
        </h2>
        <p>
          Alt for en enklere verkstedhverdag — uten oppstartskostnad og
          bindingstid. Vi setter opp alt, du driver verkstedet.
        </p>
        <div className="finale-ctas">
          <a className="btn btn-primary btn-lg btn-arrow" href={SIGNUP_URL}>
            Start gratis prøveperiode
          </a>
          <a className="btn btn-secondary btn-lg" href="tel:+4793484220">
            934 84 220
          </a>
        </div>
        <p className="cta-reassure finale-reassure">
          14 dager gratis · ingen betalingskort · ingen binding.
        </p>
      </div>
    </section>
  );
}
