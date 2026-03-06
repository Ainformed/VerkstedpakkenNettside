import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Features from "@/components/Features";
import Integrations from "@/components/Integrations";


import FAQ from "@/components/FAQ";
import InterestList from "@/components/InterestList";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <Features />
        <Integrations />
        <FAQ />
        <InterestList />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
