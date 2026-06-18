import { BrainCircuit, SearchCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createGeoPrompts } from "@/lib/portal/geo-monitoring"
import type { CompanyProfile } from "@/lib/portal-profile"

type GeoPromptPreviewProps = {
  profile: CompanyProfile
}

export function GeoPromptPreview({ profile }: GeoPromptPreviewProps) {
  const prompts = createGeoPrompts(profile).slice(0, 4)

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <BrainCircuit className="h-5 w-5 text-accent" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                GEO-Monitoring Beta
              </p>
              <CardTitle className="text-xl leading-tight">KI-Suchfragen als Messpunkte</CardTitle>
            </div>
          </div>
          <Badge variant="secondary">regelmäßige Messung</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Diese Vorschau zeigt, welche Fragen später regelmäßig gemessen werden könnten. Die
          Beta beschreibt Antwortmuster und Erwähnungen, keine Ranking-Zusage und keine Zusage
          für KI-Sichtbarkeit.
        </p>
        <div className="grid gap-3">
          {prompts.map((prompt) => (
            <div key={prompt.id} className="flex items-start gap-3 rounded-lg border border-border bg-secondary/40 p-4">
              <SearchCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-foreground">{prompt.query}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
