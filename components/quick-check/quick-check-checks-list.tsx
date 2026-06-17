import { CheckCircle2, CircleAlert, CircleHelp, SearchX } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type {
  QuickCheckChecks,
  QuickCheckItem,
  QuickCheckKey,
  QuickCheckStatus,
} from "@/lib/quick-check-types"

const orderedChecks: Array<{ key: QuickCheckKey; fallbackLabel: string }> = [
  { key: "reachability", fallbackLabel: "Erreichbarkeit" },
  { key: "https", fallbackLabel: "HTTPS" },
  { key: "title", fallbackLabel: "Title" },
  { key: "meta_description", fallbackLabel: "Meta Description" },
  { key: "h1", fallbackLabel: "H1" },
  { key: "html_lang", fallbackLabel: "HTML Lang" },
  { key: "impressum_link", fallbackLabel: "Impressum Link" },
  { key: "privacy_link", fallbackLabel: "Datenschutz Link" },
  { key: "tracker_signals", fallbackLabel: "Tracker Signals" },
]

const statusConfig: Record<
  QuickCheckStatus,
  {
    label: string
    icon: React.ElementType
    className: string
    badge: "default" | "secondary" | "outline" | "destructive"
  }
> = {
  ok: {
    label: "ok",
    icon: CheckCircle2,
    className: "text-accent",
    badge: "outline",
  },
  check: {
    label: "prüfen",
    icon: CircleAlert,
    className: "text-amber-600",
    badge: "secondary",
  },
  missing: {
    label: "fehlt",
    icon: SearchX,
    className: "text-destructive",
    badge: "destructive",
  },
  unknown: {
    label: "unklar",
    icon: CircleHelp,
    className: "text-muted-foreground",
    badge: "secondary",
  },
}

interface QuickCheckChecksListProps {
  checks: QuickCheckChecks
}

function getVisibleChecks(checks: QuickCheckChecks): Array<[string, QuickCheckItem]> {
  const known = orderedChecks
    .map(({ key, fallbackLabel }) => {
      const item = checks[key]
      return item
        ? ([key, { ...item, label: item.label || fallbackLabel }] as [string, QuickCheckItem])
        : null
    })
    .filter((entry): entry is [string, QuickCheckItem] => Boolean(entry))

  const knownKeys = new Set(orderedChecks.map(({ key }) => key))
  const extra = Object.entries(checks).filter(
    (entry): entry is [string, QuickCheckItem] =>
      !knownKeys.has(entry[0] as QuickCheckKey) && Boolean(entry[1]),
  )

  return [...known, ...extra]
}

export function QuickCheckChecksList({ checks }: QuickCheckChecksListProps) {
  const entries = getVisibleChecks(checks)

  if (entries.length === 0) return null

  const delayClasses = [
    "",
    "animation-delay-100",
    "animation-delay-200",
    "animation-delay-300",
    "animation-delay-400",
    "animation-delay-500",
    "animation-delay-600",
    "animation-delay-700",
    "animation-delay-800",
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {entries.map(([key, check], index) => {
        const status = statusConfig[check.status]
        const StatusIcon = status.icon
        const delayClass = delayClasses[Math.min(index, delayClasses.length - 1)]

        return (
          <Card key={key} className={`overflow-hidden animate-fade-up ${delayClass}`}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <StatusIcon
                    className={`w-3.5 h-3.5 shrink-0 ${status.className}`}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-semibold text-foreground truncate">
                    {check.label}
                  </span>
                </div>
                <Badge variant={status.badge} className="text-[10px] px-1.5 py-0 shrink-0">
                  {status.label}
                </Badge>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {check.evidence || "Keine Angabe."}
                </p>
                <p className="text-[11px] text-foreground/80 leading-relaxed">
                  <span className="font-medium">Hinweis:</span>{" "}
                  {check.technical_hint || "Keine technische Empfehlung vorhanden."}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
