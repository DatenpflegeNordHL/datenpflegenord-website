import type { Metadata } from "next"
import { RegionLandingPage } from "@/components/region-landing-page"

export const metadata: Metadata = {
  title: "KI-Systeme und Website-Checks für Hamburg und Norddeutschland",
  description:
    "KI-Systeme, Website-Checks und digitale Maßnahmen für Unternehmen in Hamburg und Norddeutschland.",
}

export default function HamburgPage() {
  return (
    <RegionLandingPage
      eyebrow="Hamburg und Norddeutschland"
      title="KI-Systeme und Website-Checks für Unternehmen in Hamburg"
      intro="Hamburger Unternehmen haben oft viele digitale Kontaktpunkte, Angebotsanfragen und interne Abstimmungen. DatenpflegeNord ordnet Website-Signale und Automationspotenziale technisch und kompakt ein."
      suitableFor={[
        "Unternehmen mit vielen digitalen Anfragen und wiederkehrenden Antworten",
        "Dienstleister mit erklärungsbedürftigen Leistungen und Lead-Prozessen",
        "Teams, die Dokumente, E-Mails und interne Wissensarbeit entlasten möchten",
      ]}
      process={[
        "digitale Kontaktpunkte und Website-Signale prüfen",
        "manuelle Anfrage-, Dokumenten- und Abstimmungsprozesse aufnehmen",
        "KI-Prozesscheck, Website-Check oder Monitoring als nächsten Schritt empfehlen",
      ]}
      faq={[
        {
          question: "Gibt es einen physischen Standort in Hamburg?",
          answer: "Nein, diese Seite beschreibt die regionale Ausrichtung für Hamburg und Norddeutschland.",
        },
        {
          question: "Werden CRM oder Mail-Systeme direkt angebunden?",
          answer: "Nicht automatisch. Integrationen werden erst nach technischer Prüfung und klarer Beauftragung geplant.",
        },
      ]}
    />
  )
}
