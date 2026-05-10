"use client"

import { cn } from "@/lib/utils"

interface HeroBackgroundProps {
  className?: string
}

/**
 * Subtle decorative background element for the left hero section.
 * Features an abstract Holstentor silhouette (lineart) combined with
 * subtle grid/data flow lines representing digital auditing and AI systems.
 * 
 * Design: ~5-6% opacity, placed bottom-left as a watermark.
 * Fully custom/abstract - no official logos or city emblems.
 */
export function HeroBackground({ className }: HeroBackgroundProps) {
  return (
    <div
      className={cn(
        "absolute pointer-events-none select-none",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMinYMax slice"
      >
        {/* Subtle grid pattern - represents digital/audit systems */}
        <defs>
          <pattern id="heroGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
              opacity="0.04"
            />
          </pattern>
        </defs>
        
        {/* Background grid - very subtle */}
        <rect x="0" y="80" width="400" height="240" fill="url(#heroGrid)" />

        {/* Abstract Holstentor silhouette - lineart style */}
        <g className="text-primary" opacity="0.055">
          {/* Base platform */}
          <rect x="40" y="270" width="280" height="6" rx="2" fill="currentColor" />
          
          {/* Left tower - simplified cylinder shape */}
          <path
            d="M60 270 L60 160 C60 145, 100 145, 100 160 L100 270"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Left tower cap/dome */}
          <path
            d="M55 160 C55 130, 105 130, 105 160"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Left tower spire */}
          <path
            d="M72 130 L80 100 L88 130"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          
          {/* Right tower - simplified cylinder shape */}
          <path
            d="M260 270 L260 160 C260 145, 300 145, 300 160 L300 270"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Right tower cap/dome */}
          <path
            d="M255 160 C255 130, 305 130, 305 160"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Right tower spire */}
          <path
            d="M272 130 L280 100 L288 130"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          
          {/* Center gate section */}
          <rect x="120" y="180" width="120" height="90" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          
          {/* Main archway */}
          <path
            d="M145 270 L145 220 C145 195, 215 195, 215 220 L215 270"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          
          {/* Stepped gable above center */}
          <path
            d="M130 180 L130 165 L145 165 L145 155 L160 155 L160 145 L200 145 L200 155 L215 155 L215 165 L230 165 L230 180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </g>

        {/* Data flow lines - vertical, representing digital monitoring */}
        <g className="text-accent" opacity="0.05">
          {/* Left tower data streams */}
          <line x1="75" y1="165" x2="75" y2="260" stroke="currentColor" strokeWidth="1" />
          <line x1="85" y1="155" x2="85" y2="265" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
          
          {/* Right tower data streams */}
          <line x1="275" y1="155" x2="275" y2="265" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
          <line x1="285" y1="165" x2="285" y2="260" stroke="currentColor" strokeWidth="1" />
          
          {/* Horizontal connection lines - data flow between towers */}
          <line x1="100" y1="200" x2="120" y2="200" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
          <line x1="240" y1="200" x2="260" y2="200" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
          
          {/* Circuit nodes */}
          <circle cx="75" cy="180" r="2.5" fill="currentColor" />
          <circle cx="85" cy="220" r="2" fill="currentColor" />
          <circle cx="275" cy="220" r="2" fill="currentColor" />
          <circle cx="285" cy="180" r="2.5" fill="currentColor" />
        </g>

        {/* Additional subtle horizontal scan lines - audit/check metaphor */}
        <g className="text-primary" opacity="0.025">
          <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="240" x2="400" y2="240" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="280" x2="400" y2="280" stroke="currentColor" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  )
}
