"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ADMIN_TRINN,
  MAKS_LISENSER,
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
  /** «admin» / «mekanikere» — teksten etter tallet. */
  enhet: string;
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
  enhet,
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

      <span className="teller-enhet">{enhet}</span>
    </div>
  );
}

const START_PRIS = ADMIN_TRINN[0]!.pris;
const BUNN_PRIS = ADMIN_TRINN[ADMIN_TRINN.length - 1]!.pris;

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
        MAKS_LISENSER - a.mekanikere,
      ),
    }));
  }, []);
  const settAdmin = useCallback((n: number) => {
    setAntall((a) => ({
      ...a,
      admin: klemAntall(n, MIN_ADMIN, MAKS_LISENSER - a.mekanikere),
    }));
  }, []);
  const endreMekanikere = useCallback((delta: number, basis?: number) => {
    setAntall((a) => ({
      ...a,
      mekanikere: klemAntall(
        (basis ?? a.mekanikere) + delta,
        MIN_MEKANIKERE,
        MAKS_LISENSER - a.admin,
      ),
    }));
  }, []);
  const settMekanikere = useCallback((n: number) => {
    setAntall((a) => ({
      ...a,
      mekanikere: klemAntall(n, MIN_MEKANIKERE, MAKS_LISENSER - a.admin),
    }));
  }, []);

  const { perAdmin, total } = beregnManedspris(antall.admin, antall.mekanikere);
  const paaTaket = antall.admin + antall.mekanikere >= MAKS_LISENSER;

  const adminLedd = `${antall.admin} admin × ${formaterKr(perAdmin)}`;
  const mekanikerLedd =
    antall.mekanikere > 0
      ? ` + ${antall.mekanikere} ${
          antall.mekanikere === 1 ? "mekaniker" : "mekanikere"
        } × ${formaterKr(MEKANIKER_PRIS)}`
      : "";

  return (
    <div className="pris-omrade" aria-live="polite">
      <div className="pkort-rad">
        <div className="pkort pkort-admin">
          <p className="pkort-navn">Admin</p>
          <p className="pkort-pris">
            <b>{formaterKr(START_PRIS)}</b>
            <span className="pkort-til"> – {formaterKr(BUNN_PRIS)}</span>{" "}
            <span className="pkort-per">per bruker/mnd</span>
          </p>
          <p className="pkort-tekst">
            Alt inkludert: ordre, planlegging, kunder, faktura, booking, deler
            og lager. En admin kan også jobbe som mekaniker.
          </p>
          <Teller
            verdi={antall.admin}
            enhet="admin"
            feltLabel="Antall admin"
            mindreLabel="Én admin mindre"
            merLabel="Én admin mer"
            mindreDeaktivert={antall.admin <= MIN_ADMIN}
            merDeaktivert={paaTaket}
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
            Utfører og registrerer arbeid i mekanikerportalen — på egen enhet
            eller innlogget på felles enhet i verkstedet.
          </p>
          <Teller
            verdi={antall.mekanikere}
            enhet={antall.mekanikere === 1 ? "mekaniker" : "mekanikere"}
            feltLabel="Antall mekanikere"
            mindreLabel="Én mekaniker mindre"
            merLabel="Én mekaniker mer"
            mindreDeaktivert={antall.mekanikere <= MIN_MEKANIKERE}
            merDeaktivert={paaTaket}
            onEndre={endreMekanikere}
            onSett={settMekanikere}
          />
        </div>
      </div>

      <div className="pris-blokk">
        <p className="total-ledetekst">Din pris per måned</p>
        <div className="amt">{formaterKr(total)}</div>
        <p className="total-detalj">
          {adminLedd}
          {mekanikerLedd}
        </p>
        <p className="per">
          <b>Ingen bindingstid.</b> Eks. mva.
        </p>
      </div>

      {/* Alltid rendret så layouten ikke hopper når taket nås. */}
      <p
        className={paaTaket ? "teller-tak" : "teller-tak teller-tak-skjult"}
      >
        Flere enn {MAKS_LISENSER} lisenser? Da gir vi dere en bedre pris.{" "}
        <a href={SIGNUP_URL}>Prøv gratis i 14 dager</a>, så tar vi resten
        derfra.
      </p>
    </div>
  );
}
