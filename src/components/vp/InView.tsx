"use client";

import { useEffect, useRef } from "react";

/* Legger på klassen `in-view` når elementet blir synlig — brukes av
   landingssidens kolonner (staggered figIn-animasjon i vp-site.css). */
export default function InView({
  className,
  children,
  threshold = 0.25,
}: {
  className?: string;
  children: React.ReactNode;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            io.disconnect();
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
