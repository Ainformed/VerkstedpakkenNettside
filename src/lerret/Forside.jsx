"use client";
/* Flyttet fra lerretet (gen/til_react.py). Logikken er den samme som i lerretet: en React-klasse med
   state, setState, componentDidMount og renderVals(); render() viser markeringen med verdiene fra renderVals().
   Bildene står som i lerretet, med størrelsen satt i CSS, derfor vanlige <img> og ikke next/image. */
/* eslint-disable @next/next/no-img-element */
import { Component } from "react";
import { SIGNUP_URL } from "@/lib/links";
import { localePath } from "@/i18n/config";
import "./Forside.css";

export default class Forside extends Component {
state = Object.assign({ meny: false }, { steg: null, pause: false, rull: false, skjulMeny: false, traadFast: false, lvKanban: false });

// ── Seksjonen etter toppen (flyten og museet). Metodene kommer fra gen/flyt-museum.dc.html ──
  componentDidMount() {
    this._P = null;
    this._sist = 0;
    this._tikk = (t) => {
      this._raf = requestAnimationFrame(this._tikk);
      const dt = this._sist ? Math.min(120, t - this._sist) : 0;
      this._sist = t;
      this.oppdater(dt);
    };
    this._raf = requestAnimationFrame(this._tikk);
    this.rullNaarSynlig();
  }

  componentWillUnmount() {
    this._borte = true;
    cancelAnimationFrame(this._raf);
    clearTimeout(this._st);
    if (this._rullInn) this._rullInn.disconnect();
    if (this._rullUt) this._rullUt.disconnect();
  }

  rullNaarSynlig() {
    // 22.11.2026: Muttern over «Prøv før du bytter» ruller inn når båndet er godt inne i vinduet, og på nytt når
    // båndet har vært helt ute av syne og kommer tilbake
    const svg = (this.rot || document).querySelector('.m-rull');
    const baand = svg && svg.closest('.vh-museum');
    if (!svg || !baand) return;
    if (typeof IntersectionObserver === 'undefined') { svg.classList.add('r-gaa'); return; }
    this._rullInn = new IntersectionObserver((ee) => {
      if (ee.some((e) => e.isIntersecting)) svg.classList.add('r-gaa');
    }, { rootMargin: '0px 0px -30% 0px' });
    this._rullUt = new IntersectionObserver((ee) => {
      if (ee.some((e) => !e.isIntersecting)) svg.classList.remove('r-gaa');
    }, { rootMargin: '0px 0px 200px 0px' });
    this._rullInn.observe(baand);
    this._rullUt.observe(baand);
  }

  startP() {
    const p = this.props || {};
    const navn = ['Forespørsel', 'Tavle', 'Tilbud', 'Verksted', 'Betaling', 'Regnskap'];
    return Math.max(0, navn.indexOf(p.startsteg ?? 'Forespørsel'));
  }

  staarStille() {
    const p = this.props || {};
    const rolig = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    return (p.autospill ?? true) === false || rolig;
  }

