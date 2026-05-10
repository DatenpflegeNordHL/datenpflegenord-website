"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface BetriebsKIFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BetriebsKIForm({ open, onOpenChange }: BetriebsKIFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    focus: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] KI Prozessautomatisierung form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onOpenChange(false)
      setFormData({ name: "", email: "", company: "", focus: "", message: "" })
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>KI Prozesscheck anfragen</DialogTitle>
          <DialogDescription>
            Individuelle KI-Agenten und Workflow-Automatisierung für wiederkehrende Unternehmensaufgaben
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✓</div>
            <p className="font-medium text-foreground mb-2">Vielen Dank!</p>
            <p className="text-sm text-muted-foreground">
              Wir analysieren Ihre Anforderungen und melden uns zeitnah.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Name
              </label>
              <Input
                name="name"
                placeholder="Ihr Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                E-Mail
              </label>
              <Input
                name="email"
                type="email"
                placeholder="your@email.de"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Unternehmen / Abteilung
              </label>
              <Input
                name="company"
                placeholder="Name des Unternehmens"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Prozess / Fokus
              </label>
              <Input
                name="focus"
                placeholder="z.B. Rechnungsverarbeitung, Dokumentenanalyse"
                value={formData.focus}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Nachricht
              </label>
              <Textarea
                name="message"
                placeholder="Beschreiben Sie Ihr Anliegen und Ihre Anforderungen..."
                value={formData.message}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="text-xs text-muted-foreground border-t pt-3 mt-4">
              <p>
                Hinweis: Die KI Prozessautomatisierung unterstützt den Menschen bei wiederkehrenden Aufgaben.
                Der Mensch entscheidet und trägt die Verantwortung.
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Anfrage senden
              </Button>
              <DialogClose asChild>
                <Button variant="outline" size="icon">
                  <X className="w-4 h-4" />
                </Button>
              </DialogClose>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
