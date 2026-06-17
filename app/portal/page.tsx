import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, History, ListChecks, CheckSquare, FileText, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Kundenbereich in Vorbereitung – DatenpflegeNord Portal",
  description:
    "Der DatenpflegeNord Kundenbereich wird vorbereitet. Portalzugang anfragen und nächste Schritte abstimmen.",
}

const features = [
  {
    icon: History,
    label: "Audit-Historie",
    text: "Alle Prüfberichte auf einen Blick – zugänglich, sobald der Portalzugang eingerichtet ist.",
  },
  {
    icon: ListChecks,
    label: "Offene Aufgaben",
    text: "Priorisierte Aufgabenliste nach dem letzten Check.",
  },
  {
    icon: CheckSquare,
    label: "Erledigte Maßnahmen",
    text: "Nachvollziehbarer Fortschritt über Zeit.",
  },
  {
    icon: FileText,
    label: "Monatsbericht",
    text: "Kompakter Statusbericht mit allen relevanten Kennzahlen.",
  },
]

export default function PortalPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8">

              {/* Status notice – honest, up front */}
              <div className="flex items-start gap-3 bg-secondary/70 border border-border rounded-xl px-5 py-4">
                <Clock className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-foreground">Kundenbereich in Vorbereitung</p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                    Der Portalzugang wird aktuell vorbereitet. Sie können den Zugang vorab anfragen.
                    Sobald der Kundenbereich bereitsteht, stimmen wir den nächsten Schritt ab.
                  </p>
                </div>
              </div>

              {/* Heading */}
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                  Kundenbereich
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance leading-tight">
                  DatenpflegeNord Portal
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Im Portal sehen Kunden ihre Prüfergebnisse, offene Aufgaben und Monatsberichte –
                  übersichtlich vorbereitet für den laufenden Austausch. Der Zugang wird nach
                  Auftragsstart abgestimmt.
                </p>
              </div>

              {/* Feature overview */}
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map(({ icon: Icon, label, text }) => (
                  <div
                    key={label}
                    className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/kontakt?anliegen=portal-zugang" className="flex items-center gap-2">
                    Portal Login anfragen
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/kontakt">Allgemeine Kontaktaufnahme</Link>
                </Button>
              </div>

              {/* Legal note */}
              <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-4">
                Keine Rechtsberatung. Keine Steuerberatung. Keine behördliche Zertifizierung.
                Technische und strukturelle Vorprüfung.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
