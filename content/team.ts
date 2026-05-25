export type TeamMember = {
  name: string
  role: string
  focus: string
  description: string
  initials: string
  imageSrc?: string
}

export const teamMembers: TeamMember[] = [
  {
    name: "Dustin Zander",
    role: "Ansprechpartner & Projektaufbau",
    focus: "Digitale Pflichtstellen, Website-Prüfung und KMU-Prozesse",
    description:
      "Koordiniert Prüfungen, priorisiert Ergebnisse und übersetzt technische Signale in verständliche nächste Schritte.",
    initials: "DZ",
  },
  {
    name: "Technische Prüfung",
    role: "Website & Pflichtstellen",
    focus: "BFSG-Signale, Technik, Struktur und Monitoring",
    description:
      "Prüft Websites auf technische Hinweise, Auffindbarkeit, Basisstruktur und wiederkehrende Risiken.",
    initials: "TP",
  },
  {
    name: "Umsetzung & Automation",
    role: "KI & Büroprozesse",
    focus: "Dokumente, E-Mails, Rechnungen und interne Abläufe",
    description:
      "Ordnet wiederkehrende Aufgaben und entwickelt einfache, nachvollziehbare Automationsansätze.",
    initials: "UA",
  },
]
