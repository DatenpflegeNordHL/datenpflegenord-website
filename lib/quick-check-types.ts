// ─── Shared types for the QuickCheck / DomainChecker feature ─────────────────
// Wire the real API in lib/nordaudit-api.ts and export quickCheck() from there.
// These types must match the API response shape exactly.

export type Severity = "critical" | "serious" | "moderate" | "minor" | "info"
export type CheckAreaId = "accessibility" | "technical" | "privacy" | "seo"

export interface FindingEvidence {
  url: string
  selector?: string | null
  snippet?: string | null
}

export interface FindingItem {
  id: string
  category: CheckAreaId
  severity: Severity
  title: string
  description: string
  evidence?: FindingEvidence
  recommendation?: string
  legalDisclaimer?: string
}

export interface AccessibilityCheck {
  label: "Barrierefreiheit"
  status: string
  findingsCount: number
}

export interface TechnicalCheck {
  label: "Technik"
  https: boolean
  reachable: boolean
  finalUrl: string
}

export interface PrivacyCheck {
  label: "Datenschutz-Hinweise"
  impressumLink: boolean
  privacyLink: boolean
  detectedTrackers: string[]
}

export interface SeoCheck {
  label: "SEO-Grundlagen"
  title: boolean
  metaDescription: boolean
  h1: boolean
  htmlLang: boolean
}

export interface Checks {
  accessibility: AccessibilityCheck
  technical: TechnicalCheck
  privacy: PrivacyCheck
  seo: SeoCheck
}

export interface QuickCheckFindingSummary {
  critical: number
  serious: number
  moderate: number
  minor: number
  info: number
}

export interface ScoreBreakdown {
  accessibility: number
  technical: number
  privacy: number
  seo: number
}

export interface QuickCheckScanResult {
  status: "completed"
  inputUrl: string
  normalizedUrl: string
  scannedAt: string
  summary: QuickCheckFindingSummary
  score: ScoreBreakdown
  checks: Checks
  findings: FindingItem[]
  disclaimer: string
}

export type UIState = "idle" | "loading" | "result" | "error" | "missing-config"

export type QuickCheckStatus = "ok" | "check" | "missing" | "unknown"

export interface QuickCheckItem {
  status: QuickCheckStatus
  label: string
  evidence: string
  technical_hint: string
}

export type QuickCheckKey =
  | "reachability"
  | "https"
  | "title"
  | "meta_description"
  | "h1"
  | "html_lang"
  | "impressum_link"
  | "privacy_link"
  | "tracker_signals"

export type QuickCheckChecks = Partial<Record<QuickCheckKey, QuickCheckItem>> &
  Record<string, QuickCheckItem | undefined>

export interface ScanResult {
  ok: boolean
  input: {
    normalized_url: string
  }
  status: QuickCheckStatus
  checks: QuickCheckChecks
  summary: string
  disclaimer: string
}

// ─── Severity display config ──────────────────────────────────────────────────

import {
  XCircle,
  TriangleAlert,
  AlertCircle,
  Info,
} from "lucide-react"

export const severityConfig: Record<
  Severity,
  { label: string; color: string; icon: React.ElementType }
> = {
  critical: { label: "Kritisch",  color: "text-destructive",      icon: XCircle },
  serious:  { label: "Erheblich", color: "text-orange-600",        icon: TriangleAlert },
  moderate: { label: "Moderat",   color: "text-amber-600",         icon: AlertCircle },
  minor:    { label: "Gering",    color: "text-muted-foreground",  icon: Info },
  info:     { label: "Info",      color: "text-accent",            icon: Info },
}

// ─── Check-area labels for display ───────────────────────────────────────────

export const checkAreaLabels: Record<CheckAreaId, string> = {
  accessibility: "Barrierefreiheit",
  technical: "Technik",
  privacy: "Datenschutz-Hinweise",
  seo: "SEO-Grundlagen",
}

