import type { Metadata, Viewport } from "next";
import { Geist_Mono, Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import ScrollReset from "@/components/ScrollReset";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5efe7" },
    { media: "(prefers-color-scheme: dark)", color: "#241d44" },
  ],
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://verkstedpakken.no"),
  title: {
    default:
      "Verkstedpakken — Komplett verkstedsystem bygget fra verkstedgulvet",
    template: "%s | Verkstedpakken",
  },
  description:
    "Verkstedpakken samler ordre, kundechat, deler, timer og egen nettside i ett system. Bygget etter 6 år på verkstedgulvet, for bil, båt, lastebil og anleggsverksteder i Norge. Integrasjoner med Fiken, Tripletex, MEKO og Stripe.",
  applicationName: "Verkstedpakken",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "verkstedsystem",
    "bilverksted programvare",
    "bilverksted system",
    "verksted SaaS",
    "verkstedsystem Norge",
    "ordresystem verksted",
    "fakturering bilverksted",
    "kundeoppfølging verksted",
    "deler og lager verksted",
    "timeregistrering verksted",
    "Fiken integrasjon verksted",
    "Tripletex integrasjon verksted",
    "MEKO bildeler integrasjon",
    "Stripe betaling verksted",
    "bilverksted Oslo",
    "båtverksted system",
    "lastebilverksted system",
    "anleggsverksted system",
  ],
  authors: [{ name: "Verkstedpakken", url: "https://verkstedpakken.no" }],
  creator: "Verkstedpakken",
  publisher: "Verkstedpakken",
  category: "Business Software",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: "https://verkstedpakken.no",
    siteName: "Verkstedpakken",
    title: "Verkstedpakken — Komplett verkstedsystem bygget fra verkstedgulvet",
    description:
      "Ordre, kundechat, deler, timer og egen nettside i ett system. Bygget etter 6 år på verkstedgulvet, for alle typer verksteder.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Verkstedpakken — komplett system for verksteder",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@verkstedpakken",
    creator: "@verkstedpakken",
    title: "Verkstedpakken — Komplett verkstedsystem",
    description:
      "Ordre, kundechat, deler, timer og egen nettside i ett system. Bygget fra verkstedgulvet.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "nb-NO": "/",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-512.png", sizes: "512x512", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Legg til Google Search Console verification-token her når du har det:
    // google: "xxxxxxxxxxxxxxxx",
  },
};

function JsonLd() {
  const SITE = "https://verkstedpakken.no";
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${SITE}/#software`,
      name: "Verkstedpakken",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Workshop Management Software",
      operatingSystem: "Web, iOS, Android",
      description:
        "Alt-i-ett SaaS-løsning for verksteder. Ordre, kundechat, deler, timer, mekanikerportal og egen nettside i ett system. Integrasjoner med Fiken, Tripletex, MEKO og Stripe.",
      url: SITE,
      image: `${SITE}/og-image.png`,
      screenshot: `${SITE}/og-image.png`,
      inLanguage: "nb-NO",
      availableOnDevice: "Desktop, Tablet, Mobile",
      softwareVersion: "1.0",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "NOK",
        category: "SaaS subscription",
        url: `${SITE}/#interesse`,
      },
      aggregateRating: undefined,
      provider: { "@id": `${SITE}/#org` },
      featureList: [
        "Ordrehåndtering",
        "Kundechat og oppfølging",
        "Deler og lager",
        "Timeregistrering",
        "Mekanikerportal",
        "Egen verkstednettside",
        "Booking-moduler",
        "Fiken-integrasjon",
        "Tripletex-integrasjon",
        "MEKO-integrasjon",
        "Stripe-betaling",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: "Verkstedpakken",
      legalName: "Verkstedpakken",
      url: SITE,
      logo: `${SITE}/icon-512.png`,
      email: "hei@verkstedpakken.no",
      description:
        "Utvikler av SaaS-løsninger for verksteder i Norge. Bygget etter 6 år på verkstedgulvet.",
      foundingDate: "2026",
      areaServed: { "@type": "Country", name: "Norway" },
      knowsLanguage: ["nb-NO", "no"],
      sameAs: [],
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "hei@verkstedpakken.no",
          contactType: "customer support",
          areaServed: "NO",
          availableLanguage: ["Norwegian", "Bokmål"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "Verkstedpakken",
      url: SITE,
      inLanguage: "nb-NO",
      publisher: { "@id": `${SITE}/#org` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
      >
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
