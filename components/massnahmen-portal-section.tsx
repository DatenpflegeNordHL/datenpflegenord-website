import {
  ScanSearch,
  ListChecks,
  TrendingUp,
  FileArchive,
  ClipboardCheck,
  Puzzle,
  AlertTriangle,
} from "lucide-react"

const features = [
  {
    icon: ScanSearch,
    title: "Automatisierte Website-Prüfung",
    text: "Prüfung auf BFSG-Relevanz, WCAG-nahe Auffälligkeiten, technische Fehler, Datenschutz-Hinweise, Performance- und SEO-Grundlagen.",
  },
  {
    icon: ListChecks,
    title: "Priorisierte Handlungsempfehlungen",
    text: "Findings werden nach Nutzerrelevanz, Geschäftsrelevanz und eingeschätztem Handlungsbedarf sortiert. Kritische Bereiche wie Checkout, Kontaktformular, Login, Buchung und Zahlungsprozesse stehen im Fokus.",
  },
  {
    icon: TrendingUp,
    title: "Audit-Historie und Fortschrittsverlauf",
    text: "Monatliche Scans zeigen neue, offene und behobene Auffälligkeiten. So wird sichtbar, ob die Website besser wird und welche Maßnahmen Wirkung zeigen.",
  },
  {
    icon: FileArchive,
    title: "Report-Archiv und Fix-Liste",
    text: "Reports, Screenshots, Evidence-Hinweise und technische Fix-Empfehlungen werden strukturiert gesammelt und können intern oder mit Dienstleistern geteilt werden.",
  },
  {
    icon: ClipboardCheck,
    title: "Geführte manuelle Mini-Checkliste",
    text: "Automatische Tools finden nicht alle Barrieren. Deshalb ergänzt NordAudit die technische Prüfung um kurze manuelle Prüffragen, etwa zu Tastaturbedienung, Formularverständlichkeit und Nutzerführung.",
  },
  {
    icon: Puzzle,
    title: "Erweiterbare Portal-Module",
    text: "Geplante Erweiterungen sind ein Generator für Barrierefreiheits-Informationen, ein Feedback-Mechanismus für gemeldete Barrieren und ein KI-gestützter Verständlichkeits-Check.",
  },
]

export function MassnahmenPortalSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
            NordAudit Portal
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Vom Fehler-Scanner zum Maßnahmenportal
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ein Audit allein hilft KMU nur begrenzt. NordAudit Portal soll Auffälligkeiten nicht nur finden, 
            sondern verständlich priorisieren, dokumentieren und in konkrete nächste Schritte übersetzen.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="relative bg-card border border-border rounded-xl p-6 shadow-sm overflow-hidden"
            >
              {/* Watermark icon */}
              <div
                className="absolute -right-3 -bottom-3 pointer-events-none select-none"
                aria-hidden="true"
              >
                <Icon
                  className="w-20 h-20 md:w-24 md:h-24 text-primary opacity-[0.04]"
                  strokeWidth={0.8}
                />
              </div>

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-secondary/60 border border-border rounded-xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-1">Wichtige Hinweise</h4>
            <ul className="text-xs text-muted-foreground leading-relaxed space-y-1">
              <li>Automatische Tools ersetzen keine vollständige manuelle Barrierefreiheitsprüfung.</li>
              <li>NordAudit bietet technische Prüfung, Audit-Hinweise und Handlungsempfehlungen.</li>
              <li>Keine Rechtsberatung. Keine behördliche Zertifizierung. Keine Garantie auf vollständige BFSG-Konformität.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
