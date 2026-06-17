"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-foreground/25" aria-hidden="true">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1" />
        <path d="M14 20h12M20 14v12" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    title: "SICHTBARE RISIKEN",
    text: "Wir prüfen Barrierefreiheits-, Datenschutz-, Technik- und Auffindbarkeits-Signale auf Ihrer Website — und machen sie lesbar.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-foreground/25" aria-hidden="true">
        <rect x="8" y="10" width="24" height="20" rx="0" stroke="currentColor" strokeWidth="1" />
        <path d="M14 18h12M14 22h8" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    title: "PRIORITÄTEN",
    text: "Sie erhalten eine verständliche Einordnung, welche Punkte zuerst angegangen werden sollten — klar sortiert nach Dringlichkeit.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-foreground/25" aria-hidden="true">
        <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1" />
        <path d="M20 8v4M20 28v4M8 20h4M28 20h4" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    title: "UMSETZUNG VORBEREITEN",
    text: "Die Ergebnisse sind so formuliert, dass Geschäftsführung, Marketing, IT oder Dienstleister direkt damit arbeiten können.",
  },
]

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function ProblemsSection() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: "-80px" })

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Centered header block */}
        <motion.div
          ref={headRef}
          className="flex flex-col items-center text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 36 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-px h-16 bg-foreground/15 mb-8" aria-hidden="true" />
          <p className="text-[10px] tracking-[0.28em] text-foreground/35 font-light uppercase mb-5">
            Drei klare Nutzen
          </p>
          <h2 className="font-sans font-light tracking-[0.1em] uppercase text-[clamp(2rem,4.5vw,3.5rem)] leading-tight text-foreground text-balance">
            Für Ihre nächste Entscheidung
          </h2>
        </motion.div>

        {/* Three-column icon pillars */}
        <div className="grid md:grid-cols-3 gap-0 border-t border-border/40">
          {pillars.map(({ icon, title, text }, i) => (
            <AnimatedSection
              key={title}
              className="flex flex-col items-center text-center px-10 py-16 border-b md:border-b-0 md:border-r border-border/40 last:border-0"
            >
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              >
                {icon}
              </motion.div>
              <h3 className="text-[10px] tracking-[0.22em] font-light uppercase text-foreground mb-5">
                {title}
              </h3>
              <p className="text-[13px] font-light text-foreground/55 leading-relaxed max-w-xs">
                {text}
              </p>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}
