import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background flex items-end overflow-hidden">
      {/* Wave background image — right half */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <Image
          src="/hero-waves.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="object-cover object-right opacity-60"
          sizes="100vw"
        />
      </div>

      {/* Content — vertically centered but pushed toward bottom third like Demo 22 */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 pb-20 md:pb-28">
        {/* Small eyebrow label */}
        <p className="text-[10px] tracking-[0.28em] text-foreground/40 font-light uppercase mb-8">
          Website-Checks&nbsp;&nbsp;·&nbsp;&nbsp;Pflichtstellen&nbsp;&nbsp;·&nbsp;&nbsp;Digitale Prozesse
        </p>

        {/* Main headline — large, wide-tracked, thin weight */}
        <h1 className="font-sans font-light tracking-[0.12em] text-foreground text-balance uppercase leading-tight mb-6">
          <span className="block text-[clamp(1.1rem,2.2vw,1.5rem)] tracking-[0.28em] font-light text-foreground/60 mb-3">
            Wir prüfen Ihre Website&nbsp;&amp;&nbsp;digitalen Pflichten
          </span>
          <span className="block text-[clamp(2.8rem,7vw,6.5rem)] font-light tracking-[0.06em] leading-[1]">
            KLAR.&nbsp;PRIORISIERT.
          </span>
          <span className="block text-[clamp(2.8rem,7vw,6.5rem)] font-light tracking-[0.06em] leading-[1] text-foreground/35">
            VERSTÄNDLICH.
          </span>
        </h1>

        {/* Subline */}
        <p className="text-[11px] tracking-[0.2em] text-foreground/45 font-light uppercase mt-8 mb-10">
          Für Unternehmen in Schleswig-Holstein
        </p>

        {/* Scroll-down arrow indicator */}
        <Link
          href="#leistungen"
          aria-label="Nach unten scrollen"
          className="inline-flex items-center justify-center w-10 h-10 border border-foreground/25 hover:border-foreground/60 transition-colors duration-200"
        >
          <svg
            width="12"
            height="18"
            viewBox="0 0 12 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="text-foreground/50"
          >
            <path d="M6 0v16M1 11l5 6 5-6" stroke="currentColor" strokeWidth="1" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
