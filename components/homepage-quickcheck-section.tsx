import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { DomainChecker } from "@/components/domain-checker"

export function HomepageQuickcheckSection() {
  return (
    <section className="bg-secondary/50 border-t border-border py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* Editorial framing */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
              Website-Schnellcheck
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight">
              Starten Sie mit Ihrer Website.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Der Schnellcheck zeigt sichtbare technische Signale und kann erste Hinweise auf
              digitale Schwachstellen und Automationspotenziale liefern. Kein Formular, keine
              Registrierung – direkt starten.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Automatisierte technische Vorprüfung. Keine Rechtsberatung. Keine behördliche
              Zertifizierung.
            </p>
            <Link
              href="/quickcheck"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-150 group mt-1"
            >
              Vollständigen Quickcheck öffnen
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* DomainChecker – existing functionality, unchanged */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <DomainChecker />
          </div>
        </div>
      </div>
    </section>
  )
}
