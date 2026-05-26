import { Badge } from "@/components/ui/badge"

type AuditStatus = "ok" | "check" | "missing"

type AuditItem = {
  label: string
  status: AuditStatus
}

const statusConfig: Record<
  AuditStatus,
  { label: string; badgeClassName: string; dotClassName: string }
> = {
  ok: {
    label: "OK",
    badgeClassName: "bg-green-500/10 text-green-700 border-green-200 dark:text-green-400 dark:border-green-800",
    dotClassName: "bg-green-500",
  },
  check: {
    label: "Prüfen",
    badgeClassName: "bg-amber-500/10 text-amber-700 border-amber-200 dark:text-amber-400 dark:border-amber-800",
    dotClassName: "bg-amber-500",
  },
  missing: {
    label: "Priorität",
    badgeClassName: "bg-red-500/10 text-red-700 border-red-200 dark:text-red-400 dark:border-red-800",
    dotClassName: "bg-red-500",
  },
}

const sampleItems: AuditItem[] = [
  { label: "Website erreichbar", status: "ok" },
  { label: "HTTPS aktiv", status: "ok" },
  { label: "Impressum auffindbar", status: "ok" },
  { label: "Datenschutzseite prüfen", status: "check" },
  { label: "Barrierefreiheits-Signale prüfen", status: "check" },
  { label: "E-Rechnung-Prozess unklar", status: "missing" },
]

export function SampleAuditPreview() {
  return (
    <section className="bg-background py-14 md:py-20 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-3">
            So kann eine technische Auswertung aussehen
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Beispiel ohne echte Kundendaten.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <ul className="flex flex-col gap-3">
            {sampleItems.map((item) => {
              const { label, badgeClassName, dotClassName } = statusConfig[item.status]
              return (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4 py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm text-foreground">{item.label}</span>
                  <Badge
                    variant="outline"
                    className={`shrink-0 flex items-center gap-1.5 text-xs ${badgeClassName}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClassName}`}
                      aria-hidden="true"
                    />
                    {label}
                  </Badge>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
