import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Impressum | DatenpflegeNord",
  description: "Impressum von DatenpflegeNord.",
}

export default function ImpressumPage() {
  const hasLegalDetails = siteConfig.addressLines.length > 0 || Boolean(siteConfig.contactEmail)
  const showDevWarning = process.env.NODE_ENV !== "production" && !hasLegalDetails

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Rechtliches
          </p>
          <h1 className="mb-8 text-3xl font-bold text-foreground">Impressum</h1>

          <div className="flex flex-col gap-8 text-sm leading-relaxed text-foreground">
            {showDevWarning && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                Rechtliche Stammdaten fehlen in siteConfig und müssen vor finaler Veröffentlichung
                ergänzt werden.
              </div>
            )}

            {!hasLegalDetails ? (
              <div className="rounded-xl border border-border bg-muted/50 p-5">
                <p className="text-muted-foreground">
                  Diese rechtlichen Angaben werden aktuell vervollständigt.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <h2 className="text-base font-semibold text-foreground">Angaben gemäß § 5 DDG</h2>
                  <p className="text-muted-foreground">
                    <span className="block font-medium text-foreground">{siteConfig.company}</span>
                    Handelnd unter der Marke {siteConfig.name}
                  </p>
                  {siteConfig.addressLines.length > 0 && (
                    <p className="text-muted-foreground">
                      {siteConfig.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  )}
                </div>

                {(siteConfig.contactEmail || siteConfig.contactPhone) && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-base font-semibold text-foreground">Kontakt</h2>
                    {siteConfig.contactEmail && (
                      <p className="text-muted-foreground">E-Mail: {siteConfig.contactEmail}</p>
                    )}
                    {siteConfig.contactPhone && (
                      <p className="text-muted-foreground">Telefon: {siteConfig.contactPhone}</p>
                    )}
                  </div>
                )}

                {(siteConfig.registry || siteConfig.taxId) && (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-base font-semibold text-foreground">
                      Register- und Steuerangaben
                    </h2>
                    {siteConfig.registry && (
                      <p className="text-muted-foreground">{siteConfig.registry}</p>
                    )}
                    {siteConfig.taxId && <p className="text-muted-foreground">{siteConfig.taxId}</p>}
                  </div>
                )}
              </>
            )}

            <div className="border-t border-border pt-6">
              <p className="text-xs text-muted-foreground">
                {siteConfig.name} bietet technische und organisatorische Prüfung,
                Umsetzungshilfe und digitale Prozessunterstützung. Keine Rechtsberatung, keine
                Steuerberatung und keine behördliche Zertifizierung.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
