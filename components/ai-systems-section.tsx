"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { kiServices, type ServiceStatus } from "@/content/services"
import { useInView } from "@/hooks/use-in-view"

// Status badge config
const statusConfig: Record<ServiceStatus, { label: string; classes: string }> = {
  entry:      { label: "Einstieg",    classes: "bg-teal-50 text-teal-700 border-teal-200" },
  recommended:{ label: "Empfohlen",   classes: "bg-primary/10 text-primary border-primary/20" },
  custom:     { label: "Individuell", classes: "bg-amber-50 text-amber-700 border-amber-200" },
  monitoring: { label: "Monitoring",  classes: "bg-slate-100 text-slate-600 border-slate-200" },
}

export function AiSystemsSection() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.07 })

  return (
    <section ref={sectionRef} className="bg-background py-14 md:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Header */}
        <div
          className={`max-w-2xl transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-accent mb-3">
            Hauptportfolio
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-4">
            KI-Systeme für wiederkehrende Unternehmensprozesse
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Viele Unternehmen verlieren Zeit durch manuelle E-Mails, Dokumente, Websitepflege,
            Rechnungen, interne Abstimmungen und wiederkehrende Kundenanfragen. DatenpflegeNord
            prüft diese Abläufe und entwickelt einfache, nachvollziehbare KI-Systeme zur
            Unterstützung.
          </p>
        </div>

        {/* 4 KI offering cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kiServices.map((service, i) => {
            const Icon = service.icon
            const badge = statusConfig[service.status]
            return (
              <div
                key={service.title}
                className={`group bg-card border border-border rounded-xl p-6 flex flex-col gap-4 transition-all duration-700 hover:shadow-lg hover:-translate-y-1 hover:border-accent/30 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${80 + i * 90}ms` }}
              >
                {/* Icon + badge row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.classes}`}>
                    {badge.label}
                  </span>
                </div>

                {/* Title + description */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="font-bold text-foreground text-balance leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="flex flex-col gap-1.5">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-foreground/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-px" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="pt-1 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">{service.price}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "450ms" }}
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
          >
            <Link href="/kontakt?anliegen=ki-prozesscheck" className="flex items-center gap-2">
              KI-Potenzial besprechen
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>


      </div>
    </section>
  )
}
