import type {
  QuickCheckItem,
  QuickCheckKey,
  QuickCheckStatus,
  ScanResult,
} from "@/lib/quick-check-types"

type StatusPresentation = {
  label: string
  description: string
}

type CheckCopy = {
  label: string
  description: string
}

const checkCopy: Record<QuickCheckKey, CheckCopy> = {
  reachability: {
    label: "Erreichbarkeit der Website",
    description: "Ob die Website technisch erreichbar war.",
  },
  https: {
    label: "HTTPS / sichere Verbindung",
    description: "Ob die Website über eine verschlüsselte Verbindung erreichbar ist.",
  },
  title: {
    label: "Seitentitel",
    description: "Ob ein aussagekräftiger Titel für Browser und Suchmaschinen vorhanden ist.",
  },
  meta_description: {
    label: "Meta-Beschreibung",
    description: "Ob eine kurze Seitenbeschreibung für Suchmaschinen hinterlegt ist.",
  },
  h1: {
    label: "Hauptüberschrift",
    description: "Ob die Seite eine erkennbare zentrale Überschrift enthält.",
  },
  html_lang: {
    label: "Spracheinstellung der Seite",
    description: "Ob die Seitensprache technisch ausgezeichnet ist.",
  },
  impressum_link: {
    label: "Impressum-Link",
    description: "Ob ein Impressum-Link sichtbar auffindbar war.",
  },
  privacy_link: {
    label: "Datenschutz-Link",
    description: "Ob ein Datenschutz-Link sichtbar auffindbar war.",
  },
  tracker_signals: {
    label: "Tracker-Signale",
    description: "Ob Hinweise auf externe Tracking- oder Analyse-Domains sichtbar waren.",
  },
}

const labelAliases: Record<string, string> = {
  "website reachability": "Erreichbarkeit der Website",
  "https transport": "HTTPS / sichere Verbindung",
  "title tag": "Seitentitel",
  "meta description": "Meta-Beschreibung",
  "primary heading": "Hauptüberschrift",
  "html lang attribute": "Spracheinstellung der Seite",
  "impressum link": "Impressum-Link",
  "privacy policy link": "Datenschutz-Link",
  "tracker domain signals": "Tracker-Signale",
}

const textAliases: Record<string, string> = {
  "website reachable": "Die Website war erreichbar.",
  "website is reachable": "Die Website war erreichbar.",
  "website not reachable": "Die Website war nicht eindeutig erreichbar.",
  "https enabled": "Eine verschlüsselte Verbindung war erkennbar.",
  "https is enabled": "Eine verschlüsselte Verbindung war erkennbar.",
  "title tag found": "Ein Seitentitel war vorhanden.",
  "meta description found": "Eine Meta-Beschreibung war vorhanden.",
  "primary heading found": "Eine Hauptüberschrift war vorhanden.",
  "html lang attribute found": "Eine technische Spracheinstellung war vorhanden.",
  "impressum link found": "Ein Impressum-Link war sichtbar auffindbar.",
  "privacy policy link found": "Ein Datenschutz-Link war sichtbar auffindbar.",
  "tracker domain signals found": "Es wurden mögliche Tracker-Signale erkannt.",
  "no tracker domain signals found": "Es wurden keine direkten Tracker-Signale erkannt.",
}

export const statusPresentation: Record<QuickCheckStatus, StatusPresentation> = {
  ok: {
    label: "unauffällig",
    description: "Die automatisierte Vorprüfung sieht keine direkten Auffälligkeiten.",
  },
  check: {
    label: "prüfen",
    description: "Einzelne Punkte sollten fachlich oder technisch eingeordnet werden.",
  },
  missing: {
    label: "Handlungsbedarf",
    description: "Der Schnellcheck konnte wichtige sichtbare Signale nicht finden.",
  },
  unknown: {
    label: "nicht eindeutig",
    description: "Der Schnellcheck konnte diesen Punkt nicht sicher bewerten.",
  },
}

function normalizeText(value: string): string {
  return value.trim().replace(/[.:;!?]+$/g, "").replace(/\s+/g, " ").toLowerCase()
}

function humanizeKey(key: string): string {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim()
}

export function getCheckLabel(key: string, label: string): string {
  if (key in checkCopy) return checkCopy[key as QuickCheckKey].label

  const alias = labelAliases[normalizeText(label)]
  if (alias) return alias

  const fallback = humanizeKey(key || label)
  return fallback ? `Zusätzlicher Prüfpunkt: ${fallback}` : "Zusätzlicher Prüfpunkt"
}

export function getCheckDescription(key: string): string | null {
  if (key in checkCopy) return checkCopy[key as QuickCheckKey].description
  return "Zusätzlicher technischer Prüfpunkt aus dem Backend."
}

export function getFriendlyTechnicalText(text: string, fallback: string): string {
  const clean = text.trim()
  if (!clean) return fallback
  return textAliases[normalizeText(clean)] ?? clean
}

export function getResultSummary(result: ScanResult): string {
  const checks = Object.values(result.checks).filter((check): check is QuickCheckItem =>
    Boolean(check),
  )
  const counts = checks.reduce<Record<QuickCheckStatus, number>>(
    (acc, check) => {
      acc[check.status] += 1
      return acc
    },
    { ok: 0, check: 0, missing: 0, unknown: 0 },
  )

  const countParts = [
    counts.ok ? `${counts.ok} unauffällig` : null,
    counts.check ? `${counts.check} zu prüfen` : null,
    counts.missing ? `${counts.missing} mit Handlungsbedarf` : null,
    counts.unknown ? `${counts.unknown} nicht eindeutig` : null,
  ].filter(Boolean)

  const suffix = countParts.length ? ` (${countParts.join(", ")}).` : "."

  if (result.status === "ok") {
    return `Der Schnellcheck hat die wichtigsten sichtbaren Basissignale gefunden${suffix}`
  }
  if (result.status === "missing") {
    return `Der Schnellcheck sieht fehlende oder nicht auffindbare Basissignale${suffix}`
  }
  if (result.status === "unknown") {
    return `Der Schnellcheck konnte nicht alle Punkte eindeutig bewerten${suffix}`
  }
  return `Der Schnellcheck sieht Punkte, die manuell eingeordnet werden sollten${suffix}`
}

export function getBackendSummaryNote(summary: string): string | null {
  const clean = summary.trim()
  if (!clean) return null
  return textAliases[normalizeText(clean)] ?? null
}

export function getDisclaimerText(_text: string): string {
  return "Automatisierte technische Vorprüfung. Die Hinweise ersetzen keine vollständige manuelle Prüfung."
}
