"use client";

import { useEffect } from "react";

// Forsiden ankommet fra /demo (?goto=demo): scroll til interesse-skjemaet.
// Kjører med liten forsinkelse så den vinner over ScrollReset sin scrollTo(0,0).
export default function DemoScroll() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("goto") !== "demo") return;

    const id = window.setTimeout(() => {
      document
        .getElementById("interesse")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      // Fjern goto fra URL-en, behold ?src= for sporing.
      params.delete("goto");
      const qs = params.toString();
      window.history.replaceState(
        null,
        "",
        window.location.pathname + (qs ? `?${qs}` : ""),
      );
    }, 140);

    return () => window.clearTimeout(id);
  }, []);

  return null;
}
