import { portalAssistantSystemPrompt } from "@/lib/portal-assistant/system-prompt"
import type { CompanyProfile } from "@/lib/portal/profile"
import type { GeoSummary } from "@/lib/portal/geo-monitoring"
import type { PortalRecommendation } from "@/lib/portal/recommendations"
import type { ScanSummary } from "@/lib/portal/scan-summary"
import type { PortalTask } from "@/lib/portal/tasks"

export type PortalAssistantContext = {
  systemPrompt: string
  profile: Pick<
    CompanyProfile,
    "companyName" | "websiteUrl" | "industry" | "region" | "businessModel" | "mainServices"
  >
  recommendations: Array<Pick<PortalRecommendation, "title" | "priority" | "reasons" | "nextStep">>
  openTasks: Array<Pick<PortalTask, "title" | "priority" | "effort" | "impact" | "category">>
  scanSummary?: Pick<
    ScanSummary,
    "scores" | "topFindings" | "source" | "isMock" | "isDemo"
  >
  geoSummary?: Pick<GeoSummary, "visibilityScore" | "recommendationRate" | "weakPrompts" | "isMock">
}

export type PortalAssistantPreview = {
  title: string
  description: string
  prompts: string[]
  mockAnswer: string
  context: PortalAssistantContext
}

export function buildPortalAssistantContext({
  profile,
  recommendations,
  tasks,
  scanSummary,
  geoSummary,
}: {
  profile: CompanyProfile
  recommendations: PortalRecommendation[]
  tasks: PortalTask[]
  scanSummary?: ScanSummary
  geoSummary?: GeoSummary
}): PortalAssistantContext {
  return {
    systemPrompt: portalAssistantSystemPrompt,
    profile: {
      companyName: profile.companyName,
      websiteUrl: profile.websiteUrl,
      industry: profile.industry,
      region: profile.region,
      businessModel: profile.businessModel,
      mainServices: profile.mainServices,
    },
    recommendations: recommendations.slice(0, 4).map((recommendation) => ({
      title: recommendation.title,
      priority: recommendation.priority,
      reasons: recommendation.reasons,
      nextStep: recommendation.nextStep,
    })),
    openTasks: tasks
      .filter((task) => task.status !== "done")
      .slice(0, 6)
      .map((task) => ({
        title: task.title,
        priority: task.priority,
        effort: task.effort,
        impact: task.impact,
        category: task.category,
      })),
    scanSummary: scanSummary
      ? {
          scores: scanSummary.scores,
          topFindings: scanSummary.topFindings,
          source: scanSummary.source,
          isMock: scanSummary.isMock,
          isDemo: scanSummary.isDemo,
        }
      : undefined,
    geoSummary: geoSummary
      ? {
          visibilityScore: geoSummary.visibilityScore,
          recommendationRate: geoSummary.recommendationRate,
          weakPrompts: geoSummary.weakPrompts,
          isMock: geoSummary.isMock,
        }
      : undefined,
  }
}

export function createPortalAssistantPreview(context: PortalAssistantContext): PortalAssistantPreview {
  const topRecommendation = context.recommendations[0]
  const topTask = context.openTasks[0]

  return {
    title: "Portal-Assistent Preview",
    description:
      "Mock-Vorschau ohne externen KI-Aufruf. Der Assistent kann spaeter Profil, Empfehlungen, Tasks und Beta-Messpunkte erklaeren.",
    prompts: [
      "Warum ist diese Empfehlung priorisiert?",
      "Welche Aufgaben gehoeren in die naechsten 30 Tage?",
      "Wie koennen wir die KI-Suchfragen verbessern?",
    ],
    mockAnswer: [
      topRecommendation
        ? `Starten Sie mit "${topRecommendation.title}", weil ${topRecommendation.reasons.join(" und ")}.`
        : "Starten Sie mit einem vollstaendigen CompanyProfile, damit Empfehlungen priorisiert werden koennen.",
      topTask ? `Als erste Aufgabe eignet sich "${topTask.title}" mit Aufwand ${topTask.effort}.` : "",
      "BFSG wird hier nur als Readiness-Vorpruefung mit Indikatoren behandelt. GEO bleibt eine Beta-Messung.",
    ]
      .filter(Boolean)
      .join(" "),
    context,
  }
}
