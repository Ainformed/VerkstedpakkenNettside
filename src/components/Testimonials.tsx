// Ekte sitater legges inn her når de finnes — ALDRI oppdiktede navn.
// Tom array = ingen sitatkort vises (kun det faktiske pilot-kortet under).
type Quote = { quote: string; name: string; role: string; verksted: string };
const QUOTES: Quote[] = [];

export default function Testimonials() {
  return (
    <section className="tm section">
      <div className="wrap">
        <span className="eyebrow">Pilotverksted</span>
        <h2 className="h-section">
          Bygget sammen med
          <br />
          ekte verksteder.
        </h2>

        <div className="tm-grid">
          {/* Faktisk pilot — hentet fra Om oss, ikke et oppdiktet sitat. */}
          <article className="tm-card tm-pilot">
            <span className="tm-badge">Pilotverksted</span>
            <p className="tm-body">
              Bolli Motor kjører en pilotversjon av Verkstedpakken og er tett
              involvert i utviklingen. Erfaringene deres former systemet — og vi
              har bygget nettsiden deres i samme plattform.
            </p>
            <div className="tm-by">
              <span className="tm-avatar" aria-hidden>
                BM
              </span>
              <div>
                <b>Bolli Motor</b>
                <span>Pilotverksted</span>
              </div>
            </div>
          </article>

          {QUOTES.map((q) => (
            <article className="tm-card" key={q.name}>
              <p className="tm-body">«{q.quote}»</p>
              <div className="tm-by">
                <span className="tm-avatar" aria-hidden>
                  {q.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div>
                  <b>{q.name}</b>
                  <span>
                    {q.role}, {q.verksted}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
