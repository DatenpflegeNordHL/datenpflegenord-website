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

export interface QuickCheckApiErrorBody {
  ok: false
  error: string
  message: string
}

export type UIState = "idle" | "loading" | "result" | "error" | "missing-config"
