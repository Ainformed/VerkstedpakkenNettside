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
  MAKS_LISENSER,
  MAKS_TELLER,
  MEKANIKER_PRIS,
  MIN_ADMIN,
  MIN_MEKANIKERE,
  beregnManedspris,
  formaterBelop,
  klemAntall,
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

export default function PrisKalkulator({
  t,
}: {
  lang: Locale;
  t: PrisDict;
}) {
  const c = t.calc;
  const kr = (belop: number) => formaterBelop(belop, t.priceFormat);
  const [antall, setAntall] = useState({
    admin: MIN_ADMIN,
    mekanikere: MIN_MEKANIKERE,
  });

  // Begge tellerne deler taket på 20 lisenser: maks for den ene er det som er
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

  const { perAdmin, total } = beregnManedspris(antall.admin, antall.mekanikere);
  const totalLisenser = antall.admin + antall.mekanikere;
  // Over 20 lisenser stopper prisen: panelet viser antall-kvittering og
  // kontaktskjema i stedet for pris og prøveperiode.
  const overTaket = totalLisenser > MAKS_LISENSER;
  const paaTelleTaket = totalLisenser >= MAKS_TELLER;

  // Storverksted-skjemaet ved taket.
  const [skjema, skjemaAction, sender] = useActionState<
    StorverkstedState,
    FormData
  >(submitStorverksted, { success: false, error: "" });

  return (
    <div className="pris-omrade" aria-live="polite">
      <div className="pris-panel">
        {/* Totalen rendres i to varianter og CSS velger etter bredde:
            desktop viser stor total med regnestykket på én linje,
            telefon viser kvittering (rad per lisenstype, delelinje, sum). */}
        <div className="panel-topp">
          <div
            className={`panel-total ${
              overTaket
                ? "har-mekanikere har-tilbud"
                : antall.mekanikere > 0
                  ? "har-mekanikere"
                  : "kun-admin"
            }`}
          >
            <div className="total-klassisk">
              <p className="total-ledetekst">{c.totalLabel}</p>
              <div className="amt-rad">
                <div className="amt">{kr(total)}</div>
                <span className="amt-mva">{c.exVat}</span>
              </div>
            </div>
            <div className="total-kvittering">
              <div className="kvitt-rad kvitt-admin">
                <span>
                  {antall.admin} {c.adminUnit}
                  {overTaket ? "" : ` × ${kr(perAdmin)}`}
                </span>
                <span>
                  {overTaket ? "" : kr(antall.admin * perAdmin)}
                </span>
              </div>
              {/* Alltid rendret — skjult med visibility ved null mekanikere,
                  så panelet ikke hopper når første legges til. */}
              <div
                className={
                  antall.mekanikere > 0
                    ? "kvitt-rad kvitt-mek"
                    : "kvitt-rad kvitt-mek kvitt-rad-skjult"
                }
              >
                <span>
                  {antall.mekanikere}{" "}
                  {antall.mekanikere === 1 ? c.mechanicOne : c.mechanicMany}
                  {overTaket ? "" : ` × ${kr(MEKANIKER_PRIS)}`}
                </span>
                <span>
                  {overTaket
                    ? ""
                    : kr(antall.mekanikere * MEKANIKER_PRIS)}
                </span>
              </div>
              <div className="kvitt-strek" />
              <div className="kvitt-total">
                <span className="kvitt-total-navn">{c.perMonth}</span>
                {overTaket ? (
                  <span className="kvitt-tilbud">{c.byAgreement}</span>
                ) : (
                  <div className="amt-rad">
                    <div className="amt">{kr(total)}</div>
                    <span className="amt-mva">{c.exVat}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="panel-cta">
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
                  <input
                    type="hidden"
                    name="antall_admin"
                    value={antall.admin}
                  />
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
                <div className="panel-cta-knapp">
                  <a className="btn btn-primary btn-lg" href={SIGNUP_URL}>
                    {c.cta}
                  </a>
                </div>
                <p className="per">
                  <b>{c.termsBold}</b> · {c.termsRest}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="pkort-rad">
          <div className="pkort pkort-admin">
            <p className="pkort-navn">{c.adminCard.name}</p>
            <p className="pkort-pris">
              <b>{kr(perAdmin)}</b>{" "}
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
              <b>{kr(MEKANIKER_PRIS)}</b>{" "}
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
      </div>

    </div>
  );
}
