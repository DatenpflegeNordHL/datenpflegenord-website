"use client"

import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"

// ─── Shared northern grid background ─────────────────────────────────────────
export function NorthernGridBg({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lat/lon grid */}
        {[60, 130, 200, 270, 340].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y}
            stroke="#1e3a5f" strokeWidth="0.5" strokeOpacity="0.10" strokeDasharray="5 12" />
        ))}
        {[80, 180, 280, 380, 480, 580, 680].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400"
            stroke="#1e3a5f" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="4 14" />
        ))}
        {/* Coastline contour */}
        <path
          d="M0 240 C80 228 170 220 260 215 C350 210 430 206 520 202 C610 198 700 196 800 194"
          stroke="#2a6e8a" strokeWidth="1" strokeOpacity="0.12" strokeLinecap="round"
        />
        <path
          d="M0 270 C90 260 185 253 275 248 C365 243 450 240 540 237 C630 234 720 232 800 230"
          stroke="#2a6e8a" strokeWidth="0.7" strokeOpacity="0.08" strokeLinecap="round"
        />
        {/* City dots */}
        <circle cx="480" cy="120" r="2.5" fill="#2a6e8a" fillOpacity="0.25" />
        <circle cx="480" cy="120" r="5.5" stroke="#2a6e8a" strokeWidth="0.6" strokeOpacity="0.13" />
        <circle cx="590" cy="160" r="2" fill="#2a6e8a" fillOpacity="0.20" />
        <circle cx="590" cy="160" r="4.5" stroke="#2a6e8a" strokeWidth="0.5" strokeOpacity="0.10" />
      </svg>
      {/* Fade overlay */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 0%, rgba(249,250,251,0.7) 70%, rgba(249,250,251,1) 100%)" }}
      />
    </div>
  )
}

// ─── PDF Report Card ──────────────────────────────────────────────────────────
const reportSections = [
  { label: "Kurzfazit", value: "Lokale Sichtbarkeit verbesserungswürdig" },
  { label: "Prioritäten", value: "3 dringende · 4 mittelfristige Maßnahmen" },
  { label: "Technische Signale", value: "Ladezeit · HTTPS · Metadaten geprüft" },
  { label: "KI-Potenziale", value: "Anfragen-Routing · Dokumentenablage" },
  { label: "Nächste Schritte", value: "Kontaktwege · LocalBusiness · Antwortvorlagen" },
]

function PdfReportCard() {
  return (
    <div className="relative w-full max-w-[340px] mx-auto">
      {/* Stacked sheet shadow 3 */}
      <div className="absolute bottom-0 left-4 right-4 h-full rounded-xl border border-slate-200 bg-white shadow-sm"
        style={{ transform: "translateY(10px) rotate(2deg)", transformOrigin: "bottom center", zIndex: 1 }} />
      {/* Stacked sheet shadow 2 */}
      <div className="absolute bottom-0 left-2 right-2 h-full rounded-xl border border-slate-200 bg-white shadow-sm"
        style={{ transform: "translateY(5px) rotate(1deg)", transformOrigin: "bottom center", zIndex: 2 }} />

      {/* Main report card */}
      <div className="relative rounded-xl border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(28,45,80,0.14)] overflow-hidden"
        style={{ zIndex: 3 }}>
        {/* Document header */}
        <div className="bg-[oklch(0.28_0.07_248)] px-5 py-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-md bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
            <FileText className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-tight">
              Website- &amp; KI-Signalbericht
            </p>
            <p className="text-slate-300 text-[10px] mt-0.5">beispielbetrieb-sh.de · Juni 2025</p>
          </div>
        </div>

        {/* Divider rule – like a real document */}
        <div className="border-t-2 border-accent/60" />

        {/* Report body */}
        <div className="px-5 py-4 flex flex-col divide-y divide-slate-100">
          {reportSections.map((s) => (
            <div key={s.label} className="py-2.5 flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {s.label}
              </span>
              <span className="text-xs text-foreground leading-snug">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 px-5 py-3 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">NordWerk Digital GmbH</span>
          <span className="text-[10px] bg-accent/10 text-accent border border-accent/20 rounded-full px-2.5 py-0.5 font-medium">
            PDF-Bericht
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function PdfReportPreview() {
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
              Audit &amp; Bericht
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight">
              Klare Befunde. Praktische Prioritäten.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Nach dem Audit erhalten Sie einen strukturierten PDF-Bericht mit Kurzfazit,
              Priorisierung und konkreten nächsten Schritten – kein Folienstapel, sondern
              ein Arbeitsdokument für Sie und Ihr Team.
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed border-l-2 border-accent pl-3">
              PDF-Bericht für Team und Umsetzung.
            </p>
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
                <Link href="/leistungen">Alle Leistungen</Link>
              </Button>
            </div>
          </div>

          {/* Right – report mockup */}
          <div
            className={`flex items-center justify-center lg:justify-end transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <PdfReportCard />
          </div>
        </div>
      </div>
    </section>
  )
}
