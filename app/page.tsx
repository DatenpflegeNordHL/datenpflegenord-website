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

      {/* Disclaimer section */}
      <section aria-label="Rechtlicher Hinweis" className="bg-secondary/40 border-t border-border/60 py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/60 mb-3">
              Sachliche Einschätzung statt Versprechen.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unsere Auswertung zeigt sichtbare technische und strukturelle Hinweise,
              priorisiert nächste Schritte und ersetzt keine anwaltliche Rechtsberatung.
              Wir behaupten keine behördliche Zertifizierung und keine garantierte Konformität.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
