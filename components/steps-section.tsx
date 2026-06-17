const steps = [
  {
    number: "01",
    title: "Website einreichen",
    text: "Domain und Anliegen kurz angeben. Kein Aufwand, kein Vorab-Fragebogen.",
  },
  {
    number: "02",
    title: "Technische Einschätzung erhalten",
    text: "Wir prüfen sichtbare Signale und ordnen Auffälligkeiten verständlich ein.",
  },
  {
    number: "03",
    title: "Nächste Schritte priorisieren",
    text: "Sie bekommen eine klare Reihenfolge für sinnvolle Maßnahmen — kein Fachkauderwelsch.",
  },
]

export function StepsSection() {
  return (
    <section className="bg-background py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 lg:mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent mb-3">
            Ablauf
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance leading-tight">
            So läuft es ab
          </h2>
        </div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="grid md:grid-cols-3 gap-0 relative">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-[22px] left-[calc(1/6*100%)] right-[calc(1/6*100%)] h-px bg-border/60"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div key={step.number} className="flex md:flex-col gap-6 md:gap-5 relative pb-8 md:pb-0 md:px-6 first:md:pl-0 last:md:pr-0">
              {/* Mobile connector line */}
              {i < steps.length - 1 && (
                <div
                  className="md:hidden absolute top-10 left-[11px] bottom-0 w-px bg-border/60"
                  aria-hidden="true"
                />
              )}

              {/* Step number circle */}
              <div className="w-11 h-11 rounded-full border-2 border-border bg-background flex items-center justify-center shrink-0 z-10">
                <span className="font-serif text-sm font-bold text-foreground">{step.number}</span>
              </div>

              {/* Step content */}
              <div className="flex flex-col gap-2 pt-1 md:pt-0">
                <p className="text-sm font-semibold text-foreground leading-snug text-balance">{step.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
