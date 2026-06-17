import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { services } from "@/content/services"
import type { ServiceStatus } from "@/content/services"

const statusLabels: Record<ServiceStatus, string> = {
  entry: "Einstieg",
  recommended: "Empfohlen",
  custom: "Individuell",
  monitoring: "Monitoring",
}

export function ServiceCardsSection() {
  return (
    <section id="leistungen" className="bg-secondary/40 py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent mb-3">
              Leistungen
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance leading-tight">
              Leistungen kompakt
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs md:text-right leading-relaxed">
            Wählen Sie den passenden Einstieg für Prüfung, Priorisierung oder laufende Kontrolle.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ icon: Icon, title, description, bullets, price, status, href }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-xl p-6 flex flex-col gap-6 hover:border-primary/30 transition-colors"
            >
              {/* Icon + status */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mt-1">
                  {statusLabels[status]}
                </span>
              </div>

              {/* Title + description */}
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-semibold text-foreground text-balance leading-snug">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-2 border-t border-border/60 pt-4">
                {bullets.slice(0, 2).map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-accent shrink-0 mt-[7px]" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Price + CTA */}
              <div className="flex items-center justify-between mt-auto pt-1">
                <span className="text-xs text-muted-foreground">{price}</span>
                <Button asChild variant="ghost" size="sm" className="h-7 px-3 text-xs text-primary hover:bg-primary/8">
                  <Link href={href} className="flex items-center gap-1">
                    Ansehen <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
