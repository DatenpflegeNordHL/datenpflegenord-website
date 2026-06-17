"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, LogIn } from "lucide-react"

// TODO: Replace /portal with the final login route once auth is set up
const PORTAL_HREF = "/portal"

const trustBadges = [
  { label: "KI-Prozesscheck" },
  { label: "Website-Schnellcheck" },
  { label: "Büroautomation" },
  { label: "Keine Rechtsberatung" },
]

/**
 * Abstracted Lübeck skyline SVG.
 * Inspired by the city's gothic gabled facades, the Holstentor twin towers,
 * and the silhouette of the seven church spires. Rendered as flat minimal shapes
 * in the brand navy, fading bottom-to-top via a gradient mask overlay so it
 * never competes with the text.
 */
function LuebeckSkyline() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 380"
        preserveAspectRatio="xMidYMax meet"
        className="absolute bottom-0 left-0 w-full h-full opacity-[0.075]"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Colour: navy token, rendered via text-primary */}
        <g className="text-primary" fill="currentColor">
          {/* ── Far-left background layer: low buildings ── */}
          <rect x="0" y="270" width="80" height="110" />
          <rect x="85" y="255" width="55" height="125" />
          <rect x="145" y="265" width="40" height="115" />

          {/* ── Left tower group: Holstentor-style twin towers ── */}
          {/* Left tower */}
          <rect x="195" y="200" width="48" height="180" />
          {/* Conical top left */}
          <polygon points="195,200 219,155 243,200" />
          {/* Right tower */}
          <rect x="252" y="210" width="48" height="170" />
          {/* Conical top right */}
          <polygon points="252,210 276,162 300,210" />
          {/* Bridge/arch between them */}
          <rect x="218" y="245" width="40" height="20" />

          {/* ── First church spire ── */}
          <rect x="330" y="230" width="30" height="150" />
          <polygon points="330,230 345,170 360,230" />
          {/* Nave */}
          <rect x="315" y="285" width="60" height="95" />

          {/* ── Stepped gable facade – 3-part ── */}
          <rect x="400" y="260" width="30" height="120" />
          {/* Stepped gable */}
          <polygon points="400,260 415,220 430,260" />
          <rect x="435" y="250" width="35" height="130" />
          <polygon points="435,250 452,205 470,250" />
          <rect x="475" y="268" width="30" height="112" />
          <polygon points="475,268 490,232 505,268" />

          {/* ── Tall thin spire ── */}
          <rect x="525" y="220" width="14" height="160" />
          <polygon points="525,220 532,170 539,220" />
          {/* Shoulder building */}
          <rect x="515" y="275" width="34" height="105" />

          {/* ── Wide market church silhouette – center focal ── */}
          <rect x="575" y="200" width="50" height="180" />
          <polygon points="575,200 600,130 625,200" />
          <rect x="560" y="260" width="80" height="120" />
          {/* Small transept bump */}
          <rect x="545" y="290" width="110" height="30" />

          {/* ── Second spire group ── */}
          <rect x="660" y="215" width="18" height="165" />
          <polygon points="660,215 669,158 678,215" />
          <rect x="648" y="272" width="42" height="108" />

          {/* ── Row of gabled townhouses ── */}
          <rect x="715" y="265" width="28" height="115" />
          <polygon points="715,265 729,235 743,265" />
          <rect x="748" y="255" width="32" height="125" />
          <polygon points="748,255 764,220 780,255" />
          <rect x="785" y="268" width="28" height="112" />
          <polygon points="785,268 799,240 813,268" />
          <rect x="818" y="260" width="30" height="120" />
          <polygon points="818,260 833,228 848,260" />

          {/* ── Third tall spire ── */}
          <rect x="870" y="205" width="16" height="175" />
          <polygon points="870,205 878,148 886,205" />
          <rect x="858" y="268" width="40" height="112" />

          {/* ── Far-right low cityscape ── */}
          <rect x="920" y="270" width="60" height="110" />
          <rect x="985" y="255" width="45" height="125" />
          <rect x="1035" y="268" width="35" height="112" />
          <rect x="1075" y="260" width="50" height="120" />
          <rect x="1130" y="272" width="70" height="108" />
        </g>
      </svg>

      {/* Soft gradient mask: transparent top, white bottom – hides silhouette bottom edge */}
      <div
        className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(253,253,253,0) 0%, rgba(253,253,253,0) 62%, rgba(253,253,253,0.55) 82%, rgba(253,253,253,1) 100%)",
          }}
      />
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative bg-background py-14 md:py-20 lg:py-24 overflow-hidden">
      <LuebeckSkyline />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl flex flex-col gap-6">
          {/* Eyebrow */}
          <p className="text-xs font-semibold uppercase tracking-widest text-accent animate-fade-up">
            KI-Systeme für Unternehmen · Website-Checks als Einstieg
          </p>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-bold text-balance leading-tight text-foreground animate-fade-up animation-delay-100">
            KI-Systeme, die Unternehmen im Alltag wirklich entlasten.
          </h1>

          {/* Sub-headline */}
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-up animation-delay-200">
            DatenpflegeNord unterstützt Unternehmen mit klar strukturierten KI-Systemen,
            Automationen und Website-Checks. Wir prüfen, wo digitale Prozesse schwächeln, und
            bauen daraus verständliche nächste Schritte.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 animate-fade-up animation-delay-300">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            >
              <Link href="/kontakt?anliegen=ki-prozesscheck" className="flex items-center gap-2">
                KI-Potenzial besprechen
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border hover:bg-secondary transition-colors duration-200"
            >
              <Link href="/quickcheck" className="flex items-center gap-2">
                Website prüfen lassen
              </Link>
            </Button>
          </div>

          {/* Portal login nudge */}
          <div className="animate-fade-up animation-delay-400">
            <Link
              href={PORTAL_HREF}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 group"
            >
              <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
              Bereits Kunde?{" "}
              <span className="underline underline-offset-2 group-hover:no-underline">
                Portal Login
              </span>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {trustBadges.map((b, i) => (
              <span
                key={b.label}
                className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1 animate-fade-up ${
                  i === 0
                    ? "animation-delay-400"
                    : i === 1
                    ? "animation-delay-500"
                    : i === 2
                    ? "animation-delay-600"
                    : "animation-delay-700"
                }`}
              >
                <CheckCircle2 className="w-3 h-3 text-accent shrink-0" aria-hidden="true" />
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
