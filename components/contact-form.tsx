"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { contactTopics, resolveInitialTopic } from "@/content/contact-topics"
import { siteConfig } from "@/lib/site-config"

type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; errors: Record<string, string> }

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="text-xs text-destructive mt-1">
      {message}
    </p>
  )
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
    websiteUrl: "", // honeypot
  })
  const [formState, setFormState] = useState<FormState>({ status: "idle" })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const nextErrors: Record<string, string> = {}
    if (!formData.name.trim()) nextErrors.name = "Bitte geben Sie Ihren Namen ein."
    if (!formData.email.trim()) {
      nextErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein."
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormState({
        status: "error",
        errors: nextErrors,
      })
      return
    }

    setFormState({ status: "success" })
  }

  const errors = formState.status === "error" ? formState.errors : {}

  if (formState.status === "success") {
    const selectedTopic = contactTopics.find((topic) => topic.value === formData.topic)?.label
    const summaryRows = [
      ["Name", formData.name],
      ["E-Mail", formData.email],
      ["Unternehmen", formData.company],
      ["Website", formData.website],
      ["Ort", formData.location],
      ["Thema", selectedTopic || formData.topic],
      ["Nachricht", formData.message],
    ].filter(([, value]) => value.trim())

    return (
      <div className="flex flex-col gap-4 py-10">
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground">Anfrage vorbereitet.</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Die direkte Formularanbindung wird noch eingerichtet. Bitte hinterlegen Sie eine
              Kontaktadresse im Projekt.
            </p>
            {siteConfig.contactEmail && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kopieren Sie die Zusammenfassung und senden Sie sie an {siteConfig.contactEmail}.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-secondary/50 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Zusammenfassung
          </p>
          <dl className="grid gap-2 text-sm">
            {summaryRows.map(([label, value]) => (
              <div key={label} className="grid gap-1 sm:grid-cols-[120px_1fr]">
                <dt className="font-medium text-foreground">{label}</dt>
                <dd className="text-muted-foreground whitespace-pre-wrap">{value}</dd>
              </div>
            ))}
          </dl>
          <Button type="button" variant="outline" className="mt-4" onClick={() => setFormState({ status: "idle" })}>
            Angaben bearbeiten
          </Button>
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

      {errors._form && (
        <div className="flex items-start gap-3 bg-destructive/5 border border-destructive/20 rounded-xl p-4">
          <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-destructive leading-relaxed">{errors._form}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Honeypot – hidden from real users */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="websiteUrl">Website URL</label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.websiteUrl}
            onChange={handleChange}
          />
        </div>

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
            aria-describedby={errors.name ? "name-error" : undefined}
            required
          />
          <FieldError id="name-error" message={errors.name} />
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
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          <FieldError id="email-error" message={errors.email} />
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
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          <FieldError id="company-error" message={errors.company} />
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
            aria-describedby={errors.website ? "website-error" : undefined}
          />
          <FieldError id="website-error" message={errors.website} />
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
            aria-describedby={errors.location ? "location-error" : undefined}
          />
          <FieldError id="location-error" message={errors.location} />
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
            aria-describedby={errors.topic ? "topic-error" : undefined}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Thema auswählen</option>
            {contactTopics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <FieldError id="topic-error" message={errors.topic} />
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
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>

        <p className="text-xs text-muted-foreground border-t pt-3">
          Unsere Rückmeldung liefert technische Hinweise und Prioritäten. Sie ersetzt keine
          Rechtsberatung und keine behördliche Zertifizierung.
        </p>
        <p className="text-xs text-muted-foreground">
          Die direkte Formularanbindung wird noch eingerichtet. Die Angaben werden hier zunächst
          nur zur Vorbereitung der Anfrage zusammengefasst.
        </p>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Anfrage vorbereiten
        </Button>
      </form>
    </div>
  )
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse bg-muted rounded-2xl" />}>
      <KontaktForm />
    </Suspense>
  )
}
