import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Datenschutz | DatenpflegeNord",
  description: "Datenschutzerklärung von DatenpflegeNord.",
}

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Rechtliches
          </p>
          <h1 className="text-3xl font-bold text-foreground mb-8">Datenschutzerklärung</h1>

          <div className="flex flex-col gap-8 text-sm text-foreground leading-relaxed">

            <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Hinweis zur Aktualisierung
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Diese Datenschutzerklärung wird nach Abschluss der Stammdaten- und Anbieterprüfung
                aktualisiert. Es werden keine noch nicht verlässlich vorliegenden Angaben
                veröffentlicht.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">
                1. Verantwortlicher
              </h2>
              {/* FIXME: Final address, public email and phone number are missing and must be added once available. */}
              <p className="text-muted-foreground">
                Verantwortlich ist die NordWerk Digital GmbH, handelnd unter der Marke
                DatenpflegeNord. Vollständige Kontakt- und Anschriftsdaten werden ergänzt, sobald
                die finalen Stammdaten vorliegen.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">
                2. Erhobene Daten beim Besuch der Website
              </h2>
              {/* FIXME: Hosting provider and exact server-log details are missing and must be verified. */}
              <p className="text-muted-foreground">
                Beim Besuch der Website können technisch erforderliche Zugriffsdaten verarbeitet
                werden, damit die Website ausgeliefert und stabil betrieben werden kann. Details
                zum Hosting-Anbieter und zu Server-Logdaten werden nach technischer Prüfung ergänzt.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">
                3. Kontaktformular
              </h2>
              {/* FIXME: Contact form processing details must be finalized once delivery provider is configured. */}
              <p className="text-muted-foreground">
                Wenn Sie ein Kontaktformular nutzen, werden die von Ihnen eingegebenen Daten zur
                Bearbeitung der Anfrage verarbeitet. Details zur Zustellung und Speicherdauer
                werden nach Abschluss der Anbieteranbindung ergänzt.
              </p>
              <p className="text-muted-foreground">
                Hinweis: Das Kontaktformular ist aktuell noch nicht aktiv angebunden.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">
                4. Cookies und Tracking
              </h2>
              {/* FIXME: Cookie and tracking inventory must be verified before publication of final details. */}
              <p className="text-muted-foreground">
                Angaben zu technisch notwendigen Cookies, optionalen Diensten und einer möglichen
                Consent-Lösung werden nach technischer Prüfung ergänzt.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">
                5. Externe Dienste
              </h2>
              {/* FIXME: External services inventory must be verified and listed once final. */}
              <p className="text-muted-foreground">
                Externe Dienste werden aufgeführt, sobald die technische Anbieterprüfung
                abgeschlossen ist.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">
                6. Ihre Rechte
              </h2>
              {/* FIXME: Final privacy notice should be reviewed before publication. */}
              <p className="text-muted-foreground">
                Angaben zu Betroffenenrechten und Kontaktwegen für Datenschutzanfragen werden in
                der finalen Datenschutzerklärung ergänzt.
              </p>
              <p className="text-muted-foreground">
                Zuständige Aufsichtsbehörde für Schleswig-Holstein: Unabhängiges
                Landeszentrum für Datenschutz Schleswig-Holstein (ULD).
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-xs text-muted-foreground">
                DatenpflegeNord ist die Marke der NordWerk Digital GmbH. Keine Rechtsberatung,
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
