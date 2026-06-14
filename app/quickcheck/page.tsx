import type { Metadata } from "next"
import { Globe, ScanSearch, ListOrdered, Info } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DomainChecker } from "@/components/domain-checker"

export const metadata: Metadata = {
  title: "Quickcheck starten",
  description:
    "Website einreichen und eine technische Ersteinschätzung für DatenpflegeNord prüfen lassen.",
  alternates: { canonical: "https://datenpflege-nord.de/quickcheck" },
}

const steps = [
  {
    icon: Globe,
    title: "Website einreichen",
    description:
      "Teilen Sie Ihre Website-URL oder Domain. Das reicht für eine erste technische Einordnung.",
  },
  {
    icon: ScanSearch,
    title: "Technische Signale prüfen lassen",
    description:
      "Wir sichten Ihre Website auf Pflichtstellen-Signale, BFSG-Relevanz und technische Hinweise – nachvollziehbar und ohne Fachbegriff-Überflutung.",
  },
  {
    icon: ListOrdered,
    title: "Priorisierte nächste Schritte erhalten",
    description:
      "Sie erhalten eine klare Einordnung, welcher Einstieg sinnvoll ist und was technisch als Erstes ansteht.",
  },
]

export default function QuickcheckPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Erster Schritt
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-4">
              Quickcheck starten
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              Senden Sie Ihre Website oder Domain. Der Schnellcheck liefert eine technische
              Ersteinschätzung zu sichtbaren Signalen und möglichen nächsten Schritten.
            </p>

            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {steps.map(({ icon: Icon, title, description }, i) => (
                <div
                  key={title}
                  className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">
                      Schritt {i + 1}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground mb-1.5 text-balance">{title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-xl p-4 mb-8">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Der Quickcheck liefert technische Hinweise und eine erste Einordnung. Er ersetzt
                keine Rechtsberatung und keine behördliche Zertifizierung.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5 md:p-6">
              <DomainChecker />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
