import Link from "next/link"
import { ArrowRight, CheckSquare, Clock, FileText, ListChecks } from "lucide-react"
import { Button } from "@/components/ui/button"

const portalItems = [
  { icon: FileText, label: "Prüfergebnisse" },
  { icon: ListChecks, label: "Offene Aufgaben" },
  { icon: CheckSquare, label: "Maßnahmenstatus" },
]

export function PortalTeaserSection() {
  return (
    <section className="bg-secondary py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-accent">
              DatenpflegeNord Portal
            </p>
            <h2 className="mb-3 text-2xl font-bold leading-tight text-foreground text-balance md:text-3xl">
              Kundenbereich in Vorbereitung.
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Der Portal Login bleibt sichtbar. Der Kundenbereich wird für Prüfergebnisse,
              Aufgaben und laufende Maßnahmen vorbereitet; ein echtes Auth-System ist noch nicht
              Teil dieser Website.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="w-fit">
            <Link href="/portal" className="flex items-center gap-1.5">
              Portal Login <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
              Vorbereitung
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {portalItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-3"
              >
                <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            Zugang und nächste Schritte werden individuell abgestimmt. Kein Fake-Login, kein
            Dashboard-Versprechen.
          </p>
        </div>
      </div>
    </section>
  )
}
