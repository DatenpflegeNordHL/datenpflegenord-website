import { ScanSearch, ListOrdered, UserCheck } from "lucide-react"

const benefits = [
  {
    icon: ScanSearch,
    title: "Automatisierte Vorprüfung",
    text: "Regelmäßige Scans liefern technische Hinweise, potenzielle Risiken und nachvollziehbare Auffälligkeiten.",
  },
  {
    icon: ListOrdered,
    title: "Priorisierte Handlungsempfehlungen",
    text: "Findings werden nicht nur gesammelt, sondern nach Relevanz, Dringlichkeit und Umsetzbarkeit sortiert.",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-loop",
    text: "KI unterstützt die Arbeit. Entscheidungen, Freigaben und Bewertungen bleiben beim Menschen.",
  },
]

export function SolutionSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-6">
            DatenpflegeNord schafft Klarheit: prüfen, priorisieren, automatisieren.
          </h2>
          <p className="text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Mit WebPflicht Monitor erhalten Sie eine strukturierte Website-Vorprüfung mit Findings,
            Reports und monatlicher Historie. Mit BetriebsKI entwickeln wir passgenaue KI-Systeme
            für konkrete Aufgaben im Unternehmen. Im Klarsicht Portal sehen Kunden den aktuellen
            Status, offene Punkte und Fortschritte.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-primary-foreground/8 border border-primary-foreground/15 rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold mb-2 text-primary-foreground">{title}</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
