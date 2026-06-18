"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { UIState, QuickCheckScanResult } from "@/lib/quick-check-types"
import { QuickCheckError, quickCheck } from "@/lib/nordaudit-api"
import { QuickCheckResultCard } from "@/components/quick-check/quick-check-result-card"
import { QuickCheckErrorState } from "@/components/quick-check/quick-check-error-state"
import { QuickCheckLoadingState } from "@/components/quick-check/quick-check-loading-state"
import { QuickCheckMissingConfigState } from "@/components/quick-check/quick-check-missing-config-state"

function validateDomain(value: string): boolean {
  const clean = value.trim()
  if (!clean) return false

  if (/^https?:\/\//i.test(clean)) {
    try {
      const parsed = new URL(clean)
      return Boolean(parsed.hostname) && parsed.hostname.includes(".")
    } catch {
      return false
    }
  }

  return /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?:\/.*)?$/i.test(clean)
}

export function DomainChecker() {
  const [domain, setDomain] = useState("")
  const [state, setState] = useState<UIState>("idle")
  const [result, setResult] = useState<QuickCheckScanResult | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleCheck = async () => {
    const trimmed = domain.trim()
    setErrorMessage("")

    if (!trimmed) {
      setErrorMessage("Bitte geben Sie eine Domain ein.")
      return
    }
    if (!validateDomain(trimmed)) {
      setErrorMessage("Ungültige Eingabe. Beispiel: beispiel.de oder https://beispiel.de")
      return
    }

    setState("loading")
    setResult(null)

    try {
      const data = await quickCheck(trimmed)
      setResult(data)
      setState("result")
    } catch (error) {
      if (error instanceof QuickCheckError) {
        if (error.code === "missing-config") {
          setState("missing-config")
          return
        }
        setErrorMessage(error.message || errorMessageForCode(error.code))
      } else {
        setErrorMessage(
          "Die Prüfung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
        )
      }
      setState("error")
    }
  }

  const handleReset = () => {
    setState("idle")
    setResult(null)
    setDomain("")
    setErrorMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && state !== "loading") handleCheck()
  }

  return (
    <div className="w-full">
      {/* Label row */}
      <div className="flex items-center gap-2 mb-1">
        <span
          className="inline-block w-2 h-2 rounded-full bg-accent shrink-0"
          aria-hidden="true"
        />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
          Schnellcheck
        </span>
      </div>
      <p className="text-base font-semibold text-foreground mb-1">
        Website-Schnellcheck
      </p>
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        Schneller technischer Vorabcheck zu Erreichbarkeit, Pflichtlinks und Basisstruktur.
      </p>

      {/* Input row */}
      <div className="flex flex-col sm:flex-row gap-2 mb-2">
        <Input
          type="text"
          placeholder="z. B. beispiel.de"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={state === "loading"}
          className="flex-1 text-sm transition-shadow duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0"
          aria-label="Website oder Domain eingeben"
        />
        <Button
          onClick={state === "result" ? handleReset : handleCheck}
          disabled={state === "loading"}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 shrink-0 transition-all duration-200 hover:shadow-sm active:scale-[0.98]"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" aria-hidden="true" />
              Prüfe...
            </>
          ) : state === "result" ? (
            "Neu prüfen"
          ) : (
            "Sofort prüfen"
          )}
        </Button>
      </div>

      {errorMessage && (
        <p className="text-destructive text-sm mb-2 animate-fade-in" role="alert">
          {errorMessage}
        </p>
      )}

      <p className="text-[11px] text-muted-foreground leading-relaxed mb-5">
        Automatisierte Vorprüfung - keine Rechtsberatung, keine behördliche Zertifizierung.
        Der vollständige Audit prüft tiefer.
      </p>

      {/* State panels */}
      {state === "loading" && (
        <div className="animate-fade-in">
          <QuickCheckLoadingState domain={domain} />
        </div>
      )}
      {state === "missing-config" && (
        <div className="animate-fade-in">
          <QuickCheckMissingConfigState />
        </div>
      )}
      {state === "error" && (
        <div className="animate-scale-in">
          <QuickCheckErrorState message={errorMessage} />
        </div>
      )}
      {state === "result" && result && (
        <div className="animate-scale-in">
          <QuickCheckResultCard result={result} />
        </div>
      )}
    </div>
  )
}

function errorMessageForCode(code: QuickCheckError["code"]): string {
  switch (code) {
    case "timeout":
      return "Der Schnellcheck hat zu lange gedauert. Bitte versuchen Sie es gleich erneut."
    case "rate-limit":
      return "Zu viele Schnellchecks in kurzer Zeit. Bitte versuchen Sie es gleich erneut."
    case "invalid-response":
      return "Der Schnellcheck hat eine ungültige Serverantwort erhalten."
    case "api":
      return "Die Eingabe konnte nicht geprüft werden. Bitte prüfen Sie die URL."
    case "network":
    default:
      return "Dienst aktuell nicht erreichbar. Bitte versuchen Sie es später erneut."
  }
}
