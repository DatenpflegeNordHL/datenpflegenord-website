export type Industry = {
  title: string
  slug: string
  description: string
  typicalChallenges: string[]
  relevantServices: { label: string; href: string }[]
  ctaHref: string
}

export const industries: Industry[] = [
  {
    title: "Handwerk",
    slug: "handwerk",
    description:
      "Für Handwerksbetriebe, die Website, Anfragen, E-Rechnung und lokale Auffindbarkeit technisch besser sortieren möchten.",
    typicalChallenges: [
      "lokale Auffindbarkeit bei Google",
      "klare Kontaktwege auf der Website",
      "E-Rechnung und Angebotsprozesse",
      "einfache Büroprozesse ohne eigene IT-Abteilung",
      "regelmäßige Pflege von Website und Pflichtstellen",
    ],
    relevantServices: [
      { label: "Pflichten-Check", href: "/leistungen/pflichten-check" },
      { label: "KI & Büroautomation", href: "/leistungen/ki-bueroautomation" },
      { label: "Audit-Monitoring", href: "/monitoring" },
    ],
    ctaHref: "/kontakt?anliegen=quickcheck",
  },
  {
    title: "Onlinehandel",
    slug: "onlinehandel",
    description:
      "Für Shops und Onlinehändler, die BFSG-Signale, Pflichtstellen und technische Risiken verständlich sortieren möchten.",
    typicalChallenges: [
      "BFSG- und Barrierefreiheits-Signale",
      "Widerrufsbutton und Shop-Pflichten als technische Sichtung",
      "LUCID- und Verpackungshinweise",
      "Green-Claims-Hinweise",
      "Cookie- und Tracking-Signale",
    ],
    relevantServices: [
      { label: "BFSG-Signalcheck", href: "/leistungen/bfsg-signalcheck" },
      { label: "Pflichten-Check", href: "/leistungen/pflichten-check" },
      { label: "Audit-Monitoring", href: "/monitoring" },
    ],
    ctaHref: "/kontakt?anliegen=quickcheck",
  },
  {
    title: "Pflege",
    slug: "pflege",
    description:
      "Für Pflege- und Betreuungsdienste, die barrierearme Kontaktwege, verständliche Website-Struktur und digitale Büroprozesse prüfen möchten.",
    typicalChallenges: [
      "Barrierefreiheits-Signale auf der Website",
      "klare Kontakt- und Notfallwege",
      "lokale Auffindbarkeit",
      "Dokumenten- und Anfrageprozesse",
      "verständliche Struktur für Angehörige und Kunden",
    ],
    relevantServices: [
      { label: "BFSG-Signalcheck", href: "/leistungen/bfsg-signalcheck" },
      { label: "KI & Büroautomation", href: "/leistungen/ki-bueroautomation" },
      { label: "Audit-Monitoring", href: "/monitoring" },
    ],
    ctaHref: "/kontakt?anliegen=quickcheck",
  },
  {
    title: "Tourismus",
    slug: "tourismus",
    description:
      "Für touristische Anbieter, Unterkünfte und Freizeitbetriebe, die Buchungswege, Pflichtstellen und Website-Struktur technisch prüfen möchten.",
    typicalChallenges: [
      "Buchungs- und Anfragewege",
      "Barrierefreiheits-Signale",
      "Mehrsprachigkeit als Strukturhinweis",
      "Bewertungs- und Kontaktwege",
      "Pflichtstellen im Webauftritt",
    ],
    relevantServices: [
      { label: "BFSG-Signalcheck", href: "/leistungen/bfsg-signalcheck" },
      { label: "Pflichten-Check", href: "/leistungen/pflichten-check" },
      { label: "Audit-Monitoring", href: "/monitoring" },
    ],
    ctaHref: "/kontakt?anliegen=quickcheck",
  },
  {
    title: "Dienstleister",
    slug: "dienstleister",
    description:
      "Für lokale Dienstleister, die Lead-Formulare, Pflichtstellen, E-Rechnung und wiederkehrende Büroprozesse besser ordnen möchten.",
    typicalChallenges: [
      "Lead-Formulare und Kontaktwege",
      "Impressum- und Datenschutz-Basissignale",
      "E-Rechnung und Angebotsprozesse",
      "Kundenanfragen über mehrere Kanäle",
      "einfache Automationen für wiederkehrende Aufgaben",
    ],
    relevantServices: [
      { label: "Pflichten-Check", href: "/leistungen/pflichten-check" },
      { label: "KI & Büroautomation", href: "/leistungen/ki-bueroautomation" },
      { label: "Audit-Monitoring", href: "/monitoring" },
    ],
    ctaHref: "/kontakt?anliegen=quickcheck",
  },
]

export function getIndustryBySlug(slug: string): Industry {
  const industry = industries.find((i) => i.slug === slug)
  if (!industry) {
    throw new Error(`Missing industry for slug: ${slug}`)
  }
  return industry
}
