import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://data.brreg.no https://vitals.vercel-insights.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://www.google.com https://googleads.g.doubleclick.net",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // Gamle indekserte URL-er fra forrige design → nye ruter
  async redirects() {
    return [
      { source: "/om-oss", destination: "/", permanent: true },
      { source: "/demo", destination: "/", permanent: true },
      // Demo-/interessesiden er fjernet (aug 2026) — prøv gratis-løpet tar over.
      { source: "/interesse", destination: "/", permanent: true },
      // Timeregistrering- og EU-kontroll-pilarsidene er fjernet (25. aug 2026).
      { source: "/timeregistrering", destination: "/", permanent: true },
      { source: "/eu-kontroll", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
