import { ClipboardCheck, ListChecks, SearchCheck } from "lucide-react"

const benefits = [
  {
    icon: SearchCheck,
    title: "Sichtbare Risiken erkennen",
    text: "Wir prüfen Barrierefreiheits-, Datenschutz-, Technik- und Auffindbarkeits-Signale auf Ihrer Website.",
  },
  {
    icon: ListChecks,
    title: "Prioritäten statt Sammelliste",
    text: "Sie erhalten eine verständliche Einordnung, welche Punkte zuerst angegangen werden sollten.",
  },
  {
    icon: ClipboardCheck,
    title: "Umsetzung vorbereiten",
    text: "Die Ergebnisse sind so formuliert, dass Geschäftsführung, Marketing, IT oder Dienstleister damit arbeiten können.",
  },
]

export function ProblemsSection() {
  return (
    <section className="bg-secondary py-12 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight">
            Drei klare Nutzen für Ihre nächste Entscheidung.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2"
            >
              <div className="flex items-start gap-2">
                <Icon className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm font-semibold text-foreground">{title}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
