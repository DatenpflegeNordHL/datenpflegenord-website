"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, MapPin, AlertCircle, Gauge } from "lucide-react"

// ─── Northern Signal Map Background ──────────────────────────────────────────
// Subtle SVG with coast-inspired contour lines, lat/lon grid, and faint city
// markers for Schleswig-Holstein. Low opacity – never distracts from text.
function NorthernSignalMap() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1100 520"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* ── Latitude grid lines ── */}
        {[80, 160, 240, 320, 400].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="1100"
            y2={y}
            stroke="#2a4a7f"
            strokeWidth="0.5"
            strokeOpacity="0.12"
            strokeDasharray="6 10"
          />
        ))}

        {/* ── Longitude grid lines ── */}
        {[110, 220, 330, 440, 550, 660, 770, 880, 990].map((x) => (
          <line
            key={x}
            x1={x}
            y1="0"
            x2={x}
            y2="520"
            stroke="#2a4a7f"
            strokeWidth="0.5"
            strokeOpacity="0.10"
            strokeDasharray="4 12"
          />
        ))}

        {/* ── Abstract coastline contours inspired by SH coast ── */}
        {/* Outer contour – North Sea / Baltic silhouette */}
        <path
          d="M0 310 C60 295 120 285 180 280 C240 275 290 270 340 262 C390 254 430 244 470 238 C510 232 545 228 580 222 C630 214 680 208 730 204 C790 200 850 195 910 192 C960 190 1020 188 1100 186"
          stroke="#2a6e8a"
          strokeWidth="1.2"
          strokeOpacity="0.18"
          strokeLinecap="round"
        />
        {/* Inner contour */}
        <path
          d="M0 340 C70 326 140 316 200 310 C260 304 310 298 365 292 C420 286 465 280 510 275 C560 270 600 265 648 262 C700 258 755 254 820 252 C880 250 940 248 1100 246"
          stroke="#2a6e8a"
          strokeWidth="0.9"
          strokeOpacity="0.13"
          strokeLinecap="round"
        />
        {/* Tertiary contour */}
        <path
          d="M0 370 C80 358 155 350 220 344 C285 338 340 332 395 328 C450 324 498 320 550 316 C610 312 668 309 730 306 C800 303 870 300 950 298 C1000 297 1050 296 1100 295"
          stroke="#2a6e8a"
          strokeWidth="0.7"
          strokeOpacity="0.09"
          strokeLinecap="round"
        />

        {/* ── Nautical depth curves – more organic ── */}
        <path
          d="M0 260 Q150 248 280 244 Q400 240 520 234 Q640 228 780 226 Q900 224 1100 222"
          stroke="#1a4060"
          strokeWidth="0.8"
          strokeOpacity="0.10"
          strokeLinecap="round"
        />
        <path
          d="M0 210 Q200 200 380 196 Q520 192 650 188 Q800 184 1100 180"
          stroke="#1a4060"
          strokeWidth="0.6"
          strokeOpacity="0.07"
          strokeLinecap="round"
        />

        {/* ── City markers with rings ── */}
        {/* Kiel */}
        <circle cx="680" cy="170" r="3" fill="#2a6e8a" fillOpacity="0.35" />
        <circle cx="680" cy="170" r="6" stroke="#2a6e8a" strokeWidth="0.7" strokeOpacity="0.18" />
        <circle cx="680" cy="170" r="10" stroke="#2a6e8a" strokeWidth="0.4" strokeOpacity="0.10" />

        {/* Lübeck */}
        <circle cx="810" cy="240" r="3" fill="#2a6e8a" fillOpacity="0.30" />
        <circle cx="810" cy="240" r="6" stroke="#2a6e8a" strokeWidth="0.7" strokeOpacity="0.15" />
        <circle cx="810" cy="240" r="10" stroke="#2a6e8a" strokeWidth="0.4" strokeOpacity="0.08" />

        {/* Schleswig */}
        <circle cx="590" cy="128" r="2.5" fill="#2a6e8a" fillOpacity="0.28" />
        <circle cx="590" cy="128" r="5.5" stroke="#2a6e8a" strokeWidth="0.6" strokeOpacity="0.14" />

        {/* Hamburg (south-east, partially visible) */}
        <circle cx="820" cy="350" r="2" fill="#2a6e8a" fillOpacity="0.20" />
        <circle cx="820" cy="350" r="5" stroke="#2a6e8a" strokeWidth="0.5" strokeOpacity="0.10" />

        {/* ── Faint cross-hatch in upper-left quadrant ── */}
        <line x1="30" y1="60" x2="30" y2="200" stroke="#2a4a7f" strokeWidth="0.4" strokeOpacity="0.08" />
        <line x1="55" y1="60" x2="55" y2="200" stroke="#2a4a7f" strokeWidth="0.4" strokeOpacity="0.08" />
        <line x1="30" y1="90" x2="180" y2="90" stroke="#2a4a7f" strokeWidth="0.4" strokeOpacity="0.08" />
        <line x1="30" y1="115" x2="180" y2="115" stroke="#2a4a7f" strokeWidth="0.4" strokeOpacity="0.08" />
        <line x1="30" y1="140" x2="180" y2="140" stroke="#2a4a7f" strokeWidth="0.4" strokeOpacity="0.08" />

        {/* ── Small dot constellation – SH municipalities ── */}
        {[
          [480, 150], [540, 162], [610, 148], [640, 178], [720, 190],
          [760, 168], [700, 210], [650, 220], [560, 200], [510, 182],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.2" fill="#2a6e8a" fillOpacity="0.22" />
        ))}
      </svg>

      {/* Gradient fade: transparent center/left, white toward right and bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 15% 30%, transparent 0%, rgba(253,253,253,0.55) 55%, rgba(253,253,253,0.92) 80%, rgba(253,253,253,1) 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 60%, rgba(253,253,253,0.8) 85%, rgba(253,253,253,1) 100%)",
        }}
      />
    </div>
  )
}

// ─── Signalcheck Dashboard ────────────────────────────────────────────────────
const scoreData = [
  { label: "Lokale Sichtbarkeit", value: 62, max: 100, color: "#d97706" },
  { label: "Technik & Struktur", value: 44, max: 100, color: "#dc2626" },
  { label: "Kontakt & Vertrauen", value: 71, max: 100, color: "#2a6e8a" },
]

function ScoreBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
      />
    </div>
  )
}

function SignalcheckDashboard() {
  const dashRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dashRef.current) return
      const rect = dashRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        setTilt({ x: dy * -6, y: dx * 6 })
      })
    }

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 })
      setIsHovered(false)
    }

    const el = dashRef.current
    if (!el) return
    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)
    el.addEventListener("mouseenter", () => setIsHovered(true))
    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div
      ref={dashRef}
      className="relative w-full max-w-[420px] mx-auto"
      style={{ perspective: "1000px" }}
    >
      {/* Subtle floating animation wrapper */}
      <div
        className="dashboard-float"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "transform 0.08s linear" : "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
        }}
      >
        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_8px_40px_-8px_rgba(28,45,80,0.18)] overflow-hidden">
          {/* Header bar */}
          <div className="bg-[oklch(0.28_0.07_248)] px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-300 uppercase tracking-widest font-medium">
                DatenpflegeNord
              </p>
              <p className="text-white text-sm font-semibold leading-tight">Signalcheck</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-300 leading-tight">beispielbetrieb-sh.de</p>
              <p className="text-[10px] text-slate-400 flex items-center gap-0.5 justify-end mt-0.5">
                <MapPin className="w-2.5 h-2.5" />
                Schleswig-Holstein
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="flex divide-x divide-slate-100">
            {/* Sidebar */}
            <nav className="hidden sm:flex flex-col gap-0.5 py-3 px-2 bg-slate-50/70 min-w-[110px]">
              {["Überblick", "Website-Signale", "KI-Potenzial", "Maßnahmen", "Monitoring"].map(
                (item, i) => (
                  <span
                    key={item}
                    className={`text-[11px] px-2.5 py-1.5 rounded-md cursor-default transition-colors ${
                      i === 0
                        ? "bg-[oklch(0.28_0.07_248)] text-white font-medium"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item}
                  </span>
                )
              )}
            </nav>

            {/* Main panel */}
            <div className="flex-1 p-4 flex flex-col gap-4">
              {/* Score cards */}
              <div className="flex flex-col gap-3">
                {scoreData.map((s) => (
                  <div key={s.label} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-600 font-medium">{s.label}</span>
                      <span className="text-[11px] font-semibold" style={{ color: s.color }}>
                        {s.value}
                        <span className="text-slate-400 font-normal">/{s.max}</span>
                      </span>
                    </div>
                    <ScoreBar value={s.value} max={s.max} color={s.color} />
                  </div>
                ))}

                {/* KI-Verständlichkeit badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-600 font-medium">KI-Verständlichkeit</span>
                  <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full font-medium">
                    Hoch
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* Action summary */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col gap-0.5">
                  <span className="text-base font-bold text-[oklch(0.28_0.07_248)]">7</span>
                  <span className="text-[10px] text-slate-500 leading-tight">Maßnahmen</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-base font-bold text-amber-600">3</span>
                  <span className="text-[10px] text-slate-500 leading-tight">Schnell­korrekturen</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-base font-bold text-teal-600">1</span>
                  <span className="text-[10px] text-slate-500 leading-tight">KI-Prozess</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* Next steps */}
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">
                  Nächste Schritte
                </p>
                {[
                  { n: 1, text: "Kontaktwege vereinfachen" },
                  { n: 2, text: "LocalBusiness-Daten ergänzen" },
                  { n: 3, text: "Kundenanfragen automatisieren" },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[oklch(0.28_0.07_248)] text-white text-[9px] flex items-center justify-center font-bold mt-px">
                      {step.n}
                    </span>
                    <span className="text-[11px] text-slate-600 leading-snug">{step.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subtle reflection shadow */}
        <div className="absolute -bottom-3 left-4 right-4 h-6 bg-[oklch(0.28_0.07_248)]/10 rounded-full blur-xl" />
      </div>
    </div>
  )
}

// ─── Trust badges ──────────────────────────────────────────────────────────────
const trustBadges = [
  { label: "Schleswig-Holstein Fokus" },
  { label: "Klare Maßnahmenliste" },
  { label: "KI + Website aus einer Hand" },
]

// ─── Hero Section ─────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section className="relative bg-background pt-14 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28 overflow-hidden">
      <NorthernSignalMap />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

          {/* ── Left column ── */}
          <div className="flex-1 flex flex-col gap-5 max-w-[560px]">
            {/* Eyebrow */}
            <p className="text-xs font-semibold uppercase tracking-widest text-accent animate-fade-up">
              KI-Systeme · Website-Checks · Schleswig-Holstein
            </p>

            {/* Headline */}
            <h1 className="text-3xl md:text-[2.6rem] font-bold text-balance leading-[1.18] text-foreground animate-fade-up animation-delay-100">
              KI-Systeme und Website-Checks für Ihr Unternehmen in Schleswig-Holstein
            </h1>

            {/* Sub-headline */}
            <p className="text-base text-muted-foreground leading-relaxed animate-fade-up animation-delay-200">
              Wir prüfen Websites, digitale Pflichtstellen und wiederkehrende Büroprozesse.
              Daraus entstehen klare nächste Schritte, einfache Automationen und bessere digitale Abläufe.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 animate-fade-up animation-delay-300">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              >
                <Link href="/quickcheck" className="flex items-center gap-2">
                  Website-Schnellcheck starten
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary transition-colors duration-200"
              >
                <Link href="/kontakt?anliegen=ki-prozesscheck">
                  KI-Potenzial prüfen
                </Link>
              </Button>
            </div>

            {/* Legal note */}
            <p className="text-[11px] text-muted-foreground animate-fade-up animation-delay-400">
              Technische Vorprüfung. Keine Rechtsberatung.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 animate-fade-up animation-delay-500">
              {trustBadges.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1 border border-border"
                >
                  <CheckCircle2 className="w-3 h-3 text-accent shrink-0" aria-hidden="true" />
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right column – dashboard ── */}
          <div className="flex-1 flex items-center justify-center lg:justify-end animate-fade-up animation-delay-300 max-w-full">
            <SignalcheckDashboard />
          </div>
        </div>
      </div>

      {/* Floating keyframe – defined inline to avoid CSS file changes */}
      <style>{`
        @keyframes dashboard-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .dashboard-float {
          animation: dashboard-float 5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .dashboard-float {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}
