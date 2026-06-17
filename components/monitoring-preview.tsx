"use client"

import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NorthernGridBg } from "@/components/pdf-report-preview"
import { useInView } from "@/hooks/use-in-view"

// ─── Mini line chart (pure SVG, no library needed for 6 points) ───────────────
const healthPoints = [68, 71, 69, 73, 76, 78]

function MiniLineChart() {
  const w = 260
  const h = 60
  const pad = 8
  const innerW = w - pad * 2
  const innerH = h - pad * 2

  const min = Math.min(...healthPoints) - 4
  const max = Math.max(...healthPoints) + 4
  const range = max - min

  const pts = healthPoints.map((v, i) => ({
    x: pad + (i / (healthPoints.length - 1)) * innerW,
    y: pad + ((max - v) / range) * innerH,
  }))

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ")
  // Build area fill path
  const area = [
    `M ${pts[0].x} ${h - pad}`,
    ...pts.map((p) => `L ${p.x} ${p.y}`),
    `L ${pts[pts.length - 1].x} ${h - pad}`,
    "Z",
  ].join(" ")

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      height={h}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Area fill */}
      <path d={area} fill="oklch(0.56 0.12 196)" fillOpacity="0.08" />
      {/* Line */}
      <polyline
        points={polyline}
        fill="none"
        stroke="oklch(0.56 0.12 196)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Last dot */}
      <circle
        cx={pts[pts.length - 1].x}
        cy={pts[pts.length - 1].y}
        r="3.5"
        fill="oklch(0.56 0.12 196)"
      />
    </svg>
  )
}

// ─── Monitoring Card ──────────────────────────────────────────────────────────
const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"]

const metricRows = [
  { label: "Neue Hinweise",        value: "4",   sub: "diesen Monat",    color: "text-amber-600" },
  { label: "Erledigte Maßnahmen",  value: "12",  sub: "kumuliert",       color: "text-teal-600" },
  { label: "Monatsvergleich",      value: "+9 %", sub: "Website Health",  color: "text-teal-600" },
]

function MonitoringCard() {
  return (
    <div className="w-full max-w-[380px] mx-auto bg-white rounded-2xl border border-slate-200 shadow-[0_6px_32px_-6px_rgba(28,45,80,0.15)] overflow-hidden">
      {/* Header */}
      <div className="bg-[oklch(0.28_0.07_248)] px-5 py-3.5 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-300 uppercase tracking-widest font-medium">
            DatenpflegeNord
          </p>
          <p className="text-white text-sm font-semibold leading-tight">Monitoring-Verlauf</p>
        </div>
        <TrendingUp className="w-4 h-4 text-teal-300" aria-hidden="true" />
      </div>

      {/* Health score + chart */}
      <div className="px-5 pt-4 pb-2 flex flex-col gap-1">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-3xl font-bold text-foreground">78</span>
            <span className="text-base text-muted-foreground">&thinsp;/ 100</span>
          </div>
          <span className="text-xs text-muted-foreground">Website Health</span>
        </div>

        {/* Bar track */}
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mt-1">
          <div
            className="h-full rounded-full"
            style={{ width: "78%", backgroundColor: "oklch(0.56 0.12 196)" }}
          />
        </div>

        {/* Spark chart */}
        <div className="mt-3">
          <MiniLineChart />
          <div className="flex justify-between px-1 mt-0.5">
            {months.map((m) => (
              <span key={m} className="text-[9px] text-muted-foreground">{m}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Metric rows */}
      <div className="border-t border-slate-100 px-5 py-3 flex flex-col divide-y divide-slate-100">
        {metricRows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-foreground">{row.label}</span>
              <span className="text-[10px] text-muted-foreground">{row.sub}</span>
            </div>
            <span className={`text-sm font-bold ${row.color}`}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-slate-50 border-t border-slate-100 px-5 py-3">
        <p className="text-[10px] text-muted-foreground">
          Nächste Prüfung: 1. Juli 2025
        </p>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function MonitoringPreview() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.08 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-secondary/40 py-14 md:py-20 border-t border-border overflow-hidden"
    >
      <NorthernGridBg />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left – editorial text */}
          <div
            className={`flex flex-col gap-5 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
              Website-Monitoring
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight">
              Ergebnisse, die sich nicht verstecken.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Monat für Monat prüfen wir den Stand Ihrer Website: Health-Score,
              neue technische Hinweise, erledigte Maßnahmen und Entwicklungstrend.
              Kein Datenwust – nur das, was für Sie relevant ist.
            </p>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {[
                "Klarer Score statt roher Rohdaten",
                "Vergleich zum Vormonat",
                "Direkte Verbindung zum Maßnahmenportal",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent shrink-0 mt-2" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Link href="/quickcheck" className="flex items-center gap-2">
                  Website-Schnellcheck starten
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-border">
                <Link href="/monitoring">Mehr zu Monitoring</Link>
              </Button>
            </div>
          </div>

          {/* Right – monitoring card */}
          <div
            className={`flex items-center justify-center lg:justify-end transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <MonitoringCard />
          </div>

        </div>
      </div>
    </section>
  )
}
