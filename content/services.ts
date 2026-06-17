import { Radar, ShieldCheck, BrainCircuit, Activity, Bot, FileText, Mail, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type ServiceStatus = "entry" | "recommended" | "custom" | "monitoring"

export type Service = {
  icon: LucideIcon
  title: string
  description: string
  bullets: string[]
  price: string
  status: ServiceStatus
  href: string
}

// KI-Systeme offerings (primary portfolio)
export const kiServices: Service[] = [
  {
    icon: BrainCircuit,
    title: "KI-Prozesscheck",
    description:
      "Wir analysieren wiederkehrende Aufgaben und zeigen, wo KI sinnvoll unterstützt, ohne Prozesse unnötig kompliziert zu machen.",
    price: "auf Anfrage",
    status: "entry",
    href: "/kontakt?anliegen=ki-prozesscheck",
    bullets: [
      "Wiederkehrende Aufgaben identifizieren",
      "KI-Potenziale priorisieren",
      "Klare nächste Schritte",
    ],
  },
  {
    icon: Bot,
    title: "KI-Assistenzsysteme",
    description:
      "Interne Assistenten für Wissen, Texte, E-Mails, Dokumente, Kundenfragen oder wiederkehrende Entscheidungen.",
    price: "ab 990 €",
    status: "custom",
    href: "/leistungen/ki-bueroautomation",
    bullets: [
      "Wissensassistent aufbauen",
      "E-Mail- und Textvorlagen automatisieren",
      "Kundenfragen vorsortieren",
    ],
  },
  {
    icon: FileText,
    title: "Büroautomation",
    description:
      "Automationen für Dokumente, Rechnungen, E-Mails, Ablagen, Erinnerungen und einfache Workflows.",
    price: "ab 490 €",
    status: "custom",
    href: "/leistungen/ki-bueroautomation",
    bullets: [
      "Dokumentenprozesse vereinfachen",
      "Rechnungs- und Angebotsworkflows",
      "Wiederkehrende Abläufe automatisieren",
    ],
  },
  {
    icon: Zap,
    title: "Website & Lead-Prozesse",
    description:
      "Verbindung von Website-Check, Kontaktformularen, Leads und strukturierter Nachbearbeitung.",
    price: "auf Anfrage",
    status: "custom",
    href: "/kontakt?anliegen=ki-prozesscheck",
    bullets: [
      "Lead-Eingang strukturieren",
      "Kontaktformular-Nachbearbeitung",
      "Website-Signale einbinden",
    ],
  },
]

// Website-Check offerings (supplementary)
export const services: Service[] = [
  {
    icon: Radar,
    title: "Website-Schnellcheck",
    description:
      "Schneller Einstieg über sichtbare Website-Signale und technische Basisprüfung.",
    price: "kostenlos",
    status: "entry",
    href: "/quickcheck",
    bullets: [
      "Erreichbarkeit und Pflichtlinks prüfen",
      "Technische Basisstruktur sichten",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Website-Signalcheck",
    description:
      "Vertiefte technische Vorprüfung zu Website-Struktur, Pflichtstellen, Barrierefreiheits-Signalen und Auffindbarkeit.",
    price: "ab 290 €",
    status: "recommended",
    href: "/leistungen/bfsg-signalcheck",
    bullets: [
      "BFSG-Relevanz einordnen",
      "Barrierefreiheits-Signale prüfen",
    ],
  },
  {
    icon: Mail,
    title: "Digitalpflichten-Check",
    description:
      "Prüfung sichtbarer Pflichtstellen, Basisangaben und struktureller Hinweise.",
    price: "ab 490 €",
    status: "recommended",
    href: "/leistungen/pflichten-check",
    bullets: [
      "E-Rechnung-Bereitschaft prüfen",
      "Widerrufsbutton und Shop-Pflichten sichten",
    ],
  },
  {
    icon: Activity,
    title: "Website-Monitoring",
    description:
      "Regelmäßige Kontrolle wichtiger Website-Signale und Änderungen.",
    price: "ab 99 €/Monat",
    status: "monitoring",
    href: "/monitoring",
    bullets: [
      "Monatlicher Statusbericht",
      "Veränderungsverfolgung",
    ],
  },
]

export function getServiceByHref(href: string): Service {
  const all = [...kiServices, ...services]
  const service = all.find((s) => s.href === href)
  if (!service) {
    throw new Error(`Missing service for href: ${href}`)
  }
  return service
}
