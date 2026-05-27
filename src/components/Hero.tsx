import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero section">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-left">
            <span className="hero-eyebrow">For alle typer verksteder</span>
            <h1 className="hero-h1">
              Bygget fra <em>verkstedgulvet.</em>
            </h1>
            <p className="hero-sub">
              Ett system for ordre, kundechat, deler, timer og egen nettside.
              Bygget etter 6 år på verkstedgulvet, for verksteder som vil vokse
              uten å drukne i papirarbeid.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary btn-lg btn-arrow" href="#interesse">
                Meld interesse
              </a>
              <a className="btn btn-secondary btn-lg" href="#produkt">
                Se produktet
              </a>
            </div>
            <div className="hero-meta">
              <div>
                <b>Ett</b>system — hele driften
              </div>
              <div>
                <b>3</b>roller tilpasset hver hverdag
              </div>
              <div>
                <b>2 uker</b>fra signert til i gang
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-visual">
              <div className="hv-photo">
                <Image
                  src="/hero-photo.png"
                  alt="Verkstednettside eksempel"
                  fill
                  priority
                  sizes="(max-width: 960px) 100vw, 620px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "50% 75%",
                  }}
                />
              </div>
              <div className="hv-product">
                <ProductMock />
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
                  <b>Faktura sendt</b>
                  <span>Passat B7 · 4 840 kr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductMock() {
  return (
    <div className="product-mock">
      <div className="pm-top">
        <div className="pm-top-l">
          <div className="pm-burger">
            <span /><span /><span />
          </div>
          <span className="pm-top-brand">VP</span>
        </div>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.8" />
          <path
            d="M19.4 15a1.7 1.7 0 00.4 1.8l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.8-.4 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.4l-.1.1a2 2 0 11-2.9-2.9l.1-.1a1.7 1.7 0 00.4-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.4-1.8l-.1-.1a2 2 0 112.9-2.9l.1.1a1.7 1.7 0 001.8.4H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.4l.1-.1a2 2 0 112.9 2.9l-.1.1a1.7 1.7 0 00-.4 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="pm-cats">
        <span className="pm-cat active">Alle</span>
        <span className="pm-cat">
          Service <i>2</i>
        </span>
        <span className="pm-cat">EU-kontroll</span>
        <span className="pm-cat">
          Lakkering <i>1</i>
        </span>
      </div>
      <div className="pm-tabs">
        <span className="pm-tab active">
          Alle <i>7</i>
        </span>
        <span className="pm-tab">Ny</span>
        <span className="pm-tab">Tilbud</span>
        <span className="pm-tab">
          Bekreftet <i>1</i>
        </span>
        <span className="pm-tab">
          Tildelt <i>2</i>
        </span>
        <span className="pm-tab">
          Pågår <i>3</i>
        </span>
        <span className="pm-tab">
          Klar <i>1</i>
        </span>
      </div>
      <div className="pm-list">
        <div className="pm-daylabel">Fredag 17. april</div>
        <div className="pm-order">
          <span className="pm-order-ic">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path
                d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.1 2.1-2.1-2.1z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="pm-order-body">
            <div className="pm-order-title">
              <span className="pm-num">#38</span>
              <b>Bremseskiver +1til</b>
            </div>
            <div className="pm-order-meta">
              <PersonIcon />
              Intern — eget kjøretøy · AR4842
            </div>
          </div>
          <span className="pm-status wait">VENTER TILDELING</span>
        </div>
        <div className="pm-order">
          <span className="pm-order-ic sync">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12a8 8 0 0113-6l2-2m1 4v6h-6M20 12a8 8 0 01-13 6l-2 2m-1-4v-6h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="pm-order-body">
            <div className="pm-order-title">
              <span className="pm-num">#37</span>
              <b>Sesongskifte — Vinter, 225</b>
            </div>
            <div className="pm-order-meta">
              <PersonIcon />
              Ola Nordmann · UX58585
            </div>
            <div className="pm-order-tags">
              <span className="pm-order-tag">Firestone 225</span>
              <span className="pm-order-tag loc">
                <svg width="7" height="7" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22s-7-7-7-13a7 7 0 0114 0c0 6-7 13-7 13z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                </svg>
                A-05
              </span>
            </div>
          </div>
          <span className="pm-status prog">PÅBEGYNT</span>
        </div>
        <div className="pm-daylabel">Torsdag 16. april</div>
        <div className="pm-order">
          <span className="pm-order-ic">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path
                d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.1 2.1-2.1-2.1z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="pm-order-body">
            <div className="pm-order-title">
              <span className="pm-num">#30</span>
              <b>Dekkskift +2til</b>
            </div>
            <div className="pm-order-meta">
              <PersonIcon />
              Kari Nordmann · UX49001
            </div>
          </div>
          <span className="pm-status assign">TILDELT 16. APRIL</span>
        </div>
      </div>
    </div>
  );
}

function PersonIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 21a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
