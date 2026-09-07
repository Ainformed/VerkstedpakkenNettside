import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";

// Norsk ligger uten prefiks i URL-en, men internt bor alle sider under
// app/[lang]. Vi omskriver /pris -> /nb/pris (URL-en i nettleseren endres ikke)
// og sender /nb/pris videre til /pris så det bare finnes én norsk URL.
export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];

  if (first === DEFAULT_LOCALE) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(`/${DEFAULT_LOCALE}`.length) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (isLocale(first)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Hopp over Next-interne filer, API, metadata-ruter og statiske filer.
  matcher: [
    "/((?!_next|api|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|favicon\\.ico|.*\\..*).*)",
  ],
};
