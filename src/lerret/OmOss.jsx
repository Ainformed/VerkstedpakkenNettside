"use client";
/* Flyttet fra lerretet (gen/til_react.py). Logikken er den samme som i lerretet: en React-klasse med
   state, setState, componentDidMount og renderVals(); render() viser markeringen med verdiene fra renderVals().
   Bildene står som i lerretet, med størrelsen satt i CSS, derfor vanlige <img> og ikke next/image. */
/* eslint-disable @next/next/no-img-element */
import { Component } from "react";
import "./OmOss.css";

export default class OmOss extends Component {
state = { meny: false, snudd: -1, kopiert: -1 };

// Kopierer e-postadressen (22.11.2026: «kopier knapp?»). Viser «Kopiert» bare når kopieringen gikk.
kopier(i, tekst) {
const ferdig = () => { this.setState({ kopiert: i }); clearTimeout(this._kt); this._kt = setTimeout(() => this.setState({ kopiert: -1 }), 1800); };
const reserve = () => {
try {
const t = document.createElement('textarea');
t.value = tekst; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
document.body.appendChild(t); t.select();
const ok = document.execCommand('copy');
t.remove();
if (ok) ferdig();
} catch (_) {}
};
if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(tekst).then(ferdig, reserve); else reserve();
}

renderVals() {
const apen = !!(this.state && this.state.meny);
const snudd = this.state && this.state.snudd != null ? this.state.snudd : -1;
const kopiert = this.state && this.state.kopiert != null ? this.state.kopiert : -1;
const EPOST = ['oscar', 'fredrik', 'henrik', 'nichlas'].map((n) => n + '@verkstedpakken.no');
const v = {
skrift: this.props && this.props.tiltenktSkrift ? 'vp-inter' : '',
menyApen: apen,
menyKlasse: apen ? 'open' : '',
apneMeny: () => this.setState({ meny: true }),
lukkMeny: () => this.setState({ meny: false }),
stoppKlikk: (e) => { if (e && e.stopPropagation) e.stopPropagation(); },
};
for (let i = 0; i < 4; i++) {
v['snu' + i] = snudd === i ? 'snudd' : '';
v['veksle' + i] = () => this.setState({ snudd: snudd === i ? -1 : i });
v['kopiert' + i] = kopiert === i ? 'kopiert' : '';
v['kopier' + i] = (e) => { if (e && e.stopPropagation) e.stopPropagation(); this.kopier(i, EPOST[i]); };
}
return v;
}

// Tekstene står på norsk; på andre språk slås de opp i tekstene siden får fra src/lerret/tekster
T(s) {
const t = this.props && this.props.tekster;
return (t && t[s]) || s;
}

render() {
const v = this.renderVals();
const T = (s) => this.T(s);
// Enter og mellomrom på klikkbare elementer som ikke er knapper (bare når tasten trykkes på selve elementet,
// ikke på en knapp eller lenke inni det)
const tast = (f) => (e) => { if (e.target !== e.currentTarget) return; if (e.key === "Enter" || e.key === " ") { e.preventDefault(); f(e); } };
return (
<>
    <main className="page-omoss">
      {" "}
      <div className="om">
        {" "}
        <section className="om-seksjon" aria-label={T("Om oss")}>
          {" "}
          <div className="om-wrap">
            {" "}
            <div className="om-hode">
              {" "}
              <div>
                {" "}
                <h1 className="om-h2">
                  {T("Fra seks år på verkstedgulvet til å bygge verktøyet verkstedene faktisk trenger.")}
                </h1>
                {" "}
              </div>
              {" "}
              <div className="om-fotograf" aria-hidden="true">
                {" "}
                <span className="om-rop om-haand">
                  {T("Si mutter!")}
                </span>
                {" "}
                <svg viewBox="-20 -30 420 370" fill="none">
                  {" "}
                  <path d="M30.4512 194.5L30.4525 153.738C30.453 138.826 42.5412 126.738 57.4525 126.738L89.9535 126.738" stroke="#93BBFF" strokeWidth="9" strokeLinecap="round">
                  </path>
                  {" "}
                  <path d="M212.5 224L219.4 287V316.5" stroke="#93BBFF" strokeWidth="10" strokeLinecap="round">
                  </path>
                  {" "}
                  <path d="M151.469 217L144.9 289.5V320.438" stroke="#93BBFF" strokeWidth="10" strokeLinecap="round">
                  </path>
                  {" "}
                  <ellipse cx="145.09" cy="324.92" rx="25.8" ry="8.1" fill="#93BBFF">
                  </ellipse>
                  {" "}
                  <ellipse cx="219.09" cy="324.49" rx="25.8" ry="8.1" fill="#93BBFF">
                  </ellipse>
                  {" "}
                  <path d="M283.332 59.5811V184.834L179.81 243.972L76.2871 184.834V59.5811L179.81 0.444336L283.332 59.5811Z" fill="#93BBFF">
                  </path>
                  {" "}
                  <circle cx="179.809" cy="122.209" r="37.9" fill="#FAF7F2">
                  </circle>
                  {" "}
                  <defs>
                    <radialGradient id="omLysG">
                      <stop offset="0" stopColor="#FFFFFF">
                      </stop>
                      <stop offset="0.35" stopColor="#DCE8FF">
                      </stop>
                      <stop offset="1" stopColor="#93BBFF" stopOpacity="0">
                      </stop>
                    </radialGradient>
                  </defs>
                  {" "}
                  <g className="om-kamera">
                    {" "}
                    <path d="M276 124.665L300.31 119.939C312.998 117.473 322.158 106.361 322.158 93.4354L322.158 62" stroke="#93BBFF" strokeWidth="9" strokeLinecap="round">
                    </path>
                    {" "}
                    <rect x="296" y="-10" width="26" height="14" rx="4" fill="#0C005A">
                    </rect>
                    {" "}
                    <rect x="282" y="0" width="100" height="66" rx="12" fill="#0C005A">
                    </rect>
                    {" "}
                    <circle cx="332" cy="33" r="20" fill="#FAF7F2">
                    </circle>
                    {" "}
                    <circle className="om-linse" cx="332" cy="33" r="11" fill="#0C005A">
                    </circle>
                    {" "}
                    <circle cx="364" cy="14" r="4" fill="#93BBFF">
                    </circle>
                    {" "}
                    <circle className="om-lys" cx="332" cy="33" r="64" fill="url(#omLysG)">
                    </circle>
                    {" "}
                    <g className="om-blits">
                      <path d="M309 -34V-18M287 -26L297 -14M331 -26L321 -14" stroke="#0C005A" strokeWidth="5" strokeLinecap="round">
                      </path>
                    </g>
                    {" "}
                  </g>
                  {" "}
                </svg>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div className="om-historie">
              {" "}
              <article className="om-stund midt om-teamet">
                {" "}
                <div className="om-tekst">
                  {" "}
                  <h2>
                    {T("Hils på teamet")}
                  </h2>
                  {" "}
                </div>
                {" "}
                <div className="om-bilder fire">
                  {" "}
                  <figure className={`pol sk8 pol-snu ${v.snu0}`} role="button" tabIndex="0" aria-label={T("Vis kontaktinfo til Oscar")} onClick={v.veksle0} onKeyDown={tast(v.veksle0)}>
                    <div className="pol-kort">
                      <img src="/lerret/polaroid-8.jpg" alt={T("Oscar i Verkstedpakken-vest smiler ved et bord.")} />
                      <figcaption className="pol-tekst om-haand">
                        {T("Oscar")}
                        <small>
                          {T("Kundeansvarlig")}
                        </small>
                      </figcaption>
                      <div className="pol-bak">
                        <span className="pol-bak-navn om-haand">
                          {T("Oscar")}
                        </span>
                        <span className="pol-bak-rolle">
                          {T("Kundeansvarlig")}
                        </span>
                        <a className="pol-bak-epost" href="mailto:oscar@verkstedpakken.no" onClick={v.stoppKlikk}>
                          {T("oscar@")}
                          <wbr />
                          {T("verkstedpakken.no")}
                        </a>
                        <a className="pol-bak-epost pol-bak-tlf" href="tel:+4793484220" onClick={v.stoppKlikk}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                            </path>
                          </svg>
                          93 48 42 20
                        </a>
                        <button type="button" className={`pol-bak-kopier ${v.kopiert0}`} aria-label={T("Kopier e-postadressen til Oscar")} onClick={v.kopier0}>
                          <span className="kp">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <rect x="9" y="9" width="13" height="13" rx="2">
                              </rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1">
                              </path>
                            </svg>
                            {T("Kopier e-post")}
                          </span>
                          <span className="ok">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                            {T("Kopiert")}
                          </span>
                        </button>
                      </div>
                    </div>
                  </figure>
                  {" "}
                  <figure className={`pol sk11 pol-snu ${v.snu1}`} role="button" tabIndex="0" aria-label={T("Vis kontaktinfo til Fredrik")} onClick={v.veksle1} onKeyDown={tast(v.veksle1)}>
                    <div className="pol-kort">
                      <img src="/lerret/polaroid-12.jpg" alt={T("Fredrik i Verkstedpakken-vest smiler bredt mot kameraet.")} />
                      <figcaption className="pol-tekst om-haand">
                        {T("Fredrik")}
                        <small>
                          {T("Markedssjef")}
                        </small>
                      </figcaption>
                      <div className="pol-bak">
                        <span className="pol-bak-navn om-haand">
                          {T("Fredrik")}
                        </span>
                        <span className="pol-bak-rolle">
                          {T("Markedssjef")}
                        </span>
                        <a className="pol-bak-epost" href="mailto:fredrik@verkstedpakken.no" onClick={v.stoppKlikk}>
                          {T("fredrik@")}
                          <wbr />
                          {T("verkstedpakken.no")}
                        </a>
                        <a className="pol-bak-epost pol-bak-tlf" href="tel:+4741263533" onClick={v.stoppKlikk}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                            </path>
                          </svg>
                          412 63 533
                        </a>
                        <button type="button" className={`pol-bak-kopier ${v.kopiert1}`} aria-label={T("Kopier e-postadressen til Fredrik")} onClick={v.kopier1}>
                          <span className="kp">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <rect x="9" y="9" width="13" height="13" rx="2">
                              </rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1">
                              </path>
                            </svg>
                            {T("Kopier e-post")}
                          </span>
                          <span className="ok">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                            {T("Kopiert")}
                          </span>
                        </button>
                      </div>
                    </div>
                  </figure>
                  {" "}
                  <figure className={`pol sk12 pol-snu ${v.snu2}`} role="button" tabIndex="0" aria-label={T("Vis kontaktinfo til Henrik")} onClick={v.veksle2} onKeyDown={tast(v.veksle2)}>
                    <div className="pol-kort">
                      <img src="/lerret/polaroid-13.jpg" alt={T("Henrik i Verkstedpakken-vest smiler mot kameraet.")} />
                      <figcaption className="pol-tekst om-haand">
                        {T("Henrik")}
                        <small>
                          {T("Økonomisjef")}
                        </small>
                      </figcaption>
                      <div className="pol-bak">
                        <span className="pol-bak-navn om-haand">
                          {T("Henrik")}
                        </span>
                        <span className="pol-bak-rolle">
                          {T("Økonomisjef")}
                        </span>
                        <a className="pol-bak-epost" href="mailto:henrik@verkstedpakken.no" onClick={v.stoppKlikk}>
                          {T("henrik@")}
                          <wbr />
                          {T("verkstedpakken.no")}
                        </a>
                        <a className="pol-bak-epost pol-bak-tlf" href="tel:+4740107775" onClick={v.stoppKlikk}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                            </path>
                          </svg>
                          401 07 775
                        </a>
                        <button type="button" className={`pol-bak-kopier ${v.kopiert2}`} aria-label={T("Kopier e-postadressen til Henrik")} onClick={v.kopier2}>
                          <span className="kp">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <rect x="9" y="9" width="13" height="13" rx="2">
                              </rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1">
                              </path>
                            </svg>
                            {T("Kopier e-post")}
                          </span>
                          <span className="ok">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                            {T("Kopiert")}
                          </span>
                        </button>
                      </div>
                    </div>
                  </figure>
                  {" "}
                  <figure className={`pol sk13 pol-snu ${v.snu3}`} role="button" tabIndex="0" aria-label={T("Vis kontaktinfo til Nichlas")} onClick={v.veksle3} onKeyDown={tast(v.veksle3)}>
                    <div className="pol-kort">
                      <img src="/lerret/polaroid-14.jpg" alt={T("Nichlas i Verkstedpakken-vest ser mot kameraet.")} />
                      <figcaption className="pol-tekst om-haand">
                        {T("Nichlas")}
                        <small>
                          {T("Daglig leder")}
                        </small>
                      </figcaption>
                      <div className="pol-bak">
                        <span className="pol-bak-navn om-haand">
                          {T("Nichlas")}
                        </span>
                        <span className="pol-bak-rolle">
                          {T("Daglig leder")}
                        </span>
                        <a className="pol-bak-epost" href="mailto:nichlas@verkstedpakken.no" onClick={v.stoppKlikk}>
                          {T("nichlas@")}
                          <wbr />
                          {T("verkstedpakken.no")}
                        </a>
                        <a className="pol-bak-epost pol-bak-tlf" href="tel:+4795868314" onClick={v.stoppKlikk}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                            </path>
                          </svg>
                          95 86 83 14
                        </a>
                        <button type="button" className={`pol-bak-kopier ${v.kopiert3}`} aria-label={T("Kopier e-postadressen til Nichlas")} onClick={v.kopier3}>
                          <span className="kp">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <rect x="9" y="9" width="13" height="13" rx="2">
                              </rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1">
                              </path>
                            </svg>
                            {T("Kopier e-post")}
                          </span>
                          <span className="ok">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                            {T("Kopiert")}
                          </span>
                        </button>
                      </div>
                    </div>
                  </figure>
                  {" "}
                </div>
                {" "}
              </article>
              {" "}
              <article className="om-stund midt om-hverdag">
                {" "}
                <div className="om-tekst">
                  {" "}
                  <h2>
                    {T("Fra hverdagen")}
                  </h2>
                  {" "}
                </div>
                {" "}
                <div className="om-bilder hverdag">
                  {" "}
                  <figure className="pol teip sk1">
                    <div className="pol-kort">
                      <img src="/lerret/polaroid-11.jpg" alt={T("Oscar bak rattet i en åpen veteranbil med rødt interiør.")} loading="lazy" decoding="async" />
                      <figcaption className="pol-tekst om-haand">
                        {T("Veterantur")}
                      </figcaption>
                    </div>
                  </figure>
                  {" "}
                  <figure className="pol teip sk2">
                    <div className="pol-kort">
                      <img src="/lerret/polaroid-2.jpg" alt={T("En kollega står med telefon og ladekabel ved et langbord med bærbare PC-er. En annen sitter og jobber.")} loading="lazy" decoding="async" />
                      <figcaption className="pol-tekst om-haand">
                        {T("Kontoret for dagen")}
                      </figcaption>
                    </div>
                  </figure>
                  {" "}
                  <figure className="pol sk3">
                    <div className="pol-kort">
                      <img src="/lerret/polaroid-3.jpg" alt={T("En kollega sitter i en bil med døra åpen og jobber på en bærbar PC.")} loading="lazy" decoding="async" />
                      <figcaption className="pol-tekst om-haand">
                        {T("Møte?")}
                      </figcaption>
                    </div>
                  </figure>
                  {" "}
                  <figure className="pol teip sk4">
                    <div className="pol-kort">
                      <img src="/lerret/polaroid-4.jpg" alt={T("Tre kolleger i Verkstedpakken-vester foran en bygning med skiltet Hella Gutmann.")} loading="lazy" decoding="async" />
                      <figcaption className="pol-tekst om-haand">
                        {T("Hos Hella Gutmann")}
                      </figcaption>
                    </div>
                  </figure>
                  {" "}
                  <figure className="pol teip sk7">
                    <div className="pol-kort">
                      <img src="/lerret/polaroid-7.jpg" alt={T("To kolleger smiler bak taket på en bil.")} loading="lazy" decoding="async" />
                      <figcaption className="pol-tekst om-haand">
                        {T("På farten")}
                      </figcaption>
                    </div>
                  </figure>
                  {" "}
                  <figure className="pol sk10">
                    <div className="pol-kort">
                      <img src="/lerret/polaroid-10.jpg" alt={T("Ryggen på en hvit T-skjorte med Muttern-figuren og teksten Muttern fikser.")} loading="lazy" decoding="async" />
                      <figcaption className="pol-tekst om-haand">
                        {T("Muttern fikser")}
                      </figcaption>
                    </div>
                  </figure>
                  {" "}
                </div>
                {" "}
              </article>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
      </div>
      {" "}
    </main>
    {" "}
</>
);
}
}
