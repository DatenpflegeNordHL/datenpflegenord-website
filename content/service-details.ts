export type ServiceProcessStep = {
  title: string
  description: string
}

export type ServiceFaqItem = {
  question: string
  answer: string
}

export type ServiceDetailContent = {
  href: string
  targetGroups: string[]
  checks: string[]
  deliverables: string[]
  processSteps: ServiceProcessStep[]
  notIncluded: string[]
  faq: ServiceFaqItem[]
}

export const serviceDetails: ServiceDetailContent[] = [
  {
    href: "/leistungen/bfsg-signalcheck",
    targetGroups: [
      "Unternehmen mit Website, Shop, Buchungsformular oder Kundenportal",
      "Betriebe, die BFSG-Relevanz technisch einordnen lassen möchten",
      "Unternehmen, die Barrierefreiheits-Signale vorprüfen möchten",
    ],
    checks: [
      "BFSG-Relevanz als technisches Prüfsignal",
      "Barrierefreiheits-Basissignale",
      "Tastaturbedienbarkeit und Fokusführung als Sichtprüfung",
      "Kontraste und Strukturhinweise",
      "Impressum, Datenschutz und Kontaktwege als Basisstruktur",
    ],
    deliverables: [
      "technische Ersteinschätzung",
      "Ampel-Status für wichtige Prüfpunkte",
      "priorisierte Aufgabenliste",
      "Empfehlung für nächste Schritte",
    ],
    processSteps: [
      {
        title: "Website und Anliegen aufnehmen",
        description:
          "Sie senden Domain, Ort und kurze Angaben zum Angebot. Wir prüfen, welcher technische Fokus sinnvoll ist.",
      },
      {
        title: "Technische Signale sichten",
        description:
          "Wir prüfen auffällige BFSG- und Barrierefreiheits-Signale, Basisstruktur und Kontaktwege.",
      },
      {
        title: "Aufgabenliste übergeben",
        description:
          "Sie erhalten eine verständliche Priorisierung mit nächsten technischen Schritten.",
      },
    ],
    notIncluded: [
      "keine Rechtsberatung",
      "keine behördliche Zertifizierung",
      "keine Garantie auf BFSG-Konformität",
      "keine vollständige WCAG-Zertifizierung",
    ],
    faq: [
      {
        question: "Ist das eine Rechtsberatung?",
        answer:
          "Nein. Die Prüfung liefert technische Hinweise und Prioritäten. Rechtliche Bewertung muss bei Bedarf durch geeignete Fachstellen erfolgen.",
      },
      {
        question: "Bekomme ich danach eine Aufgabenliste?",
        answer:
          "Ja. Ziel ist eine verständliche Liste mit priorisierten technischen nächsten Schritten.",
      },
    ],
  },
  {
    href: "/leistungen/pflichten-check",
    targetGroups: [
      "Onlinehändler und Dienstleister mit Website oder Shop",
      "Betriebe mit Unsicherheit bei digitalen Pflichtstellen",
      "Unternehmen, die E-Rechnung, LUCID, Widerrufsbutton oder Green Claims sortieren möchten",
    ],
    checks: [
      "E-Rechnung-Bereitschaft als Prozesssignal",
      "LUCID- und Verpackungshinweise",
      "Widerrufsbutton und Shop-Pflichten als technische Sichtung",
      "Green-Claims-Hinweise als Prüfsignal",
      "Datenschutz- und Impressum-Basissignale",
    ],
    deliverables: [
      "Pflichtstellen-Übersicht",
      "Ampel-Status",
      "priorisierte Umsetzungsreihenfolge",
      "technische Empfehlungen für Website und Prozesse",
    ],
    processSteps: [
      {
        title: "Ausgangslage erfassen",
        description:
          "Sie nennen Website, Branche und relevante digitale Pflichtstellen oder Unsicherheiten.",
      },
      {
        title: "Prüfsignale sortieren",
        description:
          "Wir ordnen technische Hinweise nach Thema, Dringlichkeit und Umsetzbarkeit.",
      },
      {
        title: "Prioritätenplan erstellen",
        description:
          "Sie erhalten eine klare Reihenfolge für die nächsten technischen Schritte.",
      },
    ],
    notIncluded: [
      "keine Rechtsberatung",
      "keine Steuerberatung",
      "keine Prüfung durch Behörde",
      "keine Garantie auf Vollständigkeit aller branchenspezifischen Pflichten",
    ],
    faq: [
      {
        question: "Ist der Pflichten-Check nur für Onlineshops?",
        answer:
          "Nein. Er ist besonders relevant für Shops, aber auch Dienstleister und lokale Betriebe profitieren von einer technischen Sortierung.",
      },
      {
        question: "Wird LUCID rechtlich geprüft?",
        answer:
          "Nein. Wir markieren technische Hinweise und Auffälligkeiten. Die rechtliche Bewertung bleibt extern.",
      },
    ],
  },
  {
    href: "/leistungen/ki-bueroautomation",
    targetGroups: [
      "Betriebe mit wiederkehrenden Büroaufgaben",
      "Unternehmen mit vielen E-Mails, Dokumenten oder Rechnungen",
      "Teams ohne eigene IT-Abteilung",
    ],
    checks: [
      "wiederkehrende Aufgaben im Büro",
      "Dokumenten- und E-Mail-Flüsse",
      "Rechnungs- und Angebotsprozesse",
      "sinnvolle KI-Einsatzfelder",
      "einfache Automationsmöglichkeiten",
    ],
    deliverables: [
      "Prozessübersicht",
      "Automations-Ideen nach Aufwand und Nutzen",
      "technische Empfehlung",
      "optionaler Umsetzungsfahrplan",
    ],
    processSteps: [
      {
        title: "Prozess aufnehmen",
        description:
          "Wir erfassen wiederkehrende Aufgaben, Medienbrüche und manuelle Arbeitsschritte.",
      },
      {
        title: "Automationspotenzial prüfen",
        description:
          "Wir bewerten, ob einfache Automation, KI-Unterstützung oder Prozessanpassung sinnvoll ist.",
      },
      {
        title: "Umsetzungsweg vorschlagen",
        description:
          "Sie erhalten eine nachvollziehbare Empfehlung mit Aufwand, Nutzen und nächstem Schritt.",
      },
    ],
    notIncluded: [
      "keine Blackbox-Automation ohne Freigabe",
      "keine Verarbeitung sensibler Daten ohne Klärung",
      "keine pauschale KI-Einführung ohne Prozessbezug",
    ],
    faq: [
      {
        question: "Muss ich schon wissen, welche KI ich brauche?",
        answer:
          "Nein. Wir starten mit den wiederkehrenden Aufgaben und prüfen dann, ob KI oder einfache Automation sinnvoll ist.",
      },
      {
        question: "Geht es auch klein?",
        answer:
          "Ja. Der Fokus liegt auf nachvollziehbaren, kleinen Automationen mit echtem Nutzen.",
      },
    ],
  },
  {
    href: "/monitoring",
    targetGroups: [
      "Betriebe, die ihre Website regelmäßig prüfen lassen möchten",
      "Unternehmen nach einem Signalcheck oder Pflichten-Check",
      "Teams ohne eigene laufende Website-Kontrolle",
    ],
    checks: [
      "Website-Erreichbarkeit und Basisstruktur",
      "offene Aufgaben aus früheren Prüfungen",
      "technische Veränderungen",
      "Pflichtstellen-Status",
      "Monitoring-Historie",
    ],
    deliverables: [
      "monatlicher Statusbericht",
      "Ampel-Status",
      "Veränderungshistorie",
      "priorisierte nächste Schritte",
    ],
    processSteps: [
      {
        title: "Ausgangsstand festlegen",
        description:
          "Wir erfassen Website, Prüfthemen und offene Aufgaben als Basis für das Monitoring.",
      },
      {
        title: "Wiederholprüfung durchführen",
        description:
          "Regelmäßig werden technische Signale, Änderungen und offene Punkte erneut geprüft.",
      },
      {
        title: "Statusbericht übergeben",
        description:
          "Sie erhalten eine kompakte Übersicht mit Ampel-Status und nächsten Prioritäten.",
      },
    ],
    notIncluded: [
      "kein 24/7-Sicherheitsmonitoring",
      "kein Ersatz für Rechtsberatung",
      "keine automatische Behebung ohne Auftrag",
      "keine behördliche Zertifizierung",
    ],
    faq: [
      {
        question: "Ist Monitoring ein Abo?",
        answer:
          "Ja. Es ist für regelmäßige technische Wiederholprüfungen gedacht.",
      },
      {
        question: "Werden Fehler automatisch behoben?",
        answer:
          "Nicht automatisch. Sie erhalten Hinweise und Prioritäten. Umsetzungen können separat beauftragt werden.",
      },
    ],
  },
]

export function getServiceDetailByHref(href: string): ServiceDetailContent {
  const detail = serviceDetails.find((d) => d.href === href)
  if (!detail) {
    throw new Error(`Missing service detail content for href: ${href}`)
  }
  return detail
}
