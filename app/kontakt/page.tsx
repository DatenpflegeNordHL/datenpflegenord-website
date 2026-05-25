"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Info } from "lucide-react"

const topics = [
  "Quickcheck / erste Einordnung",
  "BFSG-Signalcheck",
  "Pflichten-Check",
  "KI & Büroautomation",
  "Audit-Monitoring",
  "Sonstiges",
]

const anliegenMap: Record<string, string> = {
  quickcheck: "Quickcheck / erste Einordnung",
  signalcheck: "BFSG-Signalcheck",
}

const angebotMap: Record<string, string> = {
  "pflichten-check": "Pflichten-Check",
  "ki-bueroautomation": "KI & Büroautomation",
  monitoring: "Audit-Monitoring",
}

function resolveInitialTopic(anliegen: string | null, angebot: string | null): string {
  if (anliegen && anliegenMap[anliegen]) return anliegenMap[anliegen]
  if (angebot && angebotMap[angebot]) return angebotMap[angebot]
  return ""
}

function KontaktForm() {
  const searchParams = useSearchParams()
  const initialTopic = resolveInitialTopic(
    searchParams.get("anliegen"),
    searchParams.get("angebot")
  )

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    location: "",
    topic: initialTopic,
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 py-10">
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground">Danke. Anfrage erfasst.</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ihre Anfrage wurde lokal erfasst. Die echte Formularanbindung wird noch
              eingerichtet. Bitte senden Sie dringende Anfragen zusätzlich per E-Mail.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-3">
          Signalcheck anfragen
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Senden Sie Website, Ort und Anliegen. Wir prüfen den passenden Einstieg und melden uns
          mit einer technischen Ersteinschätzung.
        </p>
      </div>

      {/* Pending form notice */}
      <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-xl p-4">
        <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Direkte Kontaktdaten werden final ergänzt. Bis zur Formularanbindung nutzen Sie bitte
          den vereinbarten Kontaktweg.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1" htmlFor="name">
            Name <span className="text-destructive">*</span>
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Ihr Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1" htmlFor="email">
            E-Mail <span className="text-destructive">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="ihre@email.de"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1" htmlFor="company">
            Unternehmen
          </label>
          <Input
            id="company"
            name="company"
            placeholder="Name des Unternehmens"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1" htmlFor="website">
            Website
          </label>
          <Input
            id="website"
            name="website"
            placeholder="z. B. beispiel.de"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1" htmlFor="location">
            Ort
          </label>
          <Input
            id="location"
            name="location"
            placeholder="z. B. Lübeck"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1" htmlFor="topic">
            Thema
          </label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Thema auswählen</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1" htmlFor="message">
            Nachricht (optional)
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Weitere Informationen..."
            value={formData.message}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <p className="text-xs text-muted-foreground border-t pt-3">
          Unsere Rückmeldung liefert technische Hinweise und Prioritäten. Sie ersetzt keine
          Rechtsberatung und keine behördliche Zertifizierung.
        </p>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Anfrage senden
        </Button>
      </form>
    </div>
  )
}

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-14 md:py-20">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div className="h-96 animate-pulse bg-muted rounded-2xl" />}>
              <KontaktForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