  // Det som ruller: nærmeste rullende forelder, ellers vinduet. Letes opp på nytt en gang i blant.
  finnRuller(el) {
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

  // Høyden på en fast toppmeny over seksjonen (nettsidens meny). 0 når det ikke finnes noen.
  maalMeny(el) {
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

  // ── Tråden ──
  // Figuren «Muttern i ro» fra nettsiden: de fire delene som beveger seg, stående (0) og i
  // yogastilling (1). Tallene blandes rett fram, slik nettsidens egen animasjon gjør.
  traadFigur() {
    if (this._tf) return this._tf;
    const par = {
      armH: ['M345.25 190.5L345.249 139.966C345.248 127.291 333.612 117.555 318.463 117.555L285.748 117.555', 'M364.891 4.5L364.894 109.499C364.894 124.411 352.806 136.5 337.894 136.5L305.394 136.5'],
      armV: ['M39.7734 188L39.7772 139.372C39.7782 126.697 51.4142 116.961 66.5628 116.961L99.2791 116.961', 'M59.4277 5L59.4261 110.239C59.4259 125.151 71.5143 137.239 86.4261 137.239L118.926 137.239'],
      legg: ['M227.756 221.938L236.636 259.431C237.119 261.47 237.363 263.558 237.363 265.653L237.365 320', 'M241.391 226.938L246.619 239.776C252.277 253.672 245.523 269.515 231.579 275.053L186.391 293'],
      fot: ['M237.552 332.085C244.754 332.085 251.259 331.139 255.95 329.619C258.298 328.858 260.169 327.96 261.446 326.982C262.729 326 263.353 324.984 263.354 323.986C263.354 322.988 262.729 321.972 261.446 320.989C260.169 320.011 258.298 319.114 255.95 318.353C251.259 316.833 244.754 315.887 237.552 315.886C230.349 315.886 223.843 316.833 219.152 318.353C216.805 319.114 214.933 320.011 213.656 320.989C212.374 321.972 211.75 322.988 211.75 323.986C211.75 324.984 212.374 326 213.656 326.982C214.933 327.96 216.805 328.858 219.152 329.619C223.843 331.139 230.349 332.085 237.552 332.085Z', 'M196.941 288.604C195.321 281.586 192.936 275.46 190.4 271.231C189.13 269.115 187.834 267.493 186.594 266.469C185.349 265.441 184.218 265.061 183.246 265.285C182.274 265.509 181.423 266.347 180.755 267.817C180.089 269.281 179.636 271.307 179.423 273.766C178.997 278.678 179.538 285.229 181.158 292.247C182.778 299.265 185.164 305.391 187.701 309.62C188.97 311.736 190.265 313.359 191.505 314.383C192.751 315.411 193.882 315.79 194.854 315.566C195.826 315.341 196.676 314.505 197.345 313.034C198.01 311.57 198.464 309.545 198.677 307.086C199.103 302.173 198.561 295.622 196.941 288.604Z'],
    };
    const tall = /-?\d*\.?\d+/g;
    const ut = {};
    for (const k in par) ut[k] = { mal: par[k][0].split(tall), a: par[k][0].match(tall).map(Number), b: par[k][1].match(tall).map(Number) };
    return (this._tf = ut);
  }

  traadSti(del, t) {
    const f = this.traadFigur()[del];
    let s = f.mal[0];
    for (let i = 0; i < f.a.length; i++) s += (f.a[i] + (f.b[i] - f.a[i]) * t).toFixed(2) + f.mal[i + 1];
    return s;
  }

  // Hele bildet for én verdi av M (0 til 1), tegnet nedover. M 0 til 0,8 er turen: Muttern går fra
  // floka og ned, med tråden i den løftede hånda. Floka er K løkker nedover en loddrett akse, i
  // ulik størrelse og med driv til sidene. En front går oppover gjennom floka mens Muttern drar:
  // over fronten er løkkene hele, i fronten krymper de inn mot aksen, og under er tråden rett.
  // M 0,8 til 1 er avslutningen: Muttern slipper, tar et skritt til siden og går i yogastilling,
  // og linja fortsetter ned. g er målene i scenen (se stilene til .t-scene).
  traadBilde(M, g) {
    const kl = (x) => Math.max(0, Math.min(1, x));
    const ss = (x) => { x = kl(x); return x * x * (3 - 2 * x); };
    const f = (x) => x.toFixed(1);
    const X = f(g.Lx);
    const tur = kl(M / 0.8);
    const yh = g.yh0 + (g.yh1 - g.yh0) * tur;
    const TH = 2 * Math.PI * g.K, w = 4 * Math.PI;
    const tf = (TH + w) * (1 - tur);
    const te = Math.min(tf, TH);
    const b0 = (g.yB - g.yA) / TH, b1 = 3;
    let floke = '';
    let yb = g.yA;
    if (te > 0.01) {
      floke = 'M' + X + ' ' + f(g.yA);
      const n = Math.ceil(te / 0.09), dth = te / n;
      for (let i = 1; i <= n; i++) {
        const th = i * dth;
        const a = ss((tf - th) / w);
        yb += dth * (b0 + b1 * (1 - a) * (1 - a));
        const H = ss(th / (0.16 * TH)) * ss((TH - th) / (0.16 * TH));
        const A = a * H;
        const r = g.R0 * (0.7 + 0.3 * Math.sin(th * 0.31 + 0.8));
        const drift = g.Dx * (0.72 * Math.sin(th * 0.075 + 1.3) + 0.28 * Math.sin(th * 0.23 + 0.4));
        floke += 'L' + f(g.Lx + A * (1.2 * r * Math.sin(th) + drift)) + ' ' + f(yb + A * (0.32 * r * Math.sin(th * 0.19 + 2.1) - r * Math.cos(th)));
      }
    }
    const slipp = ss((M - 0.8) / 0.06);
    const ned = ss((M - 0.84) / 0.14);
    const ende = yh + (g.yEnd - yh) * ned;
    // Linja starter 60 px under floka. Biten imellom er flaten med fargeovergang (.t-ov).
    const linje = 'M' + X + ' ' + f(yb + 60) + 'L' + X + ' ' + f(Math.max(yb + 60, ende));
    const haandX = g.side < 0 ? 364.89 : 59.43, haandY = g.side < 0 ? 4.5 : 5;
    const gaar = Math.max(0, Math.min(1, tur / 0.05, (1 - tur) / 0.05));
    const ben = 13 * Math.sin((2 * Math.PI * (yh - g.yh0)) / (112 * g.s)) * gaar;
    return { floke, ovy: yb, linje, ox: g.Lx - haandX * g.s + g.side * 18 * slipp, oy: yh - haandY * g.s, ben, ro: ned };
  }

  // Kjøres for hvert bilde når seksjonen viser tråden. Kan siden rulles, følger M rullingen slik
  // at hånda til Muttern står på samme høyde i vinduet hele turen ned (litt under midten). Kan
  // den ikke rulles, går M på klokka. Tallet glir etter rullingen, så bevegelsen blir jevn også
  // når det rulles i rykk.
  oppdaterTraad(el, dt, m) {
    const scene = el.querySelector('.t-scene');
    if (!scene) return;
    const kl = (x) => Math.max(0, Math.min(1, x));
    if (!this._tg || this._teller % 45 === 0) {
      const cs = getComputedStyle(scene);
      const raa = ['--tw', '--th', '--lx', '--ya', '--yb', '--tk', '--r0', '--tdx', '--yh', '--dy', '--ts', '--side', '--yend'].map((n) => cs.getPropertyValue(n).trim()).join(' ');
      if (raa !== this._tgRaa) {
        const t = raa.split(/\s+/).map(Number);
        if (t.length === 13 && t.every((x) => isFinite(x))) {
          this._tg = { W: t[0], H: t[1], Lx: t[2], yA: t[3], yB: t[4], K: t[5], R0: t[6], Dx: t[7], yh0: t[8], yh1: t[8] + 4.7 * t[9], s: t[10], side: t[11] < 0 ? -1 : 1, yEnd: t[12] };
          this._tgRaa = raa;
          const svg = scene.querySelector('.t-svg');
          if (svg) svg.setAttribute('viewBox', '0 0 ' + t[0] + ' ' + t[1]);
        }
      }
      this._sattTraad = null;
      this._sattRo = null;
    }
    const g = this._tg;
    if (!g) return;
    if (this.state.traadFast) this.setState({ traadFast: false });
    const staar = this.staarStille();

    let A = 1, M = 0.42, glir = false;
    if (!staar) {
      if (m.kanRulle) {
        glir = true;
        const r = scene.getBoundingClientRect();
        const k = r.height / g.H;
        const anker = m.vinduTopp + m.menyH + (m.vindu - m.menyH) * 0.6;
        M = kl((0.8 * (anker - (r.top + g.yh0 * k))) / Math.max(1, (g.yh1 - g.yh0) * k));
        A = kl((m.vinduTopp + m.vindu * 0.92 - r.top) / Math.max(1, m.vindu * 0.3));
      } else {
        if (!this.state.pause) {
          this._tKlokke = ((this._tKlokke || 0) + dt) % 17000;
          this._tInn = Math.min(1400, (this._tInn || 0) + dt);
        }
        const t = this._tKlokke || 0;
        A = kl((this._tInn || 0) / 1400);
        M = t < 1600 ? 0 : t < 11600 ? (t - 1600) / 10000 : t < 15800 ? 1 : Math.max(0, 1 - (t - 15800) / 1200);
      }
    }
    if (glir && this._Mv != null) {
      const k = 1 - Math.exp(-dt / 130);
      const mm = this._Mv + (M - this._Mv) * k, aa = this._Av + (A - this._Av) * k;
      M = Math.abs(M - mm) < 0.0004 ? M : mm;
      A = Math.abs(A - aa) < 0.0004 ? A : aa;
    }
    this._Mv = M; this._Av = A;

    const mTekst = M.toFixed(4), aTekst = A.toFixed(3);
    if (mTekst !== this._sattTM) { el.style.setProperty('--M', mTekst); this._sattTM = mTekst; }
    if (aTekst !== this._sattTA) { el.style.setProperty('--A', aTekst); this._sattTA = aTekst; }
    const nokkel = mTekst + '/' + this._tgRaa;
    if (nokkel === this._sattTraad) return;
    this._sattTraad = nokkel;
    const b = this.traadBilde(M, g);
    const q = (s) => scene.querySelector(s);
    const floke = q('.t-floke'), linje = q('.t-linje'), fig = q('.t-fig'), bv = q('.t-bein.v'), bh = q('.t-bein.h');
    if (floke) floke.setAttribute('d', b.floke);
    if (linje) linje.setAttribute('d', b.linje);
    scene.style.setProperty('--ovy', b.ovy.toFixed(1));
    if (fig) fig.setAttribute('transform', 'translate(' + b.ox.toFixed(2) + ' ' + b.oy.toFixed(2) + ') scale(' + g.s + ')');
    if (bv) bv.setAttribute('transform', 'rotate(' + b.ben.toFixed(2) + ' 157.3 219)');
    if (bh) bh.setAttribute('transform', 'rotate(' + (-b.ben).toFixed(2) + ' 227.8 222)');
    // Armen mot linja er løftet hele veien (den holder tråden). Den andre armen og beinet går
    // fra stående til yogastilling til slutt.
    const ro = b.ro.toFixed(3) + '/' + g.side;
    if (ro !== this._sattRo) {
      this._sattRo = ro;
      const loftet = g.side < 0 ? 'armH' : 'armV';
      for (const del of ['armH', 'armV', 'legg', 'fot']) {
        const n = q('.t-' + del);
        if (n) n.setAttribute('d', this.traadSti(del, del === loftet ? 1 : b.ro));
      }
    }
  }

  // Kjøres for hvert bilde: finner ut hvor langt man er kommet (P, 0 til 6) og skriver det til --P.
  // Kan siden rulles og blokka får plass i vinduet, kommer P fra rullingen. Ellers går P på klokka.
  oppdater(dt) {
    const p = this.props || {};
    const el = this.rot || document.querySelector('.vh');
    if (!el) return;
    const spor = el.querySelector('.vh-spor');
    const feste = el.querySelector('.vh-feste');
    if (!spor || !feste) return;
    const ruller = this.finnRuller(el);
    const vindu = ruller ? ruller.clientHeight : window.innerHeight;
    const vinduTopp = ruller ? ruller.getBoundingClientRect().top : 0;
    const helHoyde = ruller ? ruller.scrollHeight : document.documentElement.scrollHeight;
    const blokk = feste.offsetHeight;
    const stegPx = Math.round(Math.max(480, Math.min(720, vindu * 0.75)));
    // Står det en fast toppmeny over seksjonen, festes blokka midt i plassen under den. Får
    // den ikke plass der, men i hele vinduet, glir menyen unna så lenge blokka står fast.
    const menyH = this.maalMeny(el);
    const under = blokk <= vindu - menyH - 16;
    const topp = under ? menyH + Math.max(8, Math.round((vindu - menyH - blokk) / 2)) : Math.max(8, Math.round((vindu - blokk) / 2));
    // Tråden lenger ned står også fast en stund (tLengde). Det sporet regnes heller ikke med.
    const tLengde = Math.round(Math.max(900, Math.min(1500, vindu * 1.35)));
    const egetTillegg = (this.state.rull ? Math.round(6.4 * stegPx) : 0) + (this.state.traadFast ? tLengde : 0);
    // Rullestyrt bare i et vindu av vanlig skjermhøyde. På lerretet kan en tavle være flere
    // tusen piksler høy og likevel ha innhold som stikker ut under ramma: der går P på klokka.
    const kanRulle = (p.rulling ?? true) !== false && helHoyde - egetTillegg - vindu > 240 && vindu <= 2600;
    const rull = kanRulle && blokk <= vindu - 16;
    if (blokk !== this._b || stegPx !== this._s || topp !== this._tp) {
      el.style.setProperty('--blokk', blokk);
      el.style.setProperty('--steg-px', stegPx);
      el.style.setProperty('--topp', topp);
      this._b = blokk; this._s = stegPx; this._tp = topp;
    }
    if (rull !== this.state.rull) { this.setState({ rull }); return; }

    let P = this._P ?? this.startP();
    if (rull) {
      const r = spor.getBoundingClientRect();
      const lengde = Math.max(1, r.height - blokk - Math.round(0.4 * stegPx));
      const maal = 6 * Math.max(0, Math.min(1, (vinduTopp + topp - r.top) / lengde));
      P = this._P == null || !dt ? maal : this.rolig(this._P, maal, dt);
      this._m = { ruller, lengde, start: (ruller ? ruller.scrollTop : window.scrollY) + r.top - vinduTopp - topp };
      if (el.dataset.skift) { clearTimeout(this._st); delete el.dataset.skift; }
      const skjul = !under && menyH > 0 && r.top - vinduTopp < menyH + 12 && r.bottom - vinduTopp > topp + blokk - 12;
      if (skjul !== !!this.state.skjulMeny) this.setState({ skjulMeny: skjul });
    } else {
      if (this.state.skjulMeny) this.setState({ skjulMeny: false });
      const staar = this.staarStille();
      if (this._P == null) P = this.startP() === 0 ? 0.06 : this.startP() + 0.8;
      if (this._seq && this._seq.length) {
        const ledd = this._seq[0];
        this._seqT = (this._seqT || 0) + dt;
        const x = Math.min(1, this._seqT / ledd.dur);
        const myk = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
        P = this._seqFra + (ledd.til - this._seqFra) * myk;
        if (this._seqT >= ledd.dur + (ledd.hold || 0)) {
          P = ledd.til; this._seq.shift(); this._seqFra = P; this._seqT = 0;
          if (!this._seq.length) this._seq = null;
        }
      } else if (this._maalP != null) {
        P = this.rolig(P, this._maalP, dt);
        if (P === this._maalP) this._maalP = null;
      }
      if (!this._hjul) {
        this._hjul = (e) => {
          if (this.state.rull) return;
          const fra = this._maalP ?? this._P ?? 0.8;
          const til = Math.max(0.06, Math.min(5.8, fra + e.deltaY / 900));
          if (Math.abs(til - fra) < 0.0001) return;
          e.preventDefault();
          this._seq = null;
          this._maalP = til;
        };
        el.addEventListener('wheel', this._hjul, { passive: false });
      }
    }
    this._P = P;
    if (P !== this._sattP) { el.style.setProperty('--P', P.toFixed(4)); this._sattP = P; }
    const steg = Math.max(0, Math.min(5, Math.floor(P + 0.0001)));
    if (steg !== this.state.steg) this.setState({ steg });

    // Muttern ruller langs linja under panelet. En sekskant flytter seg én sidelengde for hver
    // sjettedels omdreining, og ligger litt lavere når den hviler på en flat side.
    const gaar = el.querySelector('.vh-gaar');
    if (gaar) {
      if (!this._skinneB || this._teller % 45 === 0) {
        this._skinneB = gaar.offsetWidth;
        this._mutterR = parseFloat(getComputedStyle(gaar).getPropertyValue('--mr')) || 17;
      }
      const radius = this._mutterR;
      const vinkel = (Math.max(0, Math.min(1, P / 6)) * this._skinneB) / (6 * radius) * 360;
      const fra = (((vinkel + 30) % 60) + 60) % 60 - 30;
      const synk = radius * (1 - Math.cos(fra * Math.PI / 180));
      if (vinkel !== this._sattRv) {
        gaar.style.setProperty('--rv', vinkel.toFixed(2));
        gaar.style.setProperty('--rl', synk.toFixed(2));
        this._sattRv = vinkel;
      }
    }

    // Toppen på forsiden: ordet i «For deg som skrur på …» ruller videre hvert par sekunder.
    // Toppen står øverst på siden, så her er det klokka som styrer, ikke rullingen.
    const side = el.closest('.vp-side');
    const ordrad = side ? side.querySelector('.hx-for') : null;
    if (ordrad) {
      const antall = Math.max(1, ordrad.querySelectorAll('.hx-stripe i').length - 1);
      let V = 0;
      if (!this.staarStille()) {
        this._vt = (this._vt || 0) + dt;
        const hakk = Math.floor(this._vt / 2400) % antall;
        const x = Math.max(0, Math.min(1, ((this._vt % 2400) / 2400 - 0.76) / 0.24));
        V = hakk + x * x * (3 - 2 * x);
      }
      if (V !== this._sattV) { ordrad.style.setProperty('--V', V.toFixed(3)); this._sattV = V; }
    }

    // Problemdelen. Tråden har sin egen oppdatering (oppdaterTraad). Museet: de gamle
    // programvinduene spretter opp ett for ett mens bildet ruller opp gjennom vinduet (M går
    // fra 0 til 1). Der siden ikke kan rulles, går M på klokka: rent bilde, vinduene kommer,
    // blir stående og lukkes igjen.
    const pdValg = p.problemdel ?? 'Enkel';
    const traad = pdValg === 'Tråden';
    if (pdValg === 'Enkel') {
      // Enkel utgave: ingenting å oppdatere, delen står stille.
    } else if (traad) {
      this.oppdaterTraad(el, dt, { kanRulle, vindu, vinduTopp, menyH, tLengde });
    } else {
      if (this.state.traadFast) this.setState({ traadFast: false });
      const bilde = el.querySelector('.m-bilde');
      if (bilde) {
        let M = 1;
        if (!this.staarStille()) {
          if (kanRulle) {
            const fra = vinduTopp + vindu * 0.62;
            const til = vinduTopp + menyH + 24;
            M = Math.max(0, Math.min(1, (fra - bilde.getBoundingClientRect().top) / Math.max(1, fra - til)));
          } else {
            if (!this.state.pause) this._mt = ((this._mt || 0) + dt) % 15000;
            const t = this._mt || 0;
            M = t < 1500 ? 0 : t < 8500 ? (t - 1500) / 7000 : t < 13800 ? 1 : Math.max(0, 1 - (t - 13800) / 900);
          }
        }
        if (M !== this._sattM) { el.style.setProperty('--M', M.toFixed(3)); this._sattM = M; }
      }
    }

    // Integrasjonene: ringen dreier ett hakk om gangen på klokka, hele runden (30 hakk), med en liten pause mellom
    // hakkene så navnet under rekker å leses. 21.11.2026: «istedenfor at denne scroller når man scrolelr ned så kan
    // den bare fortsette å rulle i ett tempo så den kan gå hele runden». Før fulgte den rullingen (tolv hakk).
    const scene = el.querySelector('.i-scene');
    if (scene) {
      let U = 0;
      if (!this.staarStille()) {
        U = this._U || 0;
        if (!this.state.pause) U = (U + dt / 1700) % 30;
      }
      this._U = U;
      const hakk = Math.floor(U);
      const f = U - hakk;
      const x = Math.max(0, Math.min(1, (f - 0.3) / 0.5));
      const glid = x * x * (3 - 2 * x);
      const R = (hakk + glid) / 30;
      if (R !== this._sattR) {
        el.style.setProperty('--R', R.toFixed(5));
        el.style.setProperty('--F', glid.toFixed(3));
        this._sattR = R;
      }
    }
  }

  gaaTil(i) {
    if (this.state.rull) {
      const m = this._m;
      if (m) (m.ruller || window).scrollTo({ top: m.start + ((i + 0.02) / 6) * m.lengde, behavior: 'smooth' });
      return;
    }
    const el = this.rot || document.querySelector('.vh');
    if (el && el.dataset.skift) { clearTimeout(this._st); delete el.dataset.skift; }
    const hvile = (k) => (k === 0 ? 0.06 : k + 0.8);
    const naa = this._P ?? hvile(0);
    const fra = Math.max(0, Math.min(5, Math.floor(naa + 0.0001)));
    this._maalP = null;
    if (i === 0 && fra === 5 && el) {
      el.dataset.skift = '1';
      clearTimeout(this._st);
      this._seq = null;
      this._st = setTimeout(() => { this._P = hvile(0); delete el.dataset.skift; }, 420);
      return;
    }
    const seq = [];
    if (fra === 0 && naa < 0.79 && i > 0) seq.push({ til: 0.8, dur: 650, hold: 450 });
    seq.push({ til: hvile(i), dur: 1000, hold: 0 });
    this._seq = seq; this._seqT = 0; this._seqFra = naa;
  }

  // P følger målet tett (rundt 0,2 s etter), så både musehjul og styreflate flytter flyten med en gang
  rolig(fra, mot, dt) {
    const d = mot - fra;
    if (!dt || Math.abs(d) < 0.0005) { this._V = 0; return mot; }
    const vMaal = Math.max(-10, Math.min(10, d * 6));
    this._V = (this._V || 0) + (vMaal - (this._V || 0)) * (1 - Math.exp(-dt / 70));
    const ny = fra + this._V * dt / 1000;
    if ((mot - ny) * d <= 0) { this._V = 0; return mot; }
    return ny;
  }

  spillAv() {
    if (this._spilt) return;
    this._spilt = true;
    if (this.state.rull) {
      const m = this._m;
      if (!m) return;
      const ruller = m.ruller;
      const hent = () => (ruller ? ruller.scrollTop : window.scrollY);
      const sett = (y) => (ruller ? ruller.scrollTo({ top: y, behavior: 'instant' }) : window.scrollTo({ top: y, behavior: 'instant' }));
      const fraY = hent();
      const P0 = Math.max(0, Math.min(6, ((fraY - m.start) / m.lengde) * 6));
      const tilY = m.start + (5.8 / 6) * m.lengde;
      const varighet = Math.max(2500, (5.8 - P0) * 3800);  // 21.11.2026: «animasjonen spilles litt kjapt»
      const t0 = performance.now();
      let avbrutt = false;
      const stopp = () => { avbrutt = true; };
      window.addEventListener('wheel', stopp, { once: true, passive: true });
      window.addEventListener('touchstart', stopp, { once: true, passive: true });
      const tikk = (t) => {
        if (avbrutt || this._borte) return;
        const x = Math.min(1, (t - t0) / varighet);
        const myk = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
        sett(fraY + (tilY - fraY) * myk);
        if (x < 1) requestAnimationFrame(tikk);
      };
      requestAnimationFrame(tikk);
      return;
    }
    const naa = this._P ?? 0.06;
    const seq = [];
    if (naa < 0.79) seq.push({ til: 0.8, dur: 900, hold: 900 });
    for (let i = 1; i <= 5; i++) seq.push({ til: i + 0.8, dur: 2400, hold: i < 5 ? 1200 : 0 });
    this._maalP = null; this._seq = seq; this._seqT = 0; this._seqFra = naa;
  }

  flytVals() {
    const p = this.props || {};
    const steg = this.state.steg ?? this.startP();
    const pause = !!this.state.pause;
    const ut = {
      vhRot: 'vh steg-' + steg + (this.state.rull ? ' rull' : '') + (this.state.traadFast ? ' t-fast' : '') + (pause ? ' pause' : '') + (p.tiltenktSkrift ? ' vh-inter' : '') + ((p.problemdel ?? 'Enkel') === 'Museet' ? ' pd-museum' : (p.problemdel ?? 'Enkel') === 'Tråden' ? ' pd-traad' : ' pd-traad pd-enkel'),
      settVh: (el) => { if (el) this.rot = el; },
      vekslePause: () => this.setState({ pause: !this.state.pause }),
      pauseNavn: pause ? this.T('Spill av') : this.T('Sett på pause'),
      navKlasse: this.state.skjulMeny ? 'nav-hidden' : '',
      spillAv: () => this.spillAv(),
      lvVis: this.state.lvKanban ? 'vis-kanban' : '',
      lvListeOn: this.state.lvKanban ? '' : 'on',
      lvKanbanOn: this.state.lvKanban ? 'on' : '',
      visListe: () => this.setState({ lvKanban: false }),
      visKanban: () => this.setState({ lvKanban: true }),
    };
    for (let i = 0; i < 6; i++) {
      ut['til' + i] = () => this.gaaTil(i);
      ut['na' + i] = i === steg ? 'step' : 'false';
    }
    return ut;
  }

renderVals() {
const apen = !!(this.state && this.state.meny);
return Object.assign({
skrift: this.props && this.props.tiltenktSkrift ? 'vp-inter' : '',
menyApen: apen,
menyKlasse: apen ? 'open' : '',
apneMeny: () => this.setState({ meny: true }),
lukkMeny: () => this.setState({ meny: false }),
heroKlasse: this.props && this.props.topp === 'Som i dag' ? 'vis-hero-idag' : 'vis-hero-forsok',
}, this.flytVals());
}

// Tekstene står på norsk; på andre språk slås de opp i tekstene siden får fra src/lerret/tekster
T(s) {
const t = this.props && this.props.tekster;
return (t && t[s]) || s;
}

render() {
const v = this.renderVals();
const T = (s) => this.T(s);
// Lenker til de andre sidene på samme språk
const L = (sti) => localePath(this.props.lang || "nb", sti);
// Enter og mellomrom på klikkbare elementer som ikke er knapper (bare når tasten trykkes på selve elementet,
// ikke på en knapp eller lenke inni det)
const tast = (f) => (e) => { if (e.target !== e.currentTarget) return; if (e.key === "Enter" || e.key === " ") { e.preventDefault(); f(e); } };
return (
<>
    <main className={`page-home ${v.heroKlasse}`}>
      {" "}
      <section className="hero hx hero-forsok">
        {" "}
        <div className="wrap">
          {" "}
          <h1>
            <svg className="hx-vinker" viewBox="0 0 344 334" fill="none" aria-hidden="true">
              <g className="hx-vinkearm">
                <path d="M276 124.665L300.31 119.939C312.998 117.473 322.158 106.361 322.158 93.4354L322.158 50.9799" stroke="#93BBFF" strokeWidth="9" strokeLinecap="round">
                </path>
              </g>
              <path d="M30.4512 194.5L30.4525 153.738C30.453 138.826 42.5412 126.738 57.4525 126.738L89.9535 126.738" stroke="#93BBFF" strokeWidth="9" strokeLinecap="round">
              </path>
              <path d="M212.5 224L219.4 287V316.5" stroke="#93BBFF" strokeWidth="10" strokeLinecap="round">
              </path>
              <path d="M151.469 217L144.9 289.5V320.438" stroke="#93BBFF" strokeWidth="10" strokeLinecap="round">
              </path>
              <ellipse cx="145.09" cy="324.92" rx="25.8" ry="8.1" fill="#93BBFF">
              </ellipse>
              <ellipse cx="219.09" cy="324.49" rx="25.8" ry="8.1" fill="#93BBFF">
              </ellipse>
              <path d="M283.332 59.5811V184.834L179.81 243.972L76.2871 184.834V59.5811L179.81 0.444336L283.332 59.5811Z" fill="#93BBFF">
              </path>
              <circle cx="179.809" cy="122.209" r="37.9" fill="#FAF7F2">
              </circle>
            </svg>
            {" "}{T("Verkstedprogrammet uten dobbeltarbeid")}
          </h1>
          {" "}
          <p className="lead">
            {T("Ordre, booking, mekanikerportal og faktura i ett program.")}
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
      </section>
      {" "}
      <div className={v.vhRot} ref={v.settVh}>
        {" "}
        <section className="vh-flyt" aria-label={T("Slik går en jobb gjennom Verkstedpakken")}>
          {" "}
          <div className="vh-wrap">
            {" "}
            <ol className="vh-sr">
              {" "}
              <li>
                {T("Kunden sender forespørsel, døgnet rundt. Skiltnummer og hva som skal gjøres. Også når verkstedet er stengt.")}
              </li>
              {" "}
              <li>
                {T("Forespørselen lander rett på tavla. Du ser den med en gang, sammen med alt annet som er på gang i verkstedet.")}
              </li>
              {" "}
              <li>
                {T("Delene hentes rett inn i tilbudet. Pris og lagerstatus kommer fra grossisten. Kunden får tilbudet på SMS og godtar med ett trykk.")}
              </li>
              {" "}
              <li>
                {T("Mekanikeren stempler. Kunden følger bilen. Tiden havner rett på ordrelinjen, og kunden ser selv når bilen er klar.")}
              </li>
              {" "}
              <li>
                {T("Kunden betaler i kassen, eller får faktura. Rett fra ordren. Ingen taster beløpet inn på nytt.")}
              </li>
              {" "}
              <li>
                {T("Alt går rett i regnskapet. Ingen dobbeltføring. Bilagene er klare for revisor.")}
              </li>
              {" "}
            </ol>
            {" "}
            <div className="vh-spor">
              {" "}
              <div className="vh-feste">
                {" "}
                <div className="vh-panel">
                  {" "}
                  <div className="vh-tekster" aria-hidden="true">
                    {" "}
                    <div className="vh-t t0">
                      {" "}
                      <h3 className="vh-tt">
                        {T("Kunden sender forespørsel, døgnet rundt.")}
                      </h3>
                      {" "}
                      <p className="vh-tp">
                        {T("Skiltnummer og hva som skal gjøres. Også når verkstedet er stengt.")}
                      </p>
                      {" "}
                    </div>
                    {" "}
                    <div className="vh-t t1">
                      {" "}
                      <h3 className="vh-tt">
                        {T("Forespørselen lander rett på tavla.")}
                      </h3>
                      {" "}
                      <p className="vh-tp">
                        {T("Du ser den med en gang, sammen med alt annet som er på gang i verkstedet.")}
                      </p>
                      {" "}
                    </div>
                    {" "}
                    <div className="vh-t t2">
                      {" "}
                      <h3 className="vh-tt">
                        {T("Delene hentes rett inn i tilbudet.")}
                      </h3>
                      {" "}
                      <p className="vh-tp">
                        {T("Pris og lagerstatus kommer fra grossisten. Kunden får tilbudet på SMS og godtar med ett trykk.")}
                      </p>
                      {" "}
                    </div>
                    {" "}
                    <div className="vh-t t3">
                      {" "}
                      <h3 className="vh-tt">
                        {T("Mekanikeren stempler. Kunden følger bilen.")}
                      </h3>
                      {" "}
                      <p className="vh-tp">
                        {T("Tiden havner rett på ordrelinjen, og kunden ser selv når bilen er klar.")}
                      </p>
                      {" "}
                    </div>
                    {" "}
                    <div className="vh-t t4">
                      {" "}
                      <h3 className="vh-tt">
                        {T("Kunden betaler i kassen, eller får faktura.")}
                      </h3>
                      {" "}
                      <p className="vh-tp">
                        {T("Rett fra ordren. Ingen taster beløpet inn på nytt.")}
                      </p>
                      {" "}
                    </div>
                    {" "}
                    <div className="vh-t t5">
                      {" "}
                      <h3 className="vh-tt">
                        {T("Alt går rett i regnskapet.")}
                      </h3>
                      {" "}
                      <p className="vh-tp">
                        {T("Ingen dobbeltføring. Bilagene er klare for revisor.")}
                      </p>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div className="vh-bilde" aria-hidden="true">
                    {" "}
                    <div className="vh-akt">
                      {" "}
                      <svg viewBox="-30 -84 430 418" fill="none">
                        {" "}
                        <g className="a-fig">
                          {" "}
                          <path d="M30.4512 194.5L30.4525 153.738C30.453 138.826 42.5412 126.738 57.4525 126.738L89.9535 126.738" stroke="#93BBFF" strokeWidth="9" strokeLinecap="round">
                          </path>
                          {" "}
                          <g className="a-h">
                            {" "}
                            <path d="M276 124.665L300.31 119.939C312.998 117.473 322.158 106.361 322.158 93.4354L322.158 50.9799" stroke="#93BBFF" strokeWidth="9" strokeLinecap="round">
                            </path>
                            {" "}
                            <g className="a-p p-eske">
                              <g className="a-stor">
                                <rect x="296" y="4" width="54" height="46" rx="7" fill="#FFFFFF" stroke="#0C005A" strokeWidth="5">
                                </rect>
                                <path d="M296 21H350" stroke="#0C005A" strokeWidth="4">
                                </path>
                                <path d="M323 4V21" stroke="#0C005A" strokeWidth="4">
                                </path>
                              </g>
                            </g>
                            {" "}
                            <g className="a-p p-nokkel">
                              <g className="a-stor">
                                <rect x="317" y="-8" width="10" height="66" rx="5" fill="#0C005A">
                                </rect>
                                <path d="M307 -16A15 15 0 0 0 337 -16L337 -30L329 -30L329 -18A7 7 0 0 1 315 -18L315 -30L307 -30Z" fill="#0C005A">
                                </path>
                              </g>
                            </g>
                            {" "}
                            <g className="a-p p-kort">
                              <g className="a-stor">
                                <rect x="292" y="10" width="66" height="42" rx="8" fill="#FFFFFF" stroke="#0C005A" strokeWidth="5">
                                </rect>
                                <rect x="302" y="20" width="14" height="10" rx="2.5" stroke="#0C005A" strokeWidth="3">
                                </rect>
                                <path d="M302 41H348" stroke="#0C005A" strokeWidth="4" strokeLinecap="round">
                                </path>
                              </g>
                            </g>
                            {" "}
                            <g className="a-p p-stempel">
                              <g className="a-stor">
                                <rect x="300" y="8" width="46" height="8" rx="2" fill="#2F7D4E">
                                </rect>
                                <rect x="297" y="15" width="52" height="26" rx="6" fill="#0C005A">
                                </rect>
                                <rect x="309" y="24" width="28" height="5" rx="2.5" fill="#FFFFFF" opacity="0.55">
                                </rect>
                                <rect x="305" y="40" width="36" height="11" rx="5.5" fill="#2D2372">
                                </rect>
                              </g>
                            </g>
                            {" "}
                          </g>
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
                          <g className="a-lue">
                            <path d="M96 44L170 -66L262 40C210 14 150 14 96 44Z" fill="#0C005A">
                            </path>
                            <circle cx="170" cy="-66" r="15" fill="#FAF7F2" stroke="#0C005A" strokeWidth="5">
                            </circle>
                          </g>
                          {" "}
                        </g>
                        {" "}
                        <g className="a-zzz">
                          <path d="M300 -8H322L300 18H322" stroke="#0C005A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                          </path>
                          <path d="M334 -44H352L334 -22H352" stroke="#0C005A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                          </path>
                          <path d="M362 -74H376L362 -57H376" stroke="#0C005A" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                          </path>
                        </g>
                        {" "}
                      </svg>
                      {" "}
                    </div>
                    {" "}
                    <div className="vh-s s0">
                      {" "}
                      <div className="f-klokke">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z">
                          </path>
                        </svg>
                        {T("Kl. 22:41 · verkstedet er stengt")}
                      </div>
                      {" "}
                      <div className="f-tlf ekte dev">
                        {" "}
                        <div className="f-oy">
                        </div>
                        {" "}
                        <div className="f-liten">
                          {T("Ditt verksted")}
                        </div>
                        {" "}
                        <div className="f-tittel">
                          {T("Send forespørsel")}
                        </div>
                        {" "}
                        <div className="f-rad r1">
                          <span className="f-skilt">
                            {T("EK 48213")}
                          </span>
                          {T("Tesla Model 3")}
                        </div>
                        {" "}
                        <div className="f-rad r2">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z">
                            </path>
                          </svg>
                          {T("Service")}
                        </div>
                        {" "}
                        <div className="f-rad r3">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2">
                            </rect>
                            <path d="M16 2v4">
                            </path>
                            <path d="M8 2v4">
                            </path>
                            <path d="M3 10h18">
                            </path>
                          </svg>
                          {T("Tor 15. okt, 08:00")}
                        </div>
                        {" "}
                        <div className="f-melding f-tomt">
                        </div>
                        {" "}
                        <div className="f-tlf-bunn">
                          {" "}
                          <div className="f-knapp f-trykk" role="button" onClick={v.spillAv} tabIndex={0} onKeyDown={tast(v.spillAv)}>
                            <span className="for">
                              {T("Send forespørsel")}
                            </span>
                            <span className="etter">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5">
                                </path>
                              </svg>
                              {T("Forespørsel sendt")}
                            </span>
                          </div>
                          {" "}
                          <div className="f-under">
                            {T("Tilbud kommer på SMS")}
                          </div>
                          {" "}
                        </div>
                        {" "}
                        <div className="f-hjem">
                        </div>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <div className="vh-s s1">
                      {" "}
                      <div className="f-skjerm dev">
                        {" "}
                        <div className="f-skjerm-topp">
                          <svg className="f-hex" viewBox="76 0 207.6 244.4">
                            <path d="M283.332 59.5811V184.834L179.81 243.972L76.2871 184.834V59.5811L179.81 0.444336L283.332 59.5811Z" fill="#93BBFF">
                            </path>
                            <circle cx="179.809" cy="122.209" r="37.9" fill="#FAF7F2">
                            </circle>
                          </svg>
                          {T("Tavle")}
                          <span className="f-varsel">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M10.268 21a2 2 0 0 0 3.464 0">
                              </path>
                              <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326">
                              </path>
                            </svg>
                            {T("Ny forespørsel")}
                          </span>
                        </div>
                        {" "}
                        <div className="f-kol">
                          {" "}
                          <div>
                            <div className="f-kolnavn">
                              <i>
                              </i>
                              {T("Forespørsel")}
                            </div>
                            <div className="f-jobb">
                              {T("EK 48213")}
                              <small>
                                {T("Tesla Model 3 · Service")}
                              </small>
                            </div>
                            <div className="f-tomt">
                            </div>
                          </div>
                          {" "}
                          <div>
                            <div className="f-kolnavn">
                              <i className="k-tilbud">
                              </i>
                              {T("Tilbud")}
                            </div>
                            <div className="f-tomt">
                            </div>
                            <div className="f-tomt">
                            </div>
                          </div>
                          {" "}
                          <div>
                            <div className="f-kolnavn">
                              <i className="k-gaar">
                              </i>
                              {T("Pågår")}
                            </div>
                            <div className="f-tomt">
                            </div>
                            <div className="f-tomt">
                            </div>
                          </div>
                          {" "}
                        </div>
                        {" "}
                      </div>
                      {" "}
                      <div className="f-hals">
                      </div>
                      {" "}
                      <div className="f-fot">
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <div className="vh-s s2">
                      {" "}
                      <div className="f-kort dev">
                        {" "}
                        <div className="f-kort-topp">
                          <div className="f-tittel">
                            {T("Tilbud")}
                          </div>
                          <span>
                            {T("EK 48213 · Tesla Model 3")}
                          </span>
                        </div>
                        {" "}
                        <div className="f-lin">
                          <span>
                            {T("Service")}
                          </span>
                          <span>
                            {T("2 490 kr")}
                          </span>
                        </div>
                        {" "}
                        <div className="f-lin ny l1">
                          <span>
                            {T("Bremseklosser foran")}
                          </span>
                          <span>
                            {T("1 190 kr")}
                          </span>
                        </div>
                        {" "}
                        <div className="f-lin ny l2">
                          <span>
                            {T("Montering")}
                          </span>
                          <span>
                            {T("700 kr")}
                          </span>
                        </div>
                        {" "}
                        <div className="f-sum">
                          <span>
                            {T("Sum")}
                          </span>
                          <span className="f-bytte">
                            <i className="a">
                              {T("2 490 kr")}
                            </i>
                            <i className="b">
                              {T("3 680 kr")}
                            </i>
                            <i className="c">
                              {T("4 380 kr")}
                            </i>
                          </span>
                        </div>
                        {" "}
                      </div>
                      {" "}
                      <div className="f-pille">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5">
                          </path>
                        </svg>
                        {T("Sendt til kunden på SMS")}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <div className="vh-s s3">
                      {" "}
                      <div className="f-pille kun-smal">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5">
                          </path>
                        </svg>
                        {T("Mekanikeren har stemplet inn · 00:42")}
                      </div>
                      {" "}
                      <div className="f-tlf ekte liten dev kun-bred">
                        {" "}
                        <div className="f-oy">
                        </div>
                        {" "}
                        <div className="f-tittel">
                          {T("Mine jobber")}
                        </div>
                        {" "}
                        <div className="f-aktiv">
                          <span className="f-skilt">
                            {T("EK 48213")}
                          </span>
                          <small>
                            {T("Service og bremser")}
                          </small>
                          <span className="f-tid">
                            <i>
                            </i>
                            00:42
                          </span>
                        </div>
                        {" "}
                        <div className="f-tomt">
                        </div>
                        {" "}
                        <div className="f-tomt">
                        </div>
                        {" "}
                        <div className="f-tomt">
                        </div>
                        {" "}
                        <div className="f-tlf-bunn">
                          {" "}
                          <div className="f-knapp lys">
                            <span>
                              {T("Stemple ut")}
                            </span>
                          </div>
                          {" "}
                          <div className="f-hjem">
                          </div>
                          {" "}
                        </div>
                        {" "}
                      </div>
                      {" "}
                      <div className="f-status dev">
                        {" "}
                        <div className="f-liten">
                          {T("Følg bilen")}
                        </div>
                        {" "}
                        <div className="f-tittel">
                          {T("Tesla Model 3")}
                        </div>
                        {" "}
                        <ol className="f-steg">
                          {" "}
                          <li>
                            <i>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5">
                                </path>
                              </svg>
                            </i>
                            {T("Bekreftet")}
                          </li>
                          {" "}
                          <li>
                            <i>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5">
                                </path>
                              </svg>
                            </i>
                            {T("Mottatt")}
                          </li>
                          {" "}
                          <li className="g3">
                            <i>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5">
                                </path>
                              </svg>
                            </i>
                            {T("Pågår")}
                          </li>
                          {" "}
                          <li className="g4">
                            <i>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5">
                                </path>
                              </svg>
                            </i>
                            {T("Klar")}
                          </li>
                          {" "}
                        </ol>
                        {" "}
                        <div className="f-klar">
                          {T("Bilen er klar for henting")}
                        </div>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <div className="vh-s s4">
                      {" "}
                      <div className="f-term dev">
                        {" "}
                        <div className="f-term-skjerm">
                          <div className="f-belop">
                            {T("4 380 kr")}
                          </div>
                          <div className="f-godkjent">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                            {T("Godkjent")}
                          </div>
                        </div>
                        {" "}
                        <img className="f-susoft" src="/design/logos/susoft.png" alt="" loading="lazy" decoding="async" />
                        {" "}
                        <div className="f-taster">
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                          <i>
                          </i>
                        </div>
                        {" "}
                      </div>
                      {" "}
                      <div className="f-eller kun-bred">
                        {T("eller")}
                      </div>
                      {" "}
                      <div className="f-faktura dev kun-bred">
                        {" "}
                        <div className="f-liten">
                          {T("Faktura 10482")}
                        </div>
                        {" "}
                        <div className="f-belop2">
                          {T("4 380 kr")}
                        </div>
                        {" "}
                        <div className="f-lin">
                          <span>
                            {T("Service og bremser")}
                          </span>
                          <span>
                          </span>
                        </div>
                        {" "}
                        <div className="f-lin">
                          <span>
                            {T("Forfall")}
                          </span>
                          <span>
                            {T("29. okt")}
                          </span>
                        </div>
                        {" "}
                        <div className="f-pille">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5">
                            </path>
                          </svg>
                          {T("Sendt på e-post")}
                        </div>
                        {" "}
                      </div>
                      {" "}
                      <div className="f-pille kun-smal">
                        {T("Eller faktura rett fra ordren")}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <div className="vh-s s5">
                      {" "}
                      <div className="f-bilag dev">
                        {" "}
                        <div className="f-liten">
                          {T("Faktura 10482")}
                        </div>
                        {" "}
                        <div className="f-lin">
                          <span>
                            {T("Service")}
                          </span>
                          <span>
                            2 490
                          </span>
                        </div>
                        {" "}
                        <div className="f-lin">
                          <span>
                            {T("Bremseklosser")}
                          </span>
                          <span>
                            1 190
                          </span>
                        </div>
                        {" "}
                        <div className="f-lin">
                          <span>
                            {T("Montering")}
                          </span>
                          <span>
                            700
                          </span>
                        </div>
                        {" "}
                        <div className="f-sum">
                          <span>
                            {T("Sum")}
                          </span>
                          <span>
                            {T("4 380 kr")}
                          </span>
                        </div>
                        {" "}
                        <div className="f-stempel">
                          {T("Bokført")}
                        </div>
                        {" "}
                      </div>
                      {" "}
                      <div className="f-ror kun-bred">
                        <i>
                        </i>
                        <svg className="f-hex" viewBox="76 0 207.6 244.4">
                          <path d="M283.332 59.5811V184.834L179.81 243.972L76.2871 184.834V59.5811L179.81 0.444336L283.332 59.5811Z" fill="#93BBFF">
                          </path>
                          <circle cx="179.809" cy="122.209" r="37.9" fill="#FAF7F2">
                          </circle>
                        </svg>
                        <i>
                        </i>
                      </div>
                      {" "}
                      <div className="f-regn f-regn-en">
                        {" "}
                        <div className="f-regnlogo g1">
                          <span className="f-regnrull">
                            <img className="rr0" src="/design/logos/tripletex.png" alt="" loading="lazy" decoding="async" />
                            <img className="rr1" src="/design/logos/fiken.svg" alt="" loading="lazy" decoding="async" />
                            <img className="rr2" src="/design/logos/poweroffice.png" alt="" loading="lazy" decoding="async" />
                            <img className="rr3" src="/design/logos/visma-eaccounting.png" alt="" loading="lazy" decoding="async" />
                            <img className="rr4" src="/design/logos/finago.png" alt="" loading="lazy" decoding="async" />
                            <img className="rr5" src="/design/logos/visma-business-nxt.svg" alt="" loading="lazy" decoding="async" />
                            <img className="rr6" src="/design/logos/conta.svg" alt="" loading="lazy" decoding="async" />
                            <img className="rr7" src="/design/logos/unimicro.svg" alt="" loading="lazy" decoding="async" />
                            <img className="rr8" src="/design/logos/systima.png" alt="" loading="lazy" decoding="async" />
                            <img className="rr9" src="/design/logos/visma-enterprise.svg" alt="" loading="lazy" decoding="async" />
                            <img className="rr10" src="/design/logos/sparebank1.svg" alt="" loading="lazy" decoding="async" />
                            <img className="rr11" src="/design/logos/dnb.svg" alt="" loading="lazy" decoding="async" />
                          </span>
                          <span className="f-hake">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                        </div>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <button type="button" className="vh-pause" onClick={v.vekslePause} aria-label={v.pauseNavn}>
                    {" "}
                    <svg className="stopp" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                      <path d="M8 5v14">
                      </path>
                      <path d="M16 5v14">
                      </path>
                    </svg>
                    {" "}
                    <svg className="spill" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M7 4.5v15l12-7.5z">
                      </path>
                    </svg>
                    {" "}
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
        </section>
        {" "}
        <section className="vh-museum" aria-label={T("Rotet Verkstedpakken rydder opp i")}>
          {" "}
          <div className="vh-wrap">
            {" "}
            <div className="m-idag">
              {" "}
              <p className="m-bytt">
                <b className="m-spm">
                  {T("Prøv før du bytter")}
                </b>
                {" "}{T("Bytter du fra et annet program, er Verkstedpakken gratis i oppsigelsestiden på det gamle, inntil 3 måneder.")}
              </p>
              {" "}
              <div className="m-cta">
                <a className="vh-knapp" href={SIGNUP_URL}>
                  {T("Prøv gratis i 14 dager")}
                </a>
                <span>
                  {T("I gang på få minutter.")}
                </span>
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section className="vh-integ" aria-label={T("Integrasjoner")}>
          {" "}
          <div className="vh-wrap">
            {" "}
            <div className="vh-hode">
              {" "}
              <h2 className="vh-h2">
                {T("Hele 30 integrasjoner.")}
              </h2>
              {" "}
              <p className="i-ingress">
                {T("Regnskap, deler, kasse, EU-kontroll og AI.")}
              </p>
              {" "}
            </div>
            {" "}
            <p className="vh-sr">
              {T("Verkstedpakken kobles til Tripletex, Fiken, MEKO, PowerOffice GO, Statens vegvesen, Visma eAccounting, MECA, ChatGPT, BilXtra, 24SevenOffice, Susoft, HaynesPro, Conta, Unimicro, PKK Huset, Systima, Bildeler.no, Visma Business NXT, Norsk Bildelkatalog, T-PRO, AutoFrontal, Flak, macsData, Visma Enterprise, Gemini, Romnes, SpareBank 1 Regnskap, BUS, Claude og DNB Regnskap.")}
            </p>
            {" "}
            <div className="i-scene" aria-hidden="true">
              {" "}
              <div className="i-ring">
                {" "}
                <i className="i-b ix0">
                  <img src="/design/logos/tripletex.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix1">
                  <img src="/design/logos/fiken.svg" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix2">
                  <img src="/design/logos/meko.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix3">
                  <img src="/design/logos/poweroffice.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix4">
                  <img src="/design/logos/statens-vegvesen.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix5">
                  <img src="/design/logos/visma-eaccounting.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix6">
                  <img src="/design/logos/meca.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix7">
                  <img src="/design/logos/chatgpt.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix8">
                  <img src="/design/logos/bilxtra.svg" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix9">
                  <img src="/design/logos/finago.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix10">
                  <img src="/design/logos/susoft.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix11">
                  <img src="/design/logos/haynespro.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix12">
                  <img src="/design/logos/conta.svg" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix13">
                  <img src="/design/logos/unimicro.svg" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix14">
                  <img src="/design/logos/pkkhuset.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix15">
                  <img src="/design/logos/systima.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix16">
                  <img src="/design/logos/bildeler.svg" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix17">
                  <img src="/design/logos/visma-business-nxt.svg" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix18">
                  <img src="/design/logos/norskbildelkatalog.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix19">
                  <img src="/design/logos/t-pro.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix20">
                  <img src="/design/logos/autofrontal.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix21">
                  <img src="/design/logos/flak.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix22">
                  <img src="/design/logos/macsdata.svg" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix23">
                  <img src="/design/logos/visma-enterprise.svg" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix24">
                  <img src="/design/logos/gemini.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix25">
                  <img src="/design/logos/romnes.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix26">
                  <img src="/design/logos/sparebank1.svg" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix27">
                  <img src="/design/logos/bus.png" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix28">
                  <img src="/design/logos/claude.svg" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
                <i className="i-b ix29">
                  <img src="/design/logos/dnb.svg" alt="" loading="lazy" decoding="async" />
                </i>
                {" "}
              </div>
              {" "}
              <div className="i-muttern">
                {" "}
                <svg viewBox="20 -4 320 342" fill="none">
                  {" "}
                  <g className="i-arm v">
                    <path d="M30.4512 194.5L30.4525 153.738C30.453 138.826 42.5412 126.738 57.4525 126.738L89.9535 126.738" stroke="#93BBFF" strokeWidth="9" strokeLinecap="round">
                    </path>
                  </g>
                  {" "}
                  <g className="i-arm h">
                    <path d="M329.15 194.5L329.15 153.738C329.15 138.826 317.06 126.738 302.15 126.738L269.65 126.738" stroke="#93BBFF" strokeWidth="9" strokeLinecap="round">
                    </path>
                  </g>
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
                </svg>
                {" "}
              </div>
              {" "}
              <div className="i-navn">
                {" "}
                <span className="i-n ix0">
                  <b>
                    {T("Tripletex")}
                  </b>
                  <small>
                    {T("Regnskap")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix1">
                  <b>
                    {T("Fiken")}
                  </b>
                  <small>
                    {T("Regnskap")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix2">
                  <b>
                    {T("MEKO")}
                  </b>
                  <small>
                    {T("Deler")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix3">
                  <b>
                    {T("PowerOffice GO")}
                  </b>
                  <small>
                    {T("Regnskap")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix4">
                  <b>
                    {T("Statens vegvesen")}
                  </b>
                  <small>
                    {T("Kjøretøydata")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix5">
                  <b>
                    {T("Visma eAccounting")}
                  </b>
                  <small>
                    {T("Regnskap")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix6">
                  <b>
                    {T("MECA")}
                  </b>
                  <small>
                    {T("Deler")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix7">
                  <b>
                    {T("ChatGPT")}
                  </b>
                  <small>
                    {T("AI")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix8">
                  <b>
                    {T("BilXtra")}
                  </b>
                  <small>
                    {T("Deler")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix9">
                  <b>
                    {T("24SevenOffice")}
                  </b>
                  <small>
                    {T("Regnskap")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix10">
                  <b>
                    {T("Susoft")}
                  </b>
                  <small>
                    {T("Betaling")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix11">
                  <b>
                    {T("HaynesPro")}
                  </b>
                  <small>
                    {T("Kjøretøydata")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix12">
                  <b>
                    {T("Conta")}
                  </b>
                  <small>
                    {T("Regnskap")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix13">
                  <b>
                    {T("Unimicro")}
                  </b>
                  <small>
                    {T("Regnskap")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix14">
                  <b>
                    {T("PKK Huset")}
                  </b>
                  <small>
                    {T("Kjøretøydata")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix15">
                  <b>
                    {T("Systima")}
                  </b>
                  <small>
                    {T("Regnskap")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix16">
                  <b>
                    {T("Bildeler.no")}
                  </b>
                  <small>
                    {T("Deler")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix17">
                  <b>
                    {T("Visma Business NXT")}
                  </b>
                  <small>
                    {T("Regnskap")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix18">
                  <b>
                    {T("Norsk Bildelkatalog")}
                  </b>
                  <small>
                    {T("Deler")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix19">
                  <b>
                    {T("T-PRO")}
                  </b>
                  <small>
                    {T("Deler")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix20">
                  <b>
                    {T("AutoFrontal")}
                  </b>
                  <small>
                    {T("Kjøretøydata")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix21">
                  <b>
                    {T("Flak")}
                  </b>
                  <small>
                    {T("Deler")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix22">
                  <b>
                    {T("macsData")}
                  </b>
                  <small>
                    {T("Kjøretøydata")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix23">
                  <b>
                    {T("Visma Enterprise")}
                  </b>
                  <small>
                    {T("Regnskap")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix24">
                  <b>
                    {T("Gemini")}
                  </b>
                  <small>
                    {T("AI")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix25">
                  <b>
                    {T("Romnes")}
                  </b>
                  <small>
                    {T("Deler")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix26">
                  <b>
                    {T("SpareBank 1 Regnskap")}
                  </b>
                  <small>
                    {T("Regnskap")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix27">
                  <b>
                    {T("BUS")}
                  </b>
                  <small>
                    {T("Kjøretøydata")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix28">
                  <b>
                    {T("Claude")}
                  </b>
                  <small>
                    {T("AI")}
                  </small>
                </span>
                {" "}
                <span className="i-n ix29">
                  <b>
                    {T("DNB Regnskap")}
                  </b>
                  <small>
                    {T("Regnskap")}
                  </small>
                </span>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <p className="i-lenke-rad">
              <a className="i-lenke" href={L("/integrasjoner")}>
                {T("Tjenester du kan koble til")}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  </path>
                </svg>
              </a>
            </p>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section className="vh-pris" aria-label={T("Pris")}>
          {" "}
          <div className="vh-wrap">
            {" "}
            <div className="p-felt">
              {" "}
              <h2 className="vh-h2">
                {T("Fast pris, ingen overraskelser.")}
              </h2>
              {" "}
              <div className="p3-rad">
                {" "}
                <article className="p3 p3-support">
                  {" "}
                  <div className="p3-vis" aria-hidden="true">
                    <div className="p3-prat">
                      <span className="kunde">
                        {T("Hvordan sender jeg et tilbud?")}
                      </span>
                      <span className="oss">
                        {T("Jeg viser deg! Åpne ordren og trykk «Send tilbud».")}
                      </span>
                      <small>
                        {T("Svar fra et menneske hos Verkstedpakken")}
                      </small>
                    </div>
                  </div>
                  {" "}
                  <h3>
                    {T("Gratis support")}
                  </h3>
                  {" "}
                  <p>
                    {T("Det er alltid et menneske som svarer, og du får aldri faktura for hjelp.")}
                  </p>
                  {" "}
                  <span className="p3-merke">
                    <strong>
                      {T("0,-")}
                    </strong>
                  </span>
                  {" "}
                </article>
                {" "}
                <article className="p3 p3-oppstart">
                  {" "}
                  <div className="p3-vis" aria-hidden="true">
                    <ul className="p3-liste">
                      <li>
                        <i>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5">
                            </path>
                          </svg>
                        </i>
                        {T("Programmet satt opp")}
                      </li>
                      <li>
                        <i>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5">
                            </path>
                          </svg>
                        </i>
                        {T("Regnskap koblet til")}
                      </li>
                      <li>
                        <i>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5">
                            </path>
                          </svg>
                        </i>
                        {T("Kunder og kjøretøy flyttet over")}
                      </li>
                    </ul>
                  </div>
                  {" "}
                  <h3>
                    {T("Gratis oppstart")}
                  </h3>
                  {" "}
                  <p>
                    {T("Vi setter opp programmet, kobler til regnskapet og flytter over det dere har fra før.")}
                  </p>
                  {" "}
                  <span className="p3-merke">
                    <strong>
                      {T("0,-")}
                    </strong>
                  </span>
                  {" "}
                </article>
                {" "}
                <article className="p3 p3-regnskap">
                  {" "}
                  <div className="p3-vis" aria-hidden="true">
                    <div className="p3-logoer">
                      <span className="rl0">
                        <img src="/design/logos/tripletex.png" alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="rl1">
                        <img src="/design/logos/fiken.svg" alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="rl2">
                        <img src="/design/logos/poweroffice.png" alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="rl3">
                        <img src="/design/logos/visma-eaccounting.png" alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="rl4">
                        <img src="/design/logos/finago.png" alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="rl5">
                        <img src="/design/logos/visma-business-nxt.svg" alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="rl6">
                        <img src="/design/logos/conta.svg" alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="rl7">
                        <img src="/design/logos/unimicro.svg" alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="rl8">
                        <img src="/design/logos/systima.png" alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="rl9">
                        <img src="/design/logos/visma-enterprise.svg" alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="rl10">
                        <img src="/design/logos/sparebank1.svg" alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="rl11">
                        <img src="/design/logos/dnb.svg" alt="" loading="lazy" decoding="async" />
                      </span>
                    </div>
                  </div>
                  {" "}
                  <h3>
                    {T("Gratis regnskapsintegrasjon")}
                  </h3>
                  {" "}
                  <p>
                    {T("Fakturaene går rett over i regnskapet. Vi kobler til systemet dere bruker.")}
                  </p>
                  {" "}
                  <span className="p3-merke">
                    <strong>
                      {T("0,-")}
                    </strong>
                  </span>
                  {" "}
                </article>
                {" "}
              </div>
              {" "}
              <a className="p-lenke" href={L("/pris")}>
                {T("Regn ut prisen for ditt verksted")}
              </a>
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
