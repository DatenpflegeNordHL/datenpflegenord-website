"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DomainChecker } from "@/components/domain-checker"
import { AuditScoreCard } from "@/components/visuals/audit-score-card"
import { SHMapVisual } from "@/components/visuals/sh-map-visual"
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  CheckCircle2,
} from "lucide-react"

const trustBadges = [
  { label: "Schleswig-Holstein Fokus" },
  { label: "Website-Technik & Pflichtstellen" },
  { label: "KI für Büroprozesse" },
  { label: "Keine Rechtsberatung" },
  { label: "Klare Aufgabenliste" },
]

export function HeroSection() {
  return (
    <section className="relative bg-background py-14 md:py-20 lg:py-24 overflow-hidden">
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 70% 40%, hsl(var(--primary) / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: Copy */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <Badge variant="secondary" className="w-fit text-xs font-medium tracking-wide uppercase">
                DatenpflegeNord
              </Badge>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                Ihr technischer Partner in Schleswig-Holstein
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight text-foreground">
              Website-Checks, digitale Pflichtstellen und KI-Büroautomation für Unternehmen in Schleswig-Holstein.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              DatenpflegeNord prüft technische Signale, sortiert digitale Pflichtstellen und
              entwickelt einfache KI-gestützte Abläufe – ohne Rechtsberatung, mit klaren
              nächsten Schritten.
            </p>

            <p className="text-base font-semibold text-foreground border-l-2 border-accent pl-3">
              Technisch prüfen. Verständlich priorisieren. Umsetzung begleiten.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/quickcheck" className="flex items-center gap-2">
                  Quickcheck starten <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/leistungen">Leistungen ansehen</Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {trustBadges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-accent shrink-0" aria-hidden="true" />
                  {b.label}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
              <span>Technische Vorprüfung — keine anwaltliche Rechtsberatung.</span>
            </div>
          </div>

          {/* Right: Visuals */}
          <div className="flex flex-col gap-4">
            {/* Score card – prominent */}
            <AuditScoreCard />

            {/* SH map + domain checker side by side on md+ */}
            <div className="grid sm:grid-cols-2 gap-4">
              <SHMapVisual />
              <div id="domain-check" className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <DomainChecker />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
