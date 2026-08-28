"use client";

import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { submitStorverksted } from "@/app/actions/storverksted";
import {
  MAKS_LISENSER,
  MAKS_TELLER,
  MEKANIKER_PRIS,
  MIN_ADMIN,
  MIN_MEKANIKERE,
  beregnManedspris,
  formaterKr,
  klemAntall,
} from "@/lib/pricing";
import { SIGNUP_URL } from "@/lib/links";

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

export default function PrisKalkulator() {
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
  const [skjema, skjemaAction, sender] = useActionState(submitStorverksted, {
    success: false,
    error: "",
  });

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
              <p className="total-ledetekst">Din pris per måned</p>
              <div className="amt-rad">
                <div className="amt">{formaterKr(total)}</div>
                <span className="amt-mva">eks. mva</span>
              </div>
            </div>
            <div className="total-kvittering">
              <div className="kvitt-rad kvitt-admin">
                <span>
                  {antall.admin} admin
                  {overTaket ? "" : ` × ${formaterKr(perAdmin)}`}
                </span>
                <span>
                  {overTaket ? "" : formaterKr(antall.admin * perAdmin)}
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
                  {antall.mekanikere === 1 ? "mekaniker" : "mekanikere"}
                  {overTaket ? "" : ` × ${formaterKr(MEKANIKER_PRIS)}`}
                </span>
                <span>
                  {overTaket
                    ? ""
                    : formaterKr(antall.mekanikere * MEKANIKER_PRIS)}
                </span>
              </div>
              <div className="kvitt-strek" />
              <div className="kvitt-total">
                <span className="kvitt-total-navn">Per måned</span>
                {overTaket ? (
                  <span className="kvitt-tilbud">Etter avtale</span>
                ) : (
                  <div className="amt-rad">
                    <div className="amt">{formaterKr(total)}</div>
                    <span className="amt-mva">eks. mva</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="panel-cta">
            {overTaket ? (
              skjema.success ? (
                <p className="tilbud-takk">
                  Takk! Vi tar kontakt og setter opp et tilbud til dere.
                </p>
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
                  <p className="tilbud-tekst">
                    Legg igjen telefon eller e-post, så setter vi opp et tilbud
                    til verkstedet deres.
                  </p>
                  <input
                    type="text"
                    name="kontakt"
                    aria-label="Telefon eller e-post"
                    placeholder="Telefon eller e-post"
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={sender}
                  >
                    {sender ? "Sender …" : "Send"}
                  </button>
                  {skjema.error ? (
                    <span className="tilbud-feil">{skjema.error}</span>
                  ) : null}
                </form>
              )
            ) : (
              <>
                <div className="panel-cta-knapp">
                  <a className="btn btn-primary btn-lg" href={SIGNUP_URL}>
                    Prøv gratis i 14 dager
                  </a>
                </div>
                <p className="per">
                  <b>Ingen bindingstid</b> · Ingen etableringskostnad
                </p>
              </>
            )}
          </div>
        </div>

        <div className="pkort-rad">
          <div className="pkort pkort-admin">
            <p className="pkort-navn">Admin / kundemottaker</p>
            <p className="pkort-pris">
              <b>{formaterKr(perAdmin)}</b>{" "}
              <span className="pkort-per">per bruker/mnd</span>
            </p>
            <p className="pkort-tekst">
              Alt inkludert: ordre, planlegging, kunder, faktura, deler og
              lager. En admin kan også jobbe som mekaniker.
            </p>
            <Teller
              verdi={antall.admin}
              feltLabel="Antall admin"
              mindreLabel="Én admin mindre"
              merLabel="Én admin mer"
              mindreDeaktivert={antall.admin <= MIN_ADMIN}
              merDeaktivert={paaTelleTaket}
              onEndre={endreAdmin}
              onSett={settAdmin}
            />
          </div>

          <div className="pkort pkort-mek">
            <p className="pkort-navn">Mekaniker</p>
            <p className="pkort-pris">
              <b>{formaterKr(MEKANIKER_PRIS)}</b>{" "}
              <span className="pkort-per">per mekaniker/mnd</span>
            </p>
            <p className="pkort-tekst">
              Utfører og registrerer arbeid i mekanikerportalen. På egen enhet
              eller innlogget på felles enhet i verkstedet.
            </p>
            <Teller
              verdi={antall.mekanikere}
              feltLabel="Antall mekanikere"
              mindreLabel="Én mekaniker mindre"
              merLabel="Én mekaniker mer"
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
