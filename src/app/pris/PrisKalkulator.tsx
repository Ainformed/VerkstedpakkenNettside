"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MAKS_BRUKERE,
  MIN_BRUKERE,
  finnPris,
  formaterKr,
  klemAntall,
  type Pristrinn,
} from "@/lib/pricing";

/** Hold inne: pause før repetisjonen starter, så jevn takt, så raskere. */
const FORSINKELSE_MS = 400;
const TAKT_MS = 120;
const RASK_TAKT_MS = 40;
const RASK_ETTER_MS = 2000;

export default function PrisKalkulator({ trinn }: { trinn: Pristrinn[] }) {
  const [antall, setAntall] = useState(MIN_BRUKERE);
  /** Rå tekst mens feltet redigeres. null = feltet viser `antall`. */
  const [utkast, setUtkast] = useState<string | null>(null);

  const timerRef = useRef<number | undefined>(undefined);

  const stopp = useCallback(() => {
    if (timerRef.current !== undefined) {
      window.clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const endre = useCallback((delta: number) => {
    setAntall((n) => klemAntall(n + delta));
  }, []);

  const startGjenta = useCallback(
    (delta: number) => {
      stopp();
      endre(delta);
      let gaatt = 0;
      const planlegg = (om: number) => {
        timerRef.current = window.setTimeout(() => {
          gaatt += om;
          endre(delta);
          planlegg(gaatt > RASK_ETTER_MS ? RASK_TAKT_MS : TAKT_MS);
        }, om);
      };
      planlegg(FORSINKELSE_MS);
    },
    [endre, stopp],
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
    setUtkast((tekst) => {
      if (tekst === null) return null;
      if (tekst !== "") setAntall(klemAntall(Number(tekst)));
      return null;
    });
  }, []);

  const prisPerBruker = finnPris(trinn, antall);
  const total = prisPerBruker * antall;
  const flere = antall > 1;

  return (
    <>
      <div className="pris-blokk" aria-live="polite">
        <div className="amt">{formaterKr(total)}</div>
        <p className="per">
          {flere ? "Per måned" : "Per bruker per måned"} (ekskl. mva).{" "}
          <b>Ingen bindingstid.</b>
        </p>
        {flere && (
          <p className="per-bruker">
            {antall} brukere × {formaterKr(prisPerBruker)} per bruker
          </p>
        )}
      </div>

      <div className="teller">
        <button
          type="button"
          className="teller-btn"
          aria-label="Én bruker mindre"
          disabled={antall <= MIN_BRUKERE}
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
          <span className="sr-only">Antall brukere</span>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={utkast ?? String(antall)}
            onChange={(e) => setUtkast(e.target.value.replace(/[^0-9]/g, ""))}
            onBlur={commitUtkast}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commitUtkast();
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setUtkast(null);
                endre(1);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setUtkast(null);
                endre(-1);
              }
            }}
          />
        </label>

        <button
          type="button"
          className="teller-btn"
          aria-label="Én bruker mer"
          disabled={antall >= MAKS_BRUKERE}
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

        <span className="teller-tekst">brukere</span>
      </div>
    </>
  );
}
