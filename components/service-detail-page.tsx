import Link from "next/link"
import { CheckCircle2, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Service, ServiceStatus } from "@/content/services"

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

type ServiceDetailPageProps = {
  service: Service
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const { icon: Icon, title, description, bullets, price, status } = service

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Back link */}
            <Link
              href="/leistungen"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" aria-hidden="true" />
              Alle Leistungen
            </Link>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={statusBadgeVariant[status]} className="text-xs">
                    {statusLabels[status]}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">{price}</Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight">
                  {title}
                </h1>
              </div>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              {description}
            </p>

            {/* Bullets */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                Was wir technisch prüfen
              </h2>
              <ul className="flex flex-col gap-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-xl p-4 mb-8">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unsere Prüfung liefert technische Hinweise und Prioritäten. Sie ersetzt keine
                Rechtsberatung und keine behördliche Zertifizierung.
              </p>
            </div>

            {/* CTA */}
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/kontakt" className="flex items-center gap-2">
                Jetzt anfragen <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
