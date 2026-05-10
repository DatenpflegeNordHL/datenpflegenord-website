import { Info } from "lucide-react"

interface QuickCheckDisclaimerProps {
  text: string
}

export function QuickCheckDisclaimer({ text }: QuickCheckDisclaimerProps) {
  return (
    <div className="flex gap-2 p-3 rounded-lg bg-secondary border border-border">
      <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-[11px] text-muted-foreground leading-relaxed">{text}</p>
    </div>
  )
}
