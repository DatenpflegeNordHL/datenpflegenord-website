import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "Ist das Portal schon ein Kundenlogin?",
    answer:
      "Nein. Der Portal-MVP ist ein produktnaher Prototyp mit Einstieg, Profil, Ergebnisansicht und lokaler Demo-Persistenz. Authentifizierung und echte Kundenakten gehören in eine spätere Ausbaustufe.",
  },
  {
    question: "Was ist ein CompanyProfile?",
    answer:
      "Das Profil bündelt Website, Branche, Region, Zielkunden, Systeme und digitale Signale. Daraus entstehen erste Empfehlungen ohne Datei-Upload und ohne Zugriff auf interne Systeme.",
  },
  {
    question: "Was bedeutet BFSG-Readiness?",
    answer:
      "BFSG-Readiness meint eine Vorprüfung sichtbarer Indikatoren. Das ist keine Rechtsberatung und keine behördliche Zertifizierung.",
  },
  {
    question: "Was misst KI-Sichtbarkeitsmonitoring?",
    answer:
      "Die Beta kann ausgewählte KI-Suchfragen regelmäßig prüfen und Antwortmuster dokumentieren. Sie macht keine Ranking- oder Sichtbarkeitszusage.",
  },
  {
    question: "Welche Rolle hat TrustSignal?",
    answer:
      "TrustSignal ist der kompakte Einstieg für eine Website-Vorprüfung: Technik, Datenschutz-Basis, Barrierefreiheits-Indikatoren und sichtbare Vertrauenssignale.",
  },
]

export function PortalFAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item) => (
        <AccordionItem key={item.question} value={item.question}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