// ─── Mock data (will be replaced by lib/nordaudit-api.ts → quickCheck()) ─────

export function getMockResult(domain: string): QuickCheckScanResult {
  const normalized = domain.replace(/^https?:\/\//, "").replace(/\/$/, "")
  return {
    status: "completed",
    inputUrl: domain,
    normalizedUrl: normalized,
    scannedAt: new Date().toISOString(),
    summary: { critical: 2, serious: 3, moderate: 4, minor: 2, info: 1 },
    score: {
      accessibility: 42,
      technical: 71,
      privacy: 48,
      seo: 65,
    },
    checks: {
      accessibility: {
        label: "Barrierefreiheit",
        status: "Mögliche Auffälligkeiten bei Alt-Texten und Kontrastverhältnissen erkannt.",
        findingsCount: 5,
      },
      technical: {
        label: "Technik",
        https: true,
        reachable: true,
        finalUrl: `https://${normalized}`,
      },
      privacy: {
        label: "Datenschutz-Hinweise",
        impressumLink: true,
        privacyLink: false,
        detectedTrackers: ["Google Analytics", "Facebook Pixel"],
      },
      seo: {
        label: "SEO-Grundlagen",
        title: true,
        metaDescription: true,
        h1: false,
        htmlLang: true,
      },
    },
    findings: [
      {
        id: "a11y-alt",
        severity: "critical",
        category: "accessibility",
        title: "Fehlende Alt-Texte bei Bildern",
        description:
          "Mehrere Bilder ohne beschreibenden Alt-Text erkannt. Screenreader können diese Inhalte nicht erfassen.",
        evidence: {
          url: `https://${normalized}/`,
          selector: "img.hero-image",
          snippet: '<img src="hero.jpg" />',
        },
        recommendation:
          "Ergänzen Sie beschreibende Alt-Texte für alle informativen Bilder.",
      },
      {
        id: "a11y-contrast",
        severity: "serious",
        category: "accessibility",
        title: "Mögliche Kontrastprobleme",
        description:
          "Einige Text-Hintergrund-Kombinationen unterschreiten ggf. die WCAG-Mindestanforderungen.",
        evidence: {
          url: `https://${normalized}/`,
          selector: ".footer-text",
        },
        recommendation:
          "Prüfen Sie die Farbkontraste und passen Sie diese bei Bedarf an.",
      },
      {
        id: "privacy-consent",
        severity: "serious",
        category: "privacy",
        title: "Cookie-Einwilligung prüfen",
        description:
          "Tracking-Elemente erkannt. Einwilligungsmechanismus sollte auf Vollständigkeit geprüft werden.",
        recommendation:
          "Implementieren Sie einen DSGVO-konformen Cookie-Banner.",
        legalDisclaimer:
          "Dieser Hinweis stellt keine Rechtsberatung dar.",
      },
      {
        id: "tech-headers",
        severity: "moderate",
        category: "technical",
        title: "Sicherheits-Header unvollständig",
        description:
          "HTTP-Sicherheits-Header wie CSP oder X-Frame-Options nicht vollständig gesetzt.",
        recommendation:
          "Ergänzen Sie fehlende Sicherheits-Header in Ihrer Server-Konfiguration.",
      },
      {
        id: "seo-structured",
        severity: "minor",
        category: "seo",
        title: "Strukturierte Daten fehlen",
        description:
          "Schema.org-Markup nicht erkannt. Kann die Auffindbarkeit in Suchmaschinen einschränken.",
        recommendation:
          "Fügen Sie strukturierte Daten (JSON-LD) für Ihre wichtigsten Inhalte hinzu.",
      },
    ],
    disclaimer:
      "Diese automatisierte technische Vorprüfung liefert automatisierte Hinweise auf mögliche Auffälligkeiten. Sie ersetzt keine manuelle Barrierefreiheitsprüfung, keine Rechtsberatung und stellt keine behördliche Zertifizierung dar.",
  }
}
