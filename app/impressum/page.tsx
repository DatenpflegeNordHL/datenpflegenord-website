import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Impressum | DatenpflegeNord",
  description: "Impressum von DatenpflegeNord.",
}

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Rechtliches
          </p>
          <h1 className="text-3xl font-bold text-foreground mb-8">Impressum</h1>

          <div className="flex flex-col gap-8 text-sm text-foreground leading-relaxed">

            <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Anbieterkennzeichnung
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Diese Website ist der öffentliche Auftritt der Marke DatenpflegeNord. Juristische
                Gesellschaft ist die NordWerk Digital GmbH.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">
                Angaben gemäß § 5 DDG
              </h2>
              <p className="text-muted-foreground">
                <span className="block font-medium text-foreground">NordWerk Digital GmbH</span>
                Handelnd unter der Marke DatenpflegeNord
              </p>
              {/* FIXME: Final registered business address is missing and must be added once available. */}
              <p className="text-muted-foreground">
                Die vollständige Geschäftsanschrift wird ergänzt, sobald die finalen Stammdaten
                vorliegen.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">Kontakt</h2>
              {/* FIXME: Public contact email and phone number are missing and must be added once available. */}
              <p className="text-muted-foreground">
                Die öffentlichen Kontaktangaben werden ergänzt, sobald die finalen Kontaktdaten
                vorliegen.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">
                Register- und Steuerangaben
              </h2>
              {/* FIXME: Handelsregister, register court, tax number and VAT ID are missing. Do not invent these values. */}
              <p className="text-muted-foreground">
                Register- und Steuerangaben werden ergänzt, sobald sie verlässlich vorliegen.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">
                Verantwortlich für journalistisch-redaktionelle Inhalte gemäß Medienstaatsvertrag
              </h2>
              {/* FIXME: Responsible person and address for MStV information are missing if this section is required. */}
              <p className="text-muted-foreground">
                Angaben zu journalistisch-redaktionellen Inhalten werden ergänzt, falls ein
                entsprechendes Angebot bereitgestellt wird.
              </p>
            </div>

            <div className="border-t border-border pt-6 flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">Haftungshinweis</h2>
              <p className="text-muted-foreground">
                DatenpflegeNord bietet technische und organisatorische Prüfung,
                Umsetzungshilfe und digitale Prozessunterstützung. Keine Rechtsberatung,
                keine Steuerberatung und keine behördliche Zertifizierung.
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
