import {
  FileSearch,
  ShieldCheck,
  UserCheck,
  ClipboardCheck,
  ArrowRight,
  AlertTriangle,
  Code,
  Link,
  Wrench,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// ── Example Finding Data ────────────────────────────────────────────────────

const exampleFinding = {
  title: "Fehlender Alternativtext bei einem Bild",
  category: "Barrierefreiheit",
  severity: "Moderat",
  status: "Manuelles Review erforderlich",
  evidence: {
    url: "https://beispiel.de/",
    selector: "img.hero-image",
    tool: "axe Homepage Audit",
    snippet: '<img src="/hero.jpg" class="hero-image">',
  },
  recommendation:
    "Alternativtext fachlich prüfen und ergänzen, wenn das Bild eine inhaltliche Funktion hat.",
  role: "Content / Design",
  disclaimer:
    "Technischer Hinweis, keine Rechtsberatung. Manuelle Prüfung empfohlen.",
}

const benefitCards = [
  {
    icon: FileSearch,
    title: "Evidence statt Bauchgefühl",
    text: "Jedes Finding wird mit technischen Nachweisen wie URL, Selector, Snippet oder Tool-Quelle nachvollziehbar gemacht.",
  },
  {
    icon: UserCheck,
    title: "Rollen statt unklarer Zuständigkeit",
    text: "Findings werden typischen Verantwortlichkeiten wie Entwicklung, Content, Design, UX oder Audit zugeordnet.",
  },
  {
    icon: ClipboardCheck,
    title: "Manuelles Review statt falscher Sicherheit",
    text: "Automatisierte Ergebnisse werden als Vorprüfung behandelt. Kritische Entscheidungen bleiben in der manuellen Bewertung.",
  },
]

// ── Main Component ────────────────────────────────────────────────────────

export function FindingEvidenceReviewSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
            NordAudit Methodik
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Jedes Finding braucht Kontext, Evidence und manuelle Bewertung
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Automatisierte Prüfungen liefern wichtige technische Hinweise. Für
            belastbare Entscheidungen ergänzen wir Findings um Evidence,
            verantwortliche Rollen und manuelles Review.
          </p>
        </div>

        {/* Main Example Finding Card */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-0">
            {/* Card Header Banner */}
            <div className="flex items-center gap-2 px-5 py-3 bg-primary/5 border-b border-border">
              <ShieldCheck
                className="w-4 h-4 text-primary shrink-0"
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-primary">
                Beispiel-Finding aus einem NordAudit
              </span>
            </div>

            <div className="p-5 md:p-7">
              {/* Finding Title & Badges */}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {exampleFinding.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-accent/10 text-accent border-accent/20"
                  >
                    {exampleFinding.category}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-amber-50 text-amber-700 border-amber-200"
                  >
                    {exampleFinding.severity}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {exampleFinding.status}
                  </Badge>
                </div>
              </div>

              {/* Evidence Block */}
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Technische Evidence
                </h4>
                <div className="bg-secondary/60 rounded-xl border border-border p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Link
                      className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-xs font-medium text-muted-foreground block mb-0.5">
                        URL
                      </span>
                      <span className="text-sm text-foreground font-mono">
                        {exampleFinding.evidence.url}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Code
                      className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-xs font-medium text-muted-foreground block mb-0.5">
                        Selector
                      </span>
                      <span className="text-sm text-foreground font-mono">
                        {exampleFinding.evidence.selector}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wrench
                      className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-xs font-medium text-muted-foreground block mb-0.5">
                        Tool
                      </span>
                      <span className="text-sm text-foreground">
                        {exampleFinding.evidence.tool}
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <span className="text-xs font-medium text-muted-foreground block mb-1.5">
                      Snippet
                    </span>
                    <code className="block text-xs text-foreground bg-muted/50 rounded-md p-2.5 font-mono overflow-x-auto">
                      {exampleFinding.evidence.snippet}
                    </code>
                  </div>
                </div>
              </div>

              {/* Recommendation & Role */}
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Empfehlung
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">
                    {exampleFinding.recommendation}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Verantwortliche Rolle
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <UserCheck
                        className="w-4 h-4 text-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {exampleFinding.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-3 rounded-xl bg-muted/50 border border-border p-4">
                <AlertTriangle
                  className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  {exampleFinding.disclaimer}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefit Cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {benefitCards.map(({ icon: Icon, title, text }) => (
            <Card
              key={title}
              className="relative overflow-hidden"
            >
              <CardContent className="p-6">
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
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button size="lg" className="mb-4">
            Audit mit Evidence anfragen
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Keine Overlay-Lösung. Keine Rechtsberatung. Technische Prüfung mit
            nachvollziehbaren Handlungsempfehlungen.
          </p>
        </div>
      </div>
    </section>
  )
}
