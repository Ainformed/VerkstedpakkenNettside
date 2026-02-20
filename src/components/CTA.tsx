"use client";

import { useEffect, useRef } from "react";

export default function CTA() {
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
      { threshold: 0.2 }
    );

    el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="kontakt" className="px-8 py-28 lg:px-12 lg:py-36" ref={ref}>
      <div className="reveal mx-auto max-w-[1200px] rounded-3xl bg-primary px-10 py-20 text-center lg:px-20 lg:py-24">
        <h2 className="font-[family-name:var(--font-bricolage)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-white">
          Klar for å prøve?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-[1.65] text-white/55">
          Book en uforpliktende demo tilpasset ditt verksted.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="mailto:salg@verkstedpakken.no"
            className="rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-primary transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-white/25"
          >
            salg@verkstedpakken.no
          </a>
          <a
            href="tel:+4793484220"
            className="rounded-full border border-white/20 px-8 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:scale-105 hover:border-white/50 hover:bg-white/10"
          >
            934 84 220
          </a>
        </div>
      </div>
    </section>
  );
}
