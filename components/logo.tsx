"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  width?: number
  height?: number
  variant?: "header" | "footer" | "watermark"
  showLabel?: boolean
}

export function Logo({
  className,
  width = 40,
  height = 40,
  variant = "header",
  showLabel = true,
}: LogoProps) {
  const isWatermark = variant === "watermark"

  if (isWatermark) {
    return (
      <Image
        src="/logo-transparent.png"
        alt=""
        aria-hidden="true"
        width={300}
        height={300}
        className={cn("object-contain", className)}
        priority={false}
      />
    )
  }

  const logoHeight = variant === "footer" ? 32 : 40

  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/logo-transparent.png"
        alt="DatenpflegeNord Logo"
        width={logoHeight}
        height={logoHeight}
        className="object-contain"
        priority
      />
      {showLabel && variant !== "footer" && (
        <div className="flex flex-col leading-tight">
          <div className="flex gap-0.5">
            <span className="font-semibold text-sm text-primary">Datenpflege</span>
            <span className="font-semibold text-sm text-accent">Nord</span>
          </div>
          <span className="text-[10px] text-muted-foreground tracking-wide hidden sm:block">
            Website-Checks &amp; KI
          </span>
        </div>
      )}
      {showLabel && variant === "footer" && (
        <div className="flex flex-col leading-tight">
          <div className="flex gap-0.5">
            <span className="font-semibold text-sm text-navy-foreground">Datenpflege</span>
            <span className="font-semibold text-sm text-accent">Nord</span>
          </div>
        </div>
      )}
    </div>
  )
}
