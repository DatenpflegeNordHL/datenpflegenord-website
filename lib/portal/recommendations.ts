import type { CompanyProfile } from "@/lib/portal/profile"

export type RecommendationPriority = "hoch" | "mittel" | "später"

export type RecommendationType =
  | "trustsignal"
  | "bfsg_readiness"
  | "ai_visibility"
  | "datenpflege"
  | "datamap"
  | "funding"
  | "ki_upsell_sprint"

export type PortalRecommendation = {
  id: RecommendationType
  eyebrow: string
  title: string
  description: string
  priority: RecommendationPriority
  product: string
  reasons: string[]
  nextStep: string
  ctaLabel: string
  ctaHref: string
}

function hasWebsite(profile: CompanyProfile): boolean {
  return Boolean(profile.websiteUrl?.trim())
}

function includesB2C(profile: CompanyProfile): boolean {
  return profile.businessModel === "b2c" || profile.businessModel === "both"
}

function hasCustomerTransactionTouchpoint(profile: CompanyProfile): boolean {
  return profile.hasShop || profile.hasBookingSystem || profile.hasContactForms
}

function hasUnclearDigitalProblems(profile: CompanyProfile): boolean {
  if (profile.digitalProblems.length === 0) return true

  const problemText = profile.digitalProblems.join(" ").toLowerCase()

  return [
    "unklar",
    "nicht sicher",
    "weiss nicht",
    "weiß nicht",
    "keine klare",
    "priorität",
    "priorisieren",
  ].some((signal) => problemText.includes(signal))
}

function hasContentProblems(profile: CompanyProfile): boolean {
  const problemText = profile.digitalProblems.join(" ").toLowerCase()

  return ["content", "inhalt", "texte", "faq", "leistungen", "struktur", "lesbarkeit"].some(
    (signal) => problemText.includes(signal),
  )
}

function hasManyOpenProblems(profile: CompanyProfile): boolean {
  return profile.digitalProblems.length >= 3 || hasUnclearDigitalProblems(profile)
}

function byPriority(a: PortalRecommendation, b: PortalRecommendation): number {
  const order: Record<RecommendationPriority, number> = {
    hoch: 0,
    mittel: 1,
    später: 2,
  }

  return order[a.priority] - order[b.priority]
}

