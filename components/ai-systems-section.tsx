"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Minus } from "lucide-react"
import { kiServices } from "@/content/services"
import { useInView } from "@/hooks/use-in-view"

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
            return (
              <div
                key={service.title}
                className={`group bg-card border border-border rounded-xl p-6 flex flex-col gap-4 transition-all duration-700 hover:shadow-md hover:-translate-y-0.5 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${80 + i * 90}ms` }}
              >
                <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="font-bold text-foreground text-balance leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <ul className="flex flex-col gap-1">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Minus className="w-3 h-3 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
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
