export type PortalStorage = {
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): Promise<void>
  removeItem(key: string): Promise<void>
}

function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null

  try {
    return window.localStorage
  } catch {
    return null
  }
}

export const browserPortalStorage: PortalStorage = {
  async getItem(key) {
    const storage = getLocalStorage()

    if (!storage) return null

    try {
      return storage.getItem(key)
    } catch {
      return null
    }
  },
  async setItem(key, value) {
    const storage = getLocalStorage()

    if (!storage) return

    try {
      storage.setItem(key, value)
    } catch {
      // Browser storage is a demo persistence layer. Failed writes must not break the portal UI.
    }
  },
  async removeItem(key) {
    const storage = getLocalStorage()

    if (!storage) return

    try {
      storage.removeItem(key)
    } catch {
      // Keep dashboard rendering even when browser storage is unavailable or blocked.
    }
  },
}
