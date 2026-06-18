import type { QuickCheckScanResult } from "@/lib/quick-check-types"

const DEFAULT_TIMEOUT_MS = 15000
const MISSING_CONFIG_MESSAGE = "Schnellcheck ist aktuell noch nicht konfiguriert."
const QUICK_CHECK_ENDPOINT = "/api/quick-check"

export type QuickCheckErrorCode =
  | "missing-config"
  | "timeout"
  | "api"
  | "rate-limit"
  | "network"
  | "invalid-response"

export class QuickCheckError extends Error {
  code: QuickCheckErrorCode
  status?: number

  constructor(code: QuickCheckErrorCode, message: string, status?: number) {
    super(message)
    this.name = "QuickCheckError"
    this.code = code
    this.status = status
  }
}

function isScanResult(value: unknown): value is QuickCheckScanResult {
  if (!value || typeof value !== "object") return false
  const data = value as Partial<QuickCheckScanResult>

  return (
    data.status === "completed" &&
    typeof data.inputUrl === "string" &&
    typeof data.normalizedUrl === "string" &&
    typeof data.scannedAt === "string" &&
    typeof data.summary === "object" &&
    typeof data.score === "object" &&
    typeof data.checks === "object" &&
    Array.isArray(data.findings) &&
    typeof data.disclaimer === "string"
  )
}

function normalizeErrorCode(error: unknown, status: number): QuickCheckErrorCode {
  const value = typeof error === "string" ? error : ""

  switch (value) {
    case "missing-config":
    case "missing_config":
      return "missing-config"
    case "timeout":
      return "timeout"
    case "rate-limit":
    case "rate_limited":
      return "rate-limit"
    case "invalid-response":
    case "invalid_backend_response":
      return "invalid-response"
    case "service-unavailable":
    case "service_unavailable":
      return "network"
    default:
      if (status === 503) return "missing-config"
      if (status === 504) return "timeout"
      if (status === 429) return "rate-limit"
      if (status >= 500) return "network"
      return "api"
  }
}

function fallbackMessageForCode(code: QuickCheckErrorCode): string {
  switch (code) {
    case "missing-config":
      return MISSING_CONFIG_MESSAGE
    case "timeout":
      return "Die Prüfung hat zu lange gedauert. Bitte versuchen Sie es erneut."
    case "rate-limit":
      return "Zu viele Schnellchecks in kurzer Zeit. Bitte versuchen Sie es gleich erneut."
    case "invalid-response":
      return "Ungültige Serverantwort beim Schnellcheck."
    case "network":
      return "Der Schnellcheck konnte gerade nicht erreicht werden. Bitte versuchen Sie es erneut."
    case "api":
    default:
      return "Die Prüfung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut."
  }
}

function getErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback

  const body = payload as { message?: unknown; error?: unknown }
  if (typeof body.message === "string" && body.message.trim()) return body.message
  if (typeof body.error === "string" && body.error.trim()) return body.error

  return fallback
}

export async function quickCheck(domainOrUrl: string): Promise<QuickCheckScanResult> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

  let response: Response
  try {
    response = await fetch(QUICK_CHECK_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: domainOrUrl }),
      signal: controller.signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new QuickCheckError(
        "timeout",
        "Die Prüfung hat zu lange gedauert. Bitte versuchen Sie es erneut.",
      )
    }
    throw new QuickCheckError(
      "network",
      "Der Schnellcheck konnte gerade nicht erreicht werden. Bitte versuchen Sie es erneut.",
    )
  } finally {
    clearTimeout(timeout)
  }

  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    if (!response.ok) {
      const code = normalizeErrorCode(undefined, response.status)
      throw new QuickCheckError(code, fallbackMessageForCode(code), response.status)
    }

    throw new QuickCheckError(
      "invalid-response",
      "Ungültige Serverantwort beim Schnellcheck.",
      response.status,
    )
  }

  if (!response.ok) {
    const body = payload as { error?: unknown }
    const code = normalizeErrorCode(body?.error, response.status)
    throw new QuickCheckError(
      code,
      getErrorMessage(payload, fallbackMessageForCode(code)),
      response.status,
    )
  }

  if (!isScanResult(payload)) {
    throw new QuickCheckError(
      "invalid-response",
      "Unvollständige Serverantwort beim Schnellcheck.",
      response.status,
    )
  }

  return payload
}
