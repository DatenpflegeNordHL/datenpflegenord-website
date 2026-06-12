import { ArrowRight, CheckCircle2, CircleAlert, CircleHelp, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { QuickCheckStatus, ScanResult } from "@/lib/quick-check-types"
import { QuickCheckSummaryBadges } from "./quick-check-summary-badges"
import { QuickCheckChecksList } from "./quick-check-checks-list"
import { QuickCheckDisclaimer } from "./quick-check-disclaimer"

interface QuickCheckResultCardProps {
  result: ScanResult
}

const statusConfig: Record<
  QuickCheckStatus,
  { label: string; description: string; icon: React.ElementType; color: string }
> = {
  ok: {
    label: "Keine direkten Auffälligkeiten",
    description: "Der automatisierte Schnellcheck wurde abgeschlossen.",
    icon: CheckCircle2,
    color: "text-accent",
  },
  check: {
    label: "Prüfung empfohlen",
    description: "Der Schnellcheck sieht Punkte, die manuell geprüft werden sollten.",
    icon: CircleAlert,
    color: "text-amber-600",
  },
  missing: {
    label: "Angaben fehlen",
    description: "Der Schnellcheck konnte einzelne Informationen nicht finden.",
    icon: SearchX,
    color: "text-destructive",
  },
  unknown: {
    label: "Status unklar",
    description: "Der Schnellcheck konnte kein eindeutiges Ergebnis ableiten.",
    icon: CircleHelp,
    color: "text-muted-foreground",
  },
}

export function QuickCheckResultCard({ result }: QuickCheckResultCardProps) {
  const handleCtaClick = () => {
    document.getElementById("pakete")?.scrollIntoView({ behavior: "smooth" })
  }
  const status = statusConfig[result.status]
  const StatusIcon = status.icon

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-start gap-3">
            <StatusIcon
              className={`w-5 h-5 shrink-0 mt-0.5 ${status.color}`}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Geprüfte Domain</p>
              <p className="text-sm font-semibold text-foreground truncate">
                {result.input.normalized_url}
              </p>
              <p className={`text-xs font-semibold mt-2 ${status.color}`}>{status.label}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {status.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5 pb-5">
          <QuickCheckSummaryBadges summary={result.summary} />
        </CardContent>
      </Card>

      <QuickCheckChecksList checks={result.checks} />

      <QuickCheckDisclaimer text={result.disclaimer} />

      <div className="flex flex-col gap-2 pt-1">
        <Button
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
          onClick={handleCtaClick}
        >
          Barrierefreiheits-Audit anfragen
          <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
        </Button>
        <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
          Manuelle Prüfung empfohlen. Automatisierte Hinweise ersetzen keine fachkundige Prüfung.
        </p>
      </div>
    </div>
  )
}
