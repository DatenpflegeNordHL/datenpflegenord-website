import {
  LEGACY_PORTAL_PROFILE_STORAGE_KEY,
  PORTAL_PROFILE_STORAGE_KEY,
  normalizeCompanyProfile,
  parseCompanyProfile,
  type CompanyProfile,
  type CompanyProfileInput,
} from "@/lib/portal/profile"
import { browserPortalStorage, type PortalStorage } from "@/lib/portal/storage"

export type PortalProfileService = {
  getProfileResult(): Promise<PortalProfileLoadResult>
  getProfile(): Promise<CompanyProfile | null>
  saveProfile(profile: CompanyProfileInput): Promise<CompanyProfile>
  clearProfile(): Promise<void>
}

export type PortalProfileLoadStatus =
  | "found"
  | "missing"
  | "migrated"
  | "invalid-cleared"

export type PortalProfileLoadResult = {
  profile: CompanyProfile | null
  status: PortalProfileLoadStatus
  message?: string
}

type StoredProfileParseResult =
  | { status: "empty"; profile: null }
  | { status: "valid"; profile: CompanyProfile }
  | { status: "invalid"; profile: null }

function parseStoredProfile(value: string | null): StoredProfileParseResult {
  if (!value) return { status: "empty", profile: null }

  try {
    const profile = parseCompanyProfile(JSON.parse(value))

    if (!profile) {
      return { status: "invalid", profile: null }
    }

    return { status: "valid", profile }
  } catch {
    return { status: "invalid", profile: null }
  }
}

export function createPortalProfileService(
  storage: PortalStorage = browserPortalStorage,
): PortalProfileService {
  async function getProfileResult(): Promise<PortalProfileLoadResult> {
    let hadInvalidProfile = false
    const currentProfile = parseStoredProfile(await storage.getItem(PORTAL_PROFILE_STORAGE_KEY))

    if (currentProfile.status === "valid") {
      return {
        profile: currentProfile.profile,
        status: "found",
      }
    }

    if (currentProfile.status === "invalid") {
      hadInvalidProfile = true
      await storage.removeItem(PORTAL_PROFILE_STORAGE_KEY)
    }

    const legacyProfile = parseStoredProfile(await storage.getItem(LEGACY_PORTAL_PROFILE_STORAGE_KEY))

    if (legacyProfile.status === "valid") {
      await storage.setItem(PORTAL_PROFILE_STORAGE_KEY, JSON.stringify(legacyProfile.profile))
      await storage.removeItem(LEGACY_PORTAL_PROFILE_STORAGE_KEY)

      return {
        profile: legacyProfile.profile,
        status: "migrated",
        message: hadInvalidProfile
          ? "Ein beschädigtes Portalprofil wurde entfernt. Ein älteres Profil wurde migriert."
          : "Ein älteres lokales Portalprofil wurde automatisch migriert.",
      }
    }

    if (legacyProfile.status === "invalid") {
      hadInvalidProfile = true
      await storage.removeItem(LEGACY_PORTAL_PROFILE_STORAGE_KEY)
    }

    if (hadInvalidProfile) {
      return {
        profile: null,
        status: "invalid-cleared",
        message:
          "Lokale Profildaten waren beschädigt und wurden zurückgesetzt. Das Dashboard zeigt deshalb eine Beispielansicht.",
      }
    }

    return {
      profile: null,
      status: "missing",
    }
  }

  return {
    getProfileResult,

    async getProfile() {
      return (await getProfileResult()).profile
    },

    async saveProfile(input) {
      const profile = normalizeCompanyProfile({
        ...input,
        updatedAt: new Date().toISOString(),
      })

      await storage.setItem(PORTAL_PROFILE_STORAGE_KEY, JSON.stringify(profile))
      await storage.removeItem(LEGACY_PORTAL_PROFILE_STORAGE_KEY)

      return profile
    },

    async clearProfile() {
      await storage.removeItem(PORTAL_PROFILE_STORAGE_KEY)
      await storage.removeItem(LEGACY_PORTAL_PROFILE_STORAGE_KEY)
    },
  }
}

export const portalProfileService = createPortalProfileService()
