import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Product from "@/components/Product";
import Roles from "@/components/Roles";
import Integrations from "@/components/Integrations";
import Pricing from "@/components/Pricing";
import InterestList from "@/components/InterestList";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <Product />
        <Roles />
        <Integrations />
        <Pricing />
        <InterestList />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
