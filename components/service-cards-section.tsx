"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { services } from "@/content/services"

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function ServiceCardsSection() {
  return (
    <section id="leistungen" className="bg-background">

      {/* Dark full-bleed split — left text, right image (exactly Demo 22 "Who We Are" band) */}
      <div className="bg-dark-surface text-dark-surface-foreground overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[520px]">

            {/* Left: text block */}
            <div className="px-8 lg:pl-16 xl:pl-24 py-24 md:py-32 flex flex-col justify-center">
              <FadeUp delay={0}>
                <p className="text-[10px] tracking-[0.28em] text-dark-surface-foreground/35 font-light uppercase mb-10">
                  ·&nbsp;&nbsp;Leistungen
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-sans font-light tracking-[0.08em] uppercase text-[clamp(2rem,4.5vw,3.8rem)] leading-tight text-dark-surface-foreground text-balance mb-8">
                  Was wir für Sie tun
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-[13px] font-light text-dark-surface-foreground/55 leading-relaxed mb-10 max-w-sm">
                  Technische Prüfung. Digitale Pflichtstellen. KI-gestützte Büroautomation. Klarer Ablauf, verständliche Ergebnisse.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <Link
                  href="/leistungen"
                  className="inline-flex items-center gap-3 border border-dark-surface-foreground/25 px-7 py-3 text-[10px] tracking-[0.22em] font-light uppercase text-dark-surface-foreground hover:border-dark-surface-foreground/60 transition-colors duration-200 w-fit"
                >
                  Alle Leistungen
                </Link>
              </FadeUp>
            </div>

            {/* Right: portrait image — fills full height */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/section-dark.jpg"
                alt="Konzentriertes Arbeiten am Laptop"
                fill
                className="object-cover object-center"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-dark-surface/30" />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Service list rows — white section */}
      <div className="max-w-[1400px] mx-auto px-8 py-16 md:py-20">
        <div className="divide-y divide-border/40 border-t border-border/40">
          {services.map(({ icon: Icon, title, description, price, href }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={href}
                className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-10 py-10 hover:bg-secondary/30 -mx-8 px-8 transition-colors duration-200"
              >
                <span className="text-[11px] tracking-[0.22em] font-light text-foreground/25 shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-9 h-9 shrink-0 flex items-center justify-center border border-border/50 group-hover:border-foreground/40 transition-colors">
                  <Icon className="w-4 h-4 text-foreground/50" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[11px] tracking-[0.2em] font-light uppercase text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-[13px] font-light text-foreground/50 leading-relaxed max-w-xl">
                    {description}
                  </p>
                </div>
                <span className="text-[11px] tracking-[0.16em] font-light text-foreground/40 shrink-0 md:text-right">
                  {price}
                </span>
                <svg
                  width="18" height="12" viewBox="0 0 18 12" fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 text-foreground/25 group-hover:text-foreground/60 transition-colors"
                  aria-hidden="true"
                >
                  <path d="M0 6h16M11 1l6 5-6 5" stroke="currentColor" strokeWidth="1" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
