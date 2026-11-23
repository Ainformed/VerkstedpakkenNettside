"use client";
/* Flyttet fra lerretet (gen/til_react.py). Logikken er den samme som i lerretet: en React-klasse med
   state, setState, componentDidMount og renderVals(); render() viser markeringen med verdiene fra renderVals().
   Bildene står som i lerretet, med størrelsen satt i CSS, derfor vanlige <img> og ikke next/image. */
/* eslint-disable @next/next/no-img-element */
import { Component } from "react";
import "./Pris.css";
import { ADMIN_TRINN, BETALING_MANEDER, BETALING_RABATT, BINDING_RABATT, KODE_OG_PERIODE, MAKS_LISENSER, MAKS_TELLER, MEKANIKER_PRIS, NETTSIDE_PRIS, OPPSLAG_PRIS, finnPris } from "@/lib/pricing";

export default class Pris extends Component {
state = { meny: false, admin: 1, mek: 0, utkastA: null, utkastM: null, binding: 0, betaling: 0, nettside: false, oppslag: false, haynes: false, hella: false, andre: false, kodeApen: false, kode: '', kodeSvar: null, kodeSjekker: false };

klem(n, min, maks) {
if (!Number.isFinite(n)) return min;
return Math.min(maks, Math.max(min, Math.trunc(n)));
}

kr(belop) {
const f = (this.props && this.props.prisformat) || { locale: 'nb-NO', prefix: '', suffix: ',-' };
return f.prefix + new Intl.NumberFormat(f.locale, { maximumFractionDigits: 0 }).format(belop).replace(/\p{Zs}/gu, '\u00a0') + f.suffix;
}

// Tekst på siden sitt språk (nettsiden har T(); på lerretet er alt norsk)
tr(s) {
return typeof this.T === 'function' ? this.T(s) : s;
}

// En lenke med ?kode= (for eksempel fra Moldestuket) fyller ut koden og sjekker den med en gang
componentDidMount() {
let k = '';
try { k = new URLSearchParams(window.location.search).get('kode') || ''; } catch (e) { k = ''; }
k = String(k).toUpperCase().replace(/[^A-Z0-9ÆØÅ_-]/g, '').slice(0, 40);
if (k) { this.setState({ kode: k, kodeApen: true }); this.sjekkKode(k); }
}

// Rabattkoden sjekkes mot appen. Nettsiden gir props.sjekkKode; uten den (på lerretet) blir koden bare med til registreringen.
async sjekkKode(gitt) {
const kode = String(gitt || (this.state && this.state.kode) || '').trim().toUpperCase();
if (!kode) return;
const sjekk = this.props && this.props.sjekkKode;
if (typeof sjekk !== 'function') { this.setState({ kodeSvar: { gyldig: null, kode: kode } }); return; }
this.setState({ kodeSjekker: true });
let svar = null;
try { svar = await sjekk(kode); } catch (e) { svar = null; }
this.setState({ kodeSjekker: false, kodeSvar: Object.assign({ gyldig: null }, svar || {}, { kode: (svar && svar.kode) || kode }) });
}

renderVals() {
const s = this.state || {};
const apen = !!s.meny;
// Prisene står i src/lib/pricing.ts (én plass å endre dem)
const MEK_PRIS = MEKANIKER_PRIS;
const admin = typeof s.admin === 'number' ? s.admin : 1;
const mek = typeof s.mek === 'number' ? s.mek : 0;
const perAdmin = finnPris(ADMIN_TRINN, admin);
// Henriks modell (22.11.2026): bindingstid og betalingsfrekvens hver for seg, i trinn: 1 måned, 6 måneder, 1 år.
// Rabattene legges sammen (opptil 30 %) og gjelder admin og mekaniker, oppå mengderabatten på admin.
// Satsene (BINDING_RABATT, BETALING_RABATT), månedene (BETALING_MANEDER) og regelen for rabattkode sammen med
// rabatten for perioden (KODE_OG_PERIODE) står i src/lib/pricing.ts. Startprisen er første trinn i ADMIN_TRINN.
const ADMIN_START = ADMIN_TRINN[0].pris;
// Trinnene er indekser (0, 1, 2). Betalingen kan ikke være lengre enn bindingen.
const binding = s.binding === 1 || s.binding === 2 ? s.binding : 0;
const betaling = (s.betaling === 1 || s.betaling === 2) && s.betaling <= binding ? s.betaling : 0;
const pPeriode = BINDING_RABATT[binding] + BETALING_RABATT[betaling];
const ant = BETALING_MANEDER[betaling];
const ks = s.kodeSvar;
const kodeOk = !!(ks && ks.gyldig === true);
const pKode = kodeOk && ks.kind === 'percent' ? Math.max(0, Math.min(100, Number(ks.value) || 0)) : 0;
// Som i appen: koden gjelder bare de månedene den varer, og «den største gjelder» sammenligner kronene for hele
// perioden (likt: rabatten for perioden). «Begge»: perioden først, så koden.
const kodeVarer = Math.trunc(Number(ks && ks.duration_months) || 0);
const kodeMnd = pKode > 0 ? (kodeVarer > 0 ? Math.min(ant, kodeVarer) : ant) : 0;
// Tillegg med fast månedspris (21.11.2026): nettside 495,-, kjøretøyoppslag med eieropplysninger 235,-
const NETTSIDE = NETTSIDE_PRIS, OPPSLAG = OPPSLAG_PRIS;
const tN = !!s.nettside, tO = !!s.oppslag, tH = !!s.haynes, tG = !!s.hella;
const antValgt = [tN, tO, tH, tG].filter(Boolean).length;
// Prisen per lisens etter rabatt rundes til hele kroner, som Henriks beregnPris: 1 295 med 30 % blir 907
const etter = (pris, p) => Math.round(pris * (100 - p) / 100);
const full = (pris) => pris;
const medPeriode = (pris) => etter(pris, pPeriode);
const medKode = (pris) => etter(pris, pKode);
const medBegge = (pris) => etter(etter(pris, pPeriode), pKode);
const perMnd = (f) => admin * f(perAdmin) + mek * f(MEK_PRIS);
const dPeriode = ant * (perMnd(full) - perMnd(medPeriode));
const dKode = kodeMnd * (perMnd(full) - perMnd(medKode));
const valgt = KODE_OG_PERIODE === 'begge'
  ? (dPeriode > 0 && kodeMnd > 0 && perMnd(medBegge) < perMnd(medPeriode) ? 'begge' : dPeriode > 0 ? 'periode' : dKode > 0 ? 'kode' : 'ingen')
  : (dKode > dPeriode ? 'kode' : dPeriode > 0 ? 'periode' : 'ingen');
// Prisen de månedene koden gjelder, og prisen etterpå. Varer koden kortere enn perioden (delvis), står lisensene til
// prisen etter koden, og linjene viser summen for hele perioden.
const iKodetid = valgt === 'kode' ? medKode : valgt === 'begge' ? medBegge : valgt === 'periode' ? medPeriode : full;
const etterpaa = valgt === 'begge' || valgt === 'periode' ? medPeriode : full;
const mndMedKode = valgt === 'kode' || valgt === 'begge' ? kodeMnd : ant;
const delvis = mndMedKode < ant;
const linjeSum = (antall, pris) => antall * (iKodetid(pris) * mndMedKode + etterpaa(pris) * (ant - mndMedKode));
const aR = delvis ? etterpaa(perAdmin) : iKodetid(perAdmin), mR = delvis ? etterpaa(MEK_PRIS) : iKodetid(MEK_PRIS);
const lisens = linjeSum(admin, perAdmin) + linjeSum(mek, MEK_PRIS);
const total = lisens + ((tN ? NETTSIDE : 0) + (tO ? OPPSLAG : 0)) * ant;
// Henriks visning: alt måles mot startprisen (1 295 per admin, 595 per mekaniker), så mengderabatten teller med.
// Prosentene rundes til nærmeste halve og skrives med språkets desimaltegn («7,5»).
const startSum = (admin * ADMIN_START + mek * MEK_PRIS) * ant;
const spart = startSum - lisens;
const halv = (start, ny) => (start === 0 ? 0 : Math.round(((start - ny) / start) * 200) / 2);
const loc = (this.props && this.props.prisformat && this.props.prisformat.locale) || 'nb-NO';
const pstTekst = (v) => new Intl.NumberFormat(loc, { maximumFractionDigits: 1 }).format(v);
const over = admin + mek > MAKS_LISENSER;
const tall = (e) => String(e.target.value || '').replace(/[^0-9]/g, '');
const mnd = ant > 1 ? ' × ' + ant + ' ' + this.tr('mnd') : '';
// Lenken til registreringen tar med valgene og koden, så appen kan fylle ut bestillingen
const till = [tN && 'nettside', tO && 'oppslag', tH && 'haynes', tG && 'hella'].filter(Boolean);
const kodeMed = ks && ks.gyldig !== false && ks.kode ? ks.kode : '';
const base = (this.props && this.props.signupUrl) || '#topp';
const q = [];
if (binding !== 0) q.push('binding=' + BETALING_MANEDER[binding]);
if (betaling !== 0) q.push('betaling=' + ant);
if (admin !== 1) q.push('admin=' + admin);
if (mek > 0) q.push('mek=' + mek);
if (till.length) q.push('tillegg=' + till.join(','));
if (kodeMed) q.push('kode=' + encodeURIComponent(kodeMed));
const lenke = base === '#topp' || !q.length ? base : base + '?' + q.join('&');
const GRUNN = { utlopt: 'Koden har gått ut.', brukt_opp: 'Koden er brukt opp.', inaktiv: 'Koden er ikke aktiv.' };
const kodeSvar = s.kodeSjekker ? this.tr('Sjekker koden …') : !ks ? '' : ks.gyldig === true ? (ks.kind === 'percent'
? this.tr('Koden {kode} gir {p} % rabatt på lisensene.').replace('{kode}', ks.kode).replace('{p}', pKode)
  + (ks.duration_months ? ' ' + this.tr('Rabatten varer i {n} måneder.').replace('{n}', ks.duration_months) : '')
  + (KODE_OG_PERIODE === 'storste' && pKode > 0 && valgt === 'periode' ? ' ' + this.tr('Rabatten for binding er større, så den gjelder.') : '')
: this.tr('Koden {kode} gjelder. Prisen med koden ser dere når dere bestiller.').replace('{kode}', ks.kode))
: ks.gyldig === false ? this.tr(GRUNN[ks.grunn] || 'Fant ingen kode med det navnet.')
: this.tr('Koden blir med når dere registrerer dere, og sjekkes der.');
return {
skrift: this.props && this.props.tiltenktSkrift ? 'vp-inter' : '',
menyApen: apen,
menyKlasse: apen ? 'open' : '',
apneMeny: () => this.setState({ meny: true }),
lukkMeny: () => this.setState({ meny: false }),
// Til tilbudsskjemaet over 10 lisenser
antAdmin: admin,
antMek: mek,
valgBinding: BETALING_MANEDER[binding],
valgBetaling: ant,
valgTillegg: till.join(','),
valgKode: kodeMed,
overKlasse: over ? 'over-taket' : '',
total: this.kr(total),
// 21.11.2026: «vis månedspris»: månedsprisen under summen når de betaler for 6 måneder eller 1 år
mndPris: this.kr(Math.round(total / ant)),
mndSkjult: ant === 1 || over ? ' hk-borte' : '',
// Prisen per lisens, med startprisen overstreket når lisensen er billigere, også med mengderabatten (Henrik)
perAdmin: this.kr(aR),
perMek: this.kr(mR),
perAdminFor: this.kr(ADMIN_START),
perMekFor: this.kr(MEK_PRIS),
forSkjultA: aR < ADMIN_START ? '' : ' hk-borte',
forSkjultM: mR < MEK_PRIS ? '' : ' hk-borte',
rabattPstA: this.tr('−{pct} %').replace('{pct}', pstTekst(halv(ADMIN_START, aR))),
rabattPstM: this.tr('−{pct} %').replace('{pct}', pstTekst(halv(MEK_PRIS, mR))),
// Varer koden kortere enn perioden, er prisen ikke lik hver måned: linjen viser bare antall og summen
adminLinje: admin + ' ' + this.tr('admin') + (over ? '' : (delvis ? '' : ' × ' + this.kr(aR)) + mnd),
adminSum: over ? '' : this.kr(linjeSum(admin, perAdmin)),
mekLinje: mek + ' ' + (mek === 1 ? this.tr('mekaniker') : this.tr('mekanikere')) + (over ? '' : (delvis ? '' : ' × ' + this.kr(mR)) + mnd),
mekSum: over ? '' : this.kr(linjeSum(mek, MEK_PRIS)),
mekSkjult: mek > 0 ? '' : 'hk-borte',
perNavn: this.tr(['Per måned', 'Per 6 måneder', 'Per år'][betaling]),
rabattSkjult: spart > 0 && !over ? '' : 'hk-borte',
rabattNavn: this.tr('Du sparer {pct} %').replace('{pct}', pstTekst(halv(startSum, lisens))),
rabatt: '−' + this.kr(spart),
nettsideSkjult: tN && !over ? '' : 'hk-borte',
nettsideLinje: this.tr('Nettside') + mnd,
nettsideSum: this.kr(NETTSIDE * ant),
oppslagSkjult: tO && !over ? '' : 'hk-borte',
oppslagLinje: this.tr('Kjøretøyoppslag') + mnd,
oppslagSum: this.kr(OPPSLAG * ant),
tNettside: tN,
tOppslag: tO,
veksleNettside: () => this.setState({ nettside: !tN }),
veksleOppslag: () => this.setState({ oppslag: !tO }),
haynesSkjult: tH && !over ? '' : 'hk-borte',
hellaSkjult: tG && !over ? '' : 'hk-borte',
tHaynes: tH,
tHella: tG,
veksleHaynes: () => this.setState({ haynes: !tH }),
veksleHella: () => this.setState({ hella: !tG }),
andreApen: !!s.andre,
andreKlasse: s.andre ? 'apen' : '',
andreValgt: antValgt ? antValgt + ' ' + this.tr('valgt') : '',
veksleAndre: () => this.setState({ andre: !s.andre }),
vilkaar: this.tr(['Ingen bindingstid', '6 måneders bindingstid', '1 års bindingstid'][binding]),
// Bindingstid og betaling (Henrik): det som ikke passer med det andre valget er dempet, men kan trykkes; da flyttes
// det andre valget med (årlig betaling gir 1 år binding, 1 måned binding gir månedlig betaling)
b0: binding === 0,
b1: binding === 1,
b2: binding === 2,
b0Demp: betaling > 0 ? ' hk-demp' : '',
b1Demp: betaling > 1 ? ' hk-demp' : '',
b2Demp: '',
p0: betaling === 0,
p1: betaling === 1,
p2: betaling === 2,
p0Demp: '',
p1Demp: binding < 1 ? ' hk-demp' : '',
p2Demp: binding < 2 ? ' hk-demp' : '',
velgB0: () => this.setState({ binding: 0, betaling: 0 }),
velgB1: () => this.setState({ binding: 1, betaling: Math.min(betaling, 1) }),
velgB2: () => this.setState({ binding: 2 }),
velgP0: () => this.setState({ betaling: 0 }),
velgP1: () => this.setState({ betaling: 1, binding: Math.max(binding, 1) }),
velgP2: () => this.setState({ betaling: 2, binding: 2 }),
ctaLenke: lenke,
// Rabattkoden (Oscar 22.11.2026: «inkl rabattkoder»)
kodeKlasse: s.kodeApen || ks || s.kode ? 'apen' : '',
apneKode: () => this.setState({ kodeApen: true }),
kodeVerdi: s.kode || '',
skrivKode: (e) => this.setState({ kode: String(e.target.value || '').toUpperCase().replace(/\s+/g, '').slice(0, 40), kodeSvar: null }),
kodeTast: (e) => { if (e.key === 'Enter') { e.preventDefault(); this.sjekkKode(); } },
brukKode: () => this.sjekkKode(),
kodeBrukAv: !s.kode || !!s.kodeSjekker,
kodeSvar: kodeSvar,
kodeSvarKlasse: kodeOk ? 'hk-ok' : '',
adminVerdi: s.utkastA != null ? s.utkastA : String(admin),
mekVerdi: s.utkastM != null ? s.utkastM : String(mek),
adminMinusAv: admin <= 1,
mekMinusAv: mek <= 0,
merAv: admin + mek >= MAKS_TELLER,
minusAdmin: () => this.setState({ utkastA: null, admin: this.klem(admin - 1, 1, MAKS_TELLER - mek) }),
plussAdmin: () => this.setState({ utkastA: null, admin: this.klem(admin + 1, 1, MAKS_TELLER - mek) }),
minusMek: () => this.setState({ utkastM: null, mek: this.klem(mek - 1, 0, MAKS_TELLER - admin) }),
plussMek: () => this.setState({ utkastM: null, mek: this.klem(mek + 1, 0, MAKS_TELLER - admin) }),
skrivAdmin: (e) => { const t = tall(e); const ny = { utkastA: t }; if (t !== '') ny.admin = this.klem(Number(t), 1, MAKS_TELLER - mek); this.setState(ny); },
skrivMek: (e) => { const t = tall(e); const ny = { utkastM: t }; if (t !== '') ny.mek = this.klem(Number(t), 0, MAKS_TELLER - admin); this.setState(ny); },
ferdigAdmin: () => this.setState({ utkastA: null }),
ferdigMek: () => this.setState({ utkastM: null }),
};
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
    <div className="page-pris">
      {" "}
      <section className="page-sec p-inkl">
        {" "}
        <div className="p-inkl-wrap">
          {" "}
          <div className="sec-title-c">
            {" "}
            <h2>
              {T("Alt dette er gratis")}
            </h2>
            {" "}
          </div>
          {" "}
          <div className="p-kort2 p-kort-bred">
            {" "}
            <article className="p-plan p-plan-inkl">
              {" "}
              <p className="p-plan-navn">
                {T("Gratis")}
              </p>
              {" "}
              <p className="p-plan-pris">
                <b>
                  {T("0,-")}
                </b>
                <span>
                  {T("ekstra per måned")}
                </span>
              </p>
              {" "}
              <div className="p-plan-kol">
                {" "}
                <div className="p-plan-gr">
                  {" "}
                  <h3>
                    {T("I verkstedet")}
                  </h3>
                  {" "}
                  <ul>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Verkstedordre og planlegging")}
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Mekanikerportal")}
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Kiosk og innstempling")}
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Kunder og kjøretøy")}
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Kjøretøyoppslag")}
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Deler og lager")}
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Dekkhotell")}
                      </span>
                    </li>
                    {" "}
                  </ul>
                  {" "}
                </div>
                {" "}
                <div className="p-plan-gr">
                  {" "}
                  <h3>
                    {T("For kundene dine")}
                  </h3>
                  {" "}
                  <ul>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Min garasje")}
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("E-postvarsler og chat")}
                      </span>
                    </li>
                    {" "}
                  </ul>
                  {" "}
                </div>
                {" "}
                <div className="p-plan-gr">
                  {" "}
                  <h3>
                    {T("Penger og regnskap")}
                  </h3>
                  {" "}
                  <ul>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Faktura og betaling")}
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Regnskapsintegrasjon")}
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Timeregistrering og lønnsgrunnlag")}
                      </span>
                    </li>
                    {" "}
                  </ul>
                  {" "}
                </div>
                {" "}
                <div className="p-plan-gr">
                  {" "}
                  <h3>
                    {T("Kom i gang")}
                  </h3>
                  {" "}
                  <ul>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Etablering av programvare")}
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Etablering av regnskapsintegrasjon")}
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Flytting av innhold fra andre programmer")}
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Support og opplæring")}
                      </span>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m5 12 5 5L20 7">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Bytter du fra et annet system?")}
                      </span>
                    </li>
                    {" "}
                  </ul>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </article>
            {" "}
            <article className="p-plan p-plan-till">
              {" "}
              <p className="p-plan-navn">
                {T("Tillegg")}
              </p>
              {" "}
              <p className="p-plan-pris">
                <b>
                  {T("Valgfritt")}
                </b>
              </p>
              {" "}
              <div className="p-plan-kol">
                {" "}
                <div className="p-plan-gr">
                  {" "}
                  <h3>
                    {T("Pris per måned")}
                  </h3>
                  {" "}
                  <ul>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                          <path d="M5 12h14M12 5v14">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Nettside")}
                      </span>
                      <b>
                        {T("495 kr / mnd")}
                      </b>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                          <path d="M5 12h14M12 5v14">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("Kjøretøyoppslag med eieropplysninger")}
                      </span>
                      <b>
                        {T("235 kr / mnd")}
                      </b>
                    </li>
                    {" "}
                  </ul>
                  {" "}
                </div>
                {" "}
                <div className="p-plan-gr">
                  {" "}
                  <h3>
                    {T("Fra andre leverandører")}
                  </h3>
                  {" "}
                  <ul>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                          <path d="M5 12h14M12 5v14">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("HaynesPro")}
                      </span>
                      <b className="p-snart">
                        {T("Etter avtale")}
                      </b>
                    </li>
                    {" "}
                    <li>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                          <path d="M5 12h14M12 5v14">
                          </path>
                        </svg>
                      </i>
                      <span>
                        {T("macsData av Hella Gutmann")}
                      </span>
                      <b className="p-snart">
                        {T("Etter avtale")}
                      </b>
                    </li>
                    {" "}
                  </ul>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <p className="p-plan-note">
                {T("SMS til kunder er bruksbasert: 2 kr per stk. Alle priser er eks. mva.")}
              </p>
              {" "}
            </article>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
      <section className="page-sec" style={{ paddingTop: "20px" }}>
        {" "}
        <div className="faq-wrap">
          {" "}
          <div className="sec-title-c">
            {" "}
            <h2>
              {T("Lurer du på noe?")}
            </h2>
            {" "}
          </div>
          {" "}
          <details className="faq">
            <summary>
              {T("Er det bindingstid?")}
            </summary>
            <div className="faq-body">
              {T("Du velger selv. Standard er én måned, og da kan du si opp når du vil. Velger du 6 måneders bindingstid, får du 7,5 % rabatt. Velger du 1 års bindingstid, får du 15 %. Betaler du i tillegg for 6 måneder, får du 7,5 % til. Betaler du for 1 år, får du 15 % til. Du kan ikke betale for lengre tid enn bindingstiden du har valgt. Høyeste rabatt er 30 %: 1 års bindingstid og betaling for 1 år. Rabatten gjelder både admin og mekaniker.")}
            </div>
          </details>
          {" "}
          <details className="faq">
            <summary>
              {T("Hvordan regnes prisen?")}
            </summary>
            <div className="faq-body">
              {T("Du betaler 1 295,- per admin og 595,- per mekaniker per måned. Prisen per admin blir lavere når dere er flere admin: 1 095,- fra den fjerde og 995,- fra den sjuende. Mekaniker-lisensen koster det samme uansett antall. Velger du lengre bindingstid, eller betaler for 6 måneder eller 1 år, kommer rabatten oppå dette.")}
            </div>
          </details>
          {" "}
          <details className="faq">
            <summary>
              {T("Hva er forskjellen på admin og mekaniker?")}
            </summary>
            <div className="faq-body">
              {T("Admin bruker hele programmet og kan også jobbe som mekaniker. Mekaniker registrerer arbeidet sitt i mekanikerportalen.")}
            </div>
          </details>
          {" "}
          <details className="faq">
            <summary>
              {T("Hva skjer etter prøveperioden?")}
            </summary>
            <div className="faq-body">
              {T("Ingenting, hvis dere ikke vil fortsette. Prøveperioden blir ikke til et abonnement av seg selv.")}
            </div>
          </details>
          {" "}
          <details className="faq">
            <summary>
              {T("Kan vi få hjelp til å flytte fra programmet vi har i dag?")}
            </summary>
            <div className="faq-body">
              {T("Ja. Vi hjelper deg med å få over kunder, kjøretøy og historikk, og setter opp verkstedet klart til bruk. Bytter du fra et annet program, er Verkstedpakken gratis i oppsigelsestiden hos det gamle, inntil 3 måneder.")}
            </div>
          </details>
          {" "}
        </div>
        {" "}
      </section>
      {" "}
    </div>
    {" "}
</>
);
}
}
