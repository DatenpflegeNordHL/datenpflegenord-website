import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ComplianceTopic } from "@/content/compliance-topics"

const statusConfig: Record<
  ComplianceTopic["status"],
  { label: string; badgeClassName: string; dotClassName: string }
> = {
  ok: {
    label: "Signal ok",
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

type ComplianceTopicCardProps = {
  topic: ComplianceTopic
}

export function ComplianceTopicCard({ topic }: ComplianceTopicCardProps) {
  const { label, badgeClassName, dotClassName } = statusConfig[topic.status]

  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{topic.category}</p>
          <h3 className="font-bold text-foreground text-balance leading-snug">{topic.title}</h3>
        </div>
        <Badge
          variant="outline"
          className={`shrink-0 flex items-center gap-1.5 text-xs ${badgeClassName}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotClassName}`} aria-hidden="true" />
          {label}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>

      <ul className="flex flex-col gap-1.5">
        {topic.signals.map((signal) => (
          <li key={signal} className="flex items-start gap-2 text-sm text-foreground">
            <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            {signal}
          </li>
        ))}
      </ul>

      <Link
        href={topic.href}
        className="mt-auto flex items-center gap-1 text-sm text-primary font-medium hover:underline w-fit"
      >
        Mehr erfahren <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
      </Link>
    </div>
  )
}
