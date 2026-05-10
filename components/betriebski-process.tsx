import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ListChecks,
  Search,
  FlaskConical,
  Workflow,
  Settings2,
  type LucideIcon,
} from "lucide-react"

interface StepItem {
  number: string
  title: string
  text: string
  icon: LucideIcon
}

const steps: StepItem[] = [
  {
    number: "01",
    title: "Prozess auswählen",
    text: "Zum Beispiel Buchhaltung, Abrechnung, Dokumentenverarbeitung, Personalplanung, Ausfallmanagement, Kundenservice oder interne Wissensdatenbanken.",
    icon: ListChecks,
  },
  {
    number: "02",
    title: "KI Prozesscheck durchführen",
    text: "Wir prüfen Aufwand, Datenlage, Risiken, Schnittstellen und Nutzen.",
    icon: Search,
  },
  {
    number: "03",
    title: "KI Workflow Pilot planen",
    text: "Ein klar begrenzter Prozess wird als Prototyp umgesetzt.",
    icon: FlaskConical,
  },
  {
    number: "04",
    title: "KI-Agenten für Unternehmen entwickeln",
    text: "Der Agent unterstützt wiederkehrende Aufgaben, bereitet Entscheidungen vor und dokumentiert Ergebnisse.",
    icon: Workflow,
  },
  {
    number: "05",
    title: "KI Betrieb & Automatisierungs-Support",
    text: "Abläufe werden kontrolliert, verbessert und mit Human-in-the-loop-Freigaben abgesichert.",
    icon: Settings2,
  },
]

export function BetriebskiProcess() {
  return (
    <section id="ki-prozess" className="py-16 md:py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase mb-4">
            KI Prozessautomatisierung
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Von der wiederkehrenden Aufgabe zum produktiven KI-System
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            KI Prozessautomatisierung für KMU beginnt nicht mit einem Tool, sondern mit einem konkreten Prozess.
            Gemeinsam prüfen wir, wo KI sinnvoll unterstützt, welche Daten benötigt werden
            und welche Freigaben beim Menschen bleiben.
          </p>
        </div>

        <div className="flex flex-col gap-0">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex gap-6 group">
              {/* Left: number + line */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-12 h-12 rounded-full bg-card border-2 border-accent flex items-center justify-center shadow-sm">
                  <span className="text-sm font-bold text-accent">{step.number}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-px flex-1 bg-border my-2" style={{ minHeight: "2rem" }} />
                )}
              </div>

              {/* Right: content card with watermark */}
              <div className="relative pb-8 flex-1 bg-card border border-border rounded-xl p-5 mb-4 overflow-hidden shadow-sm">
                {/* Watermark icon */}
                <div
                  className="absolute -right-3 -bottom-3 md:-right-2 md:-bottom-2 pointer-events-none select-none"
                  aria-hidden="true"
                >
                  <step.icon
                    className="w-20 h-20 md:w-24 md:h-24 text-accent opacity-[0.06]"
                    strokeWidth={1}
                  />
                </div>

                <div className="relative z-10">
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#pakete">
              KI Prozesscheck anfragen <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
