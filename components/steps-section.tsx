"use client"

import { useInView } from "@/hooks/use-in-view"

const steps = [
  { number: "01", title: "Website einreichen", text: "Domain und Anliegen kurz angeben." },
  { number: "02", title: "Technische Einschätzung erhalten", text: "Wir prüfen sichtbare Signale und ordnen Auffälligkeiten verständlich ein." },
  { number: "03", title: "Nächste Schritte priorisieren", text: "Sie bekommen eine klare Reihenfolge für sinnvolle Maßnahmen." },
]

const stepDelays = [0, 180, 360]
const lineDelays = [80, 260]

export function StepsSection() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section ref={sectionRef} className="bg-background py-12 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-2xl mb-8 transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight">
            So läuft es ab
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.number} className="flex md:flex-col gap-4 md:gap-3 relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-5 left-[calc(50%+20px)] right-0 h-px bg-border overflow-hidden"
                  aria-hidden="true"
                >
                  <div
                    className={`h-full bg-border transition-all duration-700 ease-out origin-left ${inView ? "scale-x-100" : "scale-x-0"}`}
                    style={{ transitionDelay: `${lineDelays[i]}ms` }}
                  />
                </div>
              )}

              {/* Step dot */}
              <div
                className={`w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 text-primary-foreground text-xs font-bold z-10 transition-all duration-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                style={{ transitionDelay: `${stepDelays[i]}ms` }}
              >
                {step.number}
              </div>

              {/* Text */}
              <div
                className={`flex flex-col gap-1 transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                style={{ transitionDelay: `${stepDelays[i] + 60}ms` }}
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
