import {
  Globe,
  FileSearch,
  Users,
  ClipboardList,
  ArrowRight,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

// ── Process Steps Data ─────────────────────────────────────────────────────

const processSteps = [
  {
    step: 1,
    icon: Globe,
    title: "Domain prüfen",
    description:
      "Technische Vorprüfung der Website mit automatisierten Tools. Erfassung von Auffälligkeiten in Barrierefreiheit, Datenschutz, Performance und SEO.",
  },
  {
    step: 2,
    icon: FileSearch,
    title: "Findings mit Evidence bewerten",
    description:
      "Jedes Finding wird mit technischen Nachweisen wie URL, Selector und Snippet dokumentiert. Automatisierte Hinweise werden manuell bewertet und priorisiert.",
  },
  {
    step: 3,
    icon: Users,
    title: "Zuständigkeiten klären",
    description:
      "Findings werden typischen Rollen zugeordnet: Entwicklung, Content, Design oder UX. So wird klar, wer welche Maßnahme umsetzen sollte.",
  },
  {
    step: 4,
    icon: ClipboardList,
    title: "Fix-Liste und Nachprüfung planen",
    description:
      "Priorisierte Handlungsempfehlungen werden als konkrete Fix-Liste aufbereitet. Nachprüfungen zeigen, ob Maßnahmen wirksam waren.",
  },
]

// ── Types ──────────────────────────────────────────────────────────────────

type NordAuditProcessSectionProps = {
  onAuditRequestClick?: () => void
}

// ── Main Component ─────────────────────────────────────────────────────────

export function NordAuditProcessSection({
  onAuditRequestClick,
}: NordAuditProcessSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-semibold tracking-wide uppercase"
          >
            NordAudit Ablauf
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Vom Schnellcheck zur belastbaren Handlungsempfehlung
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Der Schnellcheck zeigt erste technische Hinweise. Im Audit prüfen
            wir Auffälligkeiten strukturiert, ergänzen Evidence und bereiten
            eine nachvollziehbare Fix-Liste vor.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {processSteps.map(({ step, icon: Icon, title, description }) => (
            <Card key={step} className="relative overflow-hidden">
              <CardContent className="p-6">
                {/* Step number badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>

                {/* Watermark icon */}
                <div
                  className="absolute -right-3 -bottom-3 pointer-events-none select-none"
                  aria-hidden="true"
                >
                  <Icon
                    className="w-20 h-20 md:w-24 md:h-24 text-primary opacity-[0.04]"
                    strokeWidth={0.8}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer Alert */}
        <Alert className="mb-10 bg-secondary/60 border-border">
          <AlertTriangle className="w-4 h-4 text-muted-foreground" />
          <AlertDescription className="text-xs text-muted-foreground leading-relaxed">
            Keine Rechtsberatung. Keine behördliche Zertifizierung. Manuelle
            Prüfung empfohlen.
          </AlertDescription>
        </Alert>

        {/* CTA Section */}
        <div className="text-center">
          <Button size="lg" onClick={onAuditRequestClick}>
            NordAudit anfragen
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
