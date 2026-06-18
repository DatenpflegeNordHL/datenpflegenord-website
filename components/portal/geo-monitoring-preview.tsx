import { BarChart3, SearchCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { GeoSummary } from "@/lib/portal/geo-monitoring"

type GeoMonitoringPreviewProps = {
  geoSummary: GeoSummary
}

export function GeoMonitoringPreview({ geoSummary }: GeoMonitoringPreviewProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <BarChart3 className="h-5 w-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                KI-Sichtbarkeitsmonitoring Beta
              </p>
              <CardTitle className="mt-2 text-xl leading-tight">GEO-Messpunkte</CardTitle>
            </div>
          </div>
          {geoSummary.isMock && <Badge variant="secondary">Beta/Vorschau</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Sichtbarkeitswert</p>
              <span className="text-sm font-bold">{geoSummary.visibilityScore}</span>
            </div>
            <Progress value={geoSummary.visibilityScore} />
          </div>
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Empfehlungsrate</p>
              <span className="text-sm font-bold">{geoSummary.recommendationRate}%</span>
            </div>
            <Progress value={geoSummary.recommendationRate} />
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Beta-Vorschau für regelmäßige Messungen ausgewählter KI-Suchfragen. Das ist kein
          Live-Monitoring und keine Zusage für KI-Sichtbarkeit.
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Schwache Prompts
            </p>
            <ul className="flex flex-col gap-2">
              {geoSummary.weakPrompts.slice(0, 3).map((prompt) => (
                <li key={prompt} className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
                  <SearchCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{prompt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Vergleichsrahmen
            </p>
            <div className="flex flex-wrap gap-2">
              {geoSummary.topCompetitors.map((competitor) => (
                <Badge key={competitor} variant="outline">
                  {competitor}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
