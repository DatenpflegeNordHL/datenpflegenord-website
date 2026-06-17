import type { ScanResult } from "@/lib/quick-check-types"

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

function isScanResult(value: unknown): value is ScanResult {
  if (!value || typeof value !== "object") return false
  const data = value as Partial<ScanResult>
  const input = data.input as Partial<ScanResult["input"]> | undefined

  return (
    data.ok === true &&
    typeof input === "object" &&
    typeof input?.normalized_url === "string" &&
    ["ok", "check", "missing", "unknown"].includes(String(data.status)) &&
    isChecksPayload(data.checks) &&
    typeof data.summary === "string" &&
    typeof data.disclaimer === "string"
  )
}

function isQuickCheckStatus(value: unknown): boolean {
  return value === "ok" || value === "check" || value === "missing" || value === "unknown"
}

function isCheckItem(value: unknown): boolean {
  if (!value || typeof value !== "object") return false
  const item = value as Record<string, unknown>
  return (
    isQuickCheckStatus(item.status) &&
    typeof item.label === "string" &&
    typeof item.evidence === "string" &&
    typeof item.technical_hint === "string"
  )
}

function isChecksPayload(value: unknown): boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.values(value).every(isCheckItem)
  )
}

export async function quickCheck(domainOrUrl: string): Promise<ScanResult> {
  let response: Response
  try {
    response = await fetch("/api/quick-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: domainOrUrl }),
    })
  } catch {
    throw new QuickCheckError(
      "network",
      "Dienst aktuell nicht erreichbar. Bitte versuchen Sie es später erneut.",
    )
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

  if (!response.ok) {
    const body = payload as { error?: string; message?: string }
    const message =
      typeof body.message === "string" && body.message.trim()
        ? body.message
        : "Die Prüfung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut."

    const errorCode = typeof body.error === "string" ? body.error : ""
    const code: QuickCheckErrorCode =
      errorCode === "missing_config" || response.status === 503
        ? "missing-config"
        : errorCode === "timeout" || response.status === 504
          ? "timeout"
          : errorCode === "invalid_backend_response"
            ? "invalid-response"
            : response.status === 429
              ? "rate-limit"
              : response.status >= 500
                ? "network"
                : "api"

    throw new QuickCheckError(code, message, response.status)
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
