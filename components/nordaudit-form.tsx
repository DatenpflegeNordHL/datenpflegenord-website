"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface NordAuditFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NordAuditForm({ open, onOpenChange }: NordAuditFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    domain: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission would be handled by API
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onOpenChange(false)
      setFormData({ name: "", email: "", company: "", domain: "", message: "" })
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Barrierefreiheits-Audit anfragen</DialogTitle>
          <DialogDescription>
            BFSG Website Audit, Barrierefreiheitsprüfung und Monitoring für KMU
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✓</div>
            <p className="font-medium text-foreground mb-2">Vielen Dank!</p>
            <p className="text-sm text-muted-foreground">
              Wir melden uns bald bei Ihnen.
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
                Unternehmen
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
                Website-Domain
              </label>
              <Input
                name="domain"
                placeholder="z.B. beispiel.de"
                value={formData.domain}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Nachricht (optional)
              </label>
              <Textarea
                name="message"
                placeholder="Zusätzliche Informationen..."
                value={formData.message}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="text-xs text-muted-foreground border-t pt-3 mt-4">
              <p>
                Hinweis: Dies ist keine anwaltliche Rechtsberatung. Das NordAudit Portal bietet eine 
                automatisierte Vorab-Prüfung nach aktuellem Prüfstand.
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
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
