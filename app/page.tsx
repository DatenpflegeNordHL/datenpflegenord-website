import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProblemsSection } from "@/components/problems-section"
import { ServiceCardsSection } from "@/components/service-cards-section"
import { ProcessJourneySection } from "@/components/process-journey-section"
import { ComplianceTopicsSection } from "@/components/compliance-topics-section"
import { SampleAuditPreview } from "@/components/sample-audit-preview"
import { ComparisonSection } from "@/components/comparison-section"
import { StepsSection } from "@/components/steps-section"
import { PortalTeaserSection } from "@/components/portal-teaser-section"
import { BranchenRegionCtaSection } from "@/components/branchen-region-cta-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Website-Checks und KI-Systeme für KMU",
  description:
    "DatenpflegeNord prüft Websites, digitale Pflichtstellen und Büroprozesse für kleine Unternehmen in Schleswig-Holstein – technisch, verständlich und ohne Rechtsberatung.",
  alternates: { canonical: "https://datenpflegenord.de" },
}

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ProblemsSection />
      <ServiceCardsSection />
      <ProcessJourneySection />
      <StepsSection />
      <PortalTeaserSection />
      <SampleAuditPreview />
      <ComparisonSection />
      <ComplianceTopicsSection />
      <BranchenRegionCtaSection />
      <Footer />
    </main>
  )
}
