import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Globe, Cpu } from "lucide-react"

const webpflichtChips = [
  "BFSG-Relevanz",
  "Barrierefreiheit",
  "Datenschutz-Hinweise",
  "Impressum-Basics",
  "Cookie-/Consent-Struktur",
  "Technik & Sicherheit",
  "Ladezeit",
  "Mobile Darstellung",
  "SEO & Local SEO",
  "Audit-Historie",
]

const betriebskiChips = [
  "Buchhaltung",
  "Rechnungsverarbeitung",
  "Personalplanung",
  "Dokumenten-KI",
  "Kundenservice",
  "Interne Wissenssuche",
  "Angebotsgeneratoren",
  "Ressourcenplanung",
  "Lead-Automatisierung",
]

export function ProductsSection() {
  return (
    <section id="webpflicht" className="py-16 md:py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Zwei Wege zu mehr Klarheit im Unternehmen
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ob Website-Prüfung oder KI-Automatisierung: DatenpflegeNord verbindet digitale Analyse
            mit klaren Handlungsempfehlungen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* WebPflicht Monitor */}
          <div className="relative bg-card border border-border rounded-2xl p-8 shadow-sm flex flex-col gap-5 overflow-hidden">
            {/* Watermark */}
            <div className="absolute -right-6 -top-6 pointer-events-none select-none" aria-hidden="true">
              <Globe className="w-40 h-40 md:w-48 md:h-48 text-primary opacity-[0.05]" strokeWidth={0.8} />
            </div>

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-3">
                WebPflicht Monitor
              </span>
              <h3 className="text-xl font-bold text-foreground mb-1">
                WebPflicht Monitor
              </h3>
              <p className="text-sm text-accent font-medium">
                Website-Check für BFSG, Datenschutz-Hinweise, Technik und SEO.
              </p>
            </div>

            <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">
              Prüfen Sie Ihre Unternehmenswebsite regelmäßig auf BFSG-Relevanz, Barrierefreiheit,
              Datenschutz-Hinweise, Impressum-Basics, Cookie-/Consent-Struktur, Ladezeit, mobile
              Darstellung und SEO. Ergebnisse werden priorisiert, dokumentiert und im Klarsicht
              Portal nachvollziehbar gemacht.
            </p>

            <div className="relative z-10 flex flex-wrap gap-2">
              {webpflichtChips.map((chip) => (
                <Badge key={chip} variant="secondary" className="text-xs font-normal">
                  {chip}
                </Badge>
              ))}
            </div>

            <div className="relative z-10 flex gap-3 mt-auto pt-2">
              <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="#pakete">
                  WebPflicht ansehen <ArrowRight className="ml-1 w-3.5 h-3.5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="text-accent hover:text-accent/80">
                <Link href="#domain-check">Domain prüfen</Link>
              </Button>
            </div>
          </div>

          {/* BetriebsKI */}
          <div id="betriebski" className="relative bg-card border border-border rounded-2xl p-8 shadow-sm flex flex-col gap-5 overflow-hidden">
            {/* Watermark */}
            <div className="absolute -right-6 -top-6 pointer-events-none select-none" aria-hidden="true">
              <Cpu className="w-40 h-40 md:w-48 md:h-48 text-accent opacity-[0.07]" strokeWidth={0.8} />
            </div>

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase mb-3">
                BetriebsKI
              </span>
              <h3 className="text-xl font-bold text-foreground mb-1">
                BetriebsKI
              </h3>
              <p className="text-sm text-accent font-medium">
                Maßgeschneiderte KI-Systeme und KI-Agenten für konkrete Unternehmensprozesse.
              </p>
            </div>

            <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">
              BetriebsKI unterstützt Unternehmen bei wiederkehrenden Aufgaben wie Buchhaltung,
              Rechnungsverarbeitung, Personalplanung, Dokumentenverarbeitung, interner Wissenssuche,
              Kundenservice und Vertriebsprozessen.
            </p>

            <div className="relative z-10 flex flex-wrap gap-2">
              {betriebskiChips.map((chip) => (
                <Badge key={chip} variant="secondary" className="text-xs font-normal">
                  {chip}
                </Badge>
              ))}
            </div>

            <div className="relative z-10 flex gap-3 mt-auto pt-2">
              <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="#betriebski-prozess">
                  KI-Potenzialcheck anfragen <ArrowRight className="ml-1 w-3.5 h-3.5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="text-accent hover:text-accent/80">
                <Link href="#betriebski-prozess">Beispiele ansehen</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
