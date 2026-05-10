"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DomainChecker } from "@/components/domain-checker"
import { KIProcessForm } from "@/components/ki-process-form"
import { ArrowRight, ShieldCheck, CheckCircle2, BrainCircuit } from "lucide-react"

export function HeroSection() {
  const [kiFormOpen, setKiFormOpen] = useState(false)

  return (
    <section className="relative bg-background py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Copy */}
          <div className="relative flex flex-col gap-6">
            {/* Technical grid background — data/audit atmosphere, desktop only */}
            <svg
              className="hidden md:block absolute inset-0 w-full h-full pointer-events-none select-none"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Fine grid pattern */}
                <pattern id="grid-sm" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                </pattern>
                {/* Slightly larger accent grid */}
                <pattern id="grid-lg" width="112" height="112" patternUnits="userSpaceOnUse">
                  <rect width="112" height="112" fill="url(#grid-sm)" />
                  <path d="M 112 0 L 0 0 0 112" fill="none" stroke="currentColor" strokeWidth="1" className="text-border" />
                </pattern>
              </defs>

              {/* Base grid — very subtle */}
              <rect width="100%" height="100%" fill="url(#grid-lg)" opacity="0.55" />

              {/* Diagonal data-flow lines — evoke structured analysis/audit */}
              <line x1="0" y1="60%" x2="35%" y2="100%" stroke="currentColor" strokeWidth="0.75" className="text-accent" opacity="0.12" />
              <line x1="20%" y1="0" x2="80%" y2="100%" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.07" />
              <line x1="55%" y1="0" x2="100%" y2="55%" stroke="currentColor" strokeWidth="0.5" className="text-primary" opacity="0.06" />

              {/* Horizontal data-level lines */}
              <line x1="0" y1="33%" x2="100%" y2="33%" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.1" />
              <line x1="0" y1="66%" x2="100%" y2="66%" stroke="currentColor" strokeWidth="0.5" className="text-accent" opacity="0.08" />

              {/* Node dots at grid intersections — network/system metaphor */}
              <circle cx="28%" cy="33%" r="2.5" fill="currentColor" className="text-accent" opacity="0.18" />
              <circle cx="56%" cy="33%" r="1.5" fill="currentColor" className="text-primary" opacity="0.12" />
              <circle cx="84%" cy="33%" r="2" fill="currentColor" className="text-accent" opacity="0.14" />
              <circle cx="14%" cy="66%" r="1.5" fill="currentColor" className="text-primary" opacity="0.1" />
              <circle cx="42%" cy="66%" r="2.5" fill="currentColor" className="text-accent" opacity="0.16" />
              <circle cx="70%" cy="66%" r="2" fill="currentColor" className="text-primary" opacity="0.1" />
              <circle cx="98%" cy="66%" r="1.5" fill="currentColor" className="text-accent" opacity="0.12" />

              {/* Small connector lines between nodes — audit link metaphor */}
              <line x1="28%" y1="33%" x2="42%" y2="66%" stroke="currentColor" strokeWidth="0.75" className="text-accent" opacity="0.13" />
              <line x1="56%" y1="33%" x2="42%" y2="66%" stroke="currentColor" strokeWidth="0.75" className="text-accent" opacity="0.1" />
              <line x1="56%" y1="33%" x2="70%" y2="66%" stroke="currentColor" strokeWidth="0.75" className="text-accent" opacity="0.1" />
              <line x1="84%" y1="33%" x2="70%" y2="66%" stroke="currentColor" strokeWidth="0.75" className="text-accent" opacity="0.1" />

              {/* Soft radial fade to keep text area uncluttered */}
              <radialGradient id="fade" cx="40%" cy="50%" r="60%">
                <stop offset="0%" stopColor="white" stopOpacity="0.92" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <rect width="100%" height="100%" fill="url(#fade)" />
            </svg>
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
