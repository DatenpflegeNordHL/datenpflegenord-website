"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { services } from "@/content/services"

const ease = [0.22, 1, 0.36, 1] as const

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function ServiceCardsSection() {
  return (
    <section id="leistungen" className="bg-background">

      {/* ── Dark full-bleed section — "Ihr Partner in..." (Demo 22 who-we-are band) ── */}
      <div
        className="relative bg-[#080808] text-white overflow-hidden"
        style={{ minHeight: 520 }}
      >
        {/* Background: dark portrait image */}
        <Image
          src="/dark-fullbleed.jpg"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-center opacity-35"
          sizes="100vw"
        />

        {/* Content over image */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 py-28 md:py-36 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <FadeUp delay={0}>
              <p className="font-sans text-[10px] tracking-[0.3em] text-white/35 font-light uppercase mb-8">
                ·&nbsp;&nbsp;Leistungen
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="tracking-[0.06em] uppercase leading-[0.92] text-white text-balance text-[clamp(2.4rem,5vw,4.5rem)]"
                style={{ fontFamily: 'ClashDisplay, sans-serif', fontWeight: 400 }}
              >
                Ihr Partner in<br />digitalen Pflichten
              </h2>
            </FadeUp>
          </div>
          <div>
            <FadeUp delay={0.2}>
              <p className="font-sans text-[13px] font-light text-white/55 leading-relaxed mb-10 max-w-sm">
                Wir arbeiten mit kleinen Unternehmen zusammen, die wissen wollen, wo sie stehen — ohne Fachjargon, ohne Überforderung.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-3 border border-white/25 px-7 py-3.5 font-sans text-[10px] tracking-[0.26em] font-light uppercase text-white hover:border-white/60 hover:bg-white/5 transition-all duration-200 w-fit"
              >
                Kontakt aufnehmen
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ── Service accordion rows (white) ── */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 pt-20 pb-8">

        {/* Section header — left heading + right description, like Demo 22 "Vision to Life" */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-24 items-end mb-16 border-b border-border/30 pb-16">
          <FadeUp>
            <h2
              className="tracking-[0.06em] uppercase leading-[0.92] text-foreground text-[clamp(2.2rem,4.5vw,4rem)]"
              style={{ fontFamily: 'ClashDisplay, sans-serif', fontWeight: 400 }}
            >
              Was wir<br />für Sie tun
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-sans text-[13px] font-light text-foreground/50 leading-relaxed">
              Technische Prüfung. Digitale Pflichtstellen. KI-gestützte Büroautomation. Klarer Ablauf, verständliche Ergebnisse — ohne Rechtsberatung.
            </p>
          </FadeUp>
        </div>

        {/* Service rows */}
        <div className="divide-y divide-border/30">
          {services.map(({ icon: Icon, title, description, price, href }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.07, ease }}
            >
              <Link
                href={href}
                className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-10 py-10 hover:opacity-70 transition-opacity duration-200"
              >
                <span className="font-sans text-[11px] tracking-[0.24em] font-light text-foreground/20 shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-border/40 group-hover:border-foreground/30 transition-colors">
                  <Icon className="w-4 h-4 text-foreground/45" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3
                    className="font-sans text-[11px] tracking-[0.22em] font-light uppercase text-foreground mb-2"
                  >
                    {title}
                  </h3>
                  <p className="font-sans text-[13px] font-light text-foreground/45 leading-relaxed max-w-xl">
                    {description}
                  </p>
                </div>
                <span className="font-sans text-[11px] tracking-[0.16em] font-light text-foreground/35 shrink-0">
                  {price}
                </span>
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-foreground/20 group-hover:text-foreground/50 transition-colors" aria-hidden="true">
                  <path d="M0 6h16M11 1l6 5-6 5" stroke="currentColor" strokeWidth="0.9" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Full-bleed dark laptop image strip (Demo 22 "h2.jpg" section) ── */}
      <div className="relative h-[480px] md:h-[580px] overflow-hidden mt-8">
        <Image
          src="/services-laptop.jpg"
          alt="Konzentriertes Arbeiten am Laptop"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

    </section>
  )
}
