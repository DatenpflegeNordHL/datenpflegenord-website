import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type RegionLandingPageProps = {
  eyebrow: string
  title: string
  intro: string
  suitableFor: string[]
  process: string[]
  faq: Array<{ question: string; answer: string }>
}

export function RegionLandingPage({
  eyebrow,
  title,
  intro,
  suitableFor,
  process,
  faq,
}: RegionLandingPageProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-14 md:py-20">
          <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
                {eyebrow}
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-foreground text-balance md:text-5xl">
                {title}
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                "KI-Systeme für Büroprozesse",
                "Website-Schnellcheck und Website-Check",
                "Monitoring und Maßnahmenpriorisierung",
              ].map((service) => (
                <div key={service} className="rounded-2xl border border-border bg-card p-5">
                  <CheckCircle2 className="mb-3 h-5 w-5 text-accent" aria-hidden="true" />
                  <h2 className="text-sm font-bold text-foreground">{service}</h2>
                </div>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <section className="rounded-2xl border border-border bg-secondary/50 p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">Für wen geeignet?</h2>
                <ul className="grid gap-2 text-sm text-muted-foreground">
                  {suitableFor.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">Ablauf</h2>
                <ol className="grid gap-3 text-sm text-muted-foreground">
                  {process.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-5 text-xl font-bold text-foreground">FAQ</h2>
              <div className="grid gap-5 md:grid-cols-2">
                {faq.map((item) => (
                  <div key={item.question}>
                    <h3 className="mb-1 text-sm font-semibold text-foreground">{item.question}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="rounded-2xl bg-navy p-6 text-navy-foreground md:p-8">
              <h2 className="mb-3 text-2xl font-bold">Mit einem kompakten Einstieg starten.</h2>
              <p className="mb-5 max-w-2xl text-sm leading-relaxed text-navy-foreground/70">
                Senden Sie Website, Region und Anliegen. DatenpflegeNord ordnet den passenden
                nächsten Schritt technisch ein.
              </p>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/kontakt" className="flex items-center gap-2">
                  Kontakt aufnehmen <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
