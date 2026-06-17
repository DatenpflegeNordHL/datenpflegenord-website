export function GmbhTrustSection() {
  return (
    <section className="bg-secondary/40 border-t border-border py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* GmbH branding block */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Über DatenpflegeNord
            </p>
            <p className="text-sm font-semibold text-foreground">
              DatenpflegeNord ist eine Marke der NordWerk Digital GmbH.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Wir arbeiten technisch und strukturiert: Prozesse prüfen, KI-Potenziale einordnen,
              Website-Signale sichtbar machen und nächste Schritte priorisieren. Keine
              Rechtsberatung, keine Steuerberatung und keine behördliche Zertifizierung.
            </p>
          </div>

          {/* Legal notice block */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Sachlicher Hinweis
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unsere Auswertung zeigt sichtbare technische und strukturelle Hinweise, priorisiert
              nächste Schritte und ersetzt keine anwaltliche Rechtsberatung. Wir behaupten keine
              behördliche Zertifizierung und keine garantierte Konformität.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
