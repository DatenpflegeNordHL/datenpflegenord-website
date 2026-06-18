"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CompanyProfile } from "@/components/portal/company-profile"
import { GeoMonitoringPreview } from "@/components/portal/geo-monitoring-preview"
import { PortalAssistantPreview } from "@/components/portal/portal-assistant-preview"
import { PortalTaskList } from "@/components/portal/portal-task-list"
import { RecommendationCards } from "@/components/portal/recommendation-cards"
import { ScanSummaryCards } from "@/components/portal/scan-summary-cards"
import { TrustSignalScoreCard } from "@/components/portal/trustsignal-score-card"
import { buildPortalDashboardData, type PortalDashboardData } from "@/lib/portal/dashboard-data"
import {
  portalProfileService,
  type PortalProfileLoadResult,
} from "@/lib/portal/profile-service"

function ProfileLoadNotice({ result }: { result: PortalProfileLoadResult | null }) {
  if (!result || result.status === "found" || result.status === "missing") return null

  const isInvalid = result.status === "invalid-cleared"

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2">
        <Badge variant={isInvalid ? "destructive" : "secondary"} className="w-fit">
          {isInvalid ? "Lokale Daten zurückgesetzt" : "Profil migriert"}
        </Badge>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {result.message ??
            "Lokale Profildaten wurden geprüft. Die Ergebnisansicht bleibt als Beispiel nutzbar."}
        </p>
      </div>
      <Button asChild variant={isInvalid ? "default" : "outline"} size="sm" className="w-fit">
        <Link href="/portal/start">
          Profil erfassen <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  )
}

export function PortalDashboardClient() {
  const [dashboardData, setDashboardData] = useState<PortalDashboardData | null>(null)
  const [profileLoadResult, setProfileLoadResult] = useState<PortalProfileLoadResult | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadDashboardData() {
      const result = await portalProfileService.getProfileResult()
      const data = await buildPortalDashboardData(result.profile)

      if (isMounted) {
        setDashboardData(data)
        setProfileLoadResult(result)
      }
    }

    loadDashboardData()

    return () => {
      isMounted = false
    }
  }, [])

  if (!dashboardData) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-64 animate-pulse rounded-xl border border-border bg-secondary" />
        <div className="h-64 animate-pulse rounded-xl border border-border bg-secondary" />
      </div>
    )
  }

  const {
    profile,
    recommendations,
    tasks,
    scanState,
    geoSummary,
    assistantPreview,
    isExample,
  } = dashboardData

  return (
    <div className="flex flex-col gap-8">
      <ProfileLoadNotice result={profileLoadResult} />

      {isExample && (
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-secondary/40 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <Badge variant="secondary" className="w-fit">
              Beispielansicht
            </Badge>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Es wurde noch kein lokales CompanyProfile gefunden. Die Ansicht zeigt Beispieldaten
              mit Demo-Vorschauen.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/portal/start">
              Onboarding starten <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <CompanyProfile profile={profile} />
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                Ergebnis
              </p>
              <h2 className="mt-2 text-2xl font-bold text-foreground">Empfohlene nächste Schritte</h2>
            </div>
            <Badge variant="outline">{recommendations.length} Treffer</Badge>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Die Empfehlungen basieren auf CompanyProfile, Scan-Vorschau und GEO-Beta-Struktur.
            Sie ersetzen keine Beratung, schaffen aber eine klare Arbeitsliste für den nächsten
            Schritt.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/technischer-web-check">
                TrustSignal Scan starten <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/portal/start">
                Profil neu erfassen <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
        <TrustSignalScoreCard scanState={scanState} />
        <ScanSummaryCards scanState={scanState} />
      </section>

      <section className="flex flex-col gap-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
            Recommendation Engine
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground">Priorisierte Empfehlungen</h2>
        </div>
        <RecommendationCards recommendations={recommendations} />
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <PortalTaskList tasks={tasks} />
        <GeoMonitoringPreview geoSummary={geoSummary} />
      </div>

      <PortalAssistantPreview preview={assistantPreview} />
    </div>
  )
}
