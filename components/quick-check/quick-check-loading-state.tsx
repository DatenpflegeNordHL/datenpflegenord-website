import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface QuickCheckLoadingStateProps {
  domain: string
}

export function QuickCheckLoadingState({ domain }: QuickCheckLoadingStateProps) {
  return (
    <Card>
      <CardContent className="py-10 flex flex-col items-center gap-3 text-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" aria-hidden="true" />
        <p className="text-sm font-medium text-foreground">Technische Vorprüfung läuft…</p>
        <p className="text-xs text-muted-foreground">
          Wir analysieren automatisierte Hinweise auf{" "}
          <span className="font-medium">{domain}</span>.
        </p>
      </CardContent>
    </Card>
  )
}
