import { AlertCircle, RefreshCw, Lightbulb } from "lucide-react"

const problems = [
  {
    icon: AlertCircle,
    title: "Website-Auffälligkeiten bleiben oft unentdeckt",
    text: "Cookie-Struktur, Impressum-Hinweise, Performance, mobile Darstellung oder SEO-Basics verändern sich mit der Zeit. Ohne regelmäßige Prüfung fehlt der Verlauf.",
  },
  {
    icon: RefreshCw,
    title: "Aufgaben wiederholen sich jeden Monat",
    text: "Rechnungen prüfen, Dokumente sortieren, Anfragen beantworten, Personalpläne vorbereiten oder Wissen suchen kostet Zeit, obwohl viele Schritte strukturiert ablaufen.",
  },
  {
    icon: Lightbulb,
    title: "Entscheidungen brauchen bessere Vorlagen",
    text: "Teams brauchen keine KI-Magie, sondern belastbare Unterstützung: klare Daten, nachvollziehbare Vorschläge und Freigaben durch Menschen.",
  },
]

export function ProblemsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance max-w-2xl mx-auto">
            Viele Websites und Prozesse laufen – aber niemand sieht den aktuellen Zustand auf einen Blick.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
