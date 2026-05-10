// ─── Shared types for the QuickCheck / DomainChecker feature ─────────────────
// Wire the real API in lib/nordaudit-api.ts and export quickCheck() from there.
// These types must match the API response shape exactly.

export type Severity = "critical" | "serious" | "moderate" | "minor" | "info"
export type CheckStatus = "pass" | "warning" | "fail" | "info"
export type CheckAreaId = "accessibility" | "technical" | "privacy" | "seo"

export interface FindingItem {
  id: string
  severity: Severity
  title: string
  description: string
  category: CheckAreaId
}

export interface CheckArea {
  id: CheckAreaId
  label: string
  score: number
  status: CheckStatus
  summary: string
}

export interface ScanSummary {
  critical: number
  serious: number
  moderate: number
  minor: number
  info: number
}

export interface ScanResult {
  status: "ok" | "error"
  inputUrl: string
  normalizedUrl: string
  scannedAt: string
  summary: ScanSummary
  score: number
  checks: CheckArea[]
  findings: FindingItem[]
  disclaimer: string
}

export type UIState = "idle" | "loading" | "result" | "error" | "missing-config"

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

// ─── Check-area status display config ────────────────────────────────────────

export const statusConfig: Record<
  CheckStatus,
  {
    label: string
    badgeVariant: "destructive" | "secondary" | "outline"
    scoreColor: string
  }
> = {
  fail:    { label: "Auffälligkeiten", badgeVariant: "destructive", scoreColor: "bg-destructive" },
  warning: { label: "Hinweise",        badgeVariant: "secondary",   scoreColor: "bg-amber-500" },
  pass:    { label: "Unauffällig",     badgeVariant: "outline",     scoreColor: "bg-accent" },
  info:    { label: "Info",            badgeVariant: "outline",     scoreColor: "bg-muted" },
}

// ─── Mock data (will be replaced by lib/nordaudit-api.ts → quickCheck()) ─────

export function getMockResult(domain: string): ScanResult {
  const normalized = domain.replace(/^https?:\/\//, "").replace(/\/$/, "")
  return {
    status: "ok",
    inputUrl: domain,
    normalizedUrl: normalized,
    scannedAt: new Date().toISOString(),
    score: 54,
    summary: { critical: 2, serious: 3, moderate: 4, minor: 2, info: 1 },
    checks: [
      {
        id: "accessibility",
        label: "Barrierefreiheit",
        score: 42,
        status: "fail",
        summary:
          "Mögliche Auffälligkeiten bei Alt-Texten und Kontrastverhältnissen erkannt.",
      },
      {
        id: "technical",
        label: "Technik",
        score: 71,
        status: "warning",
        summary: "HTTPS aktiv. Verbesserungspotenzial bei Ladezeiten und HTTP-Headern.",
      },
      {
        id: "privacy",
        label: "Datenschutz-Hinweise",
        score: 48,
        status: "warning",
        summary: "Hinweise zu Drittanbieter-Einbindungen und Cookie-Einwilligung.",
      },
      {
        id: "seo",
        label: "SEO-Grundlagen",
        score: 65,
        status: "warning",
        summary: "Meta-Titel und Beschreibungen vorhanden, strukturierte Daten fehlen.",
      },
    ],
    findings: [
      {
        id: "a11y-alt",
        severity: "critical",
        category: "accessibility",
        title: "Fehlende Alt-Texte bei Bildern",
        description:
          "Mehrere Bilder ohne beschreibenden Alt-Text erkannt. Screenreader können diese Inhalte nicht erfassen.",
      },
      {
        id: "a11y-contrast",
        severity: "serious",
        category: "accessibility",
        title: "Mögliche Kontrastprobleme",
        description:
          "Einige Text-Hintergrund-Kombinationen unterschreiten ggf. die WCAG-Mindestanforderungen.",
      },
      {
        id: "privacy-consent",
        severity: "serious",
        category: "privacy",
        title: "Cookie-Einwilligung prüfen",
        description:
          "Tracking-Elemente erkannt. Einwilligungsmechanismus sollte auf Vollständigkeit geprüft werden.",
      },
      {
        id: "tech-headers",
        severity: "moderate",
        category: "technical",
        title: "Sicherheits-Header unvollständig",
        description:
          "HTTP-Sicherheits-Header wie CSP oder X-Frame-Options nicht vollständig gesetzt.",
      },
      {
        id: "seo-structured",
        severity: "minor",
        category: "seo",
        title: "Strukturierte Daten fehlen",
        description:
          "Schema.org-Markup nicht erkannt. Kann die Auffindbarkeit in Suchmaschinen einschränken.",
      },
    ],
    disclaimer:
      "Diese automatisierte Vorprüfung liefert technische Hinweise auf mögliche Auffälligkeiten. Sie ersetzt keine manuelle Barrierefreiheitsprüfung, keine Rechtsberatung und stellt keine behördliche Zertifizierung dar.",
  }
}
