"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background flex overflow-hidden">

      {/* Right-half wave sculpture image — exactly Demo 22 */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] pointer-events-none select-none">
        <Image
          src="/wave-hero.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
        {/* Soft fade so the white bg and image blend seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
      </div>

      {/* Content — vertically centred, left-aligned */}
      <div className="relative z-10 w-full flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-8 md:px-16 pt-32 pb-24">

          {/* Eyebrow — spaced caps like Demo 22 */}
          <motion.p
            className="text-[10px] tracking-[0.3em] text-foreground/40 font-light uppercase mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            Website-Checks&nbsp;&nbsp;·&nbsp;&nbsp;Pflichtstellen&nbsp;&nbsp;·&nbsp;&nbsp;Digitale Prozesse
          </motion.p>

          {/* Small label above main headline */}
          <motion.span
            className="block font-sans text-[clamp(0.75rem,1.4vw,1rem)] tracking-[0.3em] font-light text-foreground/50 mb-4 uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
          >
            Wir prüfen Ihre Website&nbsp;&amp;&nbsp;digitalen Pflichten
          </motion.span>

          {/* Main headline — Clash Display, ultra-wide tracking, two lines */}
          <motion.h1
            className="leading-[0.9] tracking-[0.06em] uppercase text-balance"
            style={{ fontFamily: 'ClashDisplay, sans-serif', fontWeight: 400 }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
          >
            <span className="block text-foreground text-[clamp(3rem,8vw,7.5rem)]">
              KLAR.&nbsp;PRIORISIERT.
            </span>
            {/* Second line dimmed + cursor blink — exactly Demo 22 style */}
            <span className="block text-foreground/25 text-[clamp(3rem,8vw,7.5rem)]">
              VERSTÄNDLICH.
              <motion.span
                className="inline-block w-[3px] h-[0.8em] bg-foreground/25 ml-2 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.85, repeat: Infinity, repeatType: "reverse" }}
                aria-hidden="true"
              />
            </span>
          </motion.h1>

          {/* Location tagline */}
          <motion.p
            className="font-sans text-[10px] tracking-[0.3em] text-foreground/35 font-light uppercase mt-10 mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
          >
            Für Unternehmen in Schleswig-Holstein
          </motion.p>

          {/* Scroll arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            <Link
              href="#leistungen"
              aria-label="Nach unten scrollen"
              className="inline-flex items-center justify-center w-10 h-10 border border-foreground/20 hover:border-foreground/50 transition-colors duration-300"
            >
              <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="text-foreground/40">
                <path d="M5.5 0v15M1 10.5l4.5 5.5 4.5-5.5" stroke="currentColor" strokeWidth="0.9" />
              </svg>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
