"use client"

import { useInView } from "@/hooks/use-in-view"

const steps = [
  {
    number: "01",
    title: "Einstieg prüfen",
    text: "Website, Prozess oder Anliegen einreichen.",
  },
  {
    number: "02",
    title: "Potenziale erkennen",
    text: "Wir prüfen technische Signale, wiederkehrende Aufgaben und sinnvolle KI-Unterstützung.",
  },
  {
    number: "03",
    title: "System oder nächste Schritte aufbauen",
    text: "Sie erhalten eine klare Priorisierung und bei Bedarf ein KI- oder Automationssystem für die Umsetzung.",
  },
]

const stepDelays = [0, 180, 360]
const lineDelays = [80, 260]

export function StepsSection() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section ref={sectionRef} className="bg-background py-12 md:py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-2xl mb-10 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-accent mb-3">
            Ablauf
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight">
            So läuft die Zusammenarbeit ab
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.number} className="flex md:flex-col gap-4 md:gap-3 relative">
              {/* Connector line between steps (desktop only) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-5 left-[calc(50%+20px)] right-0 h-px bg-border overflow-hidden"
                  aria-hidden="true"
                >
                  <div
                    className="h-full bg-border transition-all duration-700 ease-out origin-left"
                    style={{
                      transitionDelay: `${lineDelays[i]}ms`,
                      transform: inView ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left center",
                    }}
                  />
                </div>
              )}

              {/* Step dot */}
              <div
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 text-primary-foreground text-xs font-bold z-10 transition-all duration-500"
                style={{
                  transitionDelay: `${stepDelays[i]}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "scale(1)" : "scale(0.75)",
                }}
                aria-hidden="true"
              >
                {step.number}
              </div>

              {/* Text */}
              <div
                className="flex flex-col gap-1 transition-all duration-700"
                style={{
                  transitionDelay: `${stepDelays[i] + 60}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(8px)",
                }}
              >
                <p className="text-sm font-semibold text-foreground text-balance">{step.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
