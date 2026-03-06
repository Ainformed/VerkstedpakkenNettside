"use client";

import { useEffect, useRef, useActionState, useState, useCallback } from "react";
import { submitInterest, type InterestState } from "@/app/actions/interest";

const initialState: InterestState = { success: false, error: "" };

export default function InterestList() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [state, formAction, isPending] = useActionState(submitInterest, initialState);
  const [showForm, setShowForm] = useState(false);
  const [orgnr, setOrgnr] = useState("");
  const [workshop, setWorkshop] = useState("");
  const [lookupStatus, setLookupStatus] = useState<"idle" | "loading" | "found" | "not-found">("idle");

  const lookupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lookupOrg = useCallback(async (value: string) => {
    const digits = value.replace(/\s/g, "");
    if (digits.length !== 9) {
      setLookupStatus("idle");
      return;
    }
    setLookupStatus("loading");
    try {
      const res = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${digits}`);
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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [showForm]);

  return (
    <section id="interesse" className="bg-bg-alt px-8 py-28 lg:px-12 lg:py-36" ref={sectionRef}>
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="reveal text-[13px] font-semibold uppercase tracking-[0.2em] text-primary">
          Interesseliste
        </p>
        <h2
          className="reveal mt-3 font-[family-name:var(--font-bricolage)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-fg"
          style={{ transitionDelay: "80ms" }}
        >
          Meld din interesse for Verkstedpakken
        </h2>
        <p
          className="reveal mx-auto mt-4 max-w-[540px] text-[16px] leading-[1.65] text-sub"
          style={{ transitionDelay: "160ms" }}
        >
          Fyll ut skjemaet så tar vi kontakt for en uforpliktende prat om hvordan Verkstedpakken kan passe ditt verksted.
        </p>

        {state.success ? (
          <div className="reveal visible mx-auto mt-12 max-w-md rounded-2xl border border-line bg-bg p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <svg
                className="h-7 w-7 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h3 className="mt-5 font-[family-name:var(--font-bricolage)] text-[20px] font-bold text-fg">
              Takk for din interesse!
            </h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-sub">
              Vi har mottatt informasjonen din og tar kontakt så snart vi kan. Sjekk e-posten din for en bekreftelse.
            </p>
          </div>
        ) : !showForm ? (
          <div className="reveal mt-12" style={{ transitionDelay: "200ms" }}>
            <button
              onClick={() => setShowForm(true)}
              className="rounded-full bg-primary px-10 py-4 text-[15px] font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:brightness-125"
            >
              Meld interesse
            </button>
          </div>
        ) : (
          <form action={formAction} className="reveal visible mx-auto mt-12 max-w-md space-y-4 text-left">
            <div>
              <label htmlFor="orgnr" className="block text-[13px] font-medium text-fg">
                Org.nr
              </label>
              <div className="relative">
                <input
                  id="orgnr"
                  name="orgnr"
                  type="text"
                  inputMode="numeric"
                  placeholder="9 siffer"
                  value={orgnr}
                  onChange={(e) => handleOrgnrChange(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-line bg-bg px-4 py-3 text-[14px] text-fg outline-none transition-colors focus:border-primary"
                />
                {lookupStatus === "loading" && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                )}
                {lookupStatus === "found" && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                )}
              </div>
              {lookupStatus === "found" && workshop && (
                <p className="mt-1.5 text-[13px] text-primary">{workshop}</p>
              )}
              {lookupStatus === "not-found" && (
                <p className="mt-1.5 text-[13px] text-sub">Fant ikke organisasjon — fyll inn manuelt under</p>
              )}
            </div>
            <div>
              <label htmlFor="workshop" className="block text-[13px] font-medium text-fg">
                Verkstednavn <span className="text-primary">*</span>
              </label>
              <input
                id="workshop"
                name="workshop"
                type="text"
                required
                value={workshop}
                onChange={(e) => setWorkshop(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-line bg-bg px-4 py-3 text-[14px] text-fg outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-[13px] font-medium text-fg">
                Kontaktperson <span className="text-primary">*</span>
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                required
                className="mt-1.5 w-full rounded-xl border border-line bg-bg px-4 py-3 text-[14px] text-fg outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[13px] font-medium text-fg">
                E-post <span className="text-primary">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1.5 w-full rounded-xl border border-line bg-bg px-4 py-3 text-[14px] text-fg outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-[13px] font-medium text-fg">
                Telefon <span className="text-primary">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1.5 w-full rounded-xl border border-line bg-bg px-4 py-3 text-[14px] text-fg outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="employees" className="block text-[13px] font-medium text-fg">
                Antall ansatte
              </label>
              <select
                id="employees"
                name="employees"
                className="mt-1.5 w-full rounded-xl border border-line bg-bg px-4 py-3 text-[14px] text-fg outline-none transition-colors focus:border-primary"
              >
                <option value="">Velg...</option>
                <option value="1-3">1–3 ansatte</option>
                <option value="3-6">3–6 ansatte</option>
                <option value="6-10">6–10 ansatte</option>
                <option value="10+">10+ ansatte</option>
              </select>
            </div>

            {state.error && <p className="text-[13px] text-red-600">{state.error}</p>}

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full rounded-full bg-primary px-8 py-3.5 text-[15px] font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Sender..." : "Send"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
