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

            {/* Angaben gemäß § 5 DDG */}
            <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                TODO — Pflichtangaben noch nicht eingetragen
              </p>
              <p className="text-amber-800 text-sm leading-relaxed">
                Die folgenden Felder sind Platzhalter und müssen vor dem Livegang mit den echten
                Unternehmensdaten ausgefüllt werden. Kein juristischer Text — nur strukturierte
                Pflichtangaben gemäß § 5 DDG.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">
                Angaben gemäß § 5 DDG
              </h2>
              <p className="text-muted-foreground">
                <span className="block font-medium text-foreground">TODO: Unternehmensname</span>
                TODO: Rechtsform (z. B. Einzelunternehmen, GbR, UG, GmbH)
              </p>
              <p className="text-muted-foreground">
                <span className="block font-medium text-foreground">Adresse</span>
                TODO: Straße und Hausnummer<br />
                TODO: PLZ Ort<br />
                Deutschland
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">Kontakt</h2>
              <p className="text-muted-foreground">
                <span className="block">Telefon: TODO</span>
                <span className="block">E-Mail: TODO@datenpflege-nord.de</span>
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">
                Umsatzsteuer-Identifikationsnummer
              </h2>
              <p className="text-muted-foreground">
                TODO: Umsatzsteuer-ID gemäß § 27a UStG (sofern vorhanden)
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base text-foreground">
                Verantwortlich für journalistisch-redaktionelle Inhalte gemäß Medienstaatsvertrag
              </h2>
              <p className="text-xs text-muted-foreground italic mb-1">
                Nur ausfüllen, falls journalistisch-redaktionelle Inhalte angeboten werden.
              </p>
              <p className="text-muted-foreground">
                TODO: Vor- und Nachname<br />
                TODO: Adresse (wie oben oder abweichend)
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
