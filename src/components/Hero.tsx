import Image from "next/image";
import { PRICE_LABEL, PRICE_HERO_SUFFIX } from "@/lib/pricing";
import { SIGNUP_URL } from "@/lib/links";

export default function Hero() {
  return (
    <section className="hero section">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-left">
            <span className="hero-eyebrow">Laget i 2026, ikke 2006.</span>
            <h1 className="hero-h1">
              Bygget fra <em>verkstedgulvet.</em>
            </h1>
            <p className="hero-sub">
              Booking, ordre, deler, timer og kundeportal — samlet i ett
              system, fra første henvendelse til ferdig faktura. Ingen
              oppstartskostnad, ingen skjulte moduler. Bygget etter 6 år på
              verkstedgulvet.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary btn-lg btn-arrow" href={SIGNUP_URL}>
                Start gratis prøveperiode
              </a>
              <a className="btn btn-secondary btn-lg" href="#interesse">
                Book demo
              </a>
            </div>
            <p className="cta-reassure">
              14 dager gratis · ingen betalingskort · ingen binding.
            </p>
            <div className="hero-meta">
              <div>
                <b>{PRICE_LABEL}</b> {PRICE_HERO_SUFFIX}
              </div>
              <div>
                <b>0 kr</b> i oppstartskostnad
              </div>
              <div>
                <b>Online booking</b> inkludert i prisen
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-visual">
              <div className="hv-collage">
                <Image
                  src="/hero-collage.png"
                  alt="RGL Automotive nettside og Verkstedpakken ordresystem"
                  fill
                  priority
                  sizes="(max-width: 960px) 100vw, 640px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="hv-badge">
                <div className="hv-badge-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12l6 6L20 6"
                      stroke="#fff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <b>Booking → ordre</b>
                  <span>Automatisk i systemet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
