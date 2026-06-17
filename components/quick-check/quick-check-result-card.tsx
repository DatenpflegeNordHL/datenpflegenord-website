import Link from "next/link"
import { ArrowRight, CheckCircle2, CircleAlert, CircleHelp, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { QuickCheckStatus, ScanResult } from "@/lib/quick-check-types"
import { statusPresentation } from "./quick-check-presentation"
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
    label: "Erste Orientierung: unauffällig",
    description: statusPresentation.ok.description,
    icon: CheckCircle2,
    color: "text-accent",
  },
  check: {
    label: "Erste Orientierung: prüfen",
    description: statusPresentation.check.description,
    icon: CircleAlert,
    color: "text-amber-600",
  },
  missing: {
    label: "Erste Orientierung: Handlungsbedarf",
    description: statusPresentation.missing.description,
    icon: SearchX,
    color: "text-destructive",
  },
  unknown: {
    label: "Erste Orientierung: nicht eindeutig",
    description: statusPresentation.unknown.description,
    icon: CircleHelp,
    color: "text-muted-foreground",
  },
}

export function QuickCheckResultCard({ result }: QuickCheckResultCardProps) {
  const status = statusConfig[result.status]
  const StatusIcon = status.icon

  return (
    <div className="flex flex-col gap-4">
      <Card className="animate-fade-up">
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
                {status.description} Die Hinweise sind eine technische Vorprüfung und ersetzen
                keine vollständige manuelle Bewertung.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-up animation-delay-100">
        <CardContent className="pt-5 pb-5">
          <QuickCheckSummaryBadges result={result} />
        </CardContent>
      </Card>

      <div className="animate-fade-up animation-delay-200">
        <QuickCheckChecksList checks={result.checks} />
      </div>

      <div className="animate-fade-up animation-delay-300">
        <QuickCheckDisclaimer text={result.disclaimer} />
      </div>

      <div className="flex flex-col gap-2 pt-1 animate-fade-up animation-delay-400">
        <Button
          asChild
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-all duration-200 hover:shadow-sm active:scale-[0.99]"
        >
          <Link href="/kontakt?anliegen=ki-prozesscheck">
            KI-Potenzial besprechen
            <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </Link>
        </Button>
        <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
          Sie möchten wissen, was davon wirklich relevant ist? Wir prüfen die technischen Hinweise
          und bereiten konkrete nächste Schritte verständlich auf.
        </p>
      </div>
    </div>
  )
}
