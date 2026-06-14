import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Product from "@/components/Product";
import Roles from "@/components/Roles";
import Process from "@/components/Process";
import Integrations from "@/components/Integrations";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import InterestList from "@/components/InterestList";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import DemoScroll from "@/components/DemoScroll";

export default function Home() {
  return (
    <>
      <Header />
      <DemoScroll />
      <main>
        <Hero />
        <Reveal stagger=".pain-card" step={80}>
          <Problems />
        </Reveal>
        <Reveal stagger=".product-card" step={100}>
          <Product />
        </Reveal>
        <Reveal stagger=".role" step={90}>
          <Roles />
        </Reveal>
        <Reveal stagger=".proc-step" step={90}>
          <Process />
        </Reveal>
        <Reveal stagger=".int-card" step={50}>
          <Integrations />
        </Reveal>
        <Reveal>
          <Comparison />
        </Reveal>
        <Reveal>
          <Pricing />
        </Reveal>
        <InterestList />
        <Reveal stagger=".faq-q" step={40}>
          <FAQ />
        </Reveal>
        <Reveal>
          <CTA />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
