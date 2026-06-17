"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const ease = [0.22, 1, 0.36, 1] as const

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" aria-hidden="true">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="0.8" />
        <path d="M18 24h12M24 18v12" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
    title: "SICHTBARE RISIKEN",
    text: "Wir prüfen Barrierefreiheits-, Datenschutz-, Technik- und Auffindbarkeits-Signale auf Ihrer Website und machen sie lesbar.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" aria-hidden="true">
        <rect x="10" y="12" width="28" height="24" stroke="currentColor" strokeWidth="0.8" />
        <path d="M16 21h16M16 27h10" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
    title: "PRIORITÄTEN",
    text: "Sie erhalten eine verständliche Einordnung, welche Punkte zuerst angegangen werden sollten — klar sortiert nach Dringlichkeit.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" aria-hidden="true">
        <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="0.8" />
        <path d="M24 10v5M24 33v5M10 24h5M33 24h5" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
    title: "UMSETZUNG VORBEREITEN",
    text: "Die Ergebnisse sind so formuliert, dass Geschäftsführung, Marketing, IT oder Dienstleister direkt damit arbeiten können.",
  },
]

export function ProblemsSection() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: "-80px" })

  return (
    <section className="bg-background py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Centered header — vertical divider line, eyebrow, large headline */}
        <motion.div
          ref={headRef}
          className="flex flex-col items-center text-center mb-24 md:mb-32"
          initial={{ opacity: 0, y: 36 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <div className="w-px h-20 bg-foreground/12 mb-10" aria-hidden="true" />
          <p className="font-sans text-[10px] tracking-[0.3em] text-foreground/35 font-light uppercase mb-6">
            Drei klare Nutzen
          </p>
          <h2
            className="tracking-[0.08em] uppercase leading-[0.92] text-foreground text-balance text-[clamp(2rem,5vw,4rem)]"
            style={{ fontFamily: 'ClashDisplay, sans-serif', fontWeight: 400 }}
          >
            Für Ihre nächste<br />Entscheidung
          </h2>
        </motion.div>

        {/* Three-column icon pillars — bordered, centered text */}
        <div className="grid md:grid-cols-3 border-t border-border/30">
          {pillars.map(({ icon, title, text }, i) => (
            <motion.div
              key={title}
              className="flex flex-col items-center text-center px-10 py-16 border-b md:border-b-0 md:border-r border-border/30 last:border-r-0 text-foreground/25"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
            >
              <div className="mb-10 text-foreground/20">
                {icon}
              </div>
              <h3
                className="font-sans text-[10px] tracking-[0.26em] font-light uppercase text-foreground mb-5"
              >
                {title}
              </h3>
              <p className="font-sans text-[13px] font-light text-foreground/50 leading-relaxed max-w-[260px]">
                {text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
