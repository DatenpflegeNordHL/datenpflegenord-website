"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, CheckCircle, AlertCircle, Lock, ShieldCheck, Gauge, Globe, FileSearch } from "lucide-react"

interface CheckResult {
  domain: string
  score: number
  findings: Array<{
    category: string
    status: "pass" | "warning" | "fail"
    censored: boolean
  }>
}

export function DomainChecker() {
  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CheckResult | null>(null)
  const [error, setError] = useState("")

  const validateDomain = (value: string): boolean => {
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i
    return domainRegex.test(value)
  }

  const handleCheck = async () => {
    const trimmed = domain.trim()
    setError("")

    if (!trimmed) {
      setError("Bitte geben Sie eine Domain ein.")
      return
    }

    if (!validateDomain(trimmed)) {
      setError("Ungültige Domain-Adresse. Beispiel: example.de")
      return
    }

    setLoading(true)
    setResult(null)

    // Simulate API call with 2.5s delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    setResult({
      domain: trimmed,
      score: 68,
      findings: [
        { category: "BFSG-Anforderungen", status: "warning", censored: false },
        { category: "Datenschutz-Hinweise", status: "warning", censored: false },
        { category: "Impressum & Rechtliches", status: "pass", censored: false },
        { category: "Cookie & Consent", status: "warning", censored: false },
        { category: "Sicherheit & TLS", status: "pass", censored: false },
        { category: "Technische Struktur", status: "warning", censored: true },
        { category: "Suchmaschinen-Optimierung", status: "warning", censored: true },
        { category: "Mobile-Freundlichkeit", status: "pass", censored: false },
      ],
    })

    setLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleCheck()
    }
  }

  const checkAreas = [
    { icon: ShieldCheck, label: "BFSG-Relevanz" },
    { icon: Globe, label: "WCAG-Hinweise" },
    { icon: Gauge, label: "Technik & Performance" },
    { icon: Lock, label: "Datenschutz-Hinweise" },
    { icon: FileSearch, label: "SEO-Grundlagen" },
  ]

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header + chips */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">NordAudit Portal</span>
        </div>
        <label className="block text-base font-semibold text-foreground mb-1">
          BFSG Schnellcheck — Website automatisiert prüfen
        </label>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          Geben Sie Ihre Domain ein und erhalten Sie erste Prüfhinweise zu:
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {checkAreas.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-border bg-secondary text-xs text-secondary-foreground font-medium"
            >
              <Icon className="w-3 h-3 text-accent shrink-0" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="z.B. beispiel.de"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="flex-1 text-sm"
            aria-label="Domain eingeben"
          />
          <Button
            onClick={handleCheck}
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Prüfe...
              </>
            ) : (
              "Sofort prüfen"
            )}
          </Button>
        </div>
        {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        {/* Trust hint */}
        <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
          Automatisierte Vorprüfung nach aktuellem Prüfstand — keine Rechtsberatung und keine behördliche Zertifizierung.
        </p>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {result.domain}
              </h3>
              <p className="text-sm text-muted-foreground">
                Bewertung: <span className="font-semibold text-accent">{result.score}/100</span>
              </p>
            </div>
          </div>

          {/* Findings Grid */}
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            {result.findings.map((finding, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-3 rounded-lg bg-background/60 border border-border/50"
              >
                {finding.censored ? (
                  <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                ) : finding.status === "pass" ? (
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                )}
                <span className="text-xs font-medium text-foreground/80">
                  {finding.censored ? "🔒 " : ""}{finding.category}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-border mt-6">
            <p className="text-xs text-muted-foreground mb-3">
              Hinweis: Dies ist eine automatisierte Vorab-Prüfung. Vollständige Ergebnisse erhalten Sie im detaillierten Barrierefreiheits-Audit.
            </p>
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
              onClick={() => document.getElementById("pakete")?.scrollIntoView({ behavior: "smooth" })}
            >
              Barrierefreiheits-Audit anfragen
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
