import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { industries } from "@/content/industries"

export const metadata: Metadata = {
  title: "Branchen",
  description:
    "Technische Prüfungen für Handwerk, Onlinehandel, Pflege, Tourismus und Dienstleister in Schleswig-Holstein.",
  alternates: { canonical: "https://datenpflege-nord.de/branchen" },
}

export default function BranchenPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-3">
                Branchen, für die DatenpflegeNord prüft
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Wir helfen kleinen Unternehmen in Schleswig-Holstein, digitale Pflichtstellen,
                Website-Technik und Büroprozesse verständlich zu sortieren.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {industries.map((industry) => (
                <div
                  key={industry.slug}
                  className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4"
                >
                  <div>
                    <h2 className="font-bold text-foreground mb-1.5 text-balance">
                      {industry.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {industry.description}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-1.5">
                    {industry.typicalChallenges.slice(0, 3).map((challenge) => (
                      <li key={challenge} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        {challenge}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/branchen/${industry.slug}`}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline w-fit"
                  >
                    Branche ansehen <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-xl p-4 mb-8">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unsere Einschätzungen sind technische Hinweise und ersetzen keine Rechtsberatung.
              </p>
            </div>

            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/kontakt?anliegen=quickcheck" className="flex items-center gap-2">
                Quickcheck starten <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
