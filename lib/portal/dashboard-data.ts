import {
  buildPortalAssistantContext,
  createPortalAssistantPreview,
  type PortalAssistantPreview,
} from "@/lib/portal-assistant/context-builder"
import { createMockGeoSummary, type GeoSummary } from "@/lib/portal/geo-monitoring"
import { sampleCompanyProfile, type CompanyProfile } from "@/lib/portal/profile"
import { getPortalRecommendations, type PortalRecommendation } from "@/lib/portal/recommendations"
import { portalScanService, type TrustSignalScanMode } from "@/lib/portal/scan-service"
import type { ScanServiceState, ScanSummary } from "@/lib/portal/scan-summary"
import { generatePortalTasks, type PortalTask } from "@/lib/portal/tasks"

export type PortalDashboardData = {
  profile: CompanyProfile
  recommendations: PortalRecommendation[]
  tasks: PortalTask[]
  scanState: ScanServiceState
  scanSummary?: ScanSummary
  geoSummary: GeoSummary
  assistantPreview: PortalAssistantPreview
  isExample: boolean
}

export async function buildPortalDashboardData(
  profile: CompanyProfile | null,
  scanMode: TrustSignalScanMode = "mock",
): Promise<PortalDashboardData> {
  const activeProfile = profile ?? sampleCompanyProfile
  const recommendations = getPortalRecommendations(activeProfile)
  const scanState = await portalScanService.runScan(activeProfile, scanMode)
  const scanSummary = scanState.summary
  const geoSummary = createMockGeoSummary(activeProfile)
  const tasks = generatePortalTasks({
    profile: activeProfile,
    recommendations,
    scanSummary,
    geoSummary,
  })
  const assistantContext = buildPortalAssistantContext({
    profile: activeProfile,
    recommendations,
    tasks,
    scanSummary,
    geoSummary,
  })

  return {
    profile: activeProfile,
    recommendations,
    tasks,
    scanState,
    scanSummary,
    geoSummary,
    assistantPreview: createPortalAssistantPreview(assistantContext),
    isExample: !profile,
  }
}
