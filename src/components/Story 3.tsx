"use client";

import { useEffect, useRef } from "react";

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
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
  }, []);

  return (
    <section className="bg-bg-alt px-8 py-28 lg:px-12 lg:py-36" ref={ref}>
      <div className="mx-auto max-w-[720px]">
        <p className="reveal text-[13px] font-semibold uppercase tracking-[0.2em] text-primary">
          Bygget fra innsiden
        </p>

        <h2
          className="reveal mt-3 font-[family-name:var(--font-bricolage)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-fg"
          style={{ transitionDelay: "80ms" }}
        >
          Vi har stått i kaoset selv
        </h2>

        <p
          className="reveal mt-4 text-[16px] leading-[1.65] text-sub"
          style={{ transitionDelay: "160ms" }}
        >
          Verkstedpakken er ikke laget av folk som har lest om bransjen — den er
          bygget med 6 års erfaring fra verkstedgulvet. Vi har sett på nært hold
          hvordan vanskelige systemer skaper administrativt kaos, og hvordan
          verksteder blør penger fordi utført arbeid aldri ender på en faktura.
        </p>

        <div
          className="reveal mt-8 rounded-lg border-l-4 border-primary bg-bg p-6"
          style={{ transitionDelay: "240ms" }}
        >
          <p className="text-[15px] leading-[1.65] text-fg">
            Et verksted vi nylig startet samarbeid med gikk konkurs — ikke på
            grunn av for få kunder, men fordi de mistet kontrollen over driften.
            Fakturaer ble glemt, og kunder fikk dyre jobber utført helt gratis.
            Det er dette problemet vi løser.
          </p>
        </div>
      </div>
    </section>
  );
}
