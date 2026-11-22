"use client";

import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  submitStorverksted,
  type StorverkstedState,
} from "@/app/actions/storverksted";
import {
  BETALING_MANEDER,
  MAKS_LISENSER,
  MAKS_TELLER,
  MEKANIKER_PRIS,
  MIN_ADMIN,
  MIN_MEKANIKERE,
  beregnPris,
  erGyldigKombinasjon,
  formaterBelop,
  formaterProsent,
  klemAntall,
  type Trinn,
} from "@/lib/pricing";
import { SIGNUP_URL } from "@/lib/links";
import type { Locale } from "@/i18n/config";
import type { PrisDict } from "@/i18n/dictionaries/nb";

/** Hold inne: pause før repetisjonen starter, så jevn takt, så raskere. */
const FORSINKELSE_MS = 400;
const TAKT_MS = 120;
const RASK_TAKT_MS = 40;
const RASK_ETTER_MS = 2000;

type TellerProps = {
  verdi: number;
  feltLabel: string;
  mindreLabel: string;
  merLabel: string;
  mindreDeaktivert: boolean;
  merDeaktivert: boolean;
  /** Funksjonell endring i forelderen: klem(basis ?? gjeldende) + delta. */
  onEndre: (delta: number, basis?: number) => void;
  /** Sett absolutt verdi (live under skriving og ved commit). */
  onSett: (n: number) => void;
};

function Teller({
  verdi,
  feltLabel,
  mindreLabel,
  merLabel,
  mindreDeaktivert,
  merDeaktivert,
  onEndre,
  onSett,
}: TellerProps) {
  /** Rå tekst mens feltet redigeres. null = feltet viser `verdi`. */
  const [utkast, setUtkast] = useState<string | null>(null);

  const timerRef = useRef<number | undefined>(undefined);

  const stopp = useCallback(() => {
    if (timerRef.current !== undefined) {
      window.clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const endre = useCallback(
    (delta: number) => {
      const basis =
        utkast !== null && utkast !== "" ? Number(utkast) : undefined;
      setUtkast(null);
      onEndre(delta, basis);
    },
    [utkast, onEndre],
  );

  const startGjenta = useCallback(
    (delta: number) => {
      stopp();
      endre(delta); // første steg tar hensyn til et pågående utkast
      let gaatt = 0;
      const planlegg = (om: number) => {
        timerRef.current = window.setTimeout(() => {
          gaatt += om;
          // Repetisjon går på ren delta: utkastet er alt committet av kallet over.
          onEndre(delta);
          planlegg(gaatt > RASK_ETTER_MS ? RASK_TAKT_MS : TAKT_MS);
        }, om);
      };
      planlegg(FORSINKELSE_MS);
    },
    [endre, onEndre, stopp],
  );

  // Slipper man knappen utenfor sitt eget område, skal repetisjonen likevel dø.
  useEffect(() => {
    window.addEventListener("pointerup", stopp);
    window.addEventListener("pointercancel", stopp);
    return () => {
      window.removeEventListener("pointerup", stopp);
      window.removeEventListener("pointercancel", stopp);
      stopp();
    };
  }, [stopp]);

  const commitUtkast = useCallback(() => {
    if (utkast !== null && utkast !== "") onSett(Number(utkast));
    setUtkast(null);
  }, [utkast, onSett]);

  return (
    <div className="teller">
      <button
        type="button"
        className="teller-btn"
        aria-label={mindreLabel}
        disabled={mindreDeaktivert}
        onPointerDown={() => startGjenta(-1)}
        onPointerUp={stopp}
        onPointerLeave={stopp}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); // hindrer at nettleseren også utløser click
            endre(-1);
          }
        }}
      >
        −
      </button>

      <label className="teller-felt">
        <span className="sr-only">{feltLabel}</span>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={utkast ?? String(verdi)}
          onChange={(e) => {
            const tekst = e.target.value.replace(/[^0-9]/g, "");
            setUtkast(tekst);
            // Prisen skal følge tallet mens man skriver. Utkastet finnes bare
            // for at feltet skal kunne tømmes og skrives om uten å klemme til
            // minimum.
            if (tekst !== "") onSett(Number(tekst));
          }}
          onBlur={commitUtkast}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commitUtkast();
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              endre(1);
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              endre(-1);
            }
          }}
        />
      </label>

      <button
        type="button"
        className="teller-btn"
        aria-label={merLabel}
        disabled={merDeaktivert}
        onPointerDown={() => startGjenta(1)}
        onPointerUp={stopp}
        onPointerLeave={stopp}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault(); // hindrer at nettleseren også utløser click
            endre(1);
          }
        }}
      >
        +
      </button>
    </div>
  );
}

