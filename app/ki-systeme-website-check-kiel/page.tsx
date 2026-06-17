import type { Metadata } from "next"
import { RegionLandingPage } from "@/components/region-landing-page"

export const metadata: Metadata = {
  title: "KI-Systeme und Website-Checks in Kiel",
  description:
    "DatenpflegeNord unterstützt Unternehmen in Kiel mit technischen Website-Checks, Monitoring und KI-Systemen für Büroprozesse.",
}

export default function KielPage() {
  return (
    <RegionLandingPage
      eyebrow="Kiel"
      title="KI-Systeme und Website-Checks für Unternehmen in Kiel"
      intro="Für Kieler Unternehmen zählen belastbare digitale Abläufe: Anfragen vorsortieren, Informationen auffindbar machen und Websites technisch sauber halten."
      suitableFor={[
        "Beratung, Bildung und Dienstleister mit vielen Informationsanfragen",
        "maritime und regionale Betriebe mit erklärungsbedürftigen Leistungen",
        "Unternehmen, die interne Wissensprozesse strukturieren möchten",
      ]}
      process={[
        "Website-Signale und Kontaktstrecken technisch prüfen",
        "wiederkehrende Informations- und Dokumentenflüsse identifizieren",
        "nächste Schritte für KI-Assistenz, Website-Check oder Monitoring festlegen",
      ]}
      faq={[
        {
          question: "Kann ein KI-Assistent internes Wissen nutzen?",
          answer: "Ja, wenn passende Inhalte und klare Grenzen vorliegen. Die Umsetzung wird projektbezogen geprüft.",
        },
        {
          question: "Gibt es Zertifizierungsversprechen?",
          answer: "Nein. DatenpflegeNord liefert technische Hinweise und Maßnahmen, keine behördliche Zertifizierung.",
        },
      ]}
    />
  )
}
