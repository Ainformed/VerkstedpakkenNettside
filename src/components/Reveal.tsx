"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** CSS selector for child elements to stagger. If omitted, just reveals the wrapper itself. */
  stagger?: string;
  /** Delay between each staggered child, in ms */
  step?: number;
  /** Threshold (0-1) of element visibility before reveal triggers */
  threshold?: number;
  /** Inline className passthrough */
  className?: string;
};

export default function Reveal({
  children,
  stagger,
  step = 80,
  threshold = 0.12,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets: Element[] = stagger
      ? Array.from(root.querySelectorAll(stagger))
      : [root];

    targets.forEach((el, i) => {
      el.classList.add("reveal");
      if (stagger) {
        (el as HTMLElement).style.transitionDelay = `${i * step}ms`;
      }
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [stagger, step, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
