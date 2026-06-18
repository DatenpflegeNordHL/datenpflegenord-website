import { NextRequest, NextResponse } from "next/server"
import type { QuickCheckScanResult } from "@/lib/quick-check-types"

const REQUEST_TIMEOUT_MS = 15000
const BACKEND_QUICK_CHECK_PATH = "/public/quick-check"

function jsonError(message: string, status: number, error = "quick-check-error") {
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

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonError("Ungültige Anfrage.", 400, "invalid-request")
  }

  const requestBody = body as { url?: unknown }
  const url = typeof requestBody?.url === "string" ? requestBody.url.trim() : ""
  if (!url) {
    return jsonError("Bitte geben Sie eine Website-URL oder Domain ein.", 400, "invalid-input")
  }

  const baseUrl = getBackendBaseUrl()
  if (!baseUrl) {
    return jsonError(
      "Schnellcheck ist aktuell nicht korrekt konfiguriert.",
      503,
      "missing-config",
    )
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let response: Response
  try {
    response = await fetch(`${baseUrl}${BACKEND_QUICK_CHECK_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: url }),
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
        "invalid-response",
      )
    }
    return NextResponse.json(payload)
  }

  if (response.status === 400 || response.status === 422) {
    return jsonError(
      "Die Eingabe konnte nicht geprüft werden. Bitte prüfen Sie die URL.",
      response.status,
      "invalid-input",
    )
  }

  if (response.status === 429) {
    return jsonError(
      "Zu viele Schnellchecks in kurzer Zeit. Bitte versuchen Sie es gleich erneut.",
      429,
      "rate-limit",
    )
  }

  return jsonError(
    "Dienst aktuell nicht erreichbar. Bitte versuchen Sie es später erneut.",
    502,
    "service-unavailable",
  )
}
