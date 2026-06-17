"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    number: "01",
    title: "WEBSITE EINREICHEN",
    text: "Domain und Anliegen kurz angeben. Kein Aufwand, kein Vorab-Fragebogen.",
  },
  {
    number: "02",
    title: "EINSCHÄTZUNG ERHALTEN",
    text: "Wir prüfen sichtbare Signale und ordnen Auffälligkeiten verständlich ein.",
  },
  {
    number: "03",
    title: "SCHRITTE PRIORISIEREN",
    text: "Sie bekommen eine klare Reihenfolge für sinnvolle Maßnahmen — kein Fachkauderwelsch.",
  },
]

export function StepsSection() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: "-80px" })

  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Centred header block */}
        <motion.div
          ref={headRef}
          className="flex flex-col items-center text-center mb-20"
          initial={{ opacity: 0, y: 36 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-px h-14 bg-foreground/15 mb-8" aria-hidden="true" />
          <p className="text-[10px] tracking-[0.28em] text-foreground/35 font-light uppercase mb-4">
            ·&nbsp;&nbsp;Ablauf
          </p>
          <h2 className="font-sans font-light tracking-[0.1em] uppercase text-[clamp(1.8rem,4vw,3rem)] leading-tight text-foreground text-balance">
            So läuft es ab
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/40 border border-border/40">
          {steps.map(({ number, title, text }, i) => (
            <motion.div
              key={number}
              className="flex flex-col p-10 md:p-12"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[10px] tracking-[0.28em] font-light text-foreground/25 uppercase mb-8">
                {number}
              </span>
              <h3 className="text-[11px] tracking-[0.2em] font-light uppercase text-foreground mb-5 text-balance">
                {title}
              </h3>
              <p className="text-[13px] font-light text-foreground/55 leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
