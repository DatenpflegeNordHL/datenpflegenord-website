import { Radar, ShieldCheck, BrainCircuit, Activity } from "lucide-react"
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

export const services: Service[] = [
  {
    icon: Radar,
    title: "BFSG-Signalcheck",
    description:
      "Technische Vorprüfung von BFSG-Relevanz, Barrierefreiheits-Signalen und typischen Website-Pflichtstellen.",
    price: "ab 290 €",
    status: "entry",
    href: "/leistungen/bfsg-signalcheck",
    bullets: [
      "BFSG-Relevanz technisch einordnen",
      "Barrierefreiheits-Signale prüfen",
      "Impressum, Datenschutz und Basisstruktur sichten",
      "Priorisierte Aufgabenliste erhalten",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Pflichten-Check",
    description:
      "Gebündelte technische Prüfung digitaler Pflichtstellen wie E-Rechnung, LUCID, Widerrufsbutton und Green-Claims-Hinweise.",
    price: "ab 490 €",
    status: "recommended",
    href: "/leistungen/pflichten-check",
    bullets: [
      "E-Rechnung-Bereitschaft prüfen",
      "LUCID- und Verpackungshinweise einordnen",
      "Widerrufsbutton und Shop-Pflichten technisch sichten",
      "Green-Claims-Risiken als Prüfsignale markieren",
    ],
  },
  {
    icon: BrainCircuit,
    title: "KI & Büroautomation",
    description:
      "Wir prüfen wiederkehrende Büroprozesse und entwickeln einfache KI-gestützte Abläufe für Dokumente, E-Mails, Rechnungen und Kundenanfragen.",
    price: "ab 990 €",
    status: "custom",
    href: "/leistungen/ki-bueroautomation",
    bullets: [
      "Dokumente und E-Mails strukturieren",
      "Rechnungs- und Angebotsprozesse vereinfachen",
      "Kundenanfragen vorsortieren",
      "Wiederkehrende Aufgaben automatisieren",
    ],
  },
  {
    icon: Activity,
    title: "Audit-Monitoring",
    description:
      "Regelmäßige technische Wiederholprüfung von Website, Pflichtstellen und offenen Aufgaben mit nachvollziehbarer Historie.",
    price: "ab 99 €/Monat",
    status: "monitoring",
    href: "/monitoring",
    bullets: [
      "Monatlicher Statusbericht",
      "Ampel-Status für offene Punkte",
      "Historie und Veränderungsverfolgung",
      "Priorisierte nächste Schritte",
    ],
  },
]

export function getServiceByHref(href: string): Service {
  const service = services.find((s) => s.href === href)
  if (!service) {
    throw new Error(`Missing service for href: ${href}`)
  }
  return service
}
