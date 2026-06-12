import { NextRequest, NextResponse } from "next/server"
import type { ScanResult } from "@/lib/quick-check-types"

const REQUEST_TIMEOUT_MS = 15000

function jsonError(message: string, status: number, error = "quick_check_error") {
  return NextResponse.json({ ok: false, error, message }, { status })
}

function getBackendBaseUrl(): string | null {
  const value = process.env.NORTHACCESS_API_BASE_URL?.trim()
  if (!value) return null
  return value.replace(/\/+$/, "")
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

function isScanResult(value: unknown): value is ScanResult {
  if (!value || typeof value !== "object") return false
  const data = value as Partial<ScanResult>
  const input = data.input as Partial<ScanResult["input"]> | undefined

  return (
    data.ok === true &&
    typeof input === "object" &&
    typeof input?.normalized_url === "string" &&
    isQuickCheckStatus(data.status) &&
    typeof data.checks === "object" &&
    data.checks !== null &&
    Object.values(data.checks).every(isCheckItem) &&
    typeof data.summary === "string" &&
    typeof data.disclaimer === "string"
  )
}

function extractBackendMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback
  const body = payload as { message?: unknown; detail?: unknown; error?: unknown }
  if (typeof body.message === "string" && body.message.trim()) return body.message
  if (typeof body.detail === "string" && body.detail.trim()) return body.detail
  if (typeof body.error === "string" && body.error.trim()) return body.error
  return fallback
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonError("Ungültige Anfrage.", 400, "invalid_request")
  }

  const requestBody = body as { url?: unknown }
  const url = typeof requestBody?.url === "string" ? requestBody.url.trim() : ""
  if (!url) {
    return jsonError("Bitte geben Sie eine Website-URL oder Domain ein.", 400, "invalid_input")
  }

  const baseUrl = getBackendBaseUrl()
  if (!baseUrl) {
    return jsonError("Schnellcheck ist aktuell noch nicht konfiguriert.", 503, "missing_config")
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let response: Response
  try {
    response = await fetch(`${baseUrl}/public/quick-check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    })
  } catch {
    clearTimeout(timeout)
    return jsonError(
      "Dienst aktuell nicht erreichbar. Bitte versuchen Sie es später erneut.",
      502,
      "service_unavailable",
    )
  } finally {
    clearTimeout(timeout)
  }

  let payload: unknown = null
  try {
    payload = await response.json()
  } catch {
    // Fall through to controlled error handling below.
  }

  if (response.ok) {
    if (!isScanResult(payload)) {
      return jsonError(
        "Dienst aktuell nicht erreichbar. Bitte versuchen Sie es später erneut.",
        502,
        "invalid_backend_response",
      )
    }
    return NextResponse.json(payload)
  }

  if (response.status === 400 || response.status === 422) {
    return jsonError(
      extractBackendMessage(
        payload,
        "Die Eingabe konnte nicht geprüft werden. Bitte prüfen Sie die URL.",
      ),
      response.status,
      "invalid_input",
    )
  }

  if (response.status === 429) {
    return jsonError(
      "Zu viele Schnellchecks in kurzer Zeit. Bitte versuchen Sie es gleich erneut.",
      429,
      "rate_limited",
    )
  }

  return jsonError(
    "Dienst aktuell nicht erreichbar. Bitte versuchen Sie es später erneut.",
    502,
    "service_unavailable",
  )
}
