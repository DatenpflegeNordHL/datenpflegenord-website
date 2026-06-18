import Link from "next/link"
import { ArrowRight, BarChart3, ClipboardCheck, Database, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const portalItems = [
  { icon: ShieldCheck, label: "TrustSignal" },
  { icon: ClipboardCheck, label: "BFSG-Readiness" },
  { icon: Database, label: "Datenpflege" },
  { icon: BarChart3, label: "KI-Sichtbarkeit" },
]

export function PortalTeaserSection() {
  return (
    <section className="bg-secondary py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-accent">
                DatenpflegeNord Portal
              </p>
              <h2 className="mb-3 text-2xl font-bold leading-tight text-foreground text-balance md:text-3xl">
                Vom Kurzprofil zur nächsten sinnvollen Maßnahme.
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Das Portal bündelt CompanyProfile, digitale Checks, Reports und erste
                Empfehlungen für TrustSignal, BFSG-Readiness, Datenpflege und KI-Sichtbarkeit.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="w-fit">
              <Link href="/portal" className="flex items-center gap-1.5">
                Portal ansehen <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                Portal V2
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {portalItems.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary px-4 py-3"
                >
                  <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">Profil, Aufgaben, Vorschau</span>
              <span className="text-xs font-semibold text-accent">TrustSignal als Einstieg</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
