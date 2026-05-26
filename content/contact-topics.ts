export type ContactTopic = {
  label: string
  value: string
}

export const contactTopics: ContactTopic[] = [
  { label: "Quickcheck / erste Einordnung", value: "quickcheck" },
  { label: "BFSG-Signalcheck", value: "bfsg-signalcheck" },
  { label: "Pflichten-Check", value: "pflichten-check" },
  { label: "KI & Büroautomation", value: "ki-bueroautomation" },
  { label: "Audit-Monitoring", value: "audit-monitoring" },
  { label: "Sonstiges", value: "sonstiges" },
]

export const contactTopicValues = contactTopics.map((t) => t.value)

export const anliegenMap: Record<string, string> = {
  quickcheck: "quickcheck",
  signalcheck: "bfsg-signalcheck",
}

export const angebotMap: Record<string, string> = {
  "pflichten-check": "pflichten-check",
  "ki-bueroautomation": "ki-bueroautomation",
  monitoring: "audit-monitoring",
}

export function resolveInitialTopic(
  anliegen: string | null,
  angebot: string | null
): string {
  if (anliegen && anliegenMap[anliegen]) return anliegenMap[anliegen]
  if (angebot && angebotMap[angebot]) return angebotMap[angebot]
  return ""
}
