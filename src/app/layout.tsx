import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://verkstedpakken.no"),
  title: {
    default: "Verkstedpakken – Alt-i-ett-løsning for bilverksteder",
    template: "%s | Verkstedpakken",
  },
  description:
    "Verkstedpakken er et komplett SaaS-verktøy for alle typer verksteder. Bil, båt, lastebil og anleggsmaskiner. Kundeoppfølging, fakturering og integrasjoner med Fiken, Tripletex, MEKO og Stripe.",
  keywords: [
    "bilverksted",
    "verksted",
    "bilverksted programvare",
    "verksted system",
    "bilverksted fakturering",
    "Fiken integrasjon",
    "Tripletex integrasjon",
    "MEKO bildeler",
    "Stripe betaling",
    "verksted drift",
    "bilverksted Norge",
    "SaaS bilverksted",
  ],
  authors: [{ name: "Verkstedpakken" }],
  creator: "Verkstedpakken",
  publisher: "Verkstedpakken",
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: "https://verkstedpakken.no",
    siteName: "Verkstedpakken",
    title: "Verkstedpakken – Alt-i-ett-løsning for bilverksteder",
    description:
      "Komplett SaaS-verktøy for bilverksteder med integrasjoner mot Fiken, Tripletex, MEKO og Stripe.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Verkstedpakken – Effektiviser bilverkstedet ditt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verkstedpakken – Alt-i-ett-løsning for bilverksteder",
    description:
      "Komplett SaaS-verktøy for bilverksteder med integrasjoner mot Fiken, Tripletex, MEKO og Stripe.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://verkstedpakken.no",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function JsonLd() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Verkstedpakken",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Alt-i-ett SaaS-løsning for bilverksteder. Bilhåndtering, kundeoppfølging, fakturering og integrasjoner med Fiken, Tripletex, MEKO og Stripe.",
      url: "https://verkstedpakken.no",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "NOK",
      },
      featureList: [
        "Bilhåndtering og oversikt",
        "Kundeoppfølging",
        "Fakturering og økonomi",
        "Lager og deler",
        "Fiken-integrasjon",
        "Tripletex-integrasjon",
        "MEKO-integrasjon",
        "Stripe-integrasjon",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Verkstedpakken",
      url: "https://verkstedpakken.no",
      email: "salg@verkstedpakken.no",
      description:
        "Utvikler av SaaS-løsninger for bilverksteder i Norge.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Verkstedpakken",
      url: "https://verkstedpakken.no",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://verkstedpakken.no/?q={search_term_string}",
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
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
