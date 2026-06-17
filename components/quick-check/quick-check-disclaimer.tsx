import { Info } from "lucide-react"
import { getDisclaimerText } from "./quick-check-presentation"

interface QuickCheckDisclaimerProps {
  text: string
}

export function QuickCheckDisclaimer({ text }: QuickCheckDisclaimerProps) {
  const disclaimer = getDisclaimerText(text)

  return (
    <div className="flex gap-2 p-3 rounded-lg bg-secondary border border-border">
      <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex flex-col gap-1">
        <p className="text-[11px] font-medium text-foreground">Einordnung des Schnellchecks</p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {disclaimer} Keine Rechtsberatung, keine behördliche Zertifizierung und keine
          garantierte Konformität.
        </p>
      </div>
    </div>
  )
}
