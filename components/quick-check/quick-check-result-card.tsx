import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScanResult } from "@/lib/quick-check-types"
import { QuickCheckScoreGrid } from "./quick-check-score-grid"
import { QuickCheckSummaryBadges } from "./quick-check-summary-badges"
import { QuickCheckChecksList } from "./quick-check-checks-list"
import { QuickCheckFindingsList } from "./quick-check-findings-list"
import { QuickCheckDisclaimer } from "./quick-check-disclaimer"

interface QuickCheckResultCardProps {
  result: ScanResult
}

export function QuickCheckResultCard({ result }: QuickCheckResultCardProps) {
  const handleCtaClick = () => {
    document.getElementById("pakete")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header: score + domain + summary pills */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-start gap-4">
            <QuickCheckScoreGrid score={result.score} />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Geprüfte Domain</p>
              <p className="text-sm font-semibold text-foreground truncate mb-1">
                {result.normalizedUrl}
              </p>
              <p className="text-[11px] text-muted-foreground mb-3">
                Scan:{" "}
                {new Date(result.scannedAt).toLocaleString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                Uhr
              </p>
              <QuickCheckSummaryBadges summary={result.summary} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Four check-area cards */}
      <QuickCheckChecksList checks={result.checks} />

      {/* Findings */}
      <QuickCheckFindingsList findings={result.findings} />

      {/* Disclaimer */}
      <QuickCheckDisclaimer text={result.disclaimer} />

      {/* CTA */}
      <div className="flex flex-col gap-2 pt-1">
        <Button
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
          onClick={handleCtaClick}
        >
          Barrierefreiheits-Audit anfragen
          <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
        </Button>
        <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
          Manuelle Prüfung empfohlen. Automatisierte Hinweise ersetzen keine fachkundige
          Begutachtung.
        </p>
      </div>
    </div>
  )
}
