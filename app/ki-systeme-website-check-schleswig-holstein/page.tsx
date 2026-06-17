import type { Metadata } from "next"
import { RegionLandingPage } from "@/components/region-landing-page"

export const metadata: Metadata = {
  title: "KI-Systeme und Website-Checks in Schleswig-Holstein",
  description:
    "DatenpflegeNord unterstützt Unternehmen in Schleswig-Holstein mit KI-Systemen, Website-Checks und klaren digitalen Maßnahmen.",
}

export default function SchleswigHolsteinPage() {
  return (
    <RegionLandingPage
      eyebrow="Schleswig-Holstein"
      title="KI-Systeme und Website-Checks für Unternehmen in Schleswig-Holstein"
      intro="Für regionale Unternehmen geht es oft um klare digitale Grundlagen: auffindbare Websites, verständliche Kontaktwege und wiederkehrende Büroprozesse, die nicht jeden Tag manuell binden."
      suitableFor={[
        "Handwerksbetriebe mit wiederkehrenden Kundenanfragen",
        "Pflege, Tourismus, Handel und Dienstleistung in der Region",
        "Unternehmen, die Website-Signale und Büroautomation zusammen betrachten wollen",
      ]}
      process={[
        "Website und digitale Pflichtstellen technisch einordnen",
        "wiederkehrende Anfragen und Büroprozesse sammeln",
        "konkrete Maßnahmen für Website, Monitoring oder KI-Prozesscheck priorisieren",
      ]}
      faq={[
        {
          question: "Ist das eine Rechtsberatung?",
          answer: "Nein. Die Einschätzung ist eine technische Vorprüfung und ersetzt keine Rechtsberatung.",
        },
        {
          question: "Muss das Unternehmen in Schleswig-Holstein sitzen?",
          answer: "Der Fokus liegt auf Schleswig-Holstein und Norddeutschland, digitale Zusammenarbeit ist aber möglich.",
        },
      ]}
    />
  )
}
