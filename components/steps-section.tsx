"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const ease = [0.22, 1, 0.36, 1] as const

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
    text: "Sie bekommen eine klare Reihenfolge für sinnvolle Maßnahmen — ohne Fachkauderwelsch.",
  },
]

export function StepsSection() {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true, margin: "-80px" })

  return (
    <section className="bg-background">

      {/* Dark organic wave image strip — like Demo 22's dark bg between sections */}
      <div className="relative h-[420px] md:h-[520px] overflow-hidden">
        <Image
          src="/wave-portfolio.jpg"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Centred label inside dark strip */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="font-sans text-[10px] tracking-[0.32em] text-white/40 font-light uppercase mb-6">
            ·&nbsp;&nbsp;Quickcheck anfragen
          </p>
          <h2
            className="tracking-[0.06em] uppercase leading-[0.92] text-white text-[clamp(2rem,4.5vw,3.8rem)] text-balance"
            style={{ fontFamily: 'ClashDisplay, sans-serif', fontWeight: 400 }}
          >
            Ihr Website-Status<br />in 48 Stunden
          </h2>
        </motion.div>
      </div>

      {/* Steps grid */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-24 md:py-32">

        <motion.div
          ref={headRef}
          className="flex flex-col items-center text-center mb-20"
          initial={{ opacity: 0, y: 32 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <div className="w-px h-16 bg-foreground/12 mb-10" aria-hidden="true" />
          <p className="font-sans text-[10px] tracking-[0.3em] text-foreground/35 font-light uppercase mb-5">
            ·&nbsp;&nbsp;Ablauf
          </p>
          <h2
            className="tracking-[0.08em] uppercase leading-tight text-foreground text-[clamp(1.8rem,3.8vw,3rem)] text-balance"
            style={{ fontFamily: 'ClashDisplay, sans-serif', fontWeight: 400 }}
          >
            So läuft es ab
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 border-t border-border/30">
          {steps.map(({ number, title, text }, i) => (
            <motion.div
              key={number}
              className="flex flex-col px-10 py-14 border-b md:border-b-0 md:border-r border-border/30 last:border-r-0"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: i * 0.12, ease }}
            >
              <span className="font-sans text-[10px] tracking-[0.3em] font-light text-foreground/20 uppercase mb-10">
                {number}
              </span>
              <h3 className="font-sans text-[10px] tracking-[0.24em] font-light uppercase text-foreground mb-5">
                {title}
              </h3>
              <p className="font-sans text-[13px] font-light text-foreground/50 leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
