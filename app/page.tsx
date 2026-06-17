import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProblemsSection } from "@/components/problems-section"
import { ServiceCardsSection } from "@/components/service-cards-section"
import { StepsSection } from "@/components/steps-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Website-Checks und KI-Systeme für KMU",
  description:
    "DatenpflegeNord prüft Websites, digitale Pflichtstellen und Büroprozesse für kleine Unternehmen in Schleswig-Holstein – technisch, verständlich und ohne Rechtsberatung.",
  alternates: { canonical: "https://datenpflege-nord.de" },
}

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ProblemsSection />
      <ServiceCardsSection />
      <StepsSection />

      {/* Disclaimer */}
      <section aria-label="Rechtlicher Hinweis" className="bg-background border-t border-border/40 py-10">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.22em] font-light uppercase text-foreground/30 mb-3">
              Sachliche Einschätzung statt Versprechen
            </p>
            <p className="text-[12px] font-light text-foreground/40 leading-relaxed">
              Unsere Auswertung zeigt sichtbare technische und strukturelle Hinweise, priorisiert nächste Schritte
              und ersetzt keine anwaltliche Rechtsberatung. Wir behaupten keine behördliche Zertifizierung
              und keine garantierte Konformität.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
