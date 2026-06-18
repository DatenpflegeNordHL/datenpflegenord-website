import type { CompanyProfile } from "@/lib/portal/profile"
import type { PortalRecommendation, RecommendationType } from "@/lib/portal/recommendations"
import type { GeoSummary } from "@/lib/portal/geo-monitoring"
import type { ScanSummary } from "@/lib/portal/scan-summary"

export type PortalTaskStatus = "open" | "planned" | "done"
export type PortalTaskPriority = "hoch" | "mittel" | "niedrig"
export type PortalTaskEffort = "klein" | "mittel" | "groß"
export type PortalTaskImpact = "hoch" | "mittel" | "niedrig"

export type PortalTaskCategory =
  | RecommendationType
  | "scan"
  | "geo"
  | "content"
  | "profile"

export type PortalTask = {
  id: string
  title: string
  description: string
  category: PortalTaskCategory
  priority: PortalTaskPriority
  effort: PortalTaskEffort
  impact: PortalTaskImpact
  status: PortalTaskStatus
  source: string
}

function priorityFromRecommendation(priority: PortalRecommendation["priority"]): PortalTaskPriority {
  if (priority === "hoch") return "hoch"
  if (priority === "mittel") return "mittel"
  return "niedrig"
}

function createRecommendationTask(recommendation: PortalRecommendation): PortalTask {
  const shared = {
    id: `task_${recommendation.id}`,
    category: recommendation.id,
    priority: priorityFromRecommendation(recommendation.priority),
    status: "open" as const,
    source: `recommendation:${recommendation.id}`,
  }

  if (recommendation.id === "trustsignal") {
    return {
      ...shared,
      title: "TrustSignal Scan buchen",
      description: "Website extern vorprüfen lassen und die erste Messlinie im Portal dokumentieren.",
      effort: "klein",
      impact: "hoch",
    }
  }

  if (recommendation.id === "bfsg_readiness") {
    return {
      ...shared,
      title: "BFSG-Readiness-Indikatoren prüfen",
      description: "Shop, Buchung und Formulare als digitale Kundenwege priorisiert vorprüfen.",
      effort: "mittel",
      impact: "hoch",
    }
  }

  if (recommendation.id === "ai_visibility") {
    return {
      ...shared,
      title: "KI-Suchfragen für Beta-Messung festlegen",
      description: "Prompts, Region und Wettbewerber für eine spätere regelmäßige Messung sammeln.",
      effort: "klein",
      impact: "mittel",
    }
  }

  if (recommendation.id === "datenpflege") {
    return {
      ...shared,
      title: "Externe Profile sammeln und abgleichen",
      description: "Google Business Profile, Branchenprofile und Standortdaten in eine Prüfliste überführen.",
      effort: "mittel",
      impact: "hoch",
    }
  }

  if (recommendation.id === "datamap") {
    return {
      ...shared,
      title: "Dokumentenquellen für DataMap erfassen",
      description: "Interne FAQs, Preislisten und Wissensquellen ohne Upload sensibler Dateien inventarisieren.",
      effort: "mittel",
      impact: "mittel",
    }
  }

  if (recommendation.id === "ki_upsell_sprint") {
    return {
      ...shared,
      title: "Leistungsseiten und FAQ für KI-Lesbarkeit strukturieren",
      description: "Antwortfähige Inhalte für die wichtigsten KI-Suchfragen planen und priorisieren.",
      effort: "groß",
      impact: "hoch",
    }
  }

  return {
    ...shared,
    title: "Digitalisierungsprobleme priorisieren",
    description: "Offene Probleme in einen ersten Maßnahmenplan und mögliche Förderlogik übersetzen.",
    effort: "klein",
    impact: "mittel",
  }
}

function createProfileTask(profile: CompanyProfile): PortalTask | null {
  if (profile.websiteUrl) return null

  return {
    id: "task_profile_website",
    title: "Website-URL ergänzen",
    description: "Ohne Website-URL bleiben TrustSignal Scan und technische Vorprüfung nur eingeschränkt planbar.",
    category: "profile",
    priority: "mittel",
    effort: "klein",
    impact: "mittel",
    status: "open",
    source: "profile",
  }
}

export function generatePortalTasks({
  profile,
  recommendations,
  scanSummary,
  geoSummary,
}: {
  profile: CompanyProfile
  recommendations: PortalRecommendation[]
  scanSummary?: ScanSummary
  geoSummary?: GeoSummary
}): PortalTask[] {
  const tasks = recommendations.map(createRecommendationTask)
  const profileTask = createProfileTask(profile)

  if (profileTask) tasks.unshift(profileTask)
  if (scanSummary?.suggestedTasks.length) tasks.push(...scanSummary.suggestedTasks)
  if (geoSummary?.suggestedTasks.length) tasks.push(...geoSummary.suggestedTasks)

  return tasks
}
