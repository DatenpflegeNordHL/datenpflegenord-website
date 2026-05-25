import Link from "next/link"
import {
  CheckCircle2,
  ArrowRight,
  Info,
  Users,
  ScanSearch,
  Package,
  ListOrdered,
  CircleSlash,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Service, ServiceStatus } from "@/content/services"
import type { ServiceDetailContent } from "@/content/service-details"

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
  details: ServiceDetailContent
}

function DetailSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-foreground">
          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ServiceDetailPage({ service, details }: ServiceDetailPageProps) {
  const { icon: Icon, title, description, price, status } = service

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">

            {/* Back link */}
            <Link
              href="/leistungen"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" aria-hidden="true" />
              Alle Leistungen
            </Link>

            {/* Hero */}
            <div>
              <div className="flex items-start gap-4 mb-5">
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
              <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
            </div>

            {/* Für wen geeignet? */}
            <DetailSection icon={Users} title="Für wen geeignet?">
              <div className="bg-card border border-border rounded-2xl p-6">
                <BulletList items={details.targetGroups} />
              </div>
            </DetailSection>

            {/* Was wir prüfen */}
            <DetailSection icon={ScanSearch} title="Was wir prüfen">
              <div className="bg-card border border-border rounded-2xl p-6">
                <BulletList items={details.checks} />
              </div>
            </DetailSection>

            {/* Was Sie erhalten */}
            <DetailSection icon={Package} title="Was Sie erhalten">
              <div className="bg-card border border-border rounded-2xl p-6">
                <BulletList items={details.deliverables} />
              </div>
            </DetailSection>

            {/* Ablauf */}
            <DetailSection icon={ListOrdered} title="Ablauf">
              <div className="flex flex-col gap-4">
                {details.processSteps.map((step, i) => (
                  <div
                    key={step.title}
                    className="bg-card border border-border rounded-2xl p-5 flex gap-4"
                  >
                    <span className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </DetailSection>

            {/* Nicht enthalten */}
            <DetailSection icon={CircleSlash} title="Nicht enthalten">
              <div className="bg-muted/30 border border-border rounded-2xl p-6">
                <ul className="flex flex-col gap-2.5">
                  {details.notIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CircleSlash className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </DetailSection>

            {/* Häufige Fragen */}
            <DetailSection icon={HelpCircle} title="Häufige Fragen">
              <div className="flex flex-col gap-3">
                {details.faq.map((item) => (
                  <div
                    key={item.question}
                    className="bg-card border border-border rounded-2xl p-5"
                  >
                    <h3 className="font-semibold text-foreground mb-2 text-sm">{item.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </DetailSection>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-xl p-4">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unsere Prüfung liefert technische Hinweise und Prioritäten. Sie ersetzt keine
                Rechtsberatung und keine behördliche Zertifizierung.
              </p>
            </div>

            {/* CTA */}
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit">
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
