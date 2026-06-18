import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  DatabaseZap,
  FileSearch,
  Lightbulb,
  MapPinned,
  ShieldCheck,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { PortalRecommendation, RecommendationId } from "@/lib/portal-profile"

type RecommendationCardsProps = {
  recommendations: PortalRecommendation[]
}

const iconByRecommendation: Record<RecommendationId, typeof ShieldCheck> = {
  trustsignal: ShieldCheck,
  bfsg_readiness: ClipboardCheck,
  ai_visibility: BarChart3,
  datenpflege: MapPinned,
  datamap: DatabaseZap,
  funding: FileSearch,
  ki_upsell_sprint: Lightbulb,
}

function priorityLabel(priority: PortalRecommendation["priority"]): string {
  if (priority === "hoch") return "Priorität hoch"
  if (priority === "mittel") return "Priorität mittel"
  return "später"
}

export function RecommendationCards({ recommendations }: RecommendationCardsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {recommendations.map((recommendation) => {
        const Icon = iconByRecommendation[recommendation.id]

        return (
          <Card key={recommendation.id} className="h-full shadow-sm">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                      {recommendation.eyebrow}
                    </p>
                    <CardTitle className="text-lg leading-tight">{recommendation.title}</CardTitle>
                    <p className="text-xs font-medium text-muted-foreground">{recommendation.product}</p>
                  </div>
                </div>
                <Badge variant={recommendation.priority === "hoch" ? "default" : "secondary"}>
                  {priorityLabel(recommendation.priority)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {recommendation.description}
              </p>
              <ul className="flex flex-col gap-2">
                {recommendation.reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-lg border border-border bg-secondary/30 p-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Nächster Schritt
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{recommendation.nextStep}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm" className="w-full justify-between">
                <Link href={recommendation.ctaHref}>
                  {recommendation.ctaLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
