import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CtaSection } from "@/components/landing/CtaSection";
import { SupportSection } from "@/components/landing/SupportSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <SupportSection />
      <CtaSection />
    </>
  );
}
