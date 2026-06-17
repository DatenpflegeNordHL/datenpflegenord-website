import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Datenschutz | DatenpflegeNord",
  description: "Datenschutzhinweise von DatenpflegeNord.",
}

export default function DatenschutzPage() {
  const hasContactDetails = Boolean(siteConfig.contactEmail || siteConfig.addressLines.length)
  const showDevWarning = process.env.NODE_ENV !== "production" && !hasContactDetails

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Rechtliches
          </p>
          <h1 className="mb-8 text-3xl font-bold text-foreground">Datenschutzerklärung</h1>

          <div className="flex flex-col gap-8 text-sm leading-relaxed text-foreground">
            {showDevWarning && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                Kontakt- und Datenschutzhinweise sind noch nicht vollständig in siteConfig
                hinterlegt.
              </div>
            )}

            {!hasContactDetails ? (
              <div className="rounded-xl border border-border bg-muted/50 p-5">
                <p className="text-muted-foreground">
                  Diese rechtlichen Angaben werden aktuell vervollständigt.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <h2 className="text-base font-semibold text-foreground">1. Verantwortlicher</h2>
                  <p className="text-muted-foreground">
                    Verantwortlich ist die {siteConfig.company}, handelnd unter der Marke{" "}
                    {siteConfig.name}.
                  </p>
                  {siteConfig.contactEmail && (
                    <p className="text-muted-foreground">E-Mail: {siteConfig.contactEmail}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-base font-semibold text-foreground">
                    2. Technisch erforderliche Daten
                  </h2>
                  <p className="text-muted-foreground">
                    Beim Besuch der Website können technisch erforderliche Zugriffsdaten verarbeitet
                    werden, damit die Website ausgeliefert und stabil betrieben werden kann.
                    Details zu Hosting, Speicherdauer und Dienstleistern werden nach finaler
                    Anbieterprüfung ergänzt.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-base font-semibold text-foreground">3. Kontaktanfragen</h2>
                  <p className="text-muted-foreground">
                    Die direkte Formularanbindung wird noch eingerichtet. Angaben aus dem
                    Kontaktformular werden auf dieser Website derzeit nur zur Anfragevorbereitung
                    zusammengefasst.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-base font-semibold text-foreground">
                    4. Cookies und externe Dienste
                  </h2>
                  <p className="text-muted-foreground">
                    Angaben zu technisch notwendigen Cookies, Analysewerkzeugen und externen
                    Diensten werden nach technischer Prüfung final ergänzt.
                  </p>
                </div>
              </>
            )}

            <div className="border-t border-border pt-6">
              <p className="text-xs text-muted-foreground">
                {siteConfig.name} ist die Marke der {siteConfig.company}. Keine Rechtsberatung,
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
