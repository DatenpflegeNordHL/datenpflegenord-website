import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DomainCheckSection } from "@/components/domain-check-section"
import { ProblemsSection } from "@/components/problems-section"
import { ServiceCardsSection } from "@/components/service-cards-section"
import { ComparisonSection } from "@/components/comparison-section"
import { StepsSection } from "@/components/steps-section"
import { PortalTeaserSection } from "@/components/portal-teaser-section"
import { BranchenRegionCtaSection } from "@/components/branchen-region-cta-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "KI-Systeme & Website-Checks in Schleswig-Holstein",
  description:
    "DatenpflegeNord unterstützt Unternehmen in Schleswig-Holstein, Lübeck, Kiel und Hamburg mit KI-Systemen, Website-Checks, Monitoring und klaren Maßnahmen.",
  alternates: { canonical: "https://datenpflege-nord.de" },
}

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <DomainCheckSection />
      <ProblemsSection />
      <ServiceCardsSection />
      <ComparisonSection />
      <StepsSection />
      <PortalTeaserSection />
      <BranchenRegionCtaSection />
      <Footer />
    </main>
  )
}
