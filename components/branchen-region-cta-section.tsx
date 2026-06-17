import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"

const branchen = [
  "Hotels & Ferienwohnungen",
  "Restaurants & Cafés",
  "Handwerker",
  "Kosmetik & Friseure",
  "Pflegedienste",
  "Fahrschulen",
  "Autohäuser",
  "Lokale Shops",
  "Fitnessstudios",
  "Hausverwaltungen",
]

const regionen = [
  {
    title: "Schleswig-Holstein",
    text: "Für Handwerk, Pflege, Tourismus, Handel und Dienstleistung in der Region.",
    href: "/ki-systeme-website-check-schleswig-holstein",
  },
  {
    title: "Lübeck",
    text: "Für Dienstleister, Praxen, Handwerk und Tourismusbetriebe in Lübeck und Umgebung.",
    href: "/ki-systeme-website-check-luebeck",
  },
  {
    title: "Kiel",
    text: "Für Dienstleister, Beratung, Bildung, maritime Betriebe und regionale Unternehmen.",
    href: "/ki-systeme-website-check-kiel",
  },
  {
    title: "Hamburg",
    text: "Für Unternehmen in Hamburg und Norddeutschland mit vielen digitalen Anfragen und Büroprozessen.",
    href: "/ki-systeme-website-check-hamburg",
  },
]

export function BranchenRegionCtaSection() {
  return (
    <>
      {/* Branchen */}
      <section className="bg-background py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-3">
              Für lokale Unternehmen in Schleswig-Holstein
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {branchen.map((b) => (
              <span
                key={b}
                className="inline-flex items-center text-sm text-foreground bg-secondary border border-border rounded-full px-4 py-1.5"
              >
                {b}
              </span>
            ))}
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/branchen" className="flex items-center gap-1.5">
              Alle Branchen ansehen <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Region */}
      <section id="regionen" className="bg-secondary py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-foreground text-balance leading-tight mb-3">
                Regionen im Norden
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                DatenpflegeNord unterstützt Unternehmen in Schleswig-Holstein, Lübeck, Kiel,
                Hamburg und Norddeutschland mit KI-Systemen, Website-Checks und klaren Maßnahmen.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {regionen.map((region) => (
                <Link
                  key={region.title}
                  href={region.href}
                  className="group rounded-2xl border border-border bg-card p-5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                    <h3 className="text-sm font-bold text-foreground">{region.title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{region.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent">
                    Region ansehen
                    <ArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-foreground text-balance leading-tight mb-4">
            Starten Sie mit einem einfachen Schnellcheck.
          </h2>
          <p className="text-base text-navy-foreground/70 leading-relaxed max-w-2xl mx-auto mb-8">
            Senden Sie Website, Ort und Thema. Wir prüfen, welcher Einstieg sinnvoll ist:
            Sichtbarkeit, Technik, KI oder monatlicher Audit-Check.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/kontakt" className="flex items-center gap-2">
              Schnellcheck starten <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <p className="text-xs text-navy-foreground/40 mt-4">
            Keine Rechtsberatung. Keine Steuerberatung. Keine behördliche Zertifizierung.
          </p>
        </div>
      </section>
    </>
  )
}
