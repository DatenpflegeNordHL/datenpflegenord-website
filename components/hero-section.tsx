"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { DomainChecker } from "@/components/domain-checker"
import { ArrowRight, ShieldCheck } from "lucide-react"

export function HeroSection() {
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
            <Badge variant="secondary" className="w-fit text-xs font-medium tracking-wide uppercase">
              Digitale Prüf- und KI-Systeme für deutsche KMU
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-balance leading-tight text-foreground">
              Websites prüfen. Unternehmensprozesse mit KI automatisieren.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              DatenpflegeNord unterstützt deutsche KMU mit BFSG Website Audits, Barrierefreiheitsprüfungen, 
              technischem Website-Monitoring und individueller KI Prozessautomatisierung.
            </p>

            <p className="text-sm text-muted-foreground border-l-2 border-accent pl-4 leading-relaxed">
              Für Geschäftsführer, Inhaber, Marketingverantwortliche, IT-Dienstleister und KMU,
              die Transparenz statt Unklarheit brauchen.
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

          {/* Right: Domain-Check Module */}
          <div id="domain-check" className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <DomainChecker />
          </div>
        </div>
      </div>
    </section>
  )
}
