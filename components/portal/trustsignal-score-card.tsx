import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { ScanDataSource, ScanServiceState, ScanStatus } from "@/lib/portal/scan-summary"

type TrustSignalScoreCardProps = {
  scanState: ScanServiceState
}

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

export function TrustSignalScoreCard({ scanState }: TrustSignalScoreCardProps) {
  const scanSummary = scanState.summary

  if (!scanSummary) {
    const needsWebsiteUrl = scanState.status === "idle"
    const ctaHref = needsWebsiteUrl ? "/portal/start" : "/technischer-web-check"
    const ctaLabel = needsWebsiteUrl ? "Website-URL ergänzen" : "Technischen Web-Check buchen"

    return (
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                  TrustSignal
                </p>
                <CardTitle className="mt-2 text-xl leading-tight">
                  {scanState.status === "failed" ? "Scan-Daten nicht verfügbar" : "Scan vorbereiten"}
                </CardTitle>
              </div>
            </div>
            <Badge variant="outline">{statusLabel(scanState.status)}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {scanState.errorMessage ??
              "Für eine Score-Vorschau wird eine Website-URL benötigt. Der echte Scan bleibt der nächste bezahlbare Einstieg."}
          </p>
          <Button asChild className="w-fit bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href={ctaHref}>
              {ctaLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8">
              <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                TrustSignal
              </p>
              <CardTitle className="mt-2 text-xl leading-tight">Score-Vorschau</CardTitle>
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
      <CardContent className="flex flex-col gap-5">
        <div>
          <div className="mb-2 flex items-end justify-between gap-4">
            <span className="text-4xl font-bold text-foreground">
              {scanSummary.scores.trustSignalScore}
            </span>
            <span className="text-sm text-muted-foreground">von 100</span>
          </div>
          <Progress value={scanSummary.scores.trustSignalScore} />
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          TrustSignal ist ein Readiness- und Priorisierungs-Score für{" "}
          {scanSummary.websiteUrl.replace(/^https?:\/\//, "")}. Er ist eine Orientierung für die
          nächste fachliche Prüfung und kein rechtliches Zertifikat.
        </p>
        <Button asChild variant="outline" size="sm" className="w-fit">
          <Link href="/technischer-web-check">
            TrustSignal Scan starten <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
