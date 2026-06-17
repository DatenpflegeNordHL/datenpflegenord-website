import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface QuickCheckLoadingStateProps {
  domain: string
}

export function QuickCheckLoadingState({ domain }: QuickCheckLoadingStateProps) {
  return (
    <Card>
      <CardContent className="py-10 flex flex-col items-center gap-4 text-center">
        {/* Progress dots */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft animation-delay-200" />
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft animation-delay-400" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-foreground">Technische Vorprüfung läuft…</p>
          <p className="text-xs text-muted-foreground">
            Wir analysieren automatisierte Hinweise auf{" "}
            <span className="font-medium">{domain}</span>.
          </p>
        </div>
        {/* Skeleton lines */}
        <div className="w-full max-w-xs flex flex-col gap-2 pt-1" aria-hidden="true">
          <div className="h-2 bg-muted rounded-full animate-pulse-soft w-3/4 mx-auto" />
          <div className="h-2 bg-muted rounded-full animate-pulse-soft animation-delay-200 w-1/2 mx-auto" />
          <div className="h-2 bg-muted rounded-full animate-pulse-soft animation-delay-400 w-5/6 mx-auto" />
        </div>
      </CardContent>
    </Card>
  )
}
