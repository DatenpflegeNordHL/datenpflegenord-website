import { NextRequest, NextResponse } from "next/server"
import type { ScanResult } from "@/lib/quick-check-types"

const REQUEST_TIMEOUT_MS = 15000
const BACKEND_QUICK_CHECK_PATH = "/public/quick-check"

function jsonError(message: string, status: number, error = "quick_check_error") {
  return NextResponse.json({ ok: false, error, message }, { status })
}

function getBackendBaseUrl(): string | null {
  const value = process.env.NORTHACCESS_API_BASE_URL?.trim()
  if (!value) return null

  try {
    const parsed = new URL(value)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null
    return value.replace(/\/+$/, "")
  } catch {
    return null
  }
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

function isScanResult(value: unknown): value is ScanResult {
  if (!value || typeof value !== "object") return false
  const data = value as Partial<ScanResult>
  const input = data.input as Partial<ScanResult["input"]> | undefined

  return (
    data.ok === true &&
    typeof input === "object" &&
    typeof input?.normalized_url === "string" &&
    isQuickCheckStatus(data.status) &&
    isChecksPayload(data.checks) &&
    typeof data.summary === "string" &&
    typeof data.disclaimer === "string"
  )
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
    return jsonError(
      "Schnellcheck ist aktuell nicht korrekt konfiguriert.",
      503,
      "missing_config",
    )
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let response: Response
  try {
    response = await fetch(`${baseUrl}${BACKEND_QUICK_CHECK_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    })
  } catch (error) {
    clearTimeout(timeout)
    if (error instanceof DOMException && error.name === "AbortError") {
      return jsonError(
        "Der Schnellcheck hat zu lange gedauert. Bitte versuchen Sie es gleich erneut.",
        504,
        "timeout",
      )
    }
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
      "Die Eingabe konnte nicht geprüft werden. Bitte prüfen Sie die URL.",
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
