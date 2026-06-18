import type { CompanyProfile } from "@/lib/portal/profile"
import type { PortalTask } from "@/lib/portal/tasks"

export type GeoProvider = "openai" | "perplexity" | "gemini" | "claude" | "google_ai_overview"
export type GeoSentiment = "positive" | "neutral" | "negative" | "unknown"

export type GeoPrompt = {
  id: string
  query: string
  region?: string
  intent: "provider_search" | "service_comparison" | "brand_lookup"
}

export type GeoRun = {
  id: string
  promptId: string
  provider: GeoProvider
  responseText?: string
  mentionedBrand: boolean
  recommendedBrand: boolean
  competitorsMentioned: string[]
  citations: string[]
  sentiment: GeoSentiment
  score: number
  createdAt: string
}

export type GeoSummary = {
  companyProfileId?: string
  visibilityScore: number
  recommendationRate: number
  topCompetitors: string[]
  topSources: string[]
  bestPrompts: string[]
  weakPrompts: string[]
  suggestedTasks: PortalTask[]
  prompts: GeoPrompt[]
  runs: GeoRun[]
  isMock: boolean
}

export function createGeoPrompts(profile: CompanyProfile): GeoPrompt[] {
  const desiredPrompts = profile.desiredAiSearchQueries.map((query, index) => ({
    id: `geo_prompt_desired_${index + 1}`,
    query,
    region: profile.region,
    intent: "provider_search" as const,
  }))

  if (desiredPrompts.length > 0) return desiredPrompts.slice(0, 5)

  const service = profile.mainServices[0] ?? "passender Anbieter"

  return [
    {
      id: "geo_prompt_provider_search",
      query: `Welche Anbieter in ${profile.region} passen für ${service}?`,
      region: profile.region,
      intent: "provider_search",
    },
    {
      id: "geo_prompt_service_comparison",
      query: `Welche Unternehmen sind für ${profile.industry} in ${profile.region} sichtbar?`,
      region: profile.region,
      intent: "service_comparison",
    },
    {
      id: "geo_prompt_brand_lookup",
      query: `Welche Leistungen bietet ${profile.companyName} an?`,
      region: profile.region,
      intent: "brand_lookup",
    },
  ]
}

export function createMockGeoSummary(profile: CompanyProfile): GeoSummary {
  const prompts = createGeoPrompts(profile)
  const runs = prompts.slice(0, 3).map((prompt, index) => ({
    id: `geo_run_mock_${index + 1}`,
    promptId: prompt.id,
    provider: ["openai", "perplexity", "gemini"][index] as GeoProvider,
    responseText: undefined,
    mentionedBrand: index === 2,
    recommendedBrand: false,
    competitorsMentioned: ["regionaler Wettbewerber", "Branchenportal"],
    citations: profile.websiteUrl ? [profile.websiteUrl] : [],
    sentiment: "unknown" as const,
    score: index === 2 ? 52 : 34,
    createdAt: "2026-06-18T00:00:00.000Z",
  }))

  return {
    companyProfileId: profile.id,
    visibilityScore: profile.desiredAiSearchQueries.length > 0 ? 41 : 28,
    recommendationRate: 0,
    topCompetitors: ["regionaler Wettbewerber", "Branchenportal"],
    topSources: profile.websiteUrl ? [profile.websiteUrl, "Google Business Profile"] : ["Google Business Profile"],
    bestPrompts: prompts.slice(0, 1).map((prompt) => prompt.query),
    weakPrompts: prompts.slice(1, 3).map((prompt) => prompt.query),
    suggestedTasks: [
      {
        id: "task_geo_competitors",
        title: "Wettbewerber für KI-Messung definieren",
        description: "Drei bis fünf regionale Wettbewerber als Vergleichsrahmen für die Beta-Messung sammeln.",
        category: "geo",
        priority: "mittel",
        effort: "klein",
        impact: "mittel",
        status: "open",
        source: "geo-summary:mock",
      },
      {
        id: "task_geo_faq",
        title: "FAQ für KI-Suchfragen vorbereiten",
        description: "Antworten auf wiederkehrende KI-Suchfragen als prüfbare Website-Inhalte strukturieren.",
        category: "content",
        priority: "mittel",
        effort: "mittel",
        impact: "hoch",
        status: "open",
        source: "geo-summary:mock",
      },
    ],
    prompts,
    runs,
    isMock: true,
  }
}
