import { contactTopicValues } from "@/content/contact-topics"

export type ContactLeadInput = {
  name: string
  email: string
  company?: string
  website?: string
  location?: string
  topic?: string
  message?: string
  websiteUrl?: string
}

export type ContactLeadNormalized = {
  name: string
  email: string
  company: string
  website: string
  location: string
  topic: string
  message: string
}

export type ContactLeadResult =
  | { ok: true; data: ContactLeadNormalized; isHoneypot: false }
  | { ok: true; data: null; isHoneypot: true }
  | { ok: false; errors: Record<string, string> }

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

export function validateContactLead(input: unknown): ContactLeadResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, errors: { _form: "Ungültige Eingabe." } }
  }

  const raw = input as Record<string, unknown>

  // Honeypot check – silent accept without logging
  if (str(raw.websiteUrl) !== "") {
    return { ok: true, data: null, isHoneypot: true }
  }

  const errors: Record<string, string> = {}

  const name = str(raw.name)
  if (name.length < 2) errors.name = "Bitte geben Sie Ihren Namen an (min. 2 Zeichen)."
  else if (name.length > 120) errors.name = "Name zu lang (max. 120 Zeichen)."

  const email = str(raw.email)
  if (!email) errors.email = "E-Mail ist erforderlich."
  else if (!isValidEmail(email)) errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an."
  else if (email.length > 180) errors.email = "E-Mail zu lang (max. 180 Zeichen)."

  const company = str(raw.company)
  if (company.length > 160) errors.company = "Unternehmensname zu lang (max. 160 Zeichen)."

  const website = str(raw.website)
  if (website.length > 240) errors.website = "Website-URL zu lang (max. 240 Zeichen)."

  const location = str(raw.location)
  if (location.length > 120) errors.location = "Ort zu lang (max. 120 Zeichen)."

  const topic = str(raw.topic)
  if (topic !== "" && !contactTopicValues.includes(topic)) {
    errors.topic = "Ungültiges Thema."
  }

  const message = str(raw.message)
  if (message.length > 2000) errors.message = "Nachricht zu lang (max. 2000 Zeichen)."

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    isHoneypot: false,
    data: { name, email, company, website, location, topic, message },
  }
}
