import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollReset from "@/components/ScrollReset";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0C005A" },
  ],
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://verkstedpakken.no"),
  title: {
    default: "Verkstedpakken — Verkstedprogrammet uten dobbeltarbeid",
    template: "%s | Verkstedpakken",
  },
  description:
    "Verkstedprogrammet uten dobbeltarbeid. Ordre, booking, mekanikerportal og faktura i ett system. 1 295 kr per bruker per mnd. Prøv gratis i 14 dager.",
  applicationName: "Verkstedpakken",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "verkstedprogram",
    "bilverksted programvare",
    "bilverksted system",
    "verksted SaaS",
    "verkstedprogram Norge",
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
    title: "Verkstedpakken — Verkstedprogrammet uten dobbeltarbeid",
    description:
      "Ordre, nettside og booking, mekanikerportal og faktura i ett system. Alt inkludert, ingen bindingstid. Prøv gratis i 14 dager.",
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
    title: "Verkstedpakken — Verkstedprogrammet uten dobbeltarbeid",
    description:
      "Ordre, nettside og booking, mekanikerportal og faktura i ett system. Prøv gratis i 14 dager.",
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
      operatingSystem: "Web",
      description:
        "Verkstedprogrammet uten dobbeltarbeid. Ordre, nettside og booking, mekanikerportal og faktura i ett system. Integrasjoner med Fiken, PowerOffice, Tripletex, Visma eAccounting, 24SevenOffice, Vipps, Stripe, BilXtra, MECA, MEKO og Statens vegvesen.",
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
        price: "1295",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "1295",
          priceCurrency: "NOK",
          unitText: "per bruker per måned",
          valueAddedTaxIncluded: false,
        },
        category: "SaaS subscription",
        url: `${SITE}/pris`,
      },
      provider: { "@id": `${SITE}/#org` },
      featureList: [
        "Verkstedordre og planlegging",
        "Mekanikerportal",
        "Booking på nett",
        "Kiosk og innstempling",
        "Kunder og kjøretøy",
        "Kjøretøyoppslag",
        "Deler og lager",
        "Dekkhotell",
        "Faktura og betaling",
        "Regnskapsintegrasjon",
        "Timer og lønnsgrunnlag",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: "Verkstedpakken",
      legalName: "Verkstedpakken AS",
      url: SITE,
      logo: `${SITE}/icon-512.png`,
      email: "hei@verkstedpakken.no",
      telephone: "+4793484220",
      vatID: "937000847",
      description:
        "Utvikler av Verkstedpakken — verkstedprogrammet uten dobbeltarbeid, for verksteder i Norge.",
      foundingDate: "2026",
      areaServed: { "@type": "Country", name: "Norway" },
      knowsLanguage: ["nb-NO", "no"],
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
        className={`${interTight.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ScrollReset />
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18381801939"
          strategy="afterInteractive"
        />
        <Script id="google-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18381801939');
          `}
        </Script>
      </body>
    </html>
  );
}
