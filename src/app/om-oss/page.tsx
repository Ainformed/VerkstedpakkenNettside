import type { Metadata } from "next";
import Header from "@/components/Header";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Om oss",
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
