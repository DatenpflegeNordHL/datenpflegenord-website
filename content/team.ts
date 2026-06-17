export type TeamMemberType = "person" | "department"

export type TeamMember = {
  type: TeamMemberType
  name: string
  role: string
  focus: string
  description: string
  initials: string
  imageSrc?: string
  badges?: string[]
}

export const teamMembers: TeamMember[] = [
  {
    type: "person",
    name: "Dustin Zander",
    role: "Geschäftsführung & Projektleitung",
    focus: "Ansprechpartner",
    description:
      "Koordiniert Prüfungen, priorisiert Ergebnisse und begleitet Unternehmen von der ersten Analyse bis zum nächsten sinnvollen KI- oder Automationssystem.",
    initials: "DZ",
    badges: ["Ansprechpartner", "KI-Systeme", "Website-Checks", "KMU-Prozesse", "Umsetzung"],
  },
  {
    type: "department",
    name: "KI-Systeme & Automation",
    role: "Fachbereich",
    focus: "KI-Prozesse & Assistenten",
    description:
      "Entwickelt einfache, nachvollziehbare KI-Systeme zur Unterstützung wiederkehrender Unternehmensprozesse.",
    initials: "department-ki",
    badges: ["KI-Prozesse", "Assistenten", "Dokumente", "E-Mail", "Workflows"],
  },
  {
    type: "department",
    name: "Website-Prüfung & technische Auswertung",
    role: "Fachbereich",
    focus: "Technische Signale",
    description:
      "Strukturiert Website-Signale, Statuswerte und wiederkehrende Prüfungen als Einstieg in digitale Verbesserungen.",
    initials: "department-website",
    badges: ["QuickCheck", "Pflichtstellen", "Monitoring", "Technische Signale"],
  },
]
