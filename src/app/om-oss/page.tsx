import type { Metadata } from "next";
import Header from "@/components/Header";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Verkstedpakken er bygget av folk med 6 år på verkstedgulvet. Møt teamet bak verkstedsystemet som forstår hverdagen til norske verksteder.",
  alternates: {
    canonical: "/om-oss",
  },
  openGraph: {
    title: "Om oss | Verkstedpakken",
    description:
      "Møt teamet bak Verkstedpakken. Bygget av folk med 6 år på verkstedgulvet, for norske verksteder.",
    url: "/om-oss",
    type: "website",
    locale: "nb_NO",
    siteName: "Verkstedpakken",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Verkstedpakken | Om oss",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Om oss | Verkstedpakken",
    description: "Møt teamet bak Verkstedpakken.",
    images: ["/og-image.png"],
  },
};

export default function OmOss() {
  return (
    <>
      <Header />
      <main>
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}
