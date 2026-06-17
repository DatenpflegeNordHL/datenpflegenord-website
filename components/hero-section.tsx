"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuditScoreCard } from "@/components/visuals/audit-score-card"
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react"

const trustBadges = [
  { label: "Priorisierte nächste Schritte" },
  { label: "Keine Rechtsberatung" },
  { label: "Keine Zertifizierungsversprechen" },
]

export function HeroSection() {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-8 lg:gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl md:text-5xl font-bold text-balance leading-tight text-foreground max-w-5xl animate-fade-up">
              Wir prüfen Ihre Website auf sichtbare Risiken bei Barrierefreiheit, Datenschutz, Technik und Auffindbarkeit.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl animate-fade-up animation-delay-150">
              Verständliche technische Einschätzung mit priorisierten nächsten Schritten.
              Keine Rechtsberatung, keine Zertifizierungsversprechen.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up animation-delay-300">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200">
                <Link href="/quickcheck" className="flex items-center gap-2">
                  Website prüfen lassen <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {trustBadges.map((b, i) => (
                <span
                  key={b.label}
                  className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1 animate-fade-up ${
                    i === 0
                      ? "animation-delay-400"
                      : i === 1
                      ? "animation-delay-500"
                      : "animation-delay-600"
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-accent shrink-0" aria-hidden="true" />
                  {b.label}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground animate-fade-up animation-delay-700">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
              <span>Technische und strukturelle Vorprüfung.</span>
            </div>
          </div>

          <div className="hidden lg:block animate-fade-up animation-delay-200">
            <AuditScoreCard />
          </div>
        </div>
      </div>
    </section>
  )
}
