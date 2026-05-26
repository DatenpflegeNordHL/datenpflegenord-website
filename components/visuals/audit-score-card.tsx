import { AlertCircle, CheckCircle2, Clock } from "lucide-react"

type MetricStatus = "ok" | "warn" | "error" | "info"

type Metric = {
  label: string
  value: string
  sub: string
  status: MetricStatus
}

type Finding = {
  label: string
  type: "ok" | "warn" | "error"
}

const metricConfig: Record<
  MetricStatus,
  { wrapperClassName: string; labelClassName: string; valueClassName: string; subClassName: string }
> = {
  ok: {
    wrapperClassName: "bg-emerald-500/8 border border-emerald-500/20",
    labelClassName: "text-emerald-700 dark:text-emerald-400",
    valueClassName: "text-emerald-700 dark:text-emerald-400",
    subClassName: "text-emerald-600/70 dark:text-emerald-500/70",
  },
  warn: {
    wrapperClassName: "bg-amber-500/8 border border-amber-500/20",
    labelClassName: "text-amber-700 dark:text-amber-400",
    valueClassName: "text-amber-700 dark:text-amber-400",
    subClassName: "text-amber-600/70 dark:text-amber-500/70",
  },
  error: {
    wrapperClassName: "bg-red-500/8 border border-red-500/20",
    labelClassName: "text-red-700 dark:text-red-400",
    valueClassName: "text-red-700 dark:text-red-400",
    subClassName: "text-red-600/70 dark:text-red-500/70",
  },
  info: {
    wrapperClassName: "bg-secondary border border-border",
    labelClassName: "text-muted-foreground",
    valueClassName: "text-foreground",
    subClassName: "text-muted-foreground/70",
  },
}

const metrics: Metric[] = [
  { label: "Sichtbarkeit", value: "62/100", sub: "Verbesserungsbedarf", status: "warn" },
  { label: "Technik", value: "44/100", sub: "Prüfsignale vorhanden", status: "error" },
  { label: "Pflichtstellen", value: "Offen", sub: "3 Hinweise", status: "warn" },
  { label: "KI-Potenzial", value: "Hoch", sub: "3 Prozesse", status: "ok" },
]

const findings: Finding[] = [
  { label: "Google-Profil unvollständig", type: "warn" },
  { label: "Ladezeit-Signale prüfen (4,2 s)", type: "error" },
  { label: "E-Rechnungsprozess automatisierbar", type: "ok" },
]

const SCORE = 72
const RADIUS = 30
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const DASH = (SCORE / 100) * CIRCUMFERENCE

export function AuditScoreCard() {
  return (
    <div
      className="bg-card border border-border rounded-2xl p-5 shadow-sm"
      role="img"
      aria-label="Beispiel einer technischen Website-Auswertung mit Score 72 von 100"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
            Prüf-Cockpit
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" aria-hidden="true" />
          Beispieldaten
        </span>
      </div>

      {/* Score ring + metrics */}
      <div className="flex items-center gap-4 mb-4">
        {/* SVG score ring */}
        <div className="shrink-0" aria-hidden="true">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle
              cx="40" cy="40" r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-border"
            />
            <circle
              cx="40" cy="40" r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${DASH} ${CIRCUMFERENCE - DASH}`}
              strokeDashoffset={CIRCUMFERENCE / 4}
              strokeLinecap="round"
              className="text-primary transition-all duration-700"
            />
            <text
              x="40" y="36"
              textAnchor="middle"
              className="fill-foreground"
              fontSize="16"
              fontWeight="700"
            >
              {SCORE}
            </text>
            <text
              x="40" y="50"
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize="9"
            >
              /100
            </text>
          </svg>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-2 flex-1">
          {metrics.map((m) => {
            const cfg = metricConfig[m.status]
            return (
              <div key={m.label} className={`rounded-xl p-2.5 ${cfg.wrapperClassName}`}>
                <p className={`text-[9px] font-semibold uppercase tracking-wide mb-0.5 ${cfg.labelClassName}`}>
                  {m.label}
                </p>
                <p className={`text-sm font-bold leading-none ${cfg.valueClassName}`}>{m.value}</p>
                <p className={`text-[9px] mt-0.5 ${cfg.subClassName}`}>{m.sub}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Findings */}
      <div className="flex flex-col gap-1.5 pt-3 border-t border-border">
        {findings.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            {item.type === "error" ? (
              <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" aria-hidden="true" />
            ) : item.type === "warn" ? (
              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
            )}
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
