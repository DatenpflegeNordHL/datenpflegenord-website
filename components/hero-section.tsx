"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { DomainChecker } from "@/components/domain-checker"
import { KIProcessForm } from "@/components/ki-process-form"
import { ArrowRight, ShieldCheck, CheckCircle2, BrainCircuit } from "lucide-react"

export function HeroSection() {
  const [kiFormOpen, setKiFormOpen] = useState(false)

  return (
    <section className="relative bg-background py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Watermark background logo - subtle, 5-8% opacity */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <div className="w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] opacity-[0.06] -translate-y-12 translate-x-1/4">
          <Logo variant="watermark" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Copy */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <Badge variant="secondary" className="w-fit text-xs font-medium tracking-wide uppercase">
                DatenpflegeNord
              </Badge>
              <p className="text-sm text-muted-foreground">
                Ihr Prüf- und KI-Partner aus der Hansestadt Lübeck.
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-balance leading-tight text-foreground">
              Websites prüfen. Unternehmensprozesse mit KI automatisieren.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Wir unterstützen deutsche KMU mit BFSG Website Audits, Barrierefreiheitsprüfungen,
              technischem Website-Monitoring und individueller KI Prozessautomatisierung.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="#domain-check">
                    BFSG Schnellcheck starten <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#ki-automatisierung">KI Prozessautomatisierung</Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Kostenlose Vorprüfung — keine Anmeldung erforderlich. Ergebnisse sofort sichtbar.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span>Technische Vorprüfung – keine anwaltliche Rechtsberatung.</span>
            </div>
          </div>

          {/* Right: Domain-Check + KI-Potenzialanalyse */}
          <div className="flex flex-col gap-4">
            <div id="domain-check" className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <DomainChecker />
            </div>

            {/* KI-Potenzialanalyse card */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <BrainCircuit className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                  KI Prozessautomatisierung
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                Kostenlose KI-Potenzialanalyse
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Wir erfassen wiederkehrende Aufgaben, Dokumente, Abläufe und Engpässe in Ihrem Unternehmen
                – und zeigen anschließend, wo KI Prozesse vereinfachen, automatisieren oder Kosten senken kann.
              </p>
              <ul className="flex flex-col gap-2 mb-5">
                {[
                  "Prozesse und Engpässe aufnehmen",
                  "KI-Potenziale erkennen",
                  "Konkrete Automatisierungsvorschläge erhalten",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setKiFormOpen(true)}
                size="sm"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                KI-Potenzialanalyse anfragen <ArrowRight className="ml-2 w-3.5 h-3.5" />
              </Button>
              <p className="text-[11px] text-muted-foreground mt-2 text-center leading-relaxed">
                Unverbindlich. Für deutsche KMU. Keine Garantie auf Einsparungen.
              </p>
            </div>
          </div>
        </div>
      </div>

      <KIProcessForm open={kiFormOpen} onOpenChange={setKiFormOpen} />
    </section>
  )
}
