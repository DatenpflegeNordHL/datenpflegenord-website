import { complianceTopics } from "@/content/compliance-topics"
import { ComplianceTopicCard } from "@/components/compliance-topic-card"

export function ComplianceTopicsSection() {
  return (
    <section className="bg-background py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-3">
            Digitale Pflichtstellen verständlich sortiert
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Wir prüfen technische Signale, ordnen Risiken ein und liefern priorisierte nächste
            Schritte – ohne Rechtsberatung und ohne Zertifizierungsversprechen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {complianceTopics.map((topic) => (
            <ComplianceTopicCard key={topic.title} topic={topic} />
          ))}
        </div>
      </div>
    </section>
  )
}
