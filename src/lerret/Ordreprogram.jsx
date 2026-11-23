"use client";
/* Flyttet fra lerretet (gen/til_react.py). Logikken er den samme som i lerretet: en React-klasse med
   state, setState, componentDidMount og renderVals(); render() viser markeringen med verdiene fra renderVals().
   Bildene står som i lerretet, med størrelsen satt i CSS, derfor vanlige <img> og ikke next/image. */
/* eslint-disable @next/next/no-img-element */
import { Component } from "react";
import { SIGNUP_URL } from "@/lib/links";
import "./Ordreprogram.css";

export default class Ordreprogram extends Component {
state = { meny: false, olListe: false, lvKanban: false };

renderVals() {
const apen = !!(this.state && this.state.meny);
const olListe = !!(this.state && this.state.olListe);
const lvKanban = !!(this.state && this.state.lvKanban);
return {
skrift: this.props && this.props.tiltenktSkrift ? 'vp-inter' : '',
menyApen: apen,
menyKlasse: apen ? 'open' : '',
apneMeny: () => this.setState({ meny: true }),
lukkMeny: () => this.setState({ meny: false }),
olBrettVis: olListe ? 'vis-liste' : '',
olKanbanPa: olListe ? '' : 'pa',
olListePa: olListe ? 'pa' : '',
olVisKanban: () => this.setState({ olListe: false }),
olVisListe: () => this.setState({ olListe: true }),
// 22.11.2026: vinduet med arbeidsordrene fra forsiden; Liste og Kanban kan trykkes på
lvVis: lvKanban ? 'vis-kanban' : '',
lvListeOn: lvKanban ? '' : 'on',
lvKanbanOn: lvKanban ? 'on' : '',
visListe: () => this.setState({ lvKanban: false }),
visKanban: () => this.setState({ lvKanban: true }),
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
// Enter og mellomrom på klikkbare elementer som ikke er knapper (bare når tasten trykkes på selve elementet,
// ikke på en knapp eller lenke inni det)
const tast = (f) => (e) => { if (e.target !== e.currentTarget) return; if (e.key === "Enter" || e.key === " ") { e.preventDefault(); f(e); } };
return (
<>
    <main className="page-ordresystem ol">
      {" "}
      <section className="hero bx">
        {" "}
        <div className="wrap">
          {" "}
          <h1>
            {T("Ordreprogrammet som samler hele jobben")}
          </h1>
          {" "}
          <p className="lead">
            {T("Lag ordre og tilbud på sekunder, eller ta imot forespørsler fra nettsiden. Alt om jobben er samlet på ett sted, fra forespørsel til ferdig faktura.")}
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
        <div className="hx-vindu-wrap ox-vindu">
          {" "}
          <div className={`hx-vindu hd hd-lv ${v.lvVis}`} role="img" aria-label={T("Arbeidsordre i Verkstedpakken: menyen til venstre med Drift åpen, og ordrene gruppert etter dag med status, jobb, kjøretøy med skilt, kunde og sum.")}>
            {" "}
            <div className="hd-meny">
              {" "}
              <div className="hd-meny-hode">
                <img className="hd-logo" src="/lerret/logo-navy.svg" alt="" />
              </div>
              {" "}
              <div className="hd-nav">
                {" "}
                <div className="hd-rad">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8">
                    </path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
                    </path>
                  </svg>
                  <span>
                    {T("Hjem")}
                  </span>
                </div>
                <div className="hd-rad on">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z">
                    </path>
                  </svg>
                  <span>
                    {T("Arbeidsordre")}
                  </span>
                </div>
                <div className="hd-rad">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="5" width="20" height="14" rx="2">
                    </rect>
                    <path d="M2 10h20">
                    </path>
                  </svg>
                  <span>
                    {T("Betaling")}
                  </span>
                </div>
                <div className="hd-rad">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2">
                    </rect>
                    <path d="M16 2v4">
                    </path>
                    <path d="M8 2v4">
                    </path>
                    <path d="M3 10h18">
                    </path>
                  </svg>
                  <span>
                    {T("Kalender")}
                  </span>
                </div>
                <div className="hd-rad">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2">
                    </rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7">
                    </path>
                  </svg>
                  <span>
                    {T("Innboks")}
                  </span>
                </div>
                <div className="hd-rad">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2">
                    </path>
                    <circle cx="9" cy="7" r="4">
                    </circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87">
                    </path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75">
                    </path>
                  </svg>
                  <span>
                    {T("Kunder")}
                  </span>
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div className="hd-lv-midt">
              {" "}
              <div className="hd-lv-topp">
                <div className="hd-lv-tittel">
                  {T("Arbeidsordre")}
                </div>
                <span className="hd-lv-ny">
                  {T("+ Ny")}
                </span>
              </div>
              {" "}
              <div className="hd-lv-faner">
                <span className="on">
                  {T("Alle")}{" "}
                  <b>
                    24
                  </b>
                </span>
                <span>
                  {T("Ny forespørsel")}{" "}
                  <b>
                    2
                  </b>
                </span>
                <span>
                  {T("Tilbud")}{" "}
                  <b>
                    3
                  </b>
                </span>
                <span className="hd-lv-bred">
                  {T("Bekreftet")}{" "}
                  <b>
                    12
                  </b>
                </span>
                <span className="hd-lv-bred">
                  {T("Pågår")}{" "}
                  <b>
                    3
                  </b>
                </span>
                <span className="hd-lv-vis">
                  <i className={v.lvListeOn} onClick={v.visListe} role="button" tabIndex={0} onKeyDown={tast(v.visListe)}>
                    {T("Liste")}
                  </i>
                  <i className={v.lvKanbanOn} onClick={v.visKanban} role="button" tabIndex={0} onKeyDown={tast(v.visKanban)}>
                    {T("Kanban")}
                  </i>
                </span>
              </div>
              {" "}
              <div className="hd-lv-liste">
                {" "}
                <div className="hd-lv-dag">
                  {T("Mandag 16. november")}{" "}
                  <b>
                    2
                  </b>
                </div>
                {" "}
                <div className="hd-lv-kort">
                  <div className="hd-lv-nr">
                    <b>
                      {T("B-0029")}
                    </b>
                    <span className="st s-ny">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12">
                        </polyline>
                        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z">
                        </path>
                      </svg>
                      {T("Ny forespørsel")}
                    </span>
                  </div>
                  <div className="hd-lv-jobb">
                    <b>
                      {T("EU-kontroll")}
                    </b>
                    <span className="hd-lv-bil">
                      {T("Volkswagen Caddy")}
                      <span className="hd-lv-skilt">
                        <i>
                          {T("N")}
                        </i>
                        {T("BS 77410")}
                      </span>
                    </span>
                  </div>
                  <div className="hd-lv-kunde">
                    <b>
                      {T("Kari Nordmann")}
                    </b>
                  </div>
                  <div className="hd-lv-sum">
                  </div>
                </div>
                {" "}
                <div className="hd-lv-kort">
                  <div className="hd-lv-nr">
                    <b>
                      {T("B-0030")}
                    </b>
                    <span className="st s-gaar">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10">
                        </circle>
                        <polyline points="12 6 12 12 16 14">
                        </polyline>
                      </svg>
                      {T("Pågår")}
                    </span>
                  </div>
                  <div className="hd-lv-jobb">
                    <b>
                      {T("Service og bremser")}
                    </b>
                    <span className="hd-lv-bil">
                      {T("Tesla Model 3")}
                      <span className="hd-lv-skilt">
                        <i>
                          {T("N")}
                        </i>
                        {T("EK 48213")}
                      </span>
                    </span>
                  </div>
                  <div className="hd-lv-kunde">
                    <b>
                      {T("Ola Nordmann")}
                    </b>
                  </div>
                  <div className="hd-lv-sum">
                    {T("4 380 kr")}
                  </div>
                </div>
                {" "}
                <div className="hd-lv-dag">
                  {T("Fredag 13. november")}{" "}
                  <b>
                    1
                  </b>
                </div>
                {" "}
                <div className="hd-lv-kort">
                  <div className="hd-lv-nr">
                    <b>
                      {T("B-0027")}
                    </b>
                    <span className="st s-tilbud">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z">
                        </path>
                        <path d="m21.854 2.147-10.94 10.939">
                        </path>
                      </svg>
                      {T("Tilbud sendt")}
                    </span>
                  </div>
                  <div className="hd-lv-jobb">
                    <b>
                      {T("EU-kontroll + service")}
                    </b>
                    <span className="hd-lv-bil">
                      {T("Volvo V60")}
                    </span>
                  </div>
                  <div className="hd-lv-kunde">
                    <b>
                      {T("Per Hansen")}
                    </b>
                  </div>
                  <div className="hd-lv-sum">
                    {T("3 450 kr")}
                  </div>
                </div>
                {" "}
              </div>
              {" "}
              <div className="hd-lv-kanban">
                <div className="hd-kb-kol">
                  <p className="hd-kb-navn">
                    <i className="s-ny">
                    </i>
                    {T("Ny forespørsel")}
                    <b>
                      2
                    </b>
                  </p>
                  <div className="hd-kb-kort">
                    <div className="hd-kb-topp">
                      <b>
                        {T("B-0029")}
                      </b>
                      <span className="hd-lv-skilt">
                        <i>
                          {T("N")}
                        </i>
                        {T("BS 77410")}
                      </span>
                    </div>
                    <p className="hd-kb-kunde">
                      {T("Kari Nordmann")}
                    </p>
                    <p className="hd-kb-jobb">
                      {T("EU-kontroll")}
                    </p>
                  </div>
                </div>
                <div className="hd-kb-kol">
                  <p className="hd-kb-navn">
                    <i className="s-tilbud">
                    </i>
                    {T("Tilbud")}
                    <b>
                      3
                    </b>
                  </p>
                  <div className="hd-kb-kort">
                    <div className="hd-kb-topp">
                      <b>
                        {T("B-0027")}
                      </b>
                    </div>
                    <p className="hd-kb-kunde">
                      {T("Per Hansen")}
                    </p>
                    <p className="hd-kb-jobb">
                      {T("EU-kontroll og service")}
                    </p>
                    <p className="hd-kb-sum">
                      {T("3 450 kr")}
                    </p>
                  </div>
                </div>
                <div className="hd-kb-kol">
                  <p className="hd-kb-navn">
                    <i className="s-avtalt">
                    </i>
                    {T("Bekreftet")}
                    <b>
                      12
                    </b>
                  </p>
                  <div className="hd-kb-kort">
                    <div className="hd-kb-topp">
                      <b>
                        {T("B-0025")}
                      </b>
                    </div>
                    <p className="hd-kb-kunde">
                      {T("Lise Johansen")}
                    </p>
                    <p className="hd-kb-jobb">
                      {T("Hjulskift")}
                    </p>
                    <p className="hd-kb-sum">
                      {T("1 250 kr")}
                    </p>
                  </div>
                </div>
                <div className="hd-kb-kol">
                  <p className="hd-kb-navn">
                    <i className="s-gaar">
                    </i>
                    {T("Pågår")}
                    <b>
                      3
                    </b>
                  </p>
                  <div className="hd-kb-kort">
                    <div className="hd-kb-topp">
                      <b>
                        {T("B-0030")}
                      </b>
                      <span className="hd-lv-skilt">
                        <i>
                          {T("N")}
                        </i>
                        {T("EK 48213")}
                      </span>
                    </div>
                    <p className="hd-kb-kunde">
                      {T("Ola Nordmann")}
                    </p>
                    <p className="hd-kb-jobb">
                      {T("Service og bremser")}
                    </p>
                    <p className="hd-kb-sum">
                      {T("4 380 kr")}
                    </p>
                  </div>
                </div>
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
      <section className="ol-kap ox-roller" aria-label={T("Kontoret, mekanikeren og kunden")}>
        {" "}
        <p className="ox-inn">
          {T("Kontoret, mekanikeren og kunden ser den samme ordren, hver på sin skjerm.")}
        </p>
        {" "}
        <div className="k3-rad">
          {" "}
          <article className="k3 k3-lilla">
            {" "}
            <div className="k3-vis" aria-hidden="true">
              <div className="ox-jobb ox-garasje">
                {" "}
                <p className="ox-gtit">
                  {T("Min garasje")}
                </p>
                <span className="ox-bil">
                  <span className="ox-skilt">
                    {T("EK 48213")}
                  </span>
                  {T("Tesla Model 3")}
                </span>
                {" "}
                <div className="ox-tilbud">
                  <span>
                    {T("Tilbud")}
                    <b>
                      {T("4 380 kr")}
                    </b>
                  </span>
                  <em className="ox-godta">
                    <span className="for">
                      {T("Godta tilbud")}
                    </span>
                    <span className="etter">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5">
                        </path>
                      </svg>
                      {T("Akseptert")}
                    </span>
                  </em>
                </div>
                {" "}
              </div>
            </div>
            {" "}
            <h3>
              {T("Kunde")}
            </h3>
            {" "}
            <p>
              {T("Tilbud med ett trykk, og Min garasje med status og historikk.")}
            </p>
            {" "}
          </article>
          {" "}
          <article className="k3 k3-bla">
            {" "}
            <div className="k3-vis" aria-hidden="true">
              <div className="ox-liste">
                {" "}
                <div className="ox-rad ox-akt">
                  <b>
                    {T("B-0030")}
                  </b>
                  <span>
                    {T("Service og bremser")}
                  </span>
                  <i>
                    {T("4 380 kr")}
                  </i>
                  <small className="ox-status">
                    <span className="for">
                      {T("Venter svar")}
                    </span>
                    <span className="etter">
                      {T("Akseptert")}
                    </span>
                  </small>
                </div>
                {" "}
                <div className="ox-rad">
                  <b>
                    {T("B-0027")}
                  </b>
                  <span>
                    {T("EU-kontroll + service")}
                  </span>
                  <i>
                    {T("3 450 kr")}
                  </i>
                  <small>
                    {T("Venter svar")}
                  </small>
                </div>
                {" "}
              </div>
            </div>
            {" "}
            <h3>
              {T("Admin / kundemottaker")}
            </h3>
            {" "}
            <p>
              {T("Tilbud, deler, lager og fakturakontroll på samme sted.")}
            </p>
            {" "}
          </article>
          {" "}
          <article className="k3 k3-gronn">
            {" "}
            <div className="k3-vis" aria-hidden="true">
              <div className="ox-jobb ox-mek">
                {" "}
                <span className="ox-skilt">
                  {T("EK 48213")}
                </span>
                <p>
                  {T("Service og bremser")}
                </p>
                <span className="ox-tid">
                  <i>
                  </i>
                  <span className="ox-sek">
                  </span>
                </span>
                {" "}
                <div className="ox-knapper">
                  <span>
                    {T("Ta pause")}
                  </span>
                  <span className="mork">
                    {T("Stemple ut")}
                  </span>
                </div>
                {" "}
              </div>
            </div>
            {" "}
            <h3>
              {T("Mekaniker")}
            </h3>
            {" "}
            <p>
              {T("Timeregistrering, deler, bilder og kommentarer rett på mobilen.")}
            </p>
            {" "}
          </article>
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
