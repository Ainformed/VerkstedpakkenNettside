"use client";

import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_META, localePath, type Locale } from "@/i18n/config";

/* Språkvelger. Bytter prefiks på gjeldende sti, så du lander på samme side
   i nytt språk. Vanlig <a> (ikke Link) så proxy-en får kjøre på nytt. */
export default function LangSwitcher({
  lang,
  label,
  className = "",
  variant = "list",
}: {
  lang: Locale;
  label: string;
  className?: string;
  /** "menu": kompakt nedtrekk med språkkode (toppmeny). "list": alle språk synlig. */
  variant?: "menu" | "list";
}) {
  const pathname = usePathname() || "/";
  // Strip eget prefiks: /en/pris -> /pris ; /pris -> /pris
  const first = pathname.split("/")[1];
  const bare = LOCALES.includes(first as Locale)
    ? pathname.slice(first.length + 1) || "/"
    : pathname;

  const links = LOCALES.map((l) => (
        <a
          key={l}
          href={localePath(l, bare)}
          hrefLang={LOCALE_META[l].htmlLang}
          lang={LOCALE_META[l].htmlLang}
          aria-current={l === lang ? "page" : undefined}
          className={l === lang ? "active" : undefined}
        >
          {LOCALE_META[l].name}
        </a>
  ));

  if (variant === "menu") {
    return (
      <details className={`lang-menu ${className}`.trim()}>
        <summary aria-label={label}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
          </svg>
          {lang.toUpperCase()}
        </summary>
        <nav className="lang-menu-list" aria-label={label}>{links}</nav>
      </details>
    );
  }

  return (
    <nav className={`lang-switch ${className}`.trim()} aria-label={label}>
      {links}
    </nav>
  );
}
