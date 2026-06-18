import { QuickCheckFindingSummary } from "@/lib/quick-check-types"

interface SummaryPillProps {
  count: number
  label: string
  color: string
}

function SummaryPill({ count, label, color }: SummaryPillProps) {
  if (count === 0) return null
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${color}`}
    >
      <span className="tabular-nums">{count}</span> {label}
    </span>
  )
}

interface QuickCheckSummaryBadgesProps {
  summary: QuickCheckFindingSummary
}

export function QuickCheckSummaryBadges({ summary }: QuickCheckSummaryBadgesProps) {
  return (
    <div className="flex flex-wrap gap-1.5" role="list" aria-label="Auffälligkeiten nach Schweregrad">
      <SummaryPill
        count={summary.critical}
        label="Kritisch"
        color="border-destructive/30 text-destructive bg-destructive/5"
      />
      <SummaryPill
        count={summary.serious}
        label="Erheblich"
        color="border-orange-300 text-orange-700 bg-orange-50"
      />
      <SummaryPill
        count={summary.moderate}
        label="Moderat"
        color="border-amber-300 text-amber-700 bg-amber-50"
      />
      <SummaryPill
        count={summary.minor}
        label="Gering"
        color="border-border text-muted-foreground bg-secondary"
      />
      <SummaryPill
        count={summary.info}
        label="Info"
        color="border-accent/30 text-accent bg-accent/5"
      />
    </div>
  )
}
