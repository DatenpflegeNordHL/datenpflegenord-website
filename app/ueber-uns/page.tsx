import Link from "next/link"
import { ArrowRight, Info, Search, ListOrdered, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"

const pillars = [
  {
    icon: Search,
    title: "Technisch prüfen",
    description:
      "Wir sichten Websites, Pflichtstellen und Büroprozesse auf technische Hinweise und Prüfsignale – systematisch und nachvollziehbar.",
  },
  {
    icon: ListOrdered,
    title: "Verständlich priorisieren",
    description:
      "Jede Prüfung endet mit einer klaren Aufgabenliste. Kein Fachchinesisch, sondern konkrete nächste Schritte mit Priorität.",
  },
  {
    icon: Wrench,
    title: "Umsetzung begleiten",
    description:
      "Wir bleiben bei der Umsetzung dabei – ob technischer Fix, Prozessanpassung oder einfache Automation.",
  },
]

export default function UeberUnsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">

        {/* Intro */}
        <section className="py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Über DatenpflegeNord
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-5">
              Technische Prüfung für kleine Unternehmen in Schleswig-Holstein
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              DatenpflegeNord ist ein technisches Prüf- und Umsetzungsbüro für kleine Unternehmen
              in Schleswig-Holstein. Wir prüfen digitale Pflichtstellen, Barrierefreiheits-Signale
              und Büroprozesse – mit klaren Prioritäten und ohne Rechtsberatungsversprechen.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Unser Ansatz ist pragmatisch: technische Hinweise liefern, Risiken einordnen,
              nächste Schritte benennen. Ohne Fachchinesisch. Ohne übertriebene
              Zertifizierungsversprechen.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-14 md:py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <h2 className="text-xl md:text-2xl font-bold text-foreground text-balance leading-tight mb-3">
                Wofür DatenpflegeNord steht
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {pillars.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1.5">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <TeamSection />

        {/* Disclaimer + CTA */}
        <section className="py-14 md:py-20 border-t border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
            <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-xl p-4">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unsere Arbeit liefert technische Hinweise und Prioritäten. Sie ersetzt keine
                Rechtsberatung und keine behördliche Zertifizierung.
              </p>
            </div>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit">
              <Link href="/kontakt" className="flex items-center gap-2">
                Kontakt aufnehmen <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
