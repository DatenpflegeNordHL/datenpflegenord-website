import { QuickCheckError, quickCheck } from "@/lib/nordaudit-api"
import type { CheckAreaId, QuickCheckScanResult, Severity } from "@/lib/quick-check-types"
import type { CompanyProfile } from "@/lib/portal/profile"
import {
  clampScore,
  createMockScanSummary,
  createTasksFromScanFindings,
  mapQuickCheckFinding,
  type ScanScoreMap,
  type ScanServiceState,
  type ScanSummary,
} from "@/lib/portal/scan-summary"

export type TrustSignalScanMode = "none" | "mock" | "api"

export type TrustSignalScanRequest = {
  companyProfileId?: string
  websiteUrl: string
  mode?: TrustSignalScanMode
}

export type TrustSignalScanResponse = {
  status: "completed"
  source: "mock" | "demo" | "api"
  summary: ScanSummary
}

export type PortalScanService = {
  getInitialState(profile: CompanyProfile): ScanServiceState
  getRunningState(profile: CompanyProfile, mode?: Exclude<TrustSignalScanMode, "none">): ScanServiceState
  runScan(profile: CompanyProfile, mode?: TrustSignalScanMode): Promise<ScanServiceState>
}

const quickCheckScoreKeys = ["accessibility", "technical", "privacy", "seo"] as const
const quickCheckFindingCategories = ["accessibility", "technical", "privacy", "seo"] as const satisfies CheckAreaId[]
const quickCheckFindingSeverities = ["critical", "serious", "moderate", "minor", "info"] as const satisfies Severity[]

function createIdleState(): ScanServiceState {
  return {
    status: "idle",
    source: "none",
    errorMessage: "Für eine TrustSignal-Vorprüfung wird zuerst eine Website-URL benötigt.",
  }
}

function createReadyState(): ScanServiceState {
  return {
    status: "ready",
    source: "none",
  }
}

function createRunningState(source: "mock" | "api"): ScanServiceState {
  return {
    status: "running",
    source,
  }
}

function isFiniteApiScore(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value)
}

function isKnownFindingCategory(value: unknown): value is CheckAreaId {
  return typeof value === "string" && (quickCheckFindingCategories as readonly string[]).includes(value)
}

function isKnownFindingSeverity(value: unknown): value is Severity {
  return typeof value === "string" && (quickCheckFindingSeverities as readonly string[]).includes(value)
}

function hasUsableApiFinding(value: unknown): boolean {
  if (!value || typeof value !== "object") return false

  const finding = value as Partial<QuickCheckScanResult["findings"][number]>

  return (
    typeof finding.id === "string" &&
    isKnownFindingCategory(finding.category) &&
    isKnownFindingSeverity(finding.severity) &&
    typeof finding.title === "string" &&
    typeof finding.description === "string"
  )
}

function assertUsableQuickCheckResult(result: QuickCheckScanResult): void {
  const hasUsableScores = quickCheckScoreKeys.every((scoreKey) =>
    isFiniteApiScore(result.score?.[scoreKey]),
  )

  if (!hasUsableScores) {
    throw new QuickCheckError(
      "invalid-response",
      "Die Schnellcheck-Antwort enthält keine verwendbaren Score-Werte.",
    )
  }

  if (!result.normalizedUrl.trim()) {
    throw new QuickCheckError(
      "invalid-response",
      "Die Schnellcheck-Antwort enthält keine verwendbare Website-URL.",
    )
  }

  if (!Number.isFinite(Date.parse(result.scannedAt))) {
    throw new QuickCheckError(
      "invalid-response",
      "Die Schnellcheck-Antwort enthält keinen verwendbaren Prüfzeitpunkt.",
    )
  }

  if (!result.findings.every(hasUsableApiFinding)) {
    throw new QuickCheckError(
      "invalid-response",
      "Die Schnellcheck-Antwort enthält unvollständige Befunde.",
    )
  }
}

function mapQuickCheckToScanSummary(
  profile: CompanyProfile,
  result: QuickCheckScanResult,
): ScanSummary {
  assertUsableQuickCheckResult(result)

  const scannedAt = new Date(result.scannedAt).toISOString()
  const scores: ScanScoreMap = {
    trustSignalScore: clampScore(
      (result.score.accessibility + result.score.technical + result.score.privacy + result.score.seo) / 4,
    ),
    bfsgReadinessScore: clampScore(result.score.accessibility),
    aiReadabilityScore: clampScore((result.score.seo * 0.7 + result.score.accessibility * 0.3)),
    structuredDataScore: clampScore(result.score.seo),
    dataConsistencyScore: clampScore((result.score.seo + result.score.privacy) / 2),
    trustBasicsScore: clampScore((result.score.technical + result.score.privacy) / 2),
  }
  const findings = result.findings.map(mapQuickCheckFinding)

  return {
    id: `scan_api_${profile.id}_${Date.parse(scannedAt)}`,
    companyProfileId: profile.id,
    websiteUrl: result.normalizedUrl.startsWith("http")
      ? result.normalizedUrl
      : `https://${result.normalizedUrl}`,
    status: "completed",
    source: "api",
    scores,
    findings,
    topFindings: findings.slice(0, 3).map((finding) => finding.title),
    suggestedTasks: createTasksFromScanFindings(findings),
    isMock: false,
    isDemo: false,
    createdAt: scannedAt,
  }
}

function errorMessageFromScanError(error: unknown): string {
  if (error instanceof QuickCheckError) {
    return error.message
  }

  return "TrustSignal Scan-Daten konnten nicht geladen werden."
}

export function createPortalScanService(): PortalScanService {
  return {
    getInitialState(profile) {
      if (!profile.websiteUrl) return createIdleState()
      return createReadyState()
    },

    getRunningState(profile, mode = "mock") {
      if (!profile.websiteUrl) return createIdleState()
      return createRunningState(mode)
    },

    async runScan(profile, mode = "mock") {
      if (!profile.websiteUrl) return createIdleState()

      if (mode === "none") return createReadyState()

      if (mode === "api") {
        try {
          const result = await quickCheck(profile.websiteUrl)
          return {
            status: "completed",
            source: "api",
            summary: mapQuickCheckToScanSummary(profile, result),
          }
        } catch (error) {
          return {
            status: "failed",
            source: "api",
            errorMessage: errorMessageFromScanError(error),
          }
        }
      }

      const summary = createMockScanSummary(profile)

      if (!summary) return createIdleState()

      return {
        status: "completed",
        source: "mock",
        summary,
      }
    },
  }
}

export const portalScanService = createPortalScanService()
