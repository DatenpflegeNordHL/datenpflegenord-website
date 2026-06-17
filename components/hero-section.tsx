"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PremiumAuditCockpit } from "@/components/visuals/audit-score-card"
import { ArrowRight } from "lucide-react"

const trustBadges = [
  "Technische Vorprüfung",
  "Priorisierte Hinweise",
  "Keine Rechtsberatung",
]

export function HeroSection() {
  return (
    <section className="bg-background pt-16 pb-0 md:pt-20 lg:pt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">
          {/* Left: Text content */}
          <div className="flex flex-col gap-8 pb-16 lg:pb-24">
            {/* Eyebrow */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Website-Checks&nbsp;&nbsp;·&nbsp;&nbsp;Pflichtstellen&nbsp;&nbsp;·&nbsp;&nbsp;digitale Prozesse
            </p>

            {/* Main headline — editorial serif */}
            <h1 className="font-serif text-[2.6rem] md:text-[3.4rem] lg:text-[3.8rem] font-bold leading-[1.1] text-balance text-foreground tracking-tight max-w-3xl">
              Klare Website-Prüfung für Unternehmen, die keine Rätselrallye im Netz wollen.
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              DatenpflegeNord prüft sichtbare Risiken bei Barrierefreiheit, Datenschutz-Hinweisen, Technik und Auffindbarkeit. Verständlich, priorisiert und ohne Zertifizierungsversprechen.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-7 font-medium"
              >
                <Link href="/quickcheck" className="flex items-center gap-2">
                  Website prüfen lassen
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-7 border-border/80 text-foreground hover:bg-secondary font-medium"
              >
                <Link href="/kontakt?anliegen=signalcheck">
                  Signalcheck anfragen
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-2 text-[12px] text-muted-foreground"
                >
                  <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Audit cockpit visual */}
          <div className="hidden lg:flex items-start justify-center pt-2">
            <PremiumAuditCockpit />
          </div>
        </div>

        {/* Bottom rule */}
        <div className="border-t border-border/60" />
      </div>
    </section>
  )
}
