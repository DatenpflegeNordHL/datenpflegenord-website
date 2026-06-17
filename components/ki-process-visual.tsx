"use client"

import Link from "next/link"
import { ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NorthernGridBg } from "@/components/pdf-report-preview"
import { useInView } from "@/hooks/use-in-view"

// ─── Process steps ────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    label: "Anfrage",
    sub: "Eingehende Kundenanfrage oder Aufgabe",
    human: false,
  },
  {
    number: "02",
    label: "Sortierung",
    sub: "KI kategorisiert und priorisiert",
    human: false,
  },
  {
    number: "03",
    label: "Antwortvorschlag",
    sub: "KI formuliert einen Entwurf",
    human: false,
  },
  {
    number: "04",
    label: "Freigabe",
    sub: "Mensch prüft und gibt frei",
    human: true,
  },
  {
    number: "05",
    label: "Dokumentation",
    sub: "Ablage und Nachvollziehbarkeit",
    human: false,
  },
]

// ─── KI process flow card ─────────────────────────────────────────────────────
function KiProcessCard() {
  return (
    <div className="w-full max-w-[460px] mx-auto bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_-6px_rgba(28,45,80,0.14)] overflow-hidden">
      {/* Header */}
      <div className="bg-[oklch(0.28_0.07_248)] px-5 py-3.5">
        <p className="text-[10px] text-slate-300 uppercase tracking-widest font-medium">
          DatenpflegeNord
        </p>
        <p className="text-white text-sm font-semibold leading-tight mt-0.5">
          Vom manuellen Prozess zum KI-System
        </p>
      </div>

      {/* Flow – horizontal on md+, stacked on mobile */}
      <div className="px-5 py-5">
        {/* Mobile: vertical stack */}
        <div className="flex md:hidden flex-col gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-4">
              {/* Spine */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                    step.human
                      ? "bg-accent text-accent-foreground"
                      : "bg-[oklch(0.28_0.07_248)] text-white"
                  }`}
                >
                  {step.human ? <User className="w-3.5 h-3.5" aria-hidden="true" /> : step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-slate-200 my-1 min-h-[24px]" aria-hidden="true" />
                )}
              </div>

              {/* Content */}
              <div className="pb-4 flex flex-col gap-0.5 justify-center min-h-[40px]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">{step.label}</span>
                  {step.human && (
                    <span className="text-[9px] bg-accent/10 text-accent border border-accent/20 rounded-full px-1.5 py-0.5 font-medium">
                      Mensch
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-muted-foreground leading-snug">{step.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: horizontal flow */}
        <div className="hidden md:flex items-start gap-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-1 items-start">
              {/* Step card */}
              <div className="flex flex-col items-center gap-2 flex-1 min-w-0 px-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                    step.human
                      ? "bg-accent text-accent-foreground ring-2 ring-accent/30"
                      : "bg-[oklch(0.28_0.07_248)] text-white"
                  }`}
                >
                  {step.human ? <User className="w-3.5 h-3.5" aria-hidden="true" /> : step.number}
                </div>
                <div className="flex flex-col items-center gap-0.5 text-center">
                  <span className="text-xs font-bold text-foreground leading-snug">{step.label}</span>
                  {step.human && (
                    <span className="text-[9px] bg-accent/10 text-accent border border-accent/20 rounded-full px-1.5 py-0.5 font-medium">
                      Mensch
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground leading-snug mt-0.5">{step.sub}</span>
                </div>
              </div>

              {/* Arrow connector */}
              {i < steps.length - 1 && (
                <div className="flex items-center self-start pt-[18px] shrink-0" aria-hidden="true">
                  <div className="w-3 h-px bg-slate-300" />
                  <ArrowRight className="w-2.5 h-2.5 text-slate-400 -ml-0.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="border-t border-slate-100 bg-slate-50 px-5 py-3">
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          KI unterstützt bei Schritt 2 und 3. Schritt 4 bleibt immer beim Menschen.
          Kein Vollautomatismus – nachvollziehbar und kontrollierbar.
        </p>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function KiProcessVisual() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.07 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-14 md:py-20 border-t border-border overflow-hidden"
    >
      <NorthernGridBg />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">

        {/* Header */}
        <div
          className={`max-w-2xl transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-accent mb-3">
            KI-Systeme
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-4">
            KI hilft. Der Mensch entscheidet.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Kein Vollautomatismus. KI übernimmt die repetitiven Vorarbeiten –
            sortieren, formulieren, ablegen. Der letzte Schritt bleibt beim Menschen.
            So entstehen Systeme, die im Arbeitsalltag wirklich funktionieren.
          </p>
        </div>

        {/* Process visual */}
        <div
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "120ms" }}
        >
          <KiProcessCard />
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-wrap gap-3 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "240ms" }}
        >
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Link href="/kontakt?anliegen=ki-prozesscheck" className="flex items-center gap-2">
              KI-Potenzial prüfen
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="border-border">
            <Link href="/leistungen/ki-bueroautomation">KI-Systeme ansehen</Link>
          </Button>
        </div>

      </div>
    </section>
  )
}
