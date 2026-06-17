import Link from "next/link"
import { services } from "@/content/services"

export function ServiceCardsSection() {
  return (
    <section id="leistungen" className="bg-background">

      {/* Dark full-bleed intro band — mirrors Demo 22's dark "Who We Are" split */}
      <div className="bg-dark-surface text-dark-surface-foreground py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: large headline */}
            <div>
              <p className="text-[10px] tracking-[0.28em] text-dark-surface-foreground/35 font-light uppercase mb-10">
                ·&nbsp;&nbsp;Leistungen
              </p>
              <h2 className="font-sans font-light tracking-[0.08em] uppercase text-[clamp(2rem,4.5vw,3.8rem)] leading-tight text-dark-surface-foreground text-balance">
                Was wir für Sie tun
              </h2>
            </div>
            {/* Right: description + CTA */}
            <div className="lg:pt-24">
              <p className="text-[10px] tracking-[0.28em] text-dark-surface-foreground/35 font-light uppercase mb-6">
                Wählen Sie Ihren Einstieg
              </p>
              <p className="text-[13px] font-light text-dark-surface-foreground/60 leading-relaxed mb-10 max-w-sm">
                Technische Prüfung. Digitale Pflichtstellen. KI-gestützte Büroautomation. Klarer Ablauf, verständliche Ergebnisse.
              </p>
              <Link
                href="/leistungen"
                className="inline-flex items-center gap-3 border border-dark-surface-foreground/25 px-7 py-3 text-[10px] tracking-[0.22em] font-light uppercase text-dark-surface-foreground hover:border-dark-surface-foreground/60 transition-colors duration-200"
              >
                Alle Leistungen
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Service list — white section with full-bleed bordered rows */}
      <div className="max-w-[1400px] mx-auto px-8 py-16 md:py-20">
        <div className="divide-y divide-border/40 border-t border-border/40">
          {services.map(({ icon: Icon, title, description, price, href }, i) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-10 py-10 hover:bg-secondary/30 -mx-8 px-8 transition-colors duration-200"
            >
              {/* Number */}
              <span className="text-[11px] tracking-[0.22em] font-light text-foreground/25 shrink-0 w-8">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="w-9 h-9 shrink-0 flex items-center justify-center border border-border/50 group-hover:border-foreground/40 transition-colors">
                <Icon className="w-4 h-4 text-foreground/50" aria-hidden="true" />
              </div>

              {/* Title + description */}
              <div className="flex-1">
                <h3 className="text-[11px] tracking-[0.2em] font-light uppercase text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-[13px] font-light text-foreground/50 leading-relaxed max-w-xl">
                  {description}
                </p>
              </div>

              {/* Price */}
              <span className="text-[11px] tracking-[0.16em] font-light text-foreground/40 shrink-0 md:text-right">
                {price}
              </span>

              {/* Arrow */}
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 text-foreground/25 group-hover:text-foreground/60 transition-colors"
                aria-hidden="true"
              >
                <path d="M0 6h16M11 1l6 5-6 5" stroke="currentColor" strokeWidth="1" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

    </section>
  )
}
