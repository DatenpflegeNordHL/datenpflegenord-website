"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { contactTopics, resolveInitialTopic } from "@/content/contact-topics"

type FormState =
  | { status: "idle" }
  | { status: "loading" }
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
    setFormState({ status: "loading" })

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.ok) {
        setFormState({ status: "success" })
      } else {
        setFormState({
          status: "error",
          errors: data.errors ?? {
            _form: "Bitte prüfen Sie die Angaben und versuchen Sie es erneut.",
          },
        })
      }
    } catch {
      setFormState({
        status: "error",
        errors: { _form: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
      })
    }
  }

  const errors = formState.status === "error" ? formState.errors : {}

  if (formState.status === "success") {
    return (
      <div className="flex flex-col gap-4 py-10">
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground">Danke. Anfrage technisch geprüft.</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ihre Angaben wurden technisch geprüft. Die finale Zustellung wird nach
              Anbieter-Anbindung aktiviert. Für dringende Anliegen nutzen Sie bitte den
              vereinbarten Kontaktweg.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const isLoading = formState.status === "loading"

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

        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              Wird gesendet…
            </span>
          ) : (
            "Anfrage senden"
          )}
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
