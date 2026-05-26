import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CheckCircle2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { industries, getIndustryBySlug } from "@/content/industries"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }))
}

export default async function BrancheDetailPage({ params }: PageProps) {
  const { slug } = await params

  let industry
  try {
    industry = getIndustryBySlug(slug)
  } catch {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
            <Link
              href="/branchen"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" aria-hidden="true" />
              Alle Branchen
            </Link>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-4">
                {industry.title}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                {industry.description}
              </p>
            </div>

            <section className="flex flex-col gap-4">
              <h2 className="text-base font-semibold text-foreground">
                Typische Herausforderungen
              </h2>
              <div className="bg-card border border-border rounded-2xl p-6">
                <ul className="flex flex-col gap-2.5">
                  {industry.typicalChallenges.map((challenge) => (
                    <li key={challenge} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle2
                        className="w-4 h-4 text-accent shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="text-base font-semibold text-foreground">Passende Leistungen</h2>
              <div className="flex flex-col gap-3">
                {industry.relevantServices.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center justify-between gap-4 hover:border-primary/30 transition-colors"
                  >
                    <span className="text-sm font-medium text-foreground">{service.label}</span>
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>

            <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-xl p-4">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unsere Einschätzungen sind technische Hinweise und ersetzen keine Rechtsberatung
                und keine behördliche Zertifizierung.
              </p>
            </div>

            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit">
              <Link href={industry.ctaHref} className="flex items-center gap-2">
                Quickcheck für diese Branche starten{" "}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
