import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface QuickCheckErrorStateProps {
  message: string
}

export function QuickCheckErrorState({ message }: QuickCheckErrorStateProps) {
  return (
    <Alert variant="destructive" role="alert">
      <AlertCircle className="w-4 h-4" aria-hidden="true" />
      <AlertDescription className="text-sm">{message}</AlertDescription>
    </Alert>
  )
}
