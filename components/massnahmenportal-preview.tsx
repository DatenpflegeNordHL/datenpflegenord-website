"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NorthernGridBg } from "@/components/pdf-report-preview"
import { useInView } from "@/hooks/use-in-view"

// ─── Task data ────────────────────────────────────────────────────────────────
type TaskStatus = "offen" | "pruefung" | "erledigt"

const tasks: { text: string; status: TaskStatus }[] = [
  { text: "LocalBusiness-Daten ergänzen", status: "offen" },
  { text: "Ladezeit prüfen", status: "pruefung" },
  { text: "Kontaktformular testen", status: "erledigt" },
  { text: "KI-Antwortvorlagen vorbereiten", status: "offen" },
]

const statusConfig: Record<TaskStatus, { label: string; color: string; bg: string; Icon: typeof Circle }> = {
  offen:    { label: "Offen",   color: "text-amber-700", bg: "bg-amber-50 border-amber-200",  Icon: Circle },
  pruefung: { label: "Prüfung", color: "text-blue-700",  bg: "bg-blue-50 border-blue-200",    Icon: Clock },
  erledigt: { label: "Erledigt", color: "text-teal-700", bg: "bg-teal-50 border-teal-200",    Icon: CheckCircle2 },
}

// ─── Portal card ─────────────────────────────────────────────────────────────
function PortalCard() {
  const stats = [
    { label: "Offene Maßnahmen", value: "7",  color: "text-amber-600" },
    { label: "In Prüfung",       value: "3",  color: "text-blue-600" },
    { label: "Erledigt",         value: "12", color: "text-teal-600" },
  ]

  return (
    <div className="w-full max-w-[380px] mx-auto bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_-6px_rgba(28,45,80,0.15)] overflow-hidden">
      {/* Header */}
      <div className="bg-[oklch(0.28_0.07_248)] px-5 py-3.5 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-300 uppercase tracking-widest font-medium">
            DatenpflegeNord
          </p>
          <p className="text-white text-sm font-semibold leading-tight">Audit- &amp; Maßnahmenportal</p>
        </div>
        <span className="text-[10px] bg-accent/20 text-teal-200 border border-teal-500/30 rounded-full px-2.5 py-0.5 font-medium">
          Aktiv
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center py-3 gap-0.5 px-2">
            <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
            <span className="text-[10px] text-slate-500 text-center leading-tight">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Next lever */}
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-start gap-2">
        <ArrowRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-xs text-foreground">
          <span className="font-semibold">Nächster Hebel:</span>{" "}
          Kontaktwege vereinfachen
        </p>
      </div>

      {/* Task list */}
      <div className="px-5 py-4 flex flex-col gap-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Aufgaben
        </p>
        {tasks.map((task) => {
          const { label, color, bg, Icon } = statusConfig[task.status]
          return (
            <div key={task.text} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Icon className={`w-3.5 h-3.5 shrink-0 ${color}`} aria-hidden="true" />
                <span className="text-xs text-foreground truncate">{task.text}</span>
              </div>
              <span className={`text-[10px] shrink-0 border rounded-full px-2 py-0.5 font-medium ${color} ${bg}`}>
                {label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
        <p className="text-[10px] text-muted-foreground">
          Nächster Review: 30. Juni 2025
        </p>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function MassnahmenportalPreview() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.08 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-14 md:py-20 border-t border-border overflow-hidden"
    >
      <NorthernGridBg />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left – portal card (on mobile sits above text) */}
          <div
            className={`flex items-center justify-center lg:order-first order-last lg:justify-start transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <PortalCard />
          </div>

          {/* Right – editorial text */}
          <div
            className={`flex flex-col gap-5 order-first lg:order-last transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
              Maßnahmenportal
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight">
              Befunde werden zu klaren Aufgaben.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Nach dem Audit landen alle Maßnahmen in einem strukturierten Portal.
              Sie sehen den Status jeder Aufgabe, die Priorität und den nächsten Hebel –
              ohne Such­aufwand, ohne Folien.
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed border-l-2 border-accent pl-3">
              Das Portal ist kein Login-Bereich. Es ist ein Arbeitszentrum.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Link href="/kontakt?anliegen=ki-prozesscheck" className="flex items-center gap-2">
                  KI-Potenzial prüfen
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-border">
                <Link href="/quickcheck">Website-Schnellcheck starten</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
