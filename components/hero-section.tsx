"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1.1, ease: "easeOut", delay },
  }),
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background flex overflow-hidden">

      {/* Right-half portrait image — exactly like Demo 22 */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-full md:w-[52%] pointer-events-none select-none"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        custom={0.3}
      >
        <Image
          src="/hero-portrait.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 52vw"
        />
        {/* Gradient overlay so left text stays legible on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent md:via-background/40" />
      </motion.div>

      {/* Content — bottom-anchored like Demo 22 */}
      <div className="relative z-10 w-full flex items-end">
        <div className="w-full max-w-[1400px] mx-auto px-8 pb-20 md:pb-28">

          {/* Eyebrow */}
          <motion.p
            className="text-[10px] tracking-[0.28em] text-foreground/40 font-light uppercase mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.1}
          >
            Website-Checks&nbsp;&nbsp;·&nbsp;&nbsp;Pflichtstellen&nbsp;&nbsp;·&nbsp;&nbsp;Digitale Prozesse
          </motion.p>

          {/* Headline line 1 — small label */}
          <motion.span
            className="block text-[clamp(0.9rem,1.8vw,1.2rem)] tracking-[0.28em] font-light text-foreground/55 mb-4 uppercase"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.25}
          >
            Wir prüfen Ihre Website&nbsp;&amp;&nbsp;digitalen Pflichten
          </motion.span>

          {/* Headline line 2 — large */}
          <motion.h1
            className="font-sans font-light tracking-[0.06em] text-foreground uppercase leading-[0.92] text-balance"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.4}
          >
            <span className="block text-[clamp(3rem,7.5vw,7rem)]">KLAR.&nbsp;PRIORISIERT.</span>
            <span className="block text-[clamp(3rem,7.5vw,7rem)] text-foreground/28">VERSTÄNDLICH.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            className="text-[11px] tracking-[0.2em] text-foreground/40 font-light uppercase mt-10 mb-10"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.55}
          >
            Für Unternehmen in Schleswig-Holstein
          </motion.p>

          {/* Scroll arrow */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0.9}
          >
            <Link
              href="#leistungen"
              aria-label="Nach unten scrollen"
              className="inline-flex items-center justify-center w-10 h-10 border border-foreground/20 hover:border-foreground/50 transition-colors duration-300"
            >
              <svg
                width="11"
                height="17"
                viewBox="0 0 11 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="text-foreground/45"
              >
                <path d="M5.5 0v15M1 10.5l4.5 5.5 4.5-5.5" stroke="currentColor" strokeWidth="0.9" />
              </svg>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
