"use client";
/* Flyttet fra lerretet (gen/til_react.py). Logikken er den samme som i lerretet: en React-klasse med
   state, setState, componentDidMount og renderVals(); render() viser markeringen med verdiene fra renderVals().
   Bildene står som i lerretet, med størrelsen satt i CSS, derfor vanlige <img> og ikke next/image. */
/* eslint-disable @next/next/no-img-element */
import { Component } from "react";
import { SIGNUP_URL } from "@/lib/links";
import "./NettsideOgBooking.css";

export default class NettsideOgBooking extends Component {
state = { meny: false, olAnim: false, olFast: false, olTrykk: 0 };

componentDidMount() {
this._sist = 0;
this._tikk = (t) => {
this._raf = requestAnimationFrame(this._tikk);
const dt = this._sist ? Math.min(120, t - this._sist) : 0;
this._sist = t;
this.olOppdater(dt);
};
this._raf = requestAnimationFrame(this._tikk);
}

componentWillUnmount() {
cancelAnimationFrame(this._raf);
}

// Det som ruller: nærmeste rullende forelder, ellers vinduet. Letes opp på nytt en gang i blant.
olRuller(el) {
this._teller = (this._teller || 0) + 1;
if (this._rullerSett && this._teller % 45 !== 0) return this._ruller;
let n = el.parentElement;
let funnet = null;
while (n && n !== document.body && n !== document.documentElement) {
const o = getComputedStyle(n).overflowY;
if ((o === 'auto' || o === 'scroll') && n.scrollHeight > n.clientHeight + 4) { funnet = n; break; }
n = n.parentElement;
}
this._ruller = funnet;
this._rullerSett = true;
return funnet;
}

// Høyden på nettsidens faste toppmeny. 0 når den ikke står fast.
olMeny(el) {
if (this._menySett && this._teller % 45 !== 0) return this._menyH;
const side = el.closest('.vp-side');
const meny = side ? side.querySelector('header.nav') : null;
let h = 0;
if (meny) {
const pos = getComputedStyle(meny).position;
if (pos === 'sticky' || pos === 'fixed') h = meny.offsetHeight;
}
this._menyH = h;
this._menySett = true;
return h;
}

// Innholdet bytter mens man ruller. P går fra 0 til N (antall steg, data-steg på seksjonen). Blokka
// står fast under menyen så lenge P går. Får den ikke plass i vinduet, følger P blokka gjennom
// vinduet i stedet. Kan siden ikke rulles (oversikten på lerretet), går P på klokka. Uten bevegelse
// (smal skjerm, redusert bevegelse) står P på et fast sted, og data-stopp gir stedene et trykk går til.
olOppdater(dt) {
const el = this._ol;
if (!el) return;
const spor = el.querySelector('.ol-spor');
const feste = el.querySelector('.ol-feste');
if (!spor || !feste) return;
const N = Math.max(1, parseInt(el.dataset.steg || '4', 10));
this._olN = N;
this._olStopp = el.dataset.stopp ? el.dataset.stopp.split(',').map(Number) : null;
const rolig = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
const anim = !rolig && el.clientWidth > 900;
if (anim !== !!this.state.olAnim) { this._olP = null; this.setState({ olAnim: anim, olFast: false }); return; }
if (!anim) {
if (this._olStopp) {
const P = this._olStopp[(this.state.olTrykk || 0) % this._olStopp.length];
if (P !== this._olSatt) { el.style.setProperty('--P', String(P)); this._olSatt = P; }
}
return;
}
const ruller = this.olRuller(el);
const vindu = ruller ? ruller.clientHeight : window.innerHeight;
const vinduTopp = ruller ? ruller.getBoundingClientRect().top : 0;
const helHoyde = ruller ? ruller.scrollHeight : document.documentElement.scrollHeight;
const menyH = this.olMeny(el);
const blokk = feste.offsetHeight;
// 21.11.2026 («animasjonen her går alt for fort»): lengre rulling per steg, og i lave vinduer krymper blokka litt så
// den kan stå fast (før gikk alle stegene da på 700–800 px rulling, rundt 200 px per steg).
const lengde = N * Math.round(Math.max(620, Math.min(900, vindu * (N > 4 ? 0.8 : 0.95))));
const kanRulle = helHoyde - (this.state.olFast ? lengde : 0) - vindu > 240 && vindu <= 2600;
const plass = vindu - menyH - 24;
const skala = blokk > plass ? Math.max(0.62, plass / blokk) : 1;
const synlig = Math.round(blokk * skala);
const fast = kanRulle && synlig <= plass;
const topp = menyH + Math.max(12, Math.round((vindu - menyH - synlig) / 2));
if (blokk !== this._ob || lengde !== this._oLengde || topp !== this._ot || skala !== this._oSkala) {
el.style.setProperty('--ol-blokk', blokk);
el.style.setProperty('--ol-lengde', lengde);
el.style.setProperty('--ol-topp', topp);
el.style.setProperty('--ol-skala', skala.toFixed(4));
this._ob = blokk; this._oLengde = lengde; this._ot = topp; this._oSkala = skala;
}
if (fast !== !!this.state.olFast) { this.setState({ olFast: fast }); return; }
const r = spor.getBoundingClientRect();
let maal;
if (fast) {
maal = N * Math.max(0, Math.min(1, (vinduTopp + topp - r.top) / lengde));
this._olM = { ruller, lengde, start: (ruller ? ruller.scrollTop : window.scrollY) + r.top - vinduTopp - topp };
} else if (kanRulle) {
const fra = vinduTopp + vindu * 0.7;
const til = vinduTopp + menyH + 24 - Math.max(0, blokk - (vindu - menyH - 48));
maal = N * Math.max(0, Math.min(1, (fra - r.top) / Math.max(1, fra - til)));
this._olM = null;
} else {
const takt = (N > 4 ? 3400 : 4200) * 5; // 21.11.2026 (Nichlas): «må gå 5 ganger så sakte»
this._olTakt = takt;
this._olT = ((this._olT || 0) + dt) % (N * takt + 6000);
maal = Math.min(N, this._olT / takt);
this._olM = null;
}
const P0 = this._olP == null ? maal : this._olP;
let P;
if (this._olP == null || !dt || maal < P0 - 2) { P = maal; this._olV = 0; }
else if (fast || kanRulle) {
// Rolig tempo når rullingen styrer: P følger rullingen, men aldri fortere enn 0,45 steg i sekundet, med myk start og stopp
const MAKS = 0.45;
const d = maal - P0;
const vMaal = Math.sign(d) * Math.min(MAKS, Math.abs(d) * 2.2);
this._olV = (this._olV || 0) + (vMaal - (this._olV || 0)) * (1 - Math.exp(-dt / 180));
P = P0 + this._olV * dt / 1000;
if ((maal - P) * d <= 0 || Math.abs(maal - P) < 0.0005) { P = maal; this._olV = 0; }
} else {
P = P0 + (maal - P0) * (1 - Math.exp(-dt / 130));
if (Math.abs(maal - P) < 0.0005) P = maal;
}
this._olP = P;
if (P !== this._olSatt) { el.style.setProperty('--P', P.toFixed(4)); this._olSatt = P; }
}

// Trykk på et steg: rull dit (eller still klokka dit når siden ikke kan rulles). Uten rullestyring
// går siden til første stopp i steget.
olTil(i) {
if (!this.state.olAnim) {
const st = this._olStopp;
const k = st ? st.findIndex((x) => Math.floor(x) === i) : -1;
if (k >= 0) this.setState({ olTrykk: k });
return;
}
this.olGaa(i + 0.72);
}

olGaa(P) {
const m = this._olM;
if (m) (m.ruller || window).scrollTo({ top: m.start + m.lengde * P / (this._olN || 4), behavior: 'smooth' });
else this._olT = P * (this._olTakt || 4200);
}

// Trykk på telefonen: gå til neste stopp. Uten bevegelse holder siden selv rede på hvor den er.
olNeste() {
const st = this._olStopp;
if (!st) return;
if (!this.state.olAnim) { this.setState({ olTrykk: ((this.state.olTrykk || 0) + 1) % st.length }); return; }
const P = this._olP || 0;
const neste = st.find((x) => x > P + 0.12);
this.olGaa(neste == null ? st[0] : neste);
}

renderVals() {
const s = this.state || {};
const apen = !!s.meny;
const v = {
skrift: this.props && this.props.tiltenktSkrift ? 'vp-inter' : '',
menyApen: apen,
menyKlasse: apen ? 'open' : '',
apneMeny: () => this.setState({ meny: true }),
lukkMeny: () => this.setState({ meny: false }),
olKlasse: 'ol-rull' + (s.olAnim ? ' ol-anim' : '') + (s.olFast ? ' ol-fast' : ''),
settOl: (el) => { if (el) this._ol = el; },
};
for (let i = 0; i < 8; i++) v['olTil' + i] = () => this.olTil(i);
v.olNeste = () => this.olNeste();
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
return (
<>
    <main className="page-booking ol bf">
      {" "}
      <section className="hero bx">
        {" "}
        <div className="wrap">
          {" "}
          <h1>
            {T("Nettside og booking, ferdig fra start")}
          </h1>
          {" "}
          <p className="lead">
            {T("Ferdig nettside der kunden sender forespørsel når det passer dem, og får et tilbud tilbake. Dere svarer når det passer dere.")}
          </p>
          {" "}
          <div className="cta-row">
            <a className="btn btn-primary btn-lg" href={SIGNUP_URL}>
              {T("Prøv gratis i 14 dager")}
            </a>
          </div>
          {" "}
        </div>
        {" "}
        <div className="bx-vindu-wrap">
          {" "}
          <div className="bx-stabel">
            {" "}
            <figure className="bx-vindu">
              <span className="ns-bar" aria-hidden="true">
                <i>
                </i>
                <i>
                </i>
                <i>
                </i>
                <b>
                  {T("rglautomotive.no")}
                </b>
              </span>
              <img src="/lerret/ks-rgl-stor.jpg" alt={T("Forsiden til RGL Automotive, en nettside vi har laget")} width="2240" height="1400" />
            </figure>
            {" "}
            <svg className="m-fig m-hei" width="367" height="397" viewBox="0 0 367 397" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={T("Muttern med headset hilser velkommen")}>
              <path d="M93.0777 96.3267C93.0777 96.3267 93.8357 30.4721 165.194 16.6014C236.553 2.73069 262.14 59.3895 262.14 59.3895" stroke="#0C005A" strokeWidth="10" />
              <path d="M252.493 273.842L261.487 312.965C262.491 317.332 262.851 321.822 262.557 326.294L258.993 380.404" stroke="#93BBFF" strokeWidth="10" strokeLinecap="round" />
              <path d="M166.583 280.342L170.873 328.392C171.284 332.995 170.95 337.634 169.884 342.131L160.015 383.779" stroke="#93BBFF" strokeWidth="10" strokeLinecap="round" />
              <path d="M160.203 380.166C153.001 380.166 146.496 381.112 141.805 382.632C139.457 383.393 137.585 384.29 136.309 385.269C135.026 386.251 134.402 387.267 134.401 388.265C134.401 389.262 135.026 390.279 136.309 391.262C137.585 392.24 139.457 393.137 141.805 393.897C146.496 395.418 153.001 396.364 160.203 396.364C167.406 396.364 173.911 395.418 178.603 393.897C180.95 393.137 182.822 392.24 184.099 391.262C185.381 390.279 186.005 389.262 186.005 388.265C186.005 387.267 185.381 386.251 184.099 385.269C182.822 384.29 180.95 383.393 178.603 382.632C173.911 381.112 167.406 380.166 160.203 380.166Z" fill="#93BBFF" stroke="#93BBFF" strokeWidth="0.772727" />
              <path d="M257.682 396.488C264.884 396.488 271.389 395.542 276.08 394.022C278.428 393.262 280.299 392.364 281.576 391.386C282.859 390.403 283.483 389.387 283.483 388.39C283.483 387.392 282.859 386.375 281.576 385.393C280.299 384.415 278.428 383.517 276.08 382.757C271.389 381.237 264.884 380.29 257.682 380.29C250.479 380.29 243.973 381.237 239.282 382.757C236.935 383.518 235.063 384.415 233.786 385.393C232.504 386.375 231.88 387.392 231.88 388.39C231.88 389.387 232.504 390.403 233.786 391.386C235.063 392.364 236.935 393.262 239.282 394.022C243.973 395.543 250.479 396.488 257.682 396.488Z" fill="#93BBFF" stroke="#93BBFF" strokeWidth="0.772727" />
              <path className="hei-vink" d="M298.889 158.235L323.199 153.51C335.887 151.043 345.048 139.931 345.048 127.006L345.048 84.5502" stroke="#93BBFF" strokeWidth="9" strokeLinecap="round" />
              <path className="hei-pc" d="M19.0295 221.552L19.0295 244.228C19.0295 251.648 23.4187 258.366 30.2144 261.346C39.4842 265.412 50.2862 263.545 57.6538 256.604L111.174 206.184" stroke="#93BBFF" strokeWidth="9" strokeLinecap="round" />
              <path d="M288.193 103.348L312.093 226.3L221.756 304.104L108.852 265.806L84.9523 142.854L175.289 65.0508L288.193 103.348Z" fill="#93BBFF" stroke="#93BBFF" strokeWidth="0.772727" />
              <path d="M191.267 147.254C211.71 143.281 231.536 156.765 235.543 177.381C239.55 197.997 226.22 217.927 205.777 221.901C185.334 225.875 165.51 212.389 161.502 191.773C157.495 171.157 170.824 151.228 191.267 147.254Z" fill="#FAF7F2" stroke="#93BBFF" strokeWidth="0.772727" />
              <path className="hei-pc" d="M109.411 257.003L146.59 227.023L145.233 224.923L92.5955 210.717L109.411 257.003Z" fill="white" />
              <path className="hei-pc" d="M86.2646 193.734L7.43604 174.188L26.4493 239.172L26.4144 239.671L109.233 259.496L109.373 257.501L86.2646 193.734Z" fill="#FF734E" />
              <path className="hei-pc" d="M53.4457 201.534C54.4651 204.335 53.1594 207.381 50.5296 208.338C47.8997 209.296 44.9414 207.801 43.9221 205.001C42.9027 202.2 44.2084 199.154 46.8382 198.197C49.4681 197.239 52.4264 198.734 53.4457 201.534Z" fill="white" />
              <path className="hei-pc" d="M99.7458 251.817L29.2222 235.357" stroke="#E7EEFB" strokeLinecap="round" />
              <path className="hei-pc" d="M146.152 226.117L109.604 257.648L86.1011 193.582C85.9869 193.27 85.7258 193.036 85.404 192.956L7.24024 173.482C6.48262 173.293 5.8106 174.006 6.04435 174.751L26.4145 239.671" stroke="#E7EEFB" strokeWidth="2" />
              <path className="hei-pc" d="M23.5328 221.051C23.5328 218.566 21.5181 216.551 19.0328 216.551C16.5475 216.551 14.5328 218.566 14.5328 221.051L19.0328 221.051L23.5328 221.051ZM53.4327 259.853L55.8303 263.661L57.8973 262.359L55.4997 258.551L53.1021 254.743L51.0351 256.044L53.4327 259.853ZM19.0328 221.051L14.5328 221.051L14.5328 244.65L19.0328 244.65L23.5328 244.65L23.5328 221.051L19.0328 221.051ZM19.0328 244.65L14.5328 244.65C14.5328 253.592 19.73 261.718 27.8473 265.469L29.7348 261.384L31.6224 257.299C26.6905 255.02 23.5328 250.083 23.5328 244.65L19.0328 244.65ZM53.4327 259.853L51.0351 256.044C45.1939 259.722 37.8884 260.194 31.6224 257.299L29.7348 261.384L27.8473 265.469C36.8796 269.642 47.4103 268.962 55.8303 263.661L53.4327 259.853Z" fill="#93BBFF" />
              <path d="M257.059 221.886C257.059 221.886 305.582 179.346 303.824 159.823L298.672 133.319" stroke="black" strokeWidth="4" />
              <ellipse cx="93.8371" cy="142.606" rx="19.6726" ry="33" transform="rotate(6 93.8371 142.606)" fill="#0C005A" />
              <ellipse cx="19.6726" cy="33" rx="19.6726" ry="33" transform="matrix(-0.882948 0.469472 0.469472 0.882948 282.796 64.0762)" fill="#0C005A" />
              <rect width="29.979" height="19.0436" rx="9.52182" transform="matrix(0.87462 -0.48481 0.510317 0.859986 228.396 227.727)" fill="#0C005A" />
            </svg>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section className="ol-kap bf-k3" aria-label={T("Slik går det for seg")}>
        {" "}
        <div className="k3-rad">
          {" "}
          <article className="k3 k3-nett">
            {" "}
            <div className="k3-vis" aria-hidden="true">
              {" "}
              <div className="k3-side">
                <span className="k3-bar">
                  <i>
                  </i>
                  <i>
                  </i>
                  <i>
                  </i>
                  <b>
                    {T("dittverksted.no")}
                  </b>
                </span>
                <div className="k3-innhold">
                  <span className="k3-logo">
                  </span>
                  <span className="k3-l1">
                  </span>
                  <span className="k3-l2">
                  </span>
                  <span className="k3-knapp">
                    <i className="k3-knapp-hake">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5">
                        </path>
                      </svg>
                    </i>
                    {T("Bestill time")}
                    <svg className="k3-peker" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 2.5 20 12l-7 1.6L9.4 21z" fill="#0C005A" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round">
                      </path>
                    </svg>
                  </span>
                </div>
              </div>
              {" "}
            </div>
            {" "}
            <h3>
              {T("Nettsiden deres")}
            </h3>
            {" "}
            <p>
              {T("Ferdig nettside med logo, åpningstider og tjenester. Vi setter den opp sammen med dere.")}
            </p>
            {" "}
          </article>
          {" "}
          <article className="k3 k3-foresp">
            {" "}
            <div className="k3-vis" aria-hidden="true">
              {" "}
              <div className="k3-varsel">
                <span className="k3-klokke">
                  {T("Kl. 22:41 · verkstedet er stengt")}
                </span>
                <div className="k3-ny">
                  <i>
                  </i>
                  <p>
                    <b>
                      {T("Ny forespørsel")}
                    </b>
                    {T("Service · EK 48213")}
                  </p>
                </div>
              </div>
              {" "}
            </div>
            {" "}
            <h3>
              {T("Forespørselen")}
            </h3>
            {" "}
            <p>
              {T("Kunden sender forespørsel når det passer, også når verkstedet er stengt.")}
            </p>
            {" "}
          </article>
          {" "}
          <article className="k3 k3-status">
            {" "}
            <div className="k3-vis" aria-hidden="true">
              {" "}
              <ol className="k3-trinn">
                {" "}
                <li className="ok k3-t1">
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5">
                      </path>
                    </svg>
                  </i>
                  {T("Forespørsel sendt")}
                </li>
                {" "}
                <li className="ok k3-t2">
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5">
                      </path>
                    </svg>
                  </i>
                  {T("Tilbud godkjent")}
                </li>
                {" "}
                <li className="na k3-t3">
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5">
                      </path>
                    </svg>
                  </i>
                  {T("Pågår")}
                </li>
                {" "}
                <li className="k3-t4">
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5">
                      </path>
                    </svg>
                  </i>
                  {T("Klar for henting")}
                </li>
                {" "}
              </ol>
              {" "}
            </div>
            {" "}
            <h3>
              {T("Status underveis")}
            </h3>
            {" "}
            <p>
              {T("Kunden følger jobben uten å logge inn, og får beskjed når kjøretøyet er klart.")}
            </p>
            {" "}
          </article>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section className={v.olKlasse} ref={v.settOl} data-steg="4" data-stopp="0.15,0.48,0.8,1.3,1.8,2.5,3.5" aria-label={T("Fra forespørsel til ferdig jobb")}>
        {" "}
        <div className="ol-spor">
          {" "}
          <div className="ol-feste">
            {" "}
            <div className="ol-ramme bf-ramme">
              {" "}
              <div className="ol-venstre">
                {" "}
                <div className="ol-om">
                  {" "}
                  <div className="ol-o ol-t0">
                    <h2>
                      {T("Det starter på nettsiden deres")}
                    </h2>
                    <p>
                      {T("Kunden skriver inn skiltnummeret, velger tjeneste og sier når det passer.")}
                    </p>
                  </div>
                  {" "}
                  <div className="ol-o ol-t1">
                    <h2>
                      {T("Dere foreslår tid og pris")}
                    </h2>
                    <p>
                      {T("Kunden får tilbudet på SMS eller e-post og godtar med ett trykk.")}
                    </p>
                  </div>
                  {" "}
                  <div className="ol-o ol-t2">
                    <h2>
                      {T("Kunden følger jobben")}
                    </h2>
                    <p>
                      {T("Statusen oppdateres mens mekanikeren jobber, uten at kunden må logge inn.")}
                    </p>
                  </div>
                  {" "}
                  <div className="ol-o ol-t3">
                    <h2>
                      {T("Kunden får beskjed når det er ferdig")}
                    </h2>
                    <p>
                      {T("Da står kjøretøyet som klart for henting.")}
                    </p>
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div className="bf-scene">
                {" "}
                <div className="bp-tlf bf-tlf" aria-hidden="true">
                  {" "}
                  <i className="bp-hakk">
                  </i>
                  {" "}
                  <div className="bp-skjermer">
                    {" "}
                    <img className="bf-s bf-sn" src="/lerret/tlf-n-rgl.jpg" alt="" width="780" height="1776" loading="lazy" decoding="async" />
                    {" "}
                    <div className="bf-s bf-sn bf-tapp" aria-hidden="true">
                      <i className="bf-tk-knapp">
                      </i>
                      <i className="bf-tk-ring">
                      </i>
                      <i className="bf-tk-finger">
                      </i>
                    </div>
                    {" "}
                    <div className="bf-s bf-s0 bf-app">
                      {" "}
                      <div className="bf-sms-status">
                        <b>
                          21:47
                        </b>
                        <span>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <em>
                          </em>
                        </span>
                      </div>
                      {" "}
                      <div className="bf-app-topp">
                        {T("RGL Automotive")}
                      </div>
                      {" "}
                      <p className="bf-app-tittel">
                        {T("Velg kjøretøy")}
                      </p>
                      {" "}
                      <div className="bf-app-kort">
                        <b>
                          {T("VOLKSWAGEN CADDY")}
                        </b>
                        <div>
                          <span className="bf-skilt">
                            <i>
                              {T("N")}
                            </i>
                            {T("BS 77410")}
                          </span>
                          <em>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </em>
                        </div>
                      </div>
                      {" "}
                      <span className="bf-app-knapp">
                        {T("Neste")}
                      </span>
                      {" "}
                    </div>
                    {" "}
                    <div className="bf-s bf-s5 bf-app">
                      {" "}
                      <div className="bf-sms-status">
                        <b>
                          21:47
                        </b>
                        <span>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <em>
                          </em>
                        </span>
                      </div>
                      {" "}
                      <div className="bf-app-topp">
                        {T("RGL Automotive")}
                      </div>
                      {" "}
                      <div className="bf-app-midt">
                        <i className="bf-rund">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5">
                            </path>
                          </svg>
                        </i>
                        <b>
                          {T("Takk, Kari!")}
                        </b>
                        <span>
                          {T("Forespørselen er sendt til RGL Automotive.")}
                        </span>
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <div className="bf-s bf-s6 bf-app">
                      {" "}
                      <div className="bf-sms-status">
                        <b>
                          10:32
                        </b>
                        <span>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <em>
                          </em>
                        </span>
                      </div>
                      {" "}
                      <div className="bf-app-topp">
                        {T("RGL Automotive")}
                      </div>
                      {" "}
                      <div className="bf-app-bil">
                        <span className="bf-skilt">
                          <i>
                            {T("N")}
                          </i>
                          {T("BS 77410")}
                        </span>
                        <span>
                          {T("Volkswagen Caddy")}
                        </span>
                      </div>
                      {" "}
                      <p className="bf-app-jobb">
                        {T("EU-kontroll")}
                      </p>
                      {" "}
                      <i className="bf-app-linje">
                        <i>
                        </i>
                      </i>
                      {" "}
                      <ol className="bf-spor">
                        {" "}
                        <li className="na">
                          <b>
                            {T("Pågår")}
                          </b>
                          <span>
                            {T("Mekanikeren jobber med kjøretøyet.")}
                          </span>
                        </li>
                        {" "}
                        <li>
                          <b>
                            {T("Bekreftet")}
                          </b>
                        </li>
                        {" "}
                        <li>
                          <b>
                            {T("Tilbud godkjent")}
                          </b>
                        </li>
                        {" "}
                        <li>
                          <b>
                            {T("Forespørsel sendt")}
                          </b>
                        </li>
                        {" "}
                      </ol>
                      {" "}
                    </div>
                    {" "}
                    <div className="bf-s bf-s7 bf-app">
                      {" "}
                      <div className="bf-sms-status">
                        <b>
                          14:05
                        </b>
                        <span>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <em>
                          </em>
                        </span>
                      </div>
                      {" "}
                      <div className="bf-app-topp">
                        {T("RGL Automotive")}
                      </div>
                      {" "}
                      <div className="bf-app-bil">
                        <span className="bf-skilt">
                          <i>
                            {T("N")}
                          </i>
                          {T("BS 77410")}
                        </span>
                        <span>
                          {T("Volkswagen Caddy")}
                        </span>
                      </div>
                      {" "}
                      <p className="bf-app-jobb">
                        {T("EU-kontroll")}
                      </p>
                      {" "}
                      <div className="bf-app-midt bf-klar">
                        <i className="bf-rund">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5">
                            </path>
                          </svg>
                        </i>
                        <b>
                          {T("Klar for henting")}
                        </b>
                        <span>
                          {T("Takk for at du valgte oss")}
                        </span>
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <div className="bf-s bf-sms">
                      {" "}
                      <div className="bf-sms-status">
                        <b>
                          09:14
                        </b>
                        <span>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <em>
                          </em>
                        </span>
                      </div>
                      {" "}
                      <div className="bf-sms-topp">
                        <span className="av">
                          {T("R")}
                        </span>
                        <div>
                          <div className="nm">
                            {T("RGL Automotive")}
                          </div>
                          <div className="sb">
                            {T("SMS · i dag 09:12")}
                          </div>
                        </div>
                      </div>
                      {" "}
                      <div className="bf-sms-kropp">
                        {" "}
                        <div className="bf-b bf-inn bf-b0">
                          <span className="bt">
                            {T("Tilbud: EU-kontroll · BS 77410")}
                          </span>
                          <span className="bs">
                            {T("Foreslått: torsdag 26. kl. 08:00 · 990 kr")}
                          </span>
                          <span className="b-link">
                            {T("Se og svar på tilbudet")}
                          </span>
                        </div>
                        {" "}
                        <div className="bf-b bf-ut bf-b1">
                          <span className="bt">
                            {T("Tilbud godtatt")}
                          </span>
                          <span className="bs">
                            {T("Kommentar: «Kan dere også sjekke AC-en?»")}
                          </span>
                        </div>
                        {" "}
                        <div className="bf-levert bf-b2">
                          {T("Levert 09:14")}
                        </div>
                        {" "}
                        <div className="bf-b bf-inn bf-b3">
                          {T("Bestillingen er bekreftet: torsdag 26. kl. 08:00. Du får en påminnelse dagen før.")}
                        </div>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <button type="button" className="bf-videre" tabIndex="-1" onClick={v.olNeste}>
                    </button>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section className="ol-kap bf-nettsider" aria-label={T("Nettsider vi har laget")}>
        {" "}
        <h2 className="ns-tittel">
          {T("Nettsider vi har laget")}
        </h2>
        {" "}
        <div className="ns-rad">
          {" "}
          <a className="ns-kort" href="https://moldestuket.com/" target="_blank" rel="noopener">
            <span className="ns-bar">
              <i aria-hidden="true">
              </i>
              <i aria-hidden="true">
              </i>
              <i aria-hidden="true">
              </i>
              <b>
                {T("moldestuket.com")}
              </b>
              <em>
                {T("Spesialbestilling")}
              </em>
            </span>
            <img src="/lerret/ks-moldestuket.jpg" alt={T("Forsiden til Show'N Shine hos Moldestuket")} width="1120" height="700" loading="lazy" decoding="async" />
          </a>
          {" "}
          <a className="ns-kort" href="https://rglautomotive.no/" target="_blank" rel="noopener">
            <span className="ns-bar">
              <i aria-hidden="true">
              </i>
              <i aria-hidden="true">
              </i>
              <i aria-hidden="true">
              </i>
              <b>
                {T("rglautomotive.no")}
              </b>
            </span>
            <img src="/lerret/ks-rgl.jpg" alt={T("Forsiden til RGL Automotive")} width="1120" height="700" loading="lazy" decoding="async" />
          </a>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
    </main>
    {" "}
</>
);
}
}
