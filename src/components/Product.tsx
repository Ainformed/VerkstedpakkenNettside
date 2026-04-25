export default function Product() {
  return (
    <section className="product section" id="produkt">
      <div className="wrap">
        <span className="eyebrow">Bygget fra verkstedgulvet</span>
        <h2 className="product-h">Hele driften på ett brett.</h2>
        <p className="product-sub">
          Verkstedoversikten — hjertet i systemet. Nye bookinger, utsendte
          prisforslag, påbegynte og ferdige jobber. Alt i sanntid, alt på ett
          sted.
        </p>

        <div className="product-showcase">
          <div className="product-main">
            <MockBoard />
          </div>

          <div className="product-grid">
            <div className="product-card">
              <h3>Kundechat med prisforslag</h3>
              <p>
                Skriftlig, sporbart, koblet rett til ordren. Ingen flere glemte
                beskjeder eller tapte tilleggssalg.
              </p>
              <div className="product-card-media">
                <MiniChat />
              </div>
            </div>

            <div className="product-card">
              <h3>Kundeportal med booking-status</h3>
              <p>
                Kunden følger bilen live — fra bestilling til henteklar. Ingen
                telefoner, ingen spørsmål om &quot;er den ferdig?&quot;
              </p>
              <div className="product-card-media">
                <MiniPortal />
              </div>
            </div>

            <div className="product-card">
              <h3>Fyll stille perioder automatisk</h3>
              <p>
                Dekkhotell, sesongpåminnelser og bookingsystem som fyller
                kalenderen når det ellers ville vært rolig.
              </p>
              <div className="product-card-media">
                <MiniCalendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TopIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

function MockBoard() {
  return (
    <div className="mock-board">
      <div className="mock-topnav">
        <div className="mock-brand">
          <span className="mock-brand-mark">VP</span>
        </div>
        <div className="mock-topnav-items">
          <div className="mock-topitem active">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.1 2.1-2.1-2.1z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            Verksted
          </div>
          <div className="mock-topitem">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            Dekkhotell
          </div>
          <div className="mock-topitem">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="4" y="7" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M9 7V5c0-1 1-2 2-2h2c1 0 2 1 2 2v2" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            Lager / Intern
          </div>
          <div className="mock-topitem">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M5 17l2-7h10l2 7M7 17v2M17 17v2M8 17h8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="8" cy="15" r="1.2" fill="currentColor" />
              <circle cx="16" cy="15" r="1.2" fill="currentColor" />
            </svg>
            Utleie
          </div>
          <div className="mock-topitem">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="7" cy="17" r="3" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
              <path d="M9 15l6-6" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            Deler
          </div>
          <div className="mock-topitem">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4 10h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Kalender
          </div>
          <div className="mock-topitem">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M5 20c0-4 3-6 7-6s7 2 7 6" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            Kunder
          </div>
          <div className="mock-topitem">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="4" y="10" width="3" height="9" stroke="currentColor" strokeWidth="1.8" />
              <rect x="10.5" y="5" width="3" height="14" stroke="currentColor" strokeWidth="1.8" />
              <rect x="17" y="13" width="3" height="6" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            Regnskap
          </div>
          <div className="mock-topitem">
            <TopIcon d="M3 21V9l9-6 9 6v12M9 21v-6h6v6" />
            Virksomhet
          </div>
        </div>
        <div className="mock-topnav-r">
          <div className="mock-gear">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M19.4 15a1.7 1.7 0 00.4 1.8l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.8-.4 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.4l-.1.1a2 2 0 11-2.9-2.9l.1-.1a1.7 1.7 0 00.4-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.4-1.8l-.1-.1a2 2 0 112.9-2.9l.1.1a1.7 1.7 0 001.8.4H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.4l.1-.1a2 2 0 112.9 2.9l-.1.1a1.7 1.7 0 00-.4 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="mock-split">
        <span className="mock-split-action">+ Ny ordre</span>
        <div className="mock-view kanban">
          <div className="mock-kanban" style={{ paddingLeft: 0 }}>
            <div className="mock-col">
              <div className="mock-col-h">
                Booking <i>4</i>
              </div>
              <div className="mock-card booking">
                <div className="top">
                  <b>Passat B7</b>
                  <span className="reg">DH 12345</span>
                </div>
                <div className="svc">Service 30 000 km</div>
                <div className="foot">
                  <span>
                    <span className="av on">ON</span>Ola
                  </span>
                  <span>09:00</span>
                </div>
              </div>
              <div className="mock-card booking">
                <div className="top">
                  <b>Golf VII</b>
                  <span className="reg">EP 45678</span>
                </div>
                <div className="svc">EU-kontroll</div>
                <div className="foot">
                  <span>
                    <span className="av ht">HT</span>Hans
                  </span>
                  <span>10:30</span>
                </div>
              </div>
              <div className="mock-card booking">
                <div className="top">
                  <b>Tiguan</b>
                  <span className="reg">BR 90123</span>
                </div>
                <div className="svc">Bremser foran</div>
                <div className="foot">
                  <span>
                    <span className="av kn">KN</span>Kari
                  </span>
                  <span>13:00</span>
                </div>
              </div>
            </div>
            <div className="mock-col">
              <div className="mock-col-h">
                I arbeid <i>3</i>
              </div>
              <div className="mock-card arbeid">
                <div className="top">
                  <b>Model S</b>
                  <span className="reg">EL 99123</span>
                </div>
                <div className="svc">Service + AC</div>
                <div className="foot">
                  <span>
                    <span className="av kn">KN</span>Kari
                  </span>
                  <span className="timer">2:15 t</span>
                </div>
              </div>
              <div className="mock-card arbeid">
                <div className="top">
                  <b>Transporter</b>
                  <span className="reg">BV 22113</span>
                </div>
                <div className="svc">Girkasse</div>
                <div className="foot">
                  <span>
                    <span className="av on">ON</span>Ola
                  </span>
                  <span className="timer">4:45 t</span>
                </div>
              </div>
              <div className="mock-card arbeid">
                <div className="top">
                  <b>Qashqai</b>
                  <span className="reg">NI 88765</span>
                </div>
                <div className="svc">EU-kontroll</div>
                <div className="foot">
                  <span>
                    <span className="av ht">HT</span>Hans
                  </span>
                  <span className="timer">0:45 t</span>
                </div>
              </div>
            </div>
            <div className="mock-col">
              <div className="mock-col-h">
                Ferdig <i>3</i>
              </div>
              <div className="mock-card ferdig">
                <div className="top">
                  <b>Zafira</b>
                  <span className="reg">OP 11223</span>
                </div>
                <div className="svc">Service + bremser</div>
                <div className="foot">
                  <span className="price">4 840 kr</span>
                  <span className="bdg paid">Betalt</span>
                </div>
              </div>
              <div className="mock-card ferdig">
                <div className="top">
                  <b>Corolla</b>
                  <span className="reg">TY 55667</span>
                </div>
                <div className="svc">EU-kontroll</div>
                <div className="foot">
                  <span className="price">2 190 kr</span>
                  <span className="bdg wait">Venter</span>
                </div>
              </div>
              <div className="mock-card ferdig">
                <div className="top">
                  <b>Focus</b>
                  <span className="reg">FO 34556</span>
                </div>
                <div className="svc">Klar for henting</div>
                <div className="foot">
                  <span className="price">3 450 kr</span>
                  <span className="bdg sent">Varslet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mock-view list">
          <div className="mock-list-head">
            <div>
              <div className="mock-list-title">Verkstedoversikten</div>
            </div>
          </div>
          <div className="mock-list-tabs">
            <span className="mock-list-tab active">
              Alle <i>7</i>
            </span>
            <span className="mock-list-tab">Ny</span>
            <span className="mock-list-tab">Tilbud</span>
            <span className="mock-list-tab">
              Bekreftet <i>1</i>
            </span>
            <span className="mock-list-tab">
              Tildelt <i>2</i>
            </span>
            <span className="mock-list-tab">
              Pågår <i>3</i>
            </span>
          </div>
          <div className="mock-list-items">
            <div className="mock-list-day">FREDAG 17. APRIL</div>
            <ListOrder
              num="#38"
              title="Bremseskiver +1til"
              meta="Intern — eget kjøretøy · AR4842"
              statusClass="wait"
              statusText="VENTER TILDELING"
            />
            <ListOrder
              num="#37"
              title="Sesongskifte — Vinter, 225"
              meta="Ola Nordmann · UX58585"
              statusClass="prog"
              statusText="PÅBEGYNT"
              icSync
              tags={["Firestone 225"]}
            />
            <div className="mock-list-day">TORSDAG 16. APRIL</div>
            <ListOrder
              num="#30"
              title="Dekkskift +2til"
              meta="Kari Nordmann · UX49001"
              statusClass="assign"
              statusText="TILDELT 16. APRIL"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ListOrder({
  num,
  title,
  meta,
  statusClass,
  statusText,
  icSync,
  tags,
}: {
  num: string;
  title: string;
  meta: string;
  statusClass: string;
  statusText: string;
  icSync?: boolean;
  tags?: string[];
}) {
  return (
    <div className="mock-list-order">
      <span className={`mock-list-ic${icSync ? " sync" : ""}`}>
        {icSync ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12a8 8 0 0113-6l2-2m1 4v6h-6M20 12a8 8 0 01-13 6l-2 2m-1-4v-6h6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.1 2.1-2.1-2.1z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <div className="mock-list-body">
        <div className="mock-list-title-row">
          <span className="num">{num}</span>
          <b>{title}</b>
        </div>
        <div className="mock-list-meta">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
            <path d="M4 21a8 8 0 0116 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {meta}
        </div>
        {tags && tags.length > 0 && (
          <div className="mock-list-tags">
            {tags.map((t) => (
              <span key={t} className="mock-list-tag">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      <span className={`mock-list-stat ${statusClass}`}>{statusText}</span>
    </div>
  );
}

function MiniChat() {
  return (
    <div className="mini-chat">
      <div className="mini-bubble">
        Hei! Bilen lager en ulyd fra venstre foran. Kan dere sjekke i dag?
        <span className="time">09:42</span>
      </div>
      <div className="mini-bubble me">
        Vi kan ta en titt kl 14 — her er et foreløpig overslag:
        <span className="time">09:44</span>
      </div>
      <div className="mini-quote">
        <div className="mini-quote-h">
          <b>Prisforslag · #2047</b>
          <span>Gyldig 7 dager</span>
        </div>
        <div className="mini-quote-title">Feilsøking + bremseklosser foran</div>
        <div className="mini-quote-row">
          <span>Feilsøking (1 t)</span>
          <b>1 200</b>
        </div>
        <div className="mini-quote-row">
          <span>Bremseklosser</span>
          <b>1 890</b>
        </div>
        <div className="mini-quote-row">
          <span>Arbeid (1,5 t)</span>
          <b>1 350</b>
        </div>
        <div className="mini-quote-total">
          <span>Total inkl. mva</span>
          <b>4 440 kr</b>
        </div>
        <div className="mini-quote-actions">
          <span className="mini-quote-btn decline">Avslå</span>
          <span className="mini-quote-btn accept">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12l5 5L20 6"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Godta
          </span>
        </div>
      </div>
      <span className="mini-quote-accepted">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12l5 5L20 6"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Godtatt 09:47
      </span>
      <div className="mini-bubble">
        Dette ser bra ut — sees kl 14!<span className="time">09:48</span>
      </div>
    </div>
  );
}

function MiniPortal() {
  return (
    <div className="mini-portal">
      <div className="mini-portal-h">
        <div className="mini-portal-h-l">
          <span className="lbl">Din bestilling</span>
          <b>Passat B7</b>
          <span className="reg">DH 12345 · Service 30 000 km</span>
        </div>
        <span className="mini-portal-badge">På verkstedet</span>
      </div>
      <div className="mini-portal-eta">
        <span>Forventet ferdig</span>
        <b>I dag · 15:30</b>
      </div>
      <div className="mini-portal-timeline">
        <PortalStep status="done" title="Bestilling mottatt" sub="Man 21. apr · 09:42" />
        <PortalStep status="done" title="Prisforslag godtatt" sub="Man 21. apr · 09:47" />
        <PortalStep status="done" title="Bekreftet — innlevering i dag" sub="Tor 24. apr · 08:55" />
        <PortalStep status="active" title="Under arbeid — Ola" sub="Startet 10:12 · 2:18 t" />
        <PortalStep status="pending" title="Klar for henting" sub="Varsles per SMS" />
      </div>
    </div>
  );
}

function PortalStep({
  status,
  title,
  sub,
}: {
  status: "done" | "active" | "pending";
  title: string;
  sub: string;
}) {
  return (
    <div className={`mini-portal-step ${status}`}>
      <span className="mini-portal-dot" />
      <div className="mini-portal-step-b">
        <div className="mini-portal-step-t">{title}</div>
        <div className="mini-portal-step-s">{sub}</div>
      </div>
    </div>
  );
}

function MiniCalendar() {
  const days: { n: number; cls: string; dots?: number }[] = [
    { n: 27, cls: "out" },
    { n: 28, cls: "out" },
    { n: 29, cls: "out" },
    { n: 30, cls: "out" },
    { n: 1, cls: "busy", dots: 3 },
    { n: 2, cls: "free" },
    { n: 3, cls: "free" },
    { n: 4, cls: "half", dots: 2 },
    { n: 5, cls: "busy", dots: 3 },
    { n: 6, cls: "busy", dots: 3 },
    { n: 7, cls: "today", dots: 2 },
    { n: 8, cls: "busy", dots: 3 },
    { n: 9, cls: "free" },
    { n: 10, cls: "free" },
    { n: 11, cls: "busy", dots: 3 },
    { n: 12, cls: "busy", dots: 3 },
    { n: 13, cls: "half", dots: 1 },
    { n: 14, cls: "busy", dots: 3 },
    { n: 15, cls: "busy", dots: 3 },
    { n: 16, cls: "free" },
    { n: 17, cls: "free" },
    { n: 18, cls: "half", dots: 1 },
    { n: 19, cls: "busy", dots: 3 },
    { n: 20, cls: "busy", dots: 3 },
    { n: 21, cls: "busy", dots: 3 },
    { n: 22, cls: "half", dots: 2 },
    { n: 23, cls: "free" },
    { n: 24, cls: "free" },
    { n: 25, cls: "busy", dots: 3 },
    { n: 26, cls: "busy", dots: 3 },
    { n: 27, cls: "busy", dots: 3 },
    { n: 28, cls: "half", dots: 2 },
    { n: 29, cls: "busy", dots: 3 },
    { n: 30, cls: "free" },
    { n: 31, cls: "free" },
  ];
  return (
    <div className="mini-calendar">
      <div className="mini-cal-h">
        <div className="mini-cal-h-l">
          <span>Belegg</span>
          <b>Mai 2026</b>
        </div>
        <span className="mini-cal-h-r">62% booket</span>
      </div>
      <div className="mini-cal-dow">
        {["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mini-cal-grid">
        {days.map((d, i) => (
          <div key={i} className={`mini-cal-day ${d.cls}`}>
            {d.dots ? (
              <span className="dots">
                {Array.from({ length: d.dots }).map((_, j) => (
                  <i key={j} />
                ))}
              </span>
            ) : null}
            {d.n}
          </div>
        ))}
      </div>
      <div className="mini-cal-legend">
        <span>
          <i className="lg-busy" />
          Fullt
        </span>
        <span>
          <i className="lg-half" />
          Delvis
        </span>
        <span>
          <i className="lg-free" />
          Ledig
        </span>
      </div>
    </div>
  );
}
