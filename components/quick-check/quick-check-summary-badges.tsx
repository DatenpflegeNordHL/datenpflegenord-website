interface QuickCheckSummaryBadgesProps {
  summary: string
}

export function QuickCheckSummaryBadges({ summary }: QuickCheckSummaryBadgesProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold text-foreground">Zusammenfassung</p>
      <p className="text-[11px] text-muted-foreground leading-relaxed">{summary}</p>
    </div>
  )
}
