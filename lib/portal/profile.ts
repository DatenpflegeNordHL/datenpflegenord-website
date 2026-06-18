import { z } from "zod"

export const PORTAL_PROFILE_STORAGE_KEY = "datenpflegenord.portal.companyProfile.v2"
export const LEGACY_PORTAL_PROFILE_STORAGE_KEY = "datenpflegenord.portal.companyProfile.v1"

export const businessModelSchema = z.enum(["b2b", "b2c", "both"])

export const companyProfileSchema = z.object({
  id: z.string().min(1),
  companyName: z.string().min(2),
  websiteUrl: z.string().optional(),
  industry: z.string().min(2),
  region: z.string().min(2),
  businessModel: businessModelSchema,
  mainServices: z.array(z.string()).default([]),
  targetCustomers: z.array(z.string()).default([]),
  cmsSystem: z.string().optional(),
  hasShop: z.boolean().default(false),
  hasBookingSystem: z.boolean().default(false),
  hasContactForms: z.boolean().default(false),
  hasGoogleBusinessProfile: z.boolean().default(false),
  hasExternalProfiles: z.boolean().default(false),
  usesAiTools: z.boolean().default(false),
  hasInternalDocuments: z.boolean().default(false),
  digitalProblems: z.array(z.string()).default([]),
  desiredAiSearchQueries: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const legacyCompanyProfileSchema = companyProfileSchema
  .omit({ id: true, updatedAt: true })
  .extend({
    createdAt: z.string().optional(),
  })

export type CompanyProfile = z.infer<typeof companyProfileSchema>
export type LegacyCompanyProfile = z.infer<typeof legacyCompanyProfileSchema>
export type BusinessModel = z.infer<typeof businessModelSchema>

export type CompanyProfileInput = Omit<CompanyProfile, "id" | "createdAt" | "updatedAt"> &
  Partial<Pick<CompanyProfile, "id" | "createdAt" | "updatedAt">>

export const sampleCompanyProfile: CompanyProfile = {
  id: "profile_sample_nord",
  companyName: "Beispielbetrieb Nord",
  websiteUrl: "https://beispielbetrieb.de",
  industry: "Lokaler Dienstleister",
  region: "Schleswig-Holstein",
  businessModel: "both",
  mainServices: ["Beratung", "Online-Buchung", "Service vor Ort"],
  targetCustomers: ["Privatkunden", "regionale Unternehmen"],
  cmsSystem: "WordPress",
  hasShop: false,
  hasBookingSystem: true,
  hasContactForms: true,
  hasGoogleBusinessProfile: true,
  hasExternalProfiles: true,
  usesAiTools: false,
  hasInternalDocuments: true,
  digitalProblems: ["Unklare BFSG-Readiness", "wenig lokale Sichtbarkeit"],
  desiredAiSearchQueries: [
    "Welcher Anbieter in Schleswig-Holstein passt für Service vor Ort?",
    "Welche lokalen Dienstleister haben eine einfache Online-Buchung?",
  ],
  createdAt: "2026-06-18T00:00:00.000Z",
  updatedAt: "2026-06-18T00:00:00.000Z",
}

export function createPortalId(prefix: string): string {
  const randomValue =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2)

  return `${prefix}_${randomValue}`
}

export function toCleanList(value: string): string[] {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function normalizeWebsiteUrl(value: string): string | undefined {
  const trimmed = value.trim()

  if (!trimmed) return undefined
  if (/^https?:\/\//i.test(trimmed)) return trimmed

  return `https://${trimmed}`
}

export function isWebsiteInput(value: string): boolean {
  const normalized = normalizeWebsiteUrl(value)

  if (!normalized) return true

  try {
    const url = new URL(normalized)
    return Boolean(url.hostname.includes("."))
  } catch {
    return false
  }
}

export function formatBusinessModel(value: BusinessModel): string {
  if (value === "b2b") return "B2B"
  if (value === "b2c") return "B2C"
  return "B2B und B2C"
}

export function normalizeCompanyProfile(input: CompanyProfileInput | LegacyCompanyProfile): CompanyProfile {
  const now = new Date().toISOString()
  const candidate = {
    ...input,
    id: "id" in input && input.id ? input.id : createPortalId("profile"),
    createdAt: input.createdAt ?? now,
    updatedAt: "updatedAt" in input && input.updatedAt ? input.updatedAt : now,
  }

  return companyProfileSchema.parse(candidate)
}

export function parseCompanyProfile(value: unknown): CompanyProfile | null {
  const currentProfile = companyProfileSchema.safeParse(value)

  if (currentProfile.success) {
    return currentProfile.data
  }

  const legacyProfile = legacyCompanyProfileSchema.safeParse(value)

  if (legacyProfile.success) {
    return normalizeCompanyProfile(legacyProfile.data)
  }

  return null
}
