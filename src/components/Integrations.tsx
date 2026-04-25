export default function Integrations() {
  return (
    <section className="ints section" id="integrasjoner">
      <div className="wrap">
        <span className="eyebrow">Integrasjoner</span>
        <h2 className="h-section">
          Koblet til systemene
          <br />
          du allerede bruker.
        </h2>
        <p className="lede">
          Vi kobler oss til regnskap, deleleverandører og offentlige registre
          — og bygger nye integrasjoner når dere trenger dem.
        </p>

        <div className="ints-band">
          <div className="int-card">
            <span className="int-wordmark">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" fill="#4b4dff" />
                <path
                  d="M12 9h8M12 16h8M12 9v14"
                  stroke="#fff"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#4b4dff",
                  letterSpacing: "-0.02em",
                }}
              >
                fiken
              </span>
            </span>
          </div>

          <div className="int-card">
            <span className="int-wordmark">
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "21px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  letterSpacing: "-0.03em",
                  position: "relative",
                }}
              >
                tripletex
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "-12px",
                    display: "inline-flex",
                    gap: "2px",
                  }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#ff6b35",
                      display: "inline-block",
                    }}
                  />
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "-12px",
                    display: "inline-flex",
                    gap: "2px",
                  }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#ff6b35",
                      display: "inline-block",
                    }}
                  />
                </span>
              </span>
            </span>
          </div>

          <div className="int-card">
            <span className="int-wordmark">
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontStyle: "italic",
                  fontSize: "26px",
                  fontWeight: 900,
                  color: "#004232",
                  letterSpacing: "-0.02em",
                }}
              >
                MEKO
              </span>
            </span>
          </div>

          <div className="int-card">
            <span className="int-wordmark">
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#635bff",
                  letterSpacing: "-0.03em",
                  fontStyle: "italic",
                }}
              >
                stripe
              </span>
            </span>
          </div>

          <div className="int-card">
            <span className="int-wordmark">
              <svg width="22" height="22" viewBox="0 0 32 32">
                <g transform="translate(16 16)">
                  <circle r="4.5" fill="#e85d24" />
                  <g fill="#e85d24">
                    <ellipse cx="0" cy="-8" rx="3" ry="5" />
                    <ellipse cx="0" cy="8" rx="3" ry="5" />
                    <ellipse cx="8" cy="0" rx="5" ry="3" />
                    <ellipse cx="-8" cy="0" rx="5" ry="3" />
                    <ellipse transform="rotate(45)" cx="8" cy="0" rx="5" ry="3" />
                    <ellipse transform="rotate(-45)" cx="8" cy="0" rx="5" ry="3" />
                  </g>
                </g>
              </svg>
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#1a1a2e",
                  letterSpacing: "-0.01em",
                }}
              >
                PowerOffice
              </span>
            </span>
          </div>

          <div className="int-card">
            <span
              className="int-wordmark"
              style={{ flexDirection: "column", gap: "4px" }}
            >
              <svg width="28" height="32" viewBox="0 0 28 32">
                <path
                  d="M14 1L2 5v10c0 7 5 13 12 16 7-3 12-9 12-16V5L14 1z"
                  fill="#c8102e"
                  stroke="#8a0a1f"
                  strokeWidth="0.6"
                />
                <path
                  d="M14 6v4M10 12h8M8 18l6-3 6 3M10 22h8M14 24l-3 4h6l-3-4z"
                  stroke="#f5c542"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#1a1a2e",
                  letterSpacing: ".01em",
                }}
              >
                Statens vegvesen
              </span>
            </span>
          </div>

          <div className="int-card">
            <span className="int-wordmark">
              <svg width="26" height="22" viewBox="0 0 26 22">
                <g fill="#1a1a2e">
                  <rect x="1" y="14" width="3" height="7" />
                  <rect x="6" y="10" width="3" height="11" />
                  <rect x="11" y="6" width="3" height="15" />
                  <rect x="16" y="2" width="3" height="19" />
                  <rect x="21" y="8" width="3" height="13" />
                </g>
              </svg>
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#1a1a2e",
                  letterSpacing: "-0.01em",
                }}
              >
                Brønnøysund­registrene
              </span>
            </span>
          </div>

          <div className="int-card">
            <span className="int-wordmark">
              <svg width="26" height="26" viewBox="0 0 26 26">
                <path
                  d="M4 5l7-2 8 2 4-2v16l-4 2-8-2-7 2z"
                  fill="#4a9856"
                />
                <path d="M11 3v18M19 5v18" stroke="#2d6b3c" strokeWidth="0.8" />
                <circle cx="15" cy="11" r="2" fill="#1a3d26" />
              </svg>
              <span
                style={{
                  fontFamily: "Inter,sans-serif",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#1a1a2e",
                  letterSpacing: "-0.01em",
                }}
              >
                Kartverket
              </span>
            </span>
          </div>
        </div>

        <div className="ints-ask">
          <p>
            <b>Savner du en integrasjon?</b> Bruker dere et annet
            regnskaps&shy;system, dele&shy;leverandør eller verktøy — gi oss
            beskjed, så vurderer vi å legge det til.
          </p>
        </div>
      </div>
    </section>
  );
}
