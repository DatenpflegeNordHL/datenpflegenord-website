"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { services } from "@/content/services"
import { useInView } from "@/hooks/use-in-view"

export function ServiceCardsSection() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.07 })

  return (
    <section
      ref={sectionRef}
      id="leistungen"
      className="bg-secondary/40 py-12 md:py-16 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">

        {/* Primary offering block */}
        <div
          className={`bg-navy rounded-2xl p-8 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-col gap-3 max-w-xl">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
              Hauptangebot
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-foreground text-balance leading-tight">
              KI-Systeme für Unternehmen
            </h2>
            <p className="text-base text-navy-foreground/70 leading-relaxed">
              Analyse, Aufbau und Einführung einfacher KI-gestützter Systeme für wiederkehrende
              Unternehmensprozesse.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 transition-colors duration-200"
          >
            <Link href="/kontakt?anliegen=ki-prozesscheck" className="flex items-center gap-2">
              KI-Potenzial besprechen
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* Supporting services */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
            Ergänzende Leistungen
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((svc, i) => {
              const Icon = svc.icon
              return (
                <div
                  key={svc.title}
                  className={`group bg-card border border-border rounded-xl p-5 flex flex-col gap-3 transition-all duration-700 hover:shadow-sm hover:-translate-y-0.5 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${100 + i * 80}ms` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <h3 className="text-sm font-bold text-foreground text-balance leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="text-xs text-muted-foreground">{svc.price}</span>
                    <Link
                      href={svc.href}
                      className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80 transition-colors duration-150 group/link"
                    >
                      Ansehen
                      <ArrowRight
                        className="w-3 h-3 transition-transform duration-150 group-hover/link:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
