import { FindingItem, severityConfig } from "@/lib/quick-check-types"

interface QuickCheckFindingsListProps {
  findings: FindingItem[]
  /** Maximum number of findings to display. Defaults to 5. */
  limit?: number
}

export function QuickCheckFindingsList({ findings, limit = 5 }: QuickCheckFindingsListProps) {
  const visible = findings.slice(0, limit)

  if (visible.length === 0) return null

  return (
    <div>
      <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
        Mögliche Auffälligkeiten
      </p>
      <div className="flex flex-col gap-2" role="list">
        {visible.map((f) => {
          const sev = severityConfig[f.severity]
          const SevIcon = sev.icon
          return (
            <div
              key={f.id}
              role="listitem"
              className="flex gap-3 p-3 rounded-lg border border-border bg-background text-sm"
            >
              <SevIcon
                className={`w-4 h-4 shrink-0 mt-0.5 ${sev.color}`}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="font-medium text-foreground text-xs">{f.title}</span>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wide ${sev.color}`}
                  >
                    {sev.label}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
