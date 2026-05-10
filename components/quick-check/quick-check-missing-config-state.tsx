import { Settings2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function QuickCheckMissingConfigState() {
  return (
    <Alert role="alert">
      <Settings2 className="w-4 h-4" aria-hidden="true" />
      <AlertDescription className="text-sm">
        Der Prüfdienst ist aktuell nicht konfiguriert. Bitte kontaktieren Sie uns direkt.
      </AlertDescription>
    </Alert>
  )
}
