import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GeoPromptPreview } from "@/components/portal/geo-prompt-preview"
import { PortalFAQ } from "@/components/portal/portal-faq"
import { RecommendationCards } from "@/components/portal/recommendation-cards"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getPortalRecommendations, sampleCompanyProfile } from "@/lib/portal-profile"
import {
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  Database,
  ShieldCheck,
} from "lucide-react"

export const metadata: Metadata = {
  title: "DatenpflegeNord Portal | Checks, Reports und KI-Sichtbarkeit",
  description:
    "Portal-Prototyp für CompanyProfile, Empfehlungen, TrustSignal Scan, BFSG-Readiness, Datenpflege und KI-Sichtbarkeitsmonitoring Beta.",
}

const portalModules = [
  {
    icon: ShieldCheck,
    title: "TrustSignal",
    text: "Website-Vorprüfung für Technik, Datenschutz-Basis, Barrierefreiheits-Indikatoren und Vertrauenssignale.",
  },
  {
    icon: ClipboardCheck,
    title: "BFSG-Readiness",
    text: "Strukturierte Vorprüfung für digitale Kundenwege wie Shop, Buchung und Kontaktformulare.",
  },
  {
    icon: Database,
    title: "Datenpflege",
    text: "Google Business Profile, externe Profile, Standortdaten und Anfragewege konsistent im Blick behalten.",
  },
  {
    icon: BarChart3,
    title: "KI-Sichtbarkeitsmonitoring",
    text: "Beta für regelmäßige Messung ausgewählter KI-Suchfragen, ohne Ranking-Zusage.",
  },
]

const sampleRecommendations = getPortalRecommendations(sampleCompanyProfile).slice(0, 4)

export default function PortalPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border py-14 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Portal-MVP</Badge>
                <span className="text-xs text-muted-foreground">Demo-Persistenz ohne Login</span>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                  DatenpflegeNord Portal
                </p>
                <h1 className="text-3xl font-bold leading-tight text-foreground text-balance md:text-5xl">
                  Checks, Reports und KI-Sichtbarkeit an einem Ort.
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Das Portal erzeugt aus einem kurzen CompanyProfile konkrete Empfehlungen,
                  Aufgaben und Vorschauen für TrustSignal, Datenpflege und KI-Sichtbarkeit.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/portal/start" className="flex items-center gap-2">
                    Profil starten <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/technischer-web-check" className="flex items-center gap-2">
                    TrustSignal Scan <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Keine Rechtsberatung. Keine Zusage für KI-Sichtbarkeit. BFSG wird als
                Readiness-Vorprüfung mit Indikatoren behandelt.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                    Ergebnisvorschau
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-foreground">Aus Profil wird Empfehlung</h2>
                </div>
                <Badge variant="outline">Beispiel</Badge>
              </div>
              <RecommendationCards recommendations={sampleRecommendations} />
            </div>
          </div>
        </section>

        <section className="border-b border-border py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-3xl">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                Angebots-Hub
              </p>
              <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
                Was der Portal-Prototyp bündelt
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {portalModules.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-secondary/40 py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <GeoPromptPreview profile={sampleCompanyProfile} />
          </div>
        </section>

        <section className="border-b border-border py-12 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                FAQ
              </p>
              <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
                Schlank genug für Demo und Vertrieb, offen für die nächste Ausbaustufe.
              </h2>
            </div>
            <PortalFAQ />
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground text-balance">
              Mit einem CompanyProfile starten
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Das Onboarding dauert wenige Minuten und erzeugt eine erste Ergebnisansicht mit
              passenden Empfehlungen und TrustSignal-CTA.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/portal/start" className="flex items-center gap-2">
                  Onboarding starten <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/portal/dashboard">Beispiel-Dashboard ansehen</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
