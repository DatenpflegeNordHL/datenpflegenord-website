import type { CheckAreaId, FindingItem, Severity } from "@/lib/quick-check-types"
import type { CompanyProfile } from "@/lib/portal/profile"
import type { PortalTask } from "@/lib/portal/tasks"

export type ScanStatus = "idle" | "ready" | "running" | "completed" | "failed"
export type ScanDataSource = "none" | "mock" | "demo" | "api"

export type ScanScoreKey =
  | "trustSignalScore"
  | "bfsgReadinessScore"
  | "aiReadabilityScore"
  | "structuredDataScore"
  | "dataConsistencyScore"
  | "trustBasicsScore"

export type ScanScoreMap = Record<ScanScoreKey, number>

export type ScanFinding = {
  id: string
  category: CheckAreaId | "trust" | "content" | "data"
  severity: Severity
  title: string
  description: string
  recommendation: string
  source?: string
}

export type ScanSummary = {
  id: string
  companyProfileId?: string
  websiteUrl: string
  status: Extract<ScanStatus, "completed">
  source: Exclude<ScanDataSource, "none">
  scores: ScanScoreMap
  findings: ScanFinding[]
  topFindings: string[]
  suggestedTasks: PortalTask[]
  isMock: boolean
  isDemo: boolean
  createdAt: string
}

export type ScanServiceState = {
  status: ScanStatus
  source: ScanDataSource
  summary?: ScanSummary
  errorMessage?: string
}

export const scanScoreLabels: Record<ScanScoreKey, string> = {
  trustSignalScore: "TrustSignal Score",
  bfsgReadinessScore: "BFSG-Readiness-Indikatoren",
  aiReadabilityScore: "KI-Lesbarkeit",
  structuredDataScore: "Strukturierte Daten",
  dataConsistencyScore: "Datenpflege/Sichtbarkeit",
  trustBasicsScore: "Trust-Basics",
}

export function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0

  return Math.max(0, Math.min(100, Math.round(value)))
}

function scoreFromProfile(profile: CompanyProfile, base: number): number {
  const serviceBonus = Math.min(profile.mainServices.length * 4, 12)
  const profileBonus = profile.hasGoogleBusinessProfile ? 8 : 0
  const formPenalty = profile.hasContactForms ? 6 : 0
  const shopPenalty = profile.hasShop ? 8 : 0

  return clampScore(base + serviceBonus + profileBonus - formPenalty - shopPenalty)
}

export function mapQuickCheckFinding(finding: FindingItem): ScanFinding {
  return {
    id: finding.id,
    category: finding.category,
    severity: finding.severity,
    title: finding.title,
    description: finding.description,
    recommendation: finding.recommendation ?? "Befund fachlich prüfen und priorisieren.",
    source: finding.evidence?.url,
  }
}

export function createScanTaskFromFinding(finding: ScanFinding): PortalTask {
  const isHighPriority = finding.severity === "critical" || finding.severity === "serious"
  const isSmallEffort = finding.category === "seo" || finding.category === "privacy"

  return {
    id: `task_scan_finding_${finding.id}`,
    title: finding.recommendation,
    description: finding.description,
    category: "scan",
    priority: isHighPriority ? "hoch" : "mittel",
    effort: isSmallEffort ? "klein" : "mittel",
    impact: isHighPriority ? "hoch" : "mittel",
    status: "open",
    source: `scan-finding:${finding.id}`,
  }
}

export function createTasksFromScanFindings(findings: ScanFinding[]): PortalTask[] {
  return findings.slice(0, 5).map(createScanTaskFromFinding)
}

export function createMockScanSummary(profile: CompanyProfile): ScanSummary | undefined {
  if (!profile.websiteUrl) return undefined

  const findings: ScanFinding[] = [
    {
      id: "trust-basics-contact",
      category: "trust",
      severity: "serious",
      title: "Trust-Basics sichtbar prüfen",
      description: "Kontakt, Impressum, Datenschutz-Hinweise und klare Anfragewege sollten sichtbar und konsistent sein.",
      recommendation: "Trust-Basics sichtbar prüfen",
      source: profile.websiteUrl,
    },
    {
      id: "bfsg-readiness-forms",
      category: "accessibility",
      severity: "serious",
      title: "BFSG-Readiness-Indikatoren für Anfragewege prüfen",
      description: "Formulare, Buchung oder Shop sollten nach sichtbaren Readiness-Indikatoren priorisiert vorgeprüft werden.",
      recommendation: "BFSG-Readiness-Indikatoren für digitale Kundenwege prüfen",
      source: profile.websiteUrl,
    },
    {
      id: "ai-readability-content",
      category: "content",
      severity: "moderate",
      title: "Leistungsseiten und FAQ klarer strukturieren",
      description: "Antwortfähige Inhalte helfen, Leistungen, Region und Zielkunden für spätere KI-Auswertungen verständlicher zu machen.",
      recommendation: "Leistungsseiten und FAQ für KI-Lesbarkeit strukturieren",
      source: profile.websiteUrl,
    },
    {
      id: "structured-data",
      category: "seo",
      severity: "moderate",
      title: "Strukturierte Daten prüfen",
      description: "Schema.org-Markup für Organisation, lokale Daten und Leistungen kann als strukturelles Signal dienen.",
      recommendation: "Strukturierte Daten für Organisation und Leistungen prüfen",
      source: profile.websiteUrl,
    },
  ]

  const scores: ScanScoreMap = {
    trustSignalScore: scoreFromProfile(profile, 68),
    bfsgReadinessScore: clampScore(profile.hasShop || profile.hasBookingSystem ? 54 : 64),
    aiReadabilityScore: clampScore(profile.desiredAiSearchQueries.length > 0 ? 58 : 49),
    structuredDataScore: clampScore(profile.cmsSystem ? 52 : 42),
    dataConsistencyScore: clampScore(profile.hasGoogleBusinessProfile ? 66 : 45),
    trustBasicsScore: clampScore(profile.hasContactForms ? 61 : 55),
  }

  return {
    id: `scan_${profile.id}`,
    companyProfileId: profile.id,
    websiteUrl: profile.websiteUrl,
    status: "completed",
    source: "mock",
    scores,
    findings,
    topFindings: findings.slice(0, 3).map((finding) => finding.title),
    suggestedTasks: createTasksFromScanFindings(findings),
    isMock: true,
    isDemo: false,
    createdAt: "2026-06-18T00:00:00.000Z",
  }
}
