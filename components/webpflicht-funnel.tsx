import Link from "next/link"
import { Button } from "@/components/ui/button"

const steps = [
  {
    number: "01",
    title: "Domain eingeben",
    text: "Starten Sie mit einem BFSG Schnellcheck Ihrer Unternehmenswebsite.",
    cta: { label: "BFSG Schnellcheck starten", href: "#domain-check" },
  },
  {
    number: "02",
    title: "Erste Findings sehen",
    text: "Sie erhalten erste sichtbare Hinweise zu BFSG-Relevanz, Barrierefreiheit, Technik und SEO.",
    cta: null,
  },
  {
    number: "03",
    title: "Barrierefreiheits-Audit buchen",
    text: "Für vollständige Ergebnisse, Screenshots, Evidence und Fix-Liste buchen Sie ein Barrierefreiheits-Audit.",
    cta: null,
  },
  {
    number: "04",
    title: "Kundenportal nutzen",
    text: "Im Portal sehen Sie Audit-Historie, neue Findings, behobene Findings, PDF-Reports und den nächsten Scan.",
    cta: null,
  },
  {
    number: "05",
    title: "BFSG Monitoring aktivieren",
    text: "Mit BFSG Monitoring behalten Sie Änderungen, Auffälligkeiten und Fortschritte dauerhaft im Blick.",
    cta: null,
  },
]

export function WebpflichtFunnel() {
  return (
    <section className="py-16 md:py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Vom BFSG Schnellcheck zum monatlichen BFSG Monitoring
          </h2>
        </div>

        {/* Desktop horizontal stepper */}
        <div className="hidden md:grid grid-cols-5 gap-0 relative mb-12">
          {/* connector line */}
          <div className="absolute top-6 left-[10%] right-[10%] h-px bg-border z-0" />

          {steps.map((step) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center text-center px-3">
              <div className="w-12 h-12 rounded-full bg-card border-2 border-accent flex items-center justify-center mb-4 shadow-sm">
                <span className="text-sm font-bold text-accent">{step.number}</span>
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-2">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{step.text}</p>
              {step.cta && (
                <Button asChild variant="outline" size="sm" className="text-xs h-7">
                  <Link href={step.cta.href}>{step.cta.label}</Link>
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Mobile vertical stepper */}
        <div className="md:hidden flex flex-col gap-0">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-card border-2 border-accent flex items-center justify-center shadow-sm shrink-0">
                  <span className="text-xs font-bold text-accent">{step.number}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-px flex-1 bg-border my-1" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">{step.text}</p>
                {step.cta && (
                  <Button asChild variant="outline" size="sm" className="text-xs">
                    <Link href={step.cta.href}>{step.cta.label}</Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
