"use client";

import { useActionState, useState, useCallback, useRef, useMemo } from "react";
import { submitInterest, type InterestState } from "@/app/actions/interest";

const initialState: InterestState = { success: false, error: "" };

export default function InterestList() {
  const [state, formAction, isPending] = useActionState(
    submitInterest,
    initialState,
  );
  const [orgnr, setOrgnr] = useState("");
  const [workshop, setWorkshop] = useState("");
  const [lookupStatus, setLookupStatus] = useState<
    "idle" | "loading" | "found" | "not-found"
  >("idle");
  const lookupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formLoadedAt = useMemo(() => Date.now().toString(), []);

  const lookupOrg = useCallback(async (value: string) => {
    const digits = value.replace(/\s/g, "");
    if (digits.length !== 9) {
      setLookupStatus("idle");
      return;
    }
    setLookupStatus("loading");
    try {
      const res = await fetch(
        `https://data.brreg.no/enhetsregisteret/api/enheter/${digits}`,
      );
      if (res.ok) {
        const data = await res.json();
        setWorkshop(data.navn || "");
        setLookupStatus("found");
      } else {
        setLookupStatus("not-found");
      }
    } catch {
      setLookupStatus("not-found");
    }
  }, []);

  const handleOrgnrChange = (value: string) => {
    setOrgnr(value);
    if (lookupTimer.current) clearTimeout(lookupTimer.current);
    lookupTimer.current = setTimeout(() => lookupOrg(value), 400);
  };

  return (
    <section className="interest section" id="interesse">
      <div className="wrap">
        <div className="interest-grid">
          <div>
            <span className="eyebrow">Interesseliste</span>
            <h2 className="h-section">Meld interesse</h2>
            <p className="lede">
              Verkstedpakken er under utvikling og lanseres om kort tid. Meld
              interesse nå, så holder vi deg oppdatert og tar kontakt før vi
              åpner dørene.
            </p>

            <div className="interest-list">
              <div className="il-item">
                <div className="il-check">
                  <CheckIcon />
                </div>
                <div>
                  <b>Uforpliktende</b>
                  <p>Vi ringer, lytter og viser systemet. Ingen press, ingen salgspitch.</p>
                </div>
              </div>
              <div className="il-item">
                <div className="il-check">
                  <CheckIcon />
                </div>
                <div>
                  <b>Tilpasset verkstedet</b>
                  <p>Vi tar utgangspunkt i hvordan dere jobber i dag — ikke omvendt.</p>
                </div>
              </div>
              <div className="il-item">
                <div className="il-check">
                  <CheckIcon />
                </div>
                <div>
                  <b>To uker til i gang etter signering</b>
                  <p>Oppsett, dataimport og opplæring — vi står for det meste.</p>
                </div>
              </div>
            </div>
          </div>

          {state.success ? (
            <div className="interest-form">
              <div className="fr-success">
                <b>Takk for din interesse!</b>
                <p>
                  Vi har mottatt informasjonen din og tar kontakt så snart vi
                  kan. Sjekk e-posten din for en bekreftelse.
                </p>
              </div>
            </div>
          ) : (
            <form action={formAction} className="interest-form">
              {/* Honeypot — bots fill this, humans never see it */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-10000px",
                  top: "auto",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label htmlFor="company_website">
                  Hjemmeside (la stå tom)
                </label>
                <input
                  id="company_website"
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </div>
              <input type="hidden" name="form_loaded_at" value={formLoadedAt} />

              <div className="fr-row">
                <label htmlFor="orgnr">Org.nr</label>
                <div className="fr-orgnr-wrap">
                  <input
                    id="orgnr"
                    name="orgnr"
                    type="text"
                    inputMode="numeric"
                    placeholder="9 siffer"
                    value={orgnr}
                    onChange={(e) => handleOrgnrChange(e.target.value)}
                  />
                  {lookupStatus === "loading" && (
                    <div className="fr-orgnr-status">
                      <div className="fr-orgnr-spinner" />
                    </div>
                  )}
                  {lookupStatus === "found" && (
                    <div className="fr-orgnr-status">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 12l5 5L20 6"
                          stroke="#00c758"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {lookupStatus === "found" && workshop && (
                  <p className="fr-help found">{workshop}</p>
                )}
                {lookupStatus === "not-found" && (
                  <p className="fr-help">
                    Fant ikke organisasjon — fyll inn manuelt under
                  </p>
                )}
              </div>
              <div className="fr-two">
                <div className="fr-row">
                  <label htmlFor="workshop">Verksted *</label>
                  <input
                    id="workshop"
                    name="workshop"
                    type="text"
                    placeholder="Verkstednavn"
                    required
                    value={workshop}
                    onChange={(e) => setWorkshop(e.target.value)}
                  />
                </div>
                <div className="fr-row">
                  <label htmlFor="contact">Kontaktperson *</label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    placeholder="Ditt navn"
                    required
                  />
                </div>
              </div>
              <div className="fr-two">
                <div className="fr-row">
                  <label htmlFor="email">E-post *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="navn@verksted.no"
                    required
                  />
                </div>
                <div className="fr-row">
                  <label htmlFor="phone">Telefon *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="934 84 220"
                    required
                  />
                </div>
              </div>
              <div className="fr-row">
                <label htmlFor="employees">Antall ansatte</label>
                <select id="employees" name="employees" defaultValue="1-3">
                  <option value="1-3">1–3 ansatte</option>
                  <option value="3-6">3–6 ansatte</option>
                  <option value="6-10">6–10 ansatte</option>
                  <option value="10+">10+ ansatte</option>
                </select>
              </div>

              {state.error && <p className="fr-error">{state.error}</p>}

              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary btn-lg btn-arrow fr-submit"
              >
                {isPending ? "Sender…" : "Meld interesse"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 6l2.5 2.5L9.5 3.5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
