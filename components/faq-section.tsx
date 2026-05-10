import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Ist das NordAudit Portal eine Rechtsberatung?",
    answer:
      "Nein. Das NordAudit Portal bietet eine automatisierte und strukturierte Vorprüfung. Die Ergebnisse zeigen technische Hinweise, potenzielle Risiken und manuell zu bewertende Auffälligkeiten. Eine anwaltliche Rechtsberatung wird dadurch nicht ersetzt.",
  },
  {
    question: "Was sehe ich nach dem BFSG Schnellcheck?",
    answer:
      "Sie sehen erste Findings zu Ihrer Domain. Weitere Ergebnisse können im Barrierefreiheits-Audit oder im monatlichen BFSG Monitoring sichtbar gemacht und dokumentiert werden.",
  },
  {
    question: "Für wen ist das NordAudit Portal geeignet?",
    answer:
      "Für deutsche KMU, Agenturen, IT-Dienstleister, lokale Unternehmen, Praxen, Handwerksbetriebe, Händler und Dienstleister mit geschäftlicher Website.",
  },
  {
    question: "Was macht die KI Prozessautomatisierung konkret?",
    answer:
      "Die KI Prozessautomatisierung für KMU entwickelt individuelle KI-Systeme und KI-Agenten für wiederkehrende Aufgaben, zum Beispiel Dokumentenverarbeitung, Buchhaltung, Kundenservice, Personalplanung oder interne Wissensdatenbanken.",
  },
  {
    question: "Entscheidet die KI automatisch?",
    answer:
      "Nein. Die KI Prozessautomatisierung wird mit Human-in-the-loop gedacht. KI unterstützt, bereitet vor und dokumentiert. Entscheidungen und Freigaben bleiben beim Menschen.",
  },
  {
    question: "Was ist das Kundenportal?",
    answer:
      "Das Kundenportal ist der Kundenbereich für Website-Status, Audit-Historie, Reports, Fix-Listen, KI-Prozesse und offene Freigaben.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-secondary/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Häufige Fragen
          </h2>
        </div>

        <Accordion type="single" collapsible className="flex flex-col gap-2">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="bg-card border border-border rounded-xl px-5 data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="text-sm font-medium text-foreground py-4 text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
