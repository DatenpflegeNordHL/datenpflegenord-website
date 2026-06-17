import type { ScanResult } from "@/lib/quick-check-types"
import { getBackendSummaryNote, getResultSummary } from "./quick-check-presentation"

interface QuickCheckSummaryBadgesProps {
  result: ScanResult
}

export function QuickCheckSummaryBadges({ result }: QuickCheckSummaryBadgesProps) {
  const summary = getResultSummary(result)
  const backendNote = getBackendSummaryNote(result.summary)

  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-xs font-semibold text-foreground">Kurzbewertung</p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">{summary}</p>
      </div>
      {backendNote && (
        <p className="text-[11px] text-muted-foreground/85 leading-relaxed border-t border-border pt-2">
          <span className="font-medium text-foreground/80">Technische Systemnotiz:</span>{" "}
          {backendNote}
        </p>
      )}
    </div>
  )
}
