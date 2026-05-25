export type ComplianceTopicStatus = "ok" | "check" | "missing"

export type ComplianceTopic = {
  title: string
  description: string
  category: string
  status: ComplianceTopicStatus
  signals: string[]
  href: string
}

export const complianceTopics: ComplianceTopic[] = [
  {
    title: "BFSG / Barrierefreiheit",
    description:
      "Technische Vorprüfung auf BFSG-Relevanz und typische Barrierefreiheits-Signale. Manuelle Prüfung empfohlen.",
    category: "Gesetzliche Pflicht",
    status: "check",
    signals: [
      "Alt-Texte für Bilder als Prüfsignal",
      "Tastaturnavigation technisch einordnen",
      "Kontrastverhältnisse als Prüfsignal",
      "ARIA-Strukturen technisch sichten",
    ],
    href: "/leistungen/bfsg-signalcheck",
  },
  {
    title: "E-Rechnung",
    description:
      "Technische Hinweise zur E-Rechnungs-Bereitschaft. Prüfsignal für B2B-Prozesse und Formatunterstützung.",
    category: "Pflicht ab 2025",
    status: "missing",
    signals: [
      "XRechnung- oder ZUGFeRD-Format einordnen",
      "Empfangsbereitschaft technisch einschätzen",
      "Rechnungsversand-Prozess sichten",
      "Technische Priorität einordnen",
    ],
    href: "/leistungen/pflichten-check",
  },
  {
    title: "LUCID / Verpackung",
    description:
      "Technische Hinweise zu LUCID-Registrierungspflichten und Verpackungshinweisen im Onlineshop.",
    category: "Registrierungspflicht",
    status: "check",
    signals: [
      "LUCID-Registrierungsnummer als Prüfsignal",
      "Verpackungshinweise im Shop sichten",
      "Produktseiten auf Pflichtangaben prüfen",
      "Manuelle Prüfung empfohlen",
    ],
    href: "/leistungen/pflichten-check",
  },
  {
    title: "Widerrufsbutton",
    description:
      "Technische Sichtung des Widerrufsbuttons und zugehöriger Shop-Pflichten als Prüfsignal.",
    category: "Shop-Pflicht",
    status: "check",
    signals: [
      "Widerrufsbutton technisch sichten",
      "Checkout-Prozess als Prüfsignal",
      "Widerrufsbelehrung auffindbar",
      "Manuelle Prüfung empfohlen",
    ],
    href: "/leistungen/pflichten-check",
  },
  {
    title: "Green Claims",
    description:
      "Technische Hinweise zu Nachhaltigkeitsaussagen als Prüfsignale. Manuelle Prüfung und fachliche Beurteilung empfohlen.",
    category: "Werbepflicht",
    status: "check",
    signals: [
      "Nachhaltigkeitsaussagen als Prüfsignal markieren",
      "Belege und Quellenangaben technisch sichten",
      "Formulierungsrisiken einordnen",
      "Priorität für manuelle Überprüfung",
    ],
    href: "/leistungen/pflichten-check",
  },
  {
    title: "Datenschutz-Basissignale",
    description:
      "Technische Vorprüfung grundlegender Datenschutz-Signale wie Datenschutzerklärung und Formularsicherheit.",
    category: "Datenschutz",
    status: "ok",
    signals: [
      "Datenschutzerklärung auffindbar",
      "Kontaktformular-Hinweise sichten",
      "SSL/TLS als Basissignal prüfen",
      "Datenschutzbeauftragter als Prüfsignal",
    ],
    href: "/leistungen/pflichten-check",
  },
  {
    title: "Impressum / Anbieterkennzeichnung",
    description:
      "Technische Sichtung der Impressumspflicht und Anbieterkennzeichnung als Prüfsignal.",
    category: "Kennzeichnungspflicht",
    status: "ok",
    signals: [
      "Impressum auffindbar und vollständig",
      "Pflichtangaben technisch prüfen",
      "Erreichbarkeit der Seite sichten",
      "Manuelle Vollständigkeitsprüfung empfohlen",
    ],
    href: "/leistungen/pflichten-check",
  },
  {
    title: "Cookie- und Tracking-Signale",
    description:
      "Technische Vorprüfung auf Tracking-Dienste und Cookie-Hinweise als Prüfsignale.",
    category: "Tracking",
    status: "check",
    signals: [
      "Cookie-Banner als Prüfsignal sichten",
      "Drittanbieter-Scripts technisch einordnen",
      "Consent-Management-Signale prüfen",
      "Manuelle Prüfung empfohlen",
    ],
    href: "/leistungen/bfsg-signalcheck",
  },
]
