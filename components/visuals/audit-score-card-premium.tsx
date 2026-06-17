type CheckItem = {
  label: string
  note: string
  status: "ok" | "warn" | "critical"
}

const checks: CheckItem[] = [
  { label: "Barrierefreiheit", note: "5 Signale geprüft", status: "warn" },
  { label: "Datenschutz-Hinweise", note: "Impressum vorhanden", status: "ok" },
  { label: "Ladezeit", note: "4,2 s – erhöhter Wert", status: "critical" },
  { label: "Mobile Darstellung", note: "Grundlegend korrekt", status: "ok" },
  { label: "Auffindbarkeit", note: "Google-Profil unvollständig", status: "warn" },
  { label: "Pflichtstellen", note: "3 offene Punkte", status: "warn" },
]

const statusConfig = {
  ok:       { dot: "bg-accent",          text: "text-accent",          label: "OK" },
  warn:     { dot: "bg-amber-400",        text: "text-amber-600",       label: "Hinweis" },
  critical: { dot: "bg-red-400",          text: "text-red-500",         label: "Prüfen" },
}

const SCORE = 72
const RADIUS = 34
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const DASH = (SCORE / 100) * CIRCUMFERENCE

export function PremiumAuditCockpit() {
  return (
    <div
      className="w-full max-w-[400px] bg-card border border-border rounded-2xl overflow-hidden"
      role="img"
      aria-label="Beispiel einer technischen Website-Auswertung mit Score 72 von 100"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Prüf-Cockpit
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground/60 bg-secondary px-2 py-0.5 rounded-full">
          Beispieldaten
        </span>
      </div>

      {/* Score row */}
      <div className="flex items-center gap-5 px-5 py-5 border-b border-border/60">
        {/* SVG ring */}
        <div className="shrink-0" aria-hidden="true">
          <svg width="88" height="88" viewBox="0 0 88 88">
            <circle
              cx="44" cy="44" r={RADIUS}
              fill="none"
              strokeWidth="5"
              stroke="currentColor"
              className="text-border"
            />
            <circle
              cx="44" cy="44" r={RADIUS}
              fill="none"
              strokeWidth="5"
              stroke="currentColor"
              strokeDasharray={`${DASH} ${CIRCUMFERENCE - DASH}`}
              strokeDashoffset={CIRCUMFERENCE / 4}
              strokeLinecap="round"
              className="text-primary"
            />
            <text x="44" y="40" textAnchor="middle" fontSize="20" fontWeight="700" className="fill-foreground">
              {SCORE}
            </text>
            <text x="44" y="54" textAnchor="middle" fontSize="9" className="fill-muted-foreground">
              von 100
            </text>
          </svg>
        </div>

        {/* Score breakdown */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-0.5">
            Gesamtbewertung
          </p>
          {[
            { label: "Sichtbarkeit", pct: 62 },
            { label: "Technik", pct: 44 },
            { label: "Pflichtstellen", pct: 78 },
          ].map(({ label, pct }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground w-24 shrink-0">{label}</span>
              <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[11px] font-medium text-foreground w-7 text-right shrink-0">
                {pct}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Check list */}
      <div className="divide-y divide-border/50">
        {checks.map(({ label, note, status }) => {
          const cfg = statusConfig[status]
          return (
            <div key={label} className="flex items-center gap-3 px-5 py-3">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-foreground leading-none mb-0.5">{label}</p>
                <p className="text-[11px] text-muted-foreground truncate">{note}</p>
              </div>
              <span className={`text-[10px] font-semibold uppercase tracking-wide shrink-0 ${cfg.text}`}>
                {cfg.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Footer note */}
      <div className="px-5 py-3 border-t border-border/60 bg-secondary/40">
        <p className="text-[10px] text-muted-foreground/70">
          Technische und strukturelle Vorprüfung — keine behördliche Zertifizierung.
        </p>
      </div>
    </div>
  )
}
