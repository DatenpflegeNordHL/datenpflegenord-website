import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { services } from "@/content/services"
import type { ServiceStatus } from "@/content/services"

const statusLabels: Record<ServiceStatus, string> = {
  entry: "Einstieg",
  recommended: "Empfohlen",
  custom: "Individuell",
  monitoring: "Monitoring",
}

const statusBadgeVariant: Record<ServiceStatus, "default" | "secondary" | "outline"> = {
  entry: "secondary",
  recommended: "default",
  custom: "outline",
  monitoring: "secondary",
}

export function ServiceCardsSection() {
  return (
    <section id="leistungen" className="bg-background py-12 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-3">
            Leistungen kompakt
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Wählen Sie den passenden Einstieg für Prüfung, Priorisierung oder laufende Kontrolle.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(({ icon: Icon, title, description, bullets, price, status, href }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge variant={statusBadgeVariant[status]} className="text-xs">
                    {statusLabels[status]}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">{price}</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-1.5 text-balance">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>

              <ul className="flex flex-col gap-1.5">
                {bullets.slice(0, 2).map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline" size="sm" className="mt-auto w-fit">
                <Link href={href} className="flex items-center gap-1.5">
                  Ansehen <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
