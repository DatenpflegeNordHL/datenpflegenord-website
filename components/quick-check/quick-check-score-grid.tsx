import { ShieldCheck, Gauge, Globe, FileSearch } from "lucide-react"
import { ScoreBreakdown, CheckAreaId, checkAreaLabels } from "@/lib/quick-check-types"

const checkAreaIcons: Record<CheckAreaId, React.ElementType> = {
  accessibility: ShieldCheck,
  technical: Gauge,
  privacy: Globe,
  seo: FileSearch,
}

interface QuickCheckScoreGridProps {
  score: ScoreBreakdown
}

function getScoreColor(value: number): string {
  if (value >= 70) return "text-accent"
  if (value >= 45) return "text-amber-500"
  return "text-destructive"
}

function getOverallScore(score: ScoreBreakdown): number {
  const values = Object.values(score)
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length)
}

export function QuickCheckScoreGrid({ score }: QuickCheckScoreGridProps) {
  const overallScore = getOverallScore(score)
  const overallColor = getScoreColor(overallScore)

  const categories: CheckAreaId[] = ["accessibility", "technical", "privacy", "seo"]

  return (
    <div className="flex flex-col gap-3">
      {/* Overall Score Circle */}
      <div className="flex items-center gap-4">
        <div
          className="flex flex-col items-center justify-center w-20 h-20 rounded-full border-4 border-border bg-background shrink-0"
          aria-label={`Gesamtscore: ${overallScore} von 100`}
        >
          <span className={`text-2xl font-bold tabular-nums ${overallColor}`}>
            {overallScore}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
            /100
          </span>
        </div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">Durchschnitt aller Kategorien</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Technische Vorprüfung auf mögliche Auffälligkeiten
          </p>
        </div>
      </div>

      {/* Category Scores */}
      <div className="grid grid-cols-2 gap-2">
        {categories.map((cat) => {
          const Icon = checkAreaIcons[cat]
          const value = score[cat]
          const color = getScoreColor(value)
          return (
            <div
              key={cat}
              className="flex items-center gap-2 p-2 rounded-md border border-border bg-background"
            >
              <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-muted-foreground truncate">
                  {checkAreaLabels[cat]}
                </p>
              </div>
              <span className={`text-xs font-semibold tabular-nums ${color}`}>{value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
