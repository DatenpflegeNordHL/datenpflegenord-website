import { Button } from "@/components/ui/button"

interface PackageCardProps {
  title: string
  subtitle?: string
  text: string
  cta: string
  featured?: boolean
  accentColor: "primary" | "accent"
  onClick?: () => void
}

const nordauditPackages = [
  {
    title: "BFSG Schnellcheck",
    subtitle: "Einstieg",
    text: "Für den ersten Überblick über technische und strukturelle Auffälligkeiten Ihrer Website.",
    cta: "BFSG Schnellcheck starten",
    onClick: "scroll",
  },
  {
    title: "Barrierefreiheits-Audit für Websites",
    subtitle: "Vertiefte Prüfung",
    text: "Einmaliger vollständiger Website-Audit mit Report, Screenshots, Evidence und Fix-Liste.",
    cta: "Barrierefreiheits-Audit anfragen",
    featured: true,
    onClick: "form",
  },
  {
    title: "BFSG Monitoring",
    subtitle: "Monatliche Verlaufskontrolle",
    text: "Monatliches Monitoring mit Audit-Historie, neuen und behobenen Findings.",
    cta: "Monitoring anfragen",
    onClick: "form",
  },
  {
    title: "Barrierefreiheit Fix-Service",
    subtitle: "Technische Begleitung",
    text: "Technische Begleitung bei Umsetzung, Nachprüfung und Abstimmung mit IT-Dienstleistern.",
    cta: "Fix-Service besprechen",
    onClick: "form",
  },
]

const kiPackages = [
  {
    title: "KI Prozesscheck",
    text: "KI-Potenzialanalyse für einen konkreten Unternehmensprozess.",
    cta: "Check anfragen",
    onClick: "form",
  },
  {
    title: "KI Workflow Pilot",
    text: "Erster Prototyp für einen klar begrenzten Prozess.",
    cta: "Pilot planen",
    featured: true,
    onClick: "form",
  },
  {
    title: "KI Agenten für Unternehmen",
    text: "Produktiver KI-Agent für wiederkehrende Aufgaben mit Freigabeprozessen.",
    cta: "Agent besprechen",
    onClick: "form",
  },
  {
    title: "KI Betrieb & Automatisierungs-Support",
    text: "Wartung, Kontrolle und Optimierung laufender KI-Abläufe.",
    cta: "Betrieb anfragen",
    onClick: "form",
  },
]

function PackageCard({
  title,
  subtitle,
  text,
  cta,
  featured,
  accentColor,
  onClick,
}: PackageCardProps) {
  const isFeatured = !!featured

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <div
      className={`rounded-2xl p-6 border flex flex-col gap-4 ${
        isFeatured
          ? accentColor === "primary"
            ? "bg-primary text-primary-foreground border-primary shadow-md"
            : "bg-accent text-accent-foreground border-accent shadow-md"
          : "bg-card border-border shadow-sm"
      }`}
    >
      <div>
        {subtitle && (
          <span className={`inline-block text-[10px] font-medium uppercase tracking-wider mb-1.5 ${
            isFeatured ? "opacity-75" : "text-muted-foreground"
          }`}>
            {subtitle}
          </span>
        )}
        <h4 className={`font-bold text-sm mb-1 ${isFeatured ? "text-current" : "text-foreground"}`}>
          {title}
        </h4>
        <p className={`text-xs leading-relaxed ${isFeatured ? "opacity-85" : "text-muted-foreground"}`}>
          {text}
        </p>
      </div>
      <Button
        onClick={handleClick}
        variant={isFeatured ? "secondary" : "outline"}
        size="sm"
        className={`mt-auto text-xs ${
          isFeatured
            ? accentColor === "primary"
              ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              : "bg-accent-foreground text-accent hover:bg-accent-foreground/90"
            : ""
        }`}
      >
        {cta}
      </Button>
    </div>
  )
}

interface PackagesSectionProps {
  onNordAuditRequestClick?: () => void
  onKIProcessRequestClick?: () => void
}

export function PackagesSection({ onNordAuditRequestClick, onKIProcessRequestClick }: PackagesSectionProps) {
  return (
    <section id="pakete" className="py-16 md:py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Pakete für Website-Prüfung und KI-Automatisierung
          </h2>
        </div>

        {/* NordAudit Pakete */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              NordAudit Portal
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nordauditPackages.map((pkg) => (
              <PackageCard
                key={pkg.title}
                title={pkg.title}
                subtitle={pkg.subtitle}
                text={pkg.text}
                cta={pkg.cta}
                featured={pkg.featured}
                accentColor="primary"
                onClick={
                  pkg.onClick === "form" 
                    ? onNordAuditRequestClick 
                    : pkg.onClick === "scroll" 
                      ? () => document.getElementById("domain-check")?.scrollIntoView({ behavior: "smooth" })
                      : undefined
                }
              />
            ))}
          </div>
        </div>

        {/* KI Prozessautomatisierung Pakete */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">
              KI Prozessautomatisierung
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kiPackages.map((pkg) => (
              <PackageCard
                key={pkg.title}
                title={pkg.title}
                text={pkg.text}
                cta={pkg.cta}
                featured={pkg.featured}
                accentColor="accent"
                onClick={pkg.onClick === "form" ? onKIProcessRequestClick : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
