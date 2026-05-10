"use client"

import { cn } from "@/lib/utils"

interface HolstentorLogoProps {
  className?: string
  variant?: "full" | "icon" | "watermark"
  showWordmark?: boolean
  inverted?: boolean
}

export function HolstentorLogo({
  className,
  variant = "full",
  showWordmark = true,
  inverted = false,
}: HolstentorLogoProps) {
  const isWatermark = variant === "watermark"
  // For inverted (dark bg), use lighter fills
  const primaryFill = inverted ? "fill-navy-foreground" : "fill-primary"
  const accentFill = inverted ? "fill-accent" : "fill-accent"
  const archFill = inverted ? "fill-navy" : "fill-background"

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "shrink-0",
          variant === "icon" && "size-8",
          variant === "full" && "size-10",
          variant === "watermark" && "size-full"
        )}
        aria-hidden="true"
      >
        {/* Stylized Holstentor - geometric, reduced form */}
        {/* Main gate base */}
        <rect
          x="8"
          y="44"
          width="48"
          height="4"
          rx="1"
          className={cn(isWatermark ? "fill-primary/[0.04]" : primaryFill)}
        />

        {/* Left tower */}
        <rect
          x="10"
          y="20"
          width="12"
          height="24"
          rx="1.5"
          className={cn(isWatermark ? "fill-primary/[0.03]" : primaryFill)}
        />
        {/* Left tower top (cylindrical cap) */}
        <path
          d="M10 20 C10 14, 22 14, 22 20"
          className={cn(isWatermark ? "fill-primary/[0.03]" : primaryFill)}
        />
        {/* Left tower spire */}
        <path
          d="M14 14 L16 6 L18 14 Z"
          className={cn(isWatermark ? "fill-accent/[0.04]" : accentFill)}
        />

        {/* Right tower */}
        <rect
          x="42"
          y="20"
          width="12"
          height="24"
          rx="1.5"
          className={cn(isWatermark ? "fill-primary/[0.03]" : primaryFill)}
        />
        {/* Right tower top (cylindrical cap) */}
        <path
          d="M42 20 C42 14, 54 14, 54 20"
          className={cn(isWatermark ? "fill-primary/[0.03]" : primaryFill)}
        />
        {/* Right tower spire */}
        <path
          d="M46 14 L48 6 L50 14 Z"
          className={cn(isWatermark ? "fill-accent/[0.04]" : accentFill)}
        />

        {/* Center gate section */}
        <rect
          x="24"
          y="26"
          width="16"
          height="18"
          rx="1"
          className={cn(isWatermark ? "fill-primary/[0.025]" : inverted ? "fill-navy-foreground/90" : "fill-primary/90")}
        />
        {/* Gate arch */}
        <path
          d="M27 44 L27 34 C27 30, 37 30, 37 34 L37 44 Z"
          className={cn(isWatermark ? "fill-background/50" : archFill)}
        />
        {/* Center stepped gable */}
        <path
          d="M26 26 L26 22 L28 22 L28 20 L30 20 L30 18 L34 18 L34 20 L36 20 L36 22 L38 22 L38 26 Z"
          className={cn(isWatermark ? "fill-primary/[0.03]" : primaryFill)}
        />

        {/* Digital data stream elements - subtle vertical lines */}
        {!isWatermark && (
          <>
            {/* Data streams on left tower */}
            <line x1="13" y1="24" x2="13" y2="40" strokeWidth="0.5" className="stroke-accent/40" />
            <line x1="16" y1="22" x2="16" y2="42" strokeWidth="0.5" className="stroke-accent/60" />
            <line x1="19" y1="26" x2="19" y2="38" strokeWidth="0.5" className="stroke-accent/30" />

            {/* Data streams on right tower */}
            <line x1="45" y1="26" x2="45" y2="38" strokeWidth="0.5" className="stroke-accent/30" />
            <line x1="48" y1="22" x2="48" y2="42" strokeWidth="0.5" className="stroke-accent/60" />
            <line x1="51" y1="24" x2="51" y2="40" strokeWidth="0.5" className="stroke-accent/40" />

            {/* Subtle digital dots/nodes */}
            <circle cx="16" cy="25" r="1" className="fill-accent/70" />
            <circle cx="16" cy="32" r="0.75" className="fill-accent/50" />
            <circle cx="16" cy="38" r="1" className="fill-accent/70" />
            <circle cx="48" cy="25" r="1" className="fill-accent/70" />
            <circle cx="48" cy="32" r="0.75" className="fill-accent/50" />
            <circle cx="48" cy="38" r="1" className="fill-accent/70" />

            {/* Horizontal connection lines (data flow) */}
            <line x1="22" y1="32" x2="26" y2="32" strokeWidth="0.5" className="stroke-accent/40" strokeDasharray="1 1" />
            <line x1="38" y1="32" x2="42" y2="32" strokeWidth="0.5" className="stroke-accent/40" strokeDasharray="1 1" />
          </>
        )}

        {/* Watermark version has very subtle grid pattern */}
        {isWatermark && (
          <g className="opacity-30">
            <line x1="16" y1="22" x2="16" y2="42" strokeWidth="0.25" className="stroke-primary/20" />
            <line x1="48" y1="22" x2="48" y2="42" strokeWidth="0.25" className="stroke-primary/20" />
            <line x1="32" y1="18" x2="32" y2="44" strokeWidth="0.25" className="stroke-primary/15" />
          </g>
        )}
      </svg>

      {showWordmark && variant !== "watermark" && (
        <div className="flex flex-col">
          <span className={cn(
            "text-lg font-semibold tracking-tight leading-tight",
            inverted ? "text-navy-foreground" : "text-primary"
          )}>
            DatenpflegeNord
          </span>
          {variant === "full" && (
            <span className={cn(
              "text-[10px] tracking-wide uppercase",
              inverted ? "text-navy-foreground/60" : "text-muted-foreground"
            )}>
              Website-Checks &amp; KI-Systeme
            </span>
          )}
        </div>
      )}
    </div>
  )
}
