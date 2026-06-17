import type { Metadata } from "next"
import { RegionLandingPage } from "@/components/region-landing-page"

export const metadata: Metadata = {
  title: "KI-Systeme und Website-Checks in Lübeck",
  description:
    "Website-Checks und KI-Systeme für Dienstleister, Praxen, Handwerk und Tourismusbetriebe in Lübeck und Umgebung.",
}

export default function LuebeckPage() {
  return (
    <RegionLandingPage
      eyebrow="Lübeck"
      title="KI-Systeme und Website-Checks für Unternehmen in Lübeck"
      intro="In Lübeck treffen lokale Auffindbarkeit, touristische Nachfrage und serviceorientierte Kundenkommunikation oft direkt aufeinander. DatenpflegeNord prüft Website-Signale und wiederkehrende Abläufe als gemeinsamen Einstieg."
      suitableFor={[
        "Dienstleister und Praxen mit hohem Anfrageaufkommen",
        "Handwerksbetriebe, die Kontaktwege und Angebotsprozesse vereinfachen wollen",
        "Tourismusnahe Betriebe mit saisonalen Fragen und Buchungsabläufen",
      ]}
      process={[
        "Website, Kontaktwege und lokale Signale technisch prüfen",
        "typische Kundenfragen und manuelle Büroarbeit erfassen",
        "Maßnahmen für Website-Check, Monitoring oder einfache Automation ableiten",
      ]}
      faq={[
        {
          question: "Geht es um lokale SEO?",
          answer: "Lokale Auffindbarkeit kann Teil der technischen Einordnung sein, ohne Rankingversprechen.",
        },
        {
          question: "Wird ein Büro in Lübeck behauptet?",
          answer: "Nein. Die Seite beschreibt regionale Ausrichtung und digitale Zusammenarbeit.",
        },
      ]}
    />
  )
}
