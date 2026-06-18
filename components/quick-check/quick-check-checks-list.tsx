import { ShieldCheck, Gauge, Globe, FileSearch, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checks, CheckAreaId } from "@/lib/quick-check-types"

const checkAreaIcons: Record<CheckAreaId, React.ElementType> = {
  accessibility: ShieldCheck,
  technical: Gauge,
  privacy: Globe,
  seo: FileSearch,
}

interface QuickCheckChecksListProps {
  checks: Checks
}

function BooleanIndicator({ value, label }: { value: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px]">
      {value ? (
        <Check className="w-3 h-3 text-accent shrink-0" aria-hidden="true" />
      ) : (
        <X className="w-3 h-3 text-destructive shrink-0" aria-hidden="true" />
      )}
      <span className="text-muted-foreground">{label}</span>
    </div>
  )
}

export function QuickCheckChecksList({ checks }: QuickCheckChecksListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Accessibility */}
      <Card className="overflow-hidden">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold text-foreground">
                {checks.accessibility.label}
              </span>
            </div>
            <Badge
              variant={checks.accessibility.findingsCount > 0 ? "destructive" : "outline"}
              className="text-[10px] px-1.5 py-0"
            >
              {checks.accessibility.findingsCount > 0
                ? `${checks.accessibility.findingsCount} Hinweise`
                : "Unauffällig"}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {checks.accessibility.status}
          </p>
        </CardContent>
      </Card>

      {/* Technical */}
      <Card className="overflow-hidden">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold text-foreground">
                {checks.technical.label}
              </span>
            </div>
            <Badge
              variant={checks.technical.https && checks.technical.reachable ? "outline" : "secondary"}
              className="text-[10px] px-1.5 py-0"
            >
              {checks.technical.https && checks.technical.reachable ? "Unauffällig" : "Hinweise"}
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <BooleanIndicator value={checks.technical.https} label="HTTPS aktiv" />
            <BooleanIndicator value={checks.technical.reachable} label="Erreichbar" />
            <p className="text-[10px] text-muted-foreground truncate mt-1">
              Ziel: {checks.technical.finalUrl}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card className="overflow-hidden">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold text-foreground">
                {checks.privacy.label}
              </span>
            </div>
            <Badge
              variant={
                checks.privacy.impressumLink && checks.privacy.privacyLink
                  ? "outline"
                  : "secondary"
              }
              className="text-[10px] px-1.5 py-0"
            >
              {checks.privacy.impressumLink && checks.privacy.privacyLink
                ? "Unauffällig"
                : "Hinweise"}
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <BooleanIndicator value={checks.privacy.impressumLink} label="Impressum erkannt" />
            <BooleanIndicator value={checks.privacy.privacyLink} label="Datenschutz erkannt" />
            {checks.privacy.detectedTrackers.length > 0 && (
              <p className="text-[10px] text-muted-foreground mt-1">
                Tracker: {checks.privacy.detectedTrackers.join(", ")}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO */}
      <Card className="overflow-hidden">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <FileSearch className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold text-foreground">{checks.seo.label}</span>
            </div>
            <Badge
              variant={
                checks.seo.title &&
                checks.seo.metaDescription &&
                checks.seo.h1 &&
                checks.seo.htmlLang
                  ? "outline"
                  : "secondary"
              }
              className="text-[10px] px-1.5 py-0"
            >
              {checks.seo.title &&
              checks.seo.metaDescription &&
              checks.seo.h1 &&
              checks.seo.htmlLang
                ? "Unauffällig"
                : "Hinweise"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <BooleanIndicator value={checks.seo.title} label="Title" />
            <BooleanIndicator value={checks.seo.metaDescription} label="Meta-Beschr." />
            <BooleanIndicator value={checks.seo.h1} label="H1-Überschrift" />
            <BooleanIndicator value={checks.seo.htmlLang} label="HTML-Lang" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
