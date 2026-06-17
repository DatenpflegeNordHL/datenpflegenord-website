import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NorthernHeroFade } from "@/components/northern-hero-fade"
import { SignalcheckPreview } from "@/components/signalcheck-preview"

const trustBadges = [
  "Schleswig-Holstein Fokus",
  "Klare Maßnahmenliste",
  "KI + Website aus einer Hand",
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-20 lg:py-24">
      <NorthernHeroFade />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-14">
          <div className="flex max-w-3xl flex-col gap-5">
            <p className="motion-reveal animate-fade-up text-xs font-semibold uppercase tracking-widest text-accent">
              KI-Systeme · Website-Checks · Schleswig-Holstein
            </p>

            <h1 className="motion-reveal animate-fade-up animation-delay-100 text-3xl font-bold leading-tight text-balance text-foreground md:text-5xl">
              KI-Systeme und Website-Checks für Ihr Unternehmen in Schleswig-Holstein
            </h1>

            <p className="motion-reveal animate-fade-up animation-delay-200 text-base leading-relaxed text-muted-foreground md:text-lg">
              Wir prüfen Websites, digitale Pflichtstellen und wiederkehrende Büroprozesse.
              Daraus entstehen klare nächste Schritte, einfache Automationen und bessere digitale
              Abläufe.
            </p>

            <div className="motion-reveal animate-fade-up animation-delay-300 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/kontakt" className="flex items-center gap-2">
                  Website-Schnellcheck starten
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/ki-loesungen">KI-Potenzial prüfen</Link>
              </Button>
            </div>

            <p className="motion-reveal animate-fade-up animation-delay-400 text-[11px] text-muted-foreground">
              Technische Vorprüfung. Keine Rechtsberatung.
            </p>

            <div className="motion-reveal animate-fade-up animation-delay-500 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground"
                >
                  <CheckCircle2 className="h-3 w-3 shrink-0 text-accent" aria-hidden="true" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="motion-scale animate-scale-in animation-delay-300">
            <SignalcheckPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
