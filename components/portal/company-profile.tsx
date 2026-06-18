import { Building2, Globe2, MapPin, Store, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatBusinessModel, type CompanyProfile as CompanyProfileData } from "@/lib/portal-profile"

type CompanyProfileProps = {
  profile: CompanyProfileData
}

const signalLabels: Array<{
  key: keyof Pick<
    CompanyProfileData,
    | "hasShop"
    | "hasBookingSystem"
    | "hasContactForms"
    | "hasGoogleBusinessProfile"
    | "hasExternalProfiles"
    | "usesAiTools"
    | "hasInternalDocuments"
  >
  label: string
}> = [
  { key: "hasShop", label: "Shop" },
  { key: "hasBookingSystem", label: "Buchungssystem" },
  { key: "hasContactForms", label: "Kontaktformulare" },
  { key: "hasGoogleBusinessProfile", label: "Google Business Profile" },
  { key: "hasExternalProfiles", label: "externe Profile" },
  { key: "usesAiTools", label: "KI-Tools" },
  { key: "hasInternalDocuments", label: "Dokumentenquellen" },
]

function ValueList({ items, fallback }: { items: string[]; fallback: string }) {
  if (items.length === 0) {
    return <span className="text-muted-foreground">{fallback}</span>
  }

  return (
    <span className="text-foreground">
      {items.slice(0, 4).join(", ")}
      {items.length > 4 ? ` +${items.length - 4}` : ""}
    </span>
  )
}

export function CompanyProfile({ profile }: CompanyProfileProps) {
  const activeSignals = signalLabels.filter((signal) => profile[signal.key])

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
              CompanyProfile
            </p>
            <CardTitle className="text-2xl leading-tight">{profile.companyName}</CardTitle>
          </div>
          <Badge variant="secondary">{formatBusinessModel(profile.businessModel)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-2 text-sm">
            <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span>{profile.industry}</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span>{profile.region}</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {profile.websiteUrl ? (
              <a href={profile.websiteUrl} className="break-all text-foreground hover:text-accent">
                {profile.websiteUrl.replace(/^https?:\/\//, "")}
              </a>
            ) : (
              <span className="text-muted-foreground">keine Website angegeben</span>
            )}
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Store className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span>{profile.cmsSystem || "CMS nicht angegeben"}</span>
          </div>
        </div>

        <div className="grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Hauptleistungen
            </p>
            <p className="text-sm leading-relaxed">
              <ValueList items={profile.mainServices} fallback="noch offen" />
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Zielkunden
            </p>
            <p className="text-sm leading-relaxed">
              <ValueList items={profile.targetCustomers} fallback="noch offen" />
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-5">
          <div className="mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-accent" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              erkannte Signale
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeSignals.length > 0 ? (
              activeSignals.map((signal) => (
                <Badge key={signal.key} variant="outline">
                  {signal.label}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">keine zusätzlichen Signale angegeben</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