const TRINN: readonly Trinn[] = [0, 1, 2];

export default function PrisKalkulator({
  t,
}: {
  lang: Locale;
  t: PrisDict;
}) {
  const c = t.calc;
  const ch = c.choices;
  const kr = (belop: number) => formaterBelop(belop, t.priceFormat);
  // Prosenten kan være en halv (7,5 / 22,5), så den får språkets desimaltegn.
  const fyll = (mal: string, nokkel: "pct" | "n", verdi: number) =>
    mal.replace(
      `{${nokkel}}`,
      nokkel === "pct"
        ? formaterProsent(verdi, t.priceFormat.locale)
        : String(verdi),
    );
  const [antall, setAntall] = useState({
    admin: MIN_ADMIN,
    mekanikere: MIN_MEKANIKERE,
  });
  // Valgene låser hverandre i stedet for å endre hverandre: betalingen kan
  // ikke være lengre enn bindingen, og ingen av dem hopper av seg selv.
  const [binding, setBinding] = useState<Trinn>(0);
  const [betaling, setBetaling] = useState<Trinn>(0);
  const velgBinding = (i: Trinn) => {
    if (erGyldigKombinasjon(i, betaling)) setBinding(i);
  };
  const velgBetaling = (i: Trinn) => {
    if (erGyldigKombinasjon(binding, i)) setBetaling(i);
  };
  // 22.11.2026: «Prøv gratis» tar med valgene til registreringen, så varselet til teamet viser hvor mange de er,
  // bindingen og betalingen (kom-i-gang leser ?admin=&mek=&binding=&betaling=, med månedene 1, 6 eller 12).
  const signupHref = `${SIGNUP_URL}${SIGNUP_URL.includes("?") ? "&" : "?"}${new URLSearchParams({
    admin: String(antall.admin),
    mek: String(antall.mekanikere),
    binding: String(BETALING_MANEDER[binding]),
    betaling: String(BETALING_MANEDER[betaling]),
  })}`;

  // Begge tellerne deler taket på 10 lisenser: maks for den ene er det som er
  // igjen etter den andre. Én state-oppdatering per endring holder klemmingen
  // atomisk, også under hold-repetisjon.
  const endreAdmin = useCallback((delta: number, basis?: number) => {
    setAntall((a) => ({
      ...a,
      admin: klemAntall(
        (basis ?? a.admin) + delta,
        MIN_ADMIN,
        MAKS_TELLER - a.mekanikere,
      ),
    }));
  }, []);
  const settAdmin = useCallback((n: number) => {
    setAntall((a) => ({
      ...a,
      admin: klemAntall(n, MIN_ADMIN, MAKS_TELLER - a.mekanikere),
    }));
  }, []);
  const endreMekanikere = useCallback((delta: number, basis?: number) => {
    setAntall((a) => ({
      ...a,
      mekanikere: klemAntall(
        (basis ?? a.mekanikere) + delta,
        MIN_MEKANIKERE,
        MAKS_TELLER - a.admin,
      ),
    }));
  }, []);
  const settMekanikere = useCallback((n: number) => {
    setAntall((a) => ({
      ...a,
      mekanikere: klemAntall(n, MIN_MEKANIKERE, MAKS_TELLER - a.admin),
    }));
  }, []);

  const p = beregnPris(antall.admin, antall.mekanikere, binding, betaling);
  const totalLisenser = antall.admin + antall.mekanikere;
  // Over 10 lisenser stopper prisen: panelet viser antall-kvittering og
  // kontaktskjema i stedet for pris, valg og prøveperiode.
  const overTaket = totalLisenser > MAKS_LISENSER;
  const paaTelleTaket = totalLisenser >= MAKS_TELLER;
  const perPeriode =
    p.maneder > 1 ? fyll(ch.months, "n", p.maneder) : "";

  // Storverksted-skjemaet ved taket.
  const [skjema, skjemaAction, sender] = useActionState<
    StorverkstedState,
    FormData
  >(submitStorverksted, { success: false, error: "" });

  return (
    <div className="pris-omrade" aria-live="polite">
      <div className="pris-panel">
        <div className="pkort-rad">
          <div className="pkort pkort-admin">
            <p className="pkort-navn">{c.adminCard.name}</p>
            <p className="pkort-pris">
              {/* Plassen er alltid reservert, så kortet ikke hopper når
                  rabatten dukker opp. */}
              <span className="pkort-gammel">
                {p.perAdmin < p.perAdminStart ? (
                  <>
                    <s>{kr(p.perAdminStart)}</s>
                    <span className="pkort-merke">
                      {fyll(ch.badge, "pct", p.adminSparProsent)}
                    </span>
                  </>
                ) : null}
              </span>
              <b>{kr(p.perAdmin)}</b>{" "}
              <span className="pkort-per">{c.adminCard.per}</span>
            </p>
            <p className="pkort-tekst">{c.adminCard.text}</p>
            <Teller
              verdi={antall.admin}
              feltLabel={c.adminCard.field}
              mindreLabel={c.adminCard.less}
              merLabel={c.adminCard.more}
              mindreDeaktivert={antall.admin <= MIN_ADMIN}
              merDeaktivert={paaTelleTaket}
              onEndre={endreAdmin}
              onSett={settAdmin}
            />
          </div>

          <div className="pkort pkort-mek">
            <p className="pkort-navn">{c.mechanicCard.name}</p>
            <p className="pkort-pris">
              <span className="pkort-gammel">
                {p.perMekaniker < MEKANIKER_PRIS ? (
                  <>
                    <s>{kr(MEKANIKER_PRIS)}</s>
                    <span className="pkort-merke">
                      {fyll(ch.badge, "pct", p.mekanikerSparProsent)}
                    </span>
                  </>
                ) : null}
              </span>
              <b>{kr(p.perMekaniker)}</b>{" "}
              <span className="pkort-per">{c.mechanicCard.per}</span>
            </p>
            <p className="pkort-tekst">{c.mechanicCard.text}</p>
            <Teller
              verdi={antall.mekanikere}
              feltLabel={c.mechanicCard.field}
              mindreLabel={c.mechanicCard.less}
              merLabel={c.mechanicCard.more}
              mindreDeaktivert={antall.mekanikere <= MIN_MEKANIKERE}
              merDeaktivert={paaTelleTaket}
              onEndre={endreMekanikere}
              onSett={settMekanikere}
            />
          </div>
        </div>

        <div className={`panel-topp${overTaket ? " uten-valg" : ""}`}>
          {overTaket ? null : (
            <div className="valg-rad">
              <div
                className="valg-gruppe"
                role="radiogroup"
                aria-labelledby="valg-binding-tittel"
              >
                <span className="valg-tittel" id="valg-binding-tittel">
                  {ch.bindingTitle}
                </span>
                {TRINN.map((i) => (
                  <label className="valg" key={i}>
                    <input
                      type="radio"
                      name="binding"
                      checked={binding === i}
                      disabled={!erGyldigKombinasjon(i, betaling)}
                      onChange={() => velgBinding(i)}
                    />
                    <span className="valg-boks" aria-hidden="true" />
                    <span className="valg-tekst">{ch.bindingOptions[i]}</span>
                  </label>
                ))}
              </div>
              <div
                className="valg-gruppe"
                role="radiogroup"
                aria-labelledby="valg-betaling-tittel"
              >
                <span className="valg-tittel" id="valg-betaling-tittel">
                  {ch.paymentTitle}
                </span>
                {TRINN.map((i) => (
                  <label className="valg" key={i}>
                    <input
                      type="radio"
                      name="betaling"
                      checked={betaling === i}
                      disabled={!erGyldigKombinasjon(binding, i)}
                      onChange={() => velgBetaling(i)}
                    />
                    <span className="valg-boks" aria-hidden="true" />
                    <span className="valg-tekst">{ch.paymentOptions[i]}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Kvitteringen: linjene samles rett over summen, og summen står
              fast i bunnen — den skal aldri flytte seg når en linje kommer
              eller går. */}
          <div className="panel-total">
            <div className="kvitt-rader">
              <div className="kvitt-rad kvitt-admin">
                <span>
                  {antall.admin} {c.adminUnit}
                  {overTaket ? "" : ` × ${kr(p.perAdmin)}${perPeriode}`}
                </span>
                <span>
                  {overTaket ? "" : kr(antall.admin * p.perAdmin * p.maneder)}
                </span>
              </div>
              <div
                className={
                  antall.mekanikere > 0
                    ? "kvitt-rad kvitt-mek"
                    : "kvitt-rad kvitt-mek kvitt-rad-bort"
                }
              >
                <span>
                  {antall.mekanikere}{" "}
                  {antall.mekanikere === 1 ? c.mechanicOne : c.mechanicMany}
                  {overTaket ? "" : ` × ${kr(p.perMekaniker)}${perPeriode}`}
                </span>
                <span>
                  {overTaket
                    ? ""
                    : kr(antall.mekanikere * p.perMekaniker * p.maneder)}
                </span>
              </div>
              {!overTaket && p.spartManed > 0 ? (
                <div className="kvitt-rad kvitt-spart">
                  <span>{fyll(ch.saving, "pct", p.sparProsent)}</span>
                  <span>−{kr(p.spartPeriode)}</span>
                </div>
              ) : null}
            </div>
            <div className="kvitt-total">
              {/* Samme ordlyd som valget under Betalingsfrekvens. Over
                  taket er valgene skjult, og da står perioden alene. */}
              <span className="kvitt-total-navn">
                {overTaket
                  ? ch.periodLabels[betaling]
                  : ch.paymentOptions[betaling]}
              </span>
              {overTaket ? (
                <span className="kvitt-tilbud">{c.byAgreement}</span>
              ) : (
                <div className="amt-rad">
                  <div className="amt">{kr(p.totalPeriode)}</div>
                  <span className="amt-mva">{c.exVat}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pris-cta">
        {overTaket ? (
          skjema.success ? (
            <p className="tilbud-takk">{c.form.thanks}</p>
          ) : (
            <form action={skjemaAction} className="tilbud-skjema">
              {/* Honeypot for boter — skjult for folk. */}
              <input
                type="text"
                name="company_website"
                className="tak-hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              {/* Tidsstempelet settes i ref-callbacken: SSR-html-en får
                  tom verdi, klienten fyller inn ved mount. */}
              <input
                type="hidden"
                name="form_loaded_at"
                defaultValue=""
                ref={(el) => {
                  if (el && !el.value) el.value = String(Date.now());
                }}
              />
              <input type="hidden" name="antall" value={totalLisenser} />
              <input type="hidden" name="antall_admin" value={antall.admin} />
              <input
                type="hidden"
                name="antall_mekanikere"
                value={antall.mekanikere}
              />
              <p className="tilbud-tekst">{c.form.intro}</p>
              <input
                type="text"
                name="kontakt"
                aria-label={c.form.contactLabel}
                placeholder={c.form.contactLabel}
                required
              />
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={sender}
              >
                {sender ? c.form.sending : c.form.send}
              </button>
              {skjema.error ? (
                <span className="tilbud-feil">
                  {c.form.errors[skjema.error]}
                </span>
              ) : null}
            </form>
          )
        ) : (
          <>
            <a className="btn btn-primary btn-lg" href={signupHref}>
              {c.cta}
            </a>
            <p className="per">
              <b>{ch.bindingTerms[binding]}</b> · {c.termsRest}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
