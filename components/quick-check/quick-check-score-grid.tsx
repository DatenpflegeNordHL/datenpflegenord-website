import { ScanResult } from "@/lib/quick-check-types"

interface QuickCheckScoreGridProps {
  score: ScanResult["score"]
}

export function QuickCheckScoreGrid({ score }: QuickCheckScoreGridProps) {
  const color =
    score >= 70
      ? "text-accent"
      : score >= 45
        ? "text-amber-500"
        : "text-destructive"

  return (
    <div
      className="flex flex-col items-center justify-center w-20 h-20 rounded-full border-4 border-border bg-background shrink-0"
      aria-label={`Gesamtscore: ${score} von 100`}
    >
      <span className={`text-2xl font-bold tabular-nums ${color}`}>{score}</span>
      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">/100</span>
    </div>
  )
}
