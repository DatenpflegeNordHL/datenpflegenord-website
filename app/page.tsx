"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { ProblemsSection } from "@/components/problems-section"
import { SolutionSection } from "@/components/solution-section"
import { NordAuditFunnel } from "@/components/nordaudit-funnel"
import { PruefbereicheSection } from "@/components/pruefbereiche-section"
import { KIProcessAutomation } from "@/components/ki-process-automation"
import { PortalSection } from "@/components/portal-section"
import { MassnahmenPortalSection } from "@/components/massnahmen-portal-section"
import { FindingEvidenceReviewSection } from "@/components/finding-evidence-review-section"
import { PortalDemoSection } from "@/components/portal-demo-section"
import { PackagesSection } from "@/components/packages-section"
import { TrustSection } from "@/components/trust-section"
import { FaqSection } from "@/components/faq-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { NordAuditForm } from "@/components/nordaudit-form"
import { KIProcessForm } from "@/components/ki-process-form"

export default function HomePage() {
  const [nordAuditOpen, setNordAuditOpen] = useState(false)
  const [kiProcessOpen, setKiProcessOpen] = useState(false)

  return (
    <main>
      <Header />
      <HeroSection />
      <ProductsSection />
      <ProblemsSection />
      <SolutionSection />
      <NordAuditFunnel />
      <PruefbereicheSection />
      <MassnahmenPortalSection />
      <FindingEvidenceReviewSection onAuditRequestClick={() => setNordAuditOpen(true)} />
      <PortalDemoSection />
      <KIProcessAutomation />
      <PortalSection />
      <PackagesSection 
        onNordAuditRequestClick={() => setNordAuditOpen(true)} 
        onKIProcessRequestClick={() => setKiProcessOpen(true)} 
      />
      <TrustSection />
      <FaqSection />
      <CtaSection 
        onNordAuditClick={() => setNordAuditOpen(true)} 
        onKIProcessClick={() => setKiProcessOpen(true)} 
      />
      <Footer />

      {/* Modals */}
      <NordAuditForm open={nordAuditOpen} onOpenChange={setNordAuditOpen} />
      <KIProcessForm open={kiProcessOpen} onOpenChange={setKiProcessOpen} />
    </main>
  )
}
