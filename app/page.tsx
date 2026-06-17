import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HomepageQuickcheckSection } from "@/components/homepage-quickcheck-section"
import { PdfReportPreview } from "@/components/pdf-report-preview"
import { AiSystemsSection } from "@/components/ai-systems-section"
import { KiProcessVisual } from "@/components/ki-process-visual"
import { ServiceCardsSection } from "@/components/service-cards-section"
import { MassnahmenportalPreview } from "@/components/massnahmenportal-preview"
import { MonitoringPreview } from "@/components/monitoring-preview"
import { StepsSection } from "@/components/steps-section"
import { TeamSection } from "@/components/team-section"
import { GmbhTrustSection } from "@/components/gmbh-trust-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "KI-Systeme und Website-Checks für Unternehmen – DatenpflegeNord",
  description:
    "DatenpflegeNord baut KI-Systeme für wiederkehrende Unternehmensprozesse und prüft Websites auf technische Signale. Eine Marke der NordWerk Digital GmbH.",
  alternates: { canonical: "https://datenpflege-nord.de" },
}

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <HomepageQuickcheckSection />
      <PdfReportPreview />
      <AiSystemsSection />
      <KiProcessVisual />
      <ServiceCardsSection />
      <MassnahmenportalPreview />
      <MonitoringPreview />
      <StepsSection />
      <TeamSection />
      <GmbhTrustSection />
      <Footer />
    </main>
  )
}
