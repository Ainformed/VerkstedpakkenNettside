"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const integrations = [
  { name: "Fiken", logo: "/logos/fiken.svg", height: "h-20" },
  { name: "Tripletex", logo: "/logos/tripletex.png", height: "h-12" },
  { name: "MEKO", logo: "/logos/meko.png", height: "h-10" },
  { name: "Stripe", logo: "/logos/stripe.png", height: "h-10" },
  { name: "PowerOffice", logo: "/logos/poweroffice.png", height: "h-10" },
  { name: "Statens vegvesen", logo: "/logos/vegvesen2.png", height: "h-14" },
  { name: "Brønnøysundregistrene", logo: "/logos/brreg.png", height: "h-8" },
  { name: "Kartverket", logo: "/logos/kartverket2.png", height: "h-14" },
];

export default function Integrations() {
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
      { threshold: 0.15 }
    );

    el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="integrasjoner" className="bg-bg-alt px-8 py-28 lg:px-12 lg:py-36" ref={ref}>
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-xl">
          <p className="reveal text-[13px] font-semibold uppercase tracking-[0.2em] text-primary">
            Integrasjoner
          </p>
          <h2 className="reveal mt-3 font-[family-name:var(--font-bricolage)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-tight text-fg" style={{ transitionDelay: "80ms" }}>
            Koblet til systemene du bruker
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {integrations.map((item, i) => (
            <div
              key={item.name}
              className="reveal group flex items-center justify-center rounded-2xl border border-line bg-bg px-6 py-8 transition-all duration-300 hover:border-primary/15 hover:shadow-md hover:shadow-primary/5"
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <Image
                src={item.logo}
                alt={`${item.name} logo`}
                width={200}
                height={64}
                className={`${item.height} w-auto object-contain`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
