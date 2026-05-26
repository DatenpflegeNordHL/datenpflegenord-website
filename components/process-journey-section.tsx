"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  ScanSearch,
  FileText,
  LayoutDashboard,
  Activity,
  Settings,
  BrainCircuit,
  ClipboardList,
  Workflow,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface ProcessJourneySectionProps {
  onNordAuditClick?: () => void
  onKIProcessClick?: () => void
}

type StepPhase = "start" | "analyse" | "umsetzung" | "betrieb"

type ProcessStep = {
  icon: LucideIcon
  label: string
  phase: StepPhase
}

const phaseConfig: Record<
  StepPhase,
  { badgeClassName: string; dotClassName: string; label: string }
> = {
  start: {
    badgeClassName: "bg-secondary text-muted-foreground border-border",
    dotClassName: "bg-muted-foreground",
    label: "Start",
  },
  analyse: {
    badgeClassName: "bg-amber-500/10 text-amber-700 border-amber-200 dark:text-amber-400 dark:border-amber-800",
    dotClassName: "bg-amber-500",
    label: "Analyse",
  },
  umsetzung: {
    badgeClassName: "bg-primary/10 text-primary border-primary/20",
    dotClassName: "bg-primary",
    label: "Umsetzung",
  },
  betrieb: {
    badgeClassName: "bg-accent/10 text-accent border-accent/20",
    dotClassName: "bg-accent",
    label: "Betrieb",
  },
}

const nordAuditSteps: ProcessStep[] = [
  { icon: Globe, label: "Website-Schnellcheck", phase: "start" },
  { icon: ScanSearch, label: "Barrierefreiheits-/Website-Audit", phase: "analyse" },
  { icon: FileText, label: "Findings mit Evidence", phase: "analyse" },
  { icon: LayoutDashboard, label: "Maßnahmenportal / NorthAccess", phase: "umsetzung" },
  { icon: Activity, label: "Monitoring", phase: "betrieb" },
]

const kiProzessSteps: ProcessStep[] = [
  { icon: Settings, label: "Prozess auswählen", phase: "start" },
  { icon: BrainCircuit, label: "KI-Prozesscheck", phase: "analyse" },
  { icon: ClipboardList, label: "Pilot planen", phase: "umsetzung" },
  { icon: Workflow, label: "KI-Agent / Workflow", phase: "umsetzung" },
  { icon: TrendingUp, label: "Betrieb & Optimierung", phase: "betrieb" },
]

function ProcessStep({
  step,
  isLast,
}: {
  step: ProcessStep
  isLast: boolean
}) {
  const { icon: Icon, label, phase } = step
  const cfg = phaseConfig[phase]

  return (
    <li className="flex items-center gap-2">
      <div className="flex flex-col items-center gap-1.5 min-w-[88px] max-w-[96px]">
        <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shrink-0 shadow-sm">
          <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
        </div>
        <Badge
          variant="outline"
          className={`text-[9px] px-1.5 py-0 h-4 font-medium ${cfg.badgeClassName}`}
        >
          {cfg.label}
        </Badge>
        <p className="text-[10px] text-center text-muted-foreground leading-tight">{label}</p>
      </div>

      {!isLast && (
        <ArrowRight
          className="w-4 h-4 text-border shrink-0 -mt-5"
          aria-hidden="true"
        />
      )}
    </li>
  )
}

function ProcessLane({
  title: laneTitle,
  accentClassName,
  steps,
  ctaLabel,
  onCtaClick,
  ctaFallbackHref,
}: {
  title: string
  accentClassName: string
  steps: ProcessStep[]
  ctaLabel: string
  onCtaClick?: () => void
  ctaFallbackHref: string
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full shrink-0 ${accentClassName}`} aria-hidden="true" />
        <h3 className="text-sm font-bold text-foreground tracking-wide">{laneTitle}</h3>
      </div>

      {/* Steps — horizontal scroll on mobile, wrap on desktop */}
      <ol
        className="flex items-start gap-1 overflow-x-auto pb-1 scrollbar-hide"
        aria-label={`Prozessschritte: ${laneTitle}`}
      >
        {steps.map((step, i) => (
          <ProcessStep key={step.label} step={step} isLast={i === steps.length - 1} />
        ))}
      </ol>

      {onCtaClick ? (
        <Button
          onClick={onCtaClick}
          size="sm"
          variant="outline"
          className="w-fit flex items-center gap-1.5"
        >
          {ctaLabel} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Button>
      ) : (
        <Button asChild size="sm" variant="outline" className="w-fit">
          <Link href={ctaFallbackHref} className="flex items-center gap-1.5">
            {ctaLabel} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </Button>
      )}
    </div>
  )
}

export function ProcessJourneySection({
  onNordAuditClick,
  onKIProcessClick,
}: ProcessJourneySectionProps = {}) {
  return (
    <section className="bg-background py-14 md:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-3">
            Vom ersten Check zur laufenden Umsetzung
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            DatenpflegeNord verbindet technische Erstprüfung, strukturierte Analyse und
            schrittweise Umsetzung – für Website-Pflichtstellen und KI-Büroprozesse.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <ProcessLane
            title="NordAudit – Website & Pflichtstellen"
            accentClassName="bg-primary"
            steps={nordAuditSteps}
            ctaLabel="NordAudit starten"
            onCtaClick={onNordAuditClick}
            ctaFallbackHref="/kontakt?anliegen=signalcheck"
          />
          <ProcessLane
            title="KI-Prozess – Büroautomation"
            accentClassName="bg-accent"
            steps={kiProzessSteps}
            ctaLabel="KI-Prozesscheck anfragen"
            onCtaClick={onKIProcessClick}
            ctaFallbackHref="/kontakt?angebot=ki-bueroautomation"
          />
        </div>
      </div>
    </section>
  )
}
