import { QuickCheckScanResult } from "@/lib/quick-check-types"

const DEFAULT_TIMEOUT_MS = 15000
const MISSING_CONFIG_MESSAGE = "Schnellcheck ist aktuell noch nicht konfiguriert."

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

function getApiBaseUrl(): string {
  const value = process.env.NEXT_PUBLIC_NORDAUDIT_API_URL?.trim()
  if (!value) {
    throw new QuickCheckError("missing-config", MISSING_CONFIG_MESSAGE)
  }
  return value.replace(/\/+$/, "")
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

export async function quickCheck(domainOrUrl: string): Promise<QuickCheckScanResult> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/public/quick-check`
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

  let response: Response
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: domainOrUrl }),
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

  if (response.status === 503) {
    throw new QuickCheckError("missing-config", MISSING_CONFIG_MESSAGE, response.status)
  }

  if (response.status === 429) {
    throw new QuickCheckError(
      "rate-limit",
      "Zu viele Schnellchecks in kurzer Zeit. Bitte versuchen Sie es gleich erneut.",
      response.status,
    )
  }

  if (!response.ok) {
    let apiMessage = "Die Prüfung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut."
    try {
      const body = (await response.json()) as { message?: string; error?: string }
      if (typeof body.message === "string" && body.message.trim()) {
        apiMessage = body.message
      } else if (typeof body.error === "string" && body.error.trim()) {
        apiMessage = body.error
      }
    } catch {
      // keep fallback message
    }

    throw new QuickCheckError("api", apiMessage, response.status)
  }

  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    throw new QuickCheckError(
      "invalid-response",
      "Ungültige Serverantwort beim Schnellcheck.",
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
