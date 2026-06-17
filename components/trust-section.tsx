"use client"

import { useInView } from "@/hooks/use-in-view"

const trustCards = [
  {
    title: "Keine Panikmache",
    text: "Wir zeigen Auffälligkeiten und Prioritäten – ohne unnötige Dramatisierung.",
  },
  {
    title: "Keine falsche Rechtssicherheit",
    text: "Das NordAudit Portal liefert technische und strukturelle Hinweise, ersetzt aber keine anwaltliche Rechtsberatung.",
  },
  {
    title: "Keine KI-Magie",
    text: "KI Prozessautomatisierung unterstützt konkrete Aufgaben. Der Mensch entscheidet.",
  },
  {
    title: "KMU-tauglich aufgebaut",
    text: "Klare Pakete, verständliche Reports und praktische Fix-Listen für Geschäftsführung, Marketing, IT und Dienstleister.",
  },
]

const cardDelays = [0, 100, 200, 300]

export function TrustSection() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance max-w-2xl mx-auto">
            Sachlich prüfen. Verständlich erklären. Verantwortlich automatisieren.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustCards.map(({ title, text }, i) => (
            <div
              key={title}
              className={`flex flex-col gap-3 transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${cardDelays[i]}ms` }}
            >
              <div className="w-8 h-0.5 bg-accent rounded-full" />
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
