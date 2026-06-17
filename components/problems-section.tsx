const benefits = [
  {
    number: "01",
    title: "Sichtbare Risiken erkennen",
    text: "Wir prüfen Barrierefreiheits-, Datenschutz-, Technik- und Auffindbarkeits-Signale auf Ihrer Website — und machen sie lesbar.",
  },
  {
    number: "02",
    title: "Prioritäten statt Sammelliste",
    text: "Sie erhalten eine verständliche Einordnung, welche Punkte zuerst angegangen werden sollten — klar sortiert nach Dringlichkeit.",
  },
  {
    number: "03",
    title: "Umsetzung vorbereiten",
    text: "Die Ergebnisse sind so formuliert, dass Geschäftsführung, Marketing, IT oder Dienstleister direkt damit arbeiten können.",
  },
]

export function ProblemsSection() {
  return (
    <section className="bg-background py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start mb-12 lg:mb-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent mb-3">
              Nutzen
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance leading-tight">
              Drei klare Nutzen für Ihre nächste Entscheidung.
            </h2>
          </div>
          <div className="lg:pt-10">
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              Keine endlose Liste von Fachbegriffen. Eine strukturierte Einschätzung, priorisiert und verständlich aufbereitet.
            </p>
          </div>
        </div>

        {/* Benefit cards */}
        <div className="grid md:grid-cols-3 gap-px bg-border/60 rounded-xl overflow-hidden border border-border/60">
          {benefits.map(({ number, title, text }) => (
            <div
              key={number}
              className="bg-background p-8 flex flex-col gap-5"
            >
              <span className="font-serif text-5xl font-bold text-border/80 leading-none select-none" aria-hidden="true">
                {number}
              </span>
              <div className="flex flex-col gap-2.5">
                <h3 className="text-base font-semibold text-foreground leading-snug">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
