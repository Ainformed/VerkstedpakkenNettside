import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Verkstedpakken",
    short_name: "Verkstedpakken",
    description:
      "Alt-i-ett SaaS-løsning for bilverksteder. Bilhåndtering, kundeoppfølging, fakturering og integrasjoner.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
