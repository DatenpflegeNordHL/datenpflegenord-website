"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Activity, ArrowRight, BrainCircuit, FileSearch, Radar, ShieldCheck } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const supportingServices = [
  {
    icon: Radar,
    title: "Website-Schnellcheck",
    description: "Schneller Einstieg über sichtbare Website-Signale und technische Basisprüfung.",
    href: "/kontakt",
  },
  {
    icon: FileSearch,
    title: "Technischer Website-Check",
    description: "Struktur, Technik, Pflichtlinks und Auffindbarkeit werden geordnet geprüft.",
    href: "/technischer-web-check",
  },
  {
    icon: Activity,
    title: "Website-Monitoring",
    description: "Regelmäßige Kontrolle wichtiger Website-Signale und Änderungen.",
    href: "/monatlicher-audit-check",
  },
  {
    icon: ShieldCheck,
    title: "Digitalpflichten-Vorprüfung",
    description: "Sichtbare Pflichtstellen und strukturelle Hinweise als technische Orientierung.",
    href: "/technischer-web-check",
  },
]

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
          className={`bg-navy rounded-2xl p-8 md:p-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-col gap-4 max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
              Hauptangebot
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-foreground text-balance leading-tight">
              KI-Systeme für wiederkehrende Unternehmensprozesse
            </h2>
            <p className="text-base text-navy-foreground/70 leading-relaxed">
              Wir analysieren manuelle Abläufe und bauen daraus einfache KI- oder
              Automationslösungen. Besonders geeignet für E-Mails, Dokumente, Kundenanfragen,
              Rechnungen und interne Wissensprozesse.
            </p>
            <Button
              asChild
              size="lg"
              className="w-fit bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 transition-colors duration-200"
            >
              <Link href="/ki-loesungen" className="flex items-center gap-2">
                KI-Potenzial prüfen
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-navy-foreground/10 bg-navy-foreground/5 p-5">
            <BrainCircuit className="mb-4 h-7 w-7 text-accent" aria-hidden="true" />
            <ul className="grid gap-3 text-sm text-navy-foreground/75">
              {[
                "E-Mail- und Textvorlagen",
                "Dokumenten- und Angebotsprozesse",
                "Kundenfragen vorsortieren",
                "interne Wissensassistenten",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Supporting services */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
            Ergänzende Leistungen
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportingServices.map((svc, i) => {
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
                  <div className="flex items-center justify-end mt-auto pt-1">
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
