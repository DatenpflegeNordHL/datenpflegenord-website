import { ShieldCheck, Gauge, Globe, FileSearch } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckArea, CheckAreaId, statusConfig } from "@/lib/quick-check-types"

const checkAreaIcons: Record<CheckAreaId, React.ElementType> = {
  accessibility: ShieldCheck,
  technical: Gauge,
  privacy: Globe,
  seo: FileSearch,
}

interface QuickCheckChecksListProps {
  checks: CheckArea[]
}

export function QuickCheckChecksList({ checks }: QuickCheckChecksListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {checks.map((check) => {
        const Icon = checkAreaIcons[check.id] ?? ShieldCheck
        const sc = statusConfig[check.status]
        return (
          <Card key={check.id} className="overflow-hidden">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                  <span className="text-xs font-semibold text-foreground">{check.label}</span>
                </div>
                <Badge variant={sc.badgeVariant} className="text-[10px] px-1.5 py-0">
                  {sc.label}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Progress value={check.score} className="h-1.5 flex-1" />
                <span className="text-xs tabular-nums text-muted-foreground w-7 text-right">
                  {check.score}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{check.summary}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