export function getPortalRecommendations(profile: CompanyProfile): PortalRecommendation[] {
  const recommendations: PortalRecommendation[] = []

  if (hasWebsite(profile)) {
    recommendations.push({
      id: "trustsignal",
      eyebrow: "TrustSignal",
      title: "TrustSignal Readiness Scan",
      description:
        "Kompakte Website-Vorprüfung für Technik, Datenschutz-Basis, Barrierefreiheits-Indikatoren und sichtbare Vertrauenssignale.",
      priority: "hoch",
      product: "TrustSignal Scan",
      reasons: ["Website-URL vorhanden", "schneller Einstieg ohne CMS-Zugang"],
      nextStep: "Website extern prüfen lassen und Ergebnis als erste Messlinie im Portal ablegen.",
      ctaLabel: "TrustSignal Scan anfragen",
      ctaHref: "/technischer-web-check",
    })
  }

  if (includesB2C(profile) && hasCustomerTransactionTouchpoint(profile)) {
    recommendations.push({
      id: "bfsg_readiness",
      eyebrow: "BFSG-Readiness",
      title: "BFSG-Readiness Vorprüfung",
      description:
        "Strukturierte Vorprüfung, ob Shop, Buchung oder Kontaktwege sichtbare BFSG-Readiness-Indikatoren zeigen.",
      priority: "hoch",
      product: "Technischer Web-Check",
      reasons: ["B2C-Anteil im Geschäftsmodell", "digitaler Kundenkontakt vorhanden"],
      nextStep: "Shop, Buchung und Formulare nach Indikatoren priorisiert prüfen.",
      ctaLabel: "BFSG-Readiness prüfen",
      ctaHref: "/technischer-web-check",
    })
  }

  if (profile.desiredAiSearchQueries.length > 0) {
    recommendations.push({
      id: "ai_visibility",
      eyebrow: "KI-Sichtbarkeit",
      title: "KI-Sichtbarkeitsmonitoring Beta",
      description:
        "Regelmäßige Messung ausgewählter KI-Suchfragen als Beta, damit Erwähnungen und Antwortmuster nachvollziehbar werden.",
      priority: hasWebsite(profile) ? "hoch" : "mittel",
      product: "KI-Sichtbarkeitsmonitoring Beta",
      reasons: [
        "gewünschte KI-Suchfragen angegeben",
        "Messpunkte für spätere GEO-Auswertung vorhanden",
      ],
      nextStep: "Prompts schärfen und Wettbewerber für die erste Beta-Messung festlegen.",
      ctaLabel: "Beta vormerken",
      ctaHref: "/kontakt",
    })
  }

  if (profile.hasExternalProfiles || profile.hasGoogleBusinessProfile) {
    recommendations.push({
      id: "datenpflege",
      eyebrow: "Datenpflege",
      title: "Datenpflege & Sichtbarkeit",
      description:
        "Abgleich von Google Business Profile, externen Profilen, Standortdaten und Anfragewegen für konsistente Auffindbarkeit.",
      priority: profile.hasGoogleBusinessProfile && profile.hasExternalProfiles ? "hoch" : "mittel",
      product: "Sichtbarkeits-Check",
      reasons: [
        profile.hasGoogleBusinessProfile ? "Google Business Profile vorhanden" : "externe Profile vorhanden",
        "Profil- und Standortdaten beeinflussen lokale Sichtbarkeit",
      ],
      nextStep: "Profile und Standortdaten sammeln, abgleichen und priorisiert korrigieren.",
      ctaLabel: "Sichtbarkeit prüfen",
      ctaHref: "/sichtbarkeits-check",
    })
  }

  if (profile.hasInternalDocuments) {
    recommendations.push({
      id: "datamap",
      eyebrow: "DataMap",
      title: "KI-Readiness DataMap",
      description:
        "Bestandsaufnahme interner Dokumentenquellen, damit spätere KI-Assistenten auf gepflegte und aktuelle Inhalte aufsetzen können.",
      priority: "mittel",
      product: "KI-Readiness DataMap",
      reasons: ["interne Dokumentenquellen vorhanden", "relevant für einen späteren Portal-Assistenten"],
      nextStep: "Dokumentenquellen und Verantwortliche ohne Upload sensibler Dateien erfassen.",
      ctaLabel: "KI-Lösungen ansehen",
      ctaHref: "/ki-loesungen",
    })
  }

  if (hasManyOpenProblems(profile)) {
    recommendations.push({
      id: "funding",
      eyebrow: "Orientierung",
      title: "Förderfähigkeits-Vorcheck",
      description:
        "Kurzer Vorcheck, ob ein strukturierter Digitalisierungsplan und mögliche Förderfähigkeit sinnvoll geprüft werden sollten.",
      priority: "mittel",
      product: "Förderfähigkeits-Vorcheck",
      reasons: ["digitale Probleme sind noch nicht klar priorisiert"],
      nextStep: "Probleme in einen Maßnahmenplan übersetzen und mögliche Förderlogik prüfen.",
      ctaLabel: "Vorcheck anfragen",
      ctaHref: "/kontakt",
    })
  }

  if (profile.desiredAiSearchQueries.length > 0 && hasWebsite(profile) && hasContentProblems(profile)) {
    recommendations.push({
      id: "ki_upsell_sprint",
      eyebrow: "KI-Lesbarkeit",
      title: "KI-Upsell Sprint",
      description:
        "Kurzer Sprint, um Leistungsseiten, FAQs und strukturierte Inhalte für bessere KI-Lesbarkeit vorzubereiten.",
      priority: "hoch",
      product: "KI-Upsell Sprint",
      reasons: ["KI-Suchfragen vorhanden", "Website vorhanden", "Content- oder Strukturproblem erkannt"],
      nextStep: "Leistungsseiten und FAQ-Struktur für die wichtigsten KI-Suchfragen überarbeiten.",
      ctaLabel: "Sprint besprechen",
      ctaHref: "/kontakt",
    })
  }

  return recommendations.sort(byPriority)
}
