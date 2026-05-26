import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProblemsSection } from "@/components/problems-section"
import { ServiceCardsSection } from "@/components/service-cards-section"
import { ComplianceTopicsSection } from "@/components/compliance-topics-section"
import { SampleAuditPreview } from "@/components/sample-audit-preview"
import { ComparisonSection } from "@/components/comparison-section"
import { StepsSection } from "@/components/steps-section"
import { PortalTeaserSection } from "@/components/portal-teaser-section"
import { BranchenRegionCtaSection } from "@/components/branchen-region-cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ProblemsSection />
      <ServiceCardsSection />
      <ComplianceTopicsSection />
      <SampleAuditPreview />
      <ComparisonSection />
      <StepsSection />
      <PortalTeaserSection />
      <BranchenRegionCtaSection />
      <Footer />
    </main>
  )
}
