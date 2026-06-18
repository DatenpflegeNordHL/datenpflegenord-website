import { BrainCircuit, MessageSquareText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PortalAssistantPreview as PortalAssistantPreviewData } from "@/lib/portal-assistant/context-builder"

type PortalAssistantPreviewProps = {
  preview: PortalAssistantPreviewData
}

export function PortalAssistantPreview({ preview }: PortalAssistantPreviewProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8">
              <BrainCircuit className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                Portal-Assistent
              </p>
              <CardTitle className="mt-2 text-xl leading-tight">{preview.title}</CardTitle>
            </div>
          </div>
          <Badge variant="secondary">Mock-Preview</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-sm leading-relaxed text-muted-foreground">{preview.description}</p>
        <div className="rounded-lg border border-border bg-secondary/30 p-4">
          <div className="mb-3 flex items-center gap-2">
            <MessageSquareText className="h-4 w-4 text-accent" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Beispielantwort
            </p>
          </div>
          <p className="text-sm leading-relaxed text-foreground">{preview.mockAnswer}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {preview.prompts.map((prompt) => (
            <div key={prompt} className="rounded-lg border border-border bg-card p-3 text-sm text-foreground">
              {prompt}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">kein Schreibzugriff</Badge>
          <Badge variant="outline">keine Rechtsberatung</Badge>
          <Badge variant="outline">keine externe LLM-API</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
