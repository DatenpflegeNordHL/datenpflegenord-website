import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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

export default function LeistungenPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-3">
                Unsere Leistungen
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Technische Vorprüfungen, Pflichtstellen-Checks und KI-gestützte Büroautomation –
                ohne Rechtsberatung und ohne Zertifizierungsversprechen.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {services.map(({ icon: Icon, title, description, bullets, price, status, href }) => (
                <div
                  key={href}
                  className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={statusBadgeVariant[status]} className="text-xs">
                        {statusLabels[status]}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">{price}</Badge>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-bold text-foreground mb-1.5 text-balance">{title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>

                  <ul className="flex flex-col gap-1.5">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={href}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline w-fit"
                  >
                    Details ansehen <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
