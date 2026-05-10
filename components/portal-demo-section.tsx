import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Clock,
  CalendarClock,
  ChevronRight,
} from "lucide-react"

// ── Static demo data ────────────────────────────────────────────────────────

const statusCards = [
  { label: "BFSG-Relevanz", value: "Prüfung empfohlen", note: null, highlight: "warn" },
  { label: "Kritische Findings", value: "3", note: null, highlight: "crit" },
  { label: "Offene Findings", value: "18", note: null, highlight: "neutral" },
  { label: "Behoben seit letztem Scan", value: "7", note: null, highlight: "ok" },
  { label: "Letzter Scan", value: "12. April 2025", note: "Beispieldatum", highlight: "neutral" },
]

const progress = [
  { label: "Barrierefreiheit", pct: 62, color: "bg-accent" },
  { label: "Technik & Performance", pct: 78, color: "bg-primary" },
  { label: "Datenschutz-Hinweise", pct: 70, color: "bg-accent" },
  { label: "SEO-Grundlagen", pct: 81, color: "bg-primary" },
]

const priorities: {
  level: "Kritisch" | "Hoch" | "Mittel"
  items: string[]
}[] = [
  {
    level: "Kritisch",
    items: [
      "Kontaktformular ohne eindeutige Fehlermeldungen",
      "Checkout-Button ohne klaren Tastaturfokus",
      "Pflichtfeld nicht korrekt ausgezeichnet",
    ],
  },
  {
    level: "Hoch",
    items: [
      "Fehlende Alternativtexte bei wichtigen Produktbildern",
      "Kontrastproblem in mobiler Navigation",
      "Unklare Linktexte",
    ],
  },
  {
    level: "Mittel",
    items: [
      "Überschriftenstruktur uneinheitlich",
      "Footer-Kontrast schwach",
      "Meta-Beschreibung fehlt auf Unterseiten",
    ],
  },
]

const timeline = [
  { icon: CheckCircle2, color: "text-accent", label: "Neuer Scan abgeschlossen", date: "12. Apr. 2025" },
  { icon: CheckCircle2, color: "text-accent", label: "7 Findings behoben", date: "10. Apr. 2025" },
  { icon: Info, color: "text-primary", label: "4 neue Hinweise erkannt", date: "12. Mrz. 2025" },
  { icon: CalendarClock, color: "text-muted-foreground", label: "Nächster Scan geplant", date: "12. Mai 2025" },
]

// ── Sub-components ────────────────────────────────────────────────────────

function HighlightDot({ type }: { type: string }) {
  const map: Record<string, string> = {
    crit: "bg-destructive",
    warn: "bg-amber-500",
    ok: "bg-accent",
    neutral: "bg-muted-foreground/40",
  }
  return <span className={`inline-block w-2 h-2 rounded-full ${map[type] ?? "bg-border"}`} aria-hidden="true" />
}

function PriorityBadge({ level }: { level: "Kritisch" | "Hoch" | "Mittel" }) {
  const styles: Record<string, string> = {
    Kritisch: "bg-destructive/10 text-destructive border-destructive/20",
    Hoch: "bg-amber-50 text-amber-700 border-amber-200",
    Mittel: "bg-muted text-muted-foreground border-border",
  }
  const icons: Record<string, React.ReactNode> = {
    Kritisch: <AlertCircle className="w-3 h-3" aria-hidden="true" />,
    Hoch: <AlertTriangle className="w-3 h-3" aria-hidden="true" />,
    Mittel: <Info className="w-3 h-3" aria-hidden="true" />,
  }
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded border ${styles[level]}`}
    >
      {icons[level]}
      {level}
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────

export function PortalDemoSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
            NordAudit Portal
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            So sieht ein NordAudit-Status aus
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Die Portal-Demo zeigt beispielhaft, wie Website-Auffälligkeiten, Prioritäten und Fortschritte
            übersichtlich dargestellt werden können.
          </p>
        </div>

        {/* Demo frame */}
        <div className="relative rounded-2xl border border-border bg-card shadow-sm overflow-hidden">

          {/* Demo banner */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-xs font-medium select-none">
            <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            Beispielhafte Portalansicht &mdash; keine echten Kundendaten
          </div>

          {/* Fake portal top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-foreground">NordAudit</span>
              <span className="text-border">|</span>
              <span className="text-xs text-muted-foreground">Muster GmbH &mdash; Website-Status</span>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">Stand: 12. April 2025 (Beispiel)</span>
          </div>

          <div className="p-5 md:p-7 space-y-7">

            {/* 1 · Status cards */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Aktueller Status
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {statusCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-xl border border-border bg-background p-4 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <HighlightDot type={card.highlight} />
                      <span className="text-[11px] text-muted-foreground leading-tight">{card.label}</span>
                    </div>
                    <p className="font-bold text-base text-foreground leading-tight">{card.value}</p>
                    {card.note && (
                      <span className="text-[10px] text-muted-foreground">{card.note}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 2 · Progress bars + Priority list side by side on lg */}
            <div className="grid lg:grid-cols-5 gap-6">

              {/* Progress */}
              <div className="lg:col-span-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Fortschritt nach Bereich
                </h3>
                <div className="bg-background rounded-xl border border-border p-5 space-y-5">
                  {progress.map(({ label, pct, color }) => (
                    <div key={label}>
                      <div className="flex justify-between items-baseline mb-1.5">
                        <span className="text-sm text-foreground">{label}</span>
                        <span className="text-sm font-semibold text-foreground">{pct} %</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
                        <div
                          className={`h-full rounded-full ${color}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority list */}
              <div className="lg:col-span-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Priorisierte Findings
                </h3>
                <div className="bg-background rounded-xl border border-border divide-y divide-border overflow-hidden">
                  {priorities.map(({ level, items }) => (
                    <div key={level} className="p-4">
                      <div className="flex items-center gap-2 mb-2.5">
                        <PriorityBadge level={level} />
                        <span className="text-[11px] text-muted-foreground">{items.length} Findings</span>
                      </div>
                      <ul className="space-y-1.5">
                        {items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                            <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-muted-foreground shrink-0" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3 · Timeline */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Verlauf
              </h3>
              <div className="bg-background rounded-xl border border-border p-5">
                <ol className="relative border-l border-border ml-1.5 space-y-5">
                  {timeline.map(({ icon: Icon, color, label, date }) => (
                    <li key={label} className="pl-5">
                      <span className="absolute -left-[9px] w-4 h-4 rounded-full bg-card border border-border flex items-center justify-center" aria-hidden="true">
                        <Icon className={`w-2.5 h-2.5 ${color}`} />
                      </span>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm text-foreground">{label}</span>
                        <span className="text-[11px] text-muted-foreground shrink-0">{date}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* 4 · Disclaimer */}
            <div className="flex items-start gap-3 rounded-xl bg-secondary/60 border border-border p-4">
              <AlertTriangle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Hinweis: </span>
                Automatisierte Prüfungen liefern technische Hinweise und Prioritäten. Eine vollständige
                Bewertung der Barrierefreiheit erfordert zusätzlich eine manuelle Prüfung. Alle Daten
                in dieser Ansicht sind Beispieldaten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
