import Link from "next/link"
import { ArrowRight, CheckCircle2, FileSearch } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  scanScoreLabels,
  type ScanDataSource,
  type ScanScoreKey,
  type ScanServiceState,
  type ScanStatus,
} from "@/lib/portal/scan-summary"

type ScanSummaryCardsProps = {
  scanState: ScanServiceState
}

const scoreItems: ScanScoreKey[] = [
  "bfsgReadinessScore",
  "aiReadabilityScore",
  "structuredDataScore",
  "dataConsistencyScore",
  "trustBasicsScore",
]

function sourceLabel(source: ScanDataSource): string {
  if (source === "api") return "API-Daten"
  if (source === "demo") return "Demo"
  if (source === "mock") return "Mock-Daten"
  return "ohne Scan"
}

function statusLabel(status: ScanStatus): string {
  if (status === "completed") return "abgeschlossen"
  if (status === "running") return "läuft"
  if (status === "failed") return "fehlgeschlagen"
  if (status === "ready") return "bereit"
  return "offen"
}

export function ScanSummaryCards({ scanState }: ScanSummaryCardsProps) {
  const scanSummary = scanState.summary

  if (!scanSummary) {
    const needsWebsiteUrl = scanState.status === "idle"
    const primaryHref = needsWebsiteUrl ? "/portal/start" : "/technischer-web-check"
    const primaryLabel = needsWebsiteUrl ? "Website-URL ergänzen" : "Technischen Web-Check buchen"

    return (
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <CardTitle className="text-xl leading-tight">Scan-Bereich</CardTitle>
          <Badge variant="outline">{statusLabel(scanState.status)}</Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {scanState.errorMessage ??
              "Sobald eine Website-URL im Profil vorhanden ist, kann das Dashboard eine TrustSignal-/Readiness-Vorschau anzeigen."}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild size="sm" className="w-fit bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href={primaryHref}>
                {primaryLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            {!needsWebsiteUrl && (
              <Button asChild variant="outline" size="sm" className="w-fit">
                <Link href="/portal/start">Profil prüfen</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <FileSearch className="h-5 w-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                ScanSummary
              </p>
              <CardTitle className="mt-2 text-xl leading-tight">Readiness-Bereiche</CardTitle>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <Badge variant={scanSummary.source === "api" ? "default" : "secondary"}>
              {sourceLabel(scanSummary.source)}
            </Badge>
            <Badge variant="outline">{statusLabel(scanState.status)}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          {scoreItems.map((scoreKey) => (
            <div key={scoreKey} className="rounded-lg border border-border bg-secondary/30 p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">{scanScoreLabels[scoreKey]}</p>
                <span className="text-sm font-bold text-foreground">{scanSummary.scores[scoreKey]}</span>
              </div>
              <Progress value={scanSummary.scores[scoreKey]} />
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-5">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Findings
            </p>
            <Badge variant="outline">{scanSummary.findings.length} Befunde</Badge>
          </div>
          <ul className="flex flex-col gap-2">
            {scanSummary.findings.slice(0, 4).map((finding) => (
              <li key={finding.id} className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <span className="font-semibold">{finding.title}:</span> {finding.recommendation}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
