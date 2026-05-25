import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function UeberUnsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-4">
              Über uns
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              DatenpflegeNord ist ein technisches Dienstleistungsbüro aus Hamburg. Wir prüfen
              digitale Pflichtstellen, Barrierefreiheits-Signale und Büroprozesse – mit klaren
              Prioritäten und ohne Rechtsberatungsversprechen.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/kontakt" className="flex items-center gap-1.5">
                Kontakt aufnehmen <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
