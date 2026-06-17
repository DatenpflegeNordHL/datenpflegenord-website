"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/logo"
import { Menu, X } from "lucide-react"

const navLeft = [
  { label: "QUICKCHECK", href: "/quickcheck" },
  { label: "LEISTUNGEN", href: "/leistungen" },
  { label: "BRANCHEN", href: "/branchen" },
]

const navRight = [
  { label: "MONITORING", href: "/monitoring" },
  { label: "ÜBER UNS", href: "/ueber-uns" },
  { label: "KONTAKT", href: "/kontakt" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinkClass = (href: string) =>
    `font-sans text-[10px] tracking-[0.22em] font-light transition-colors duration-200 ${
      pathname === href
        ? "text-foreground underline underline-offset-4"
        : "text-foreground/60 hover:text-foreground"
    }`

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/98 backdrop-blur-sm border-b border-border/40" : "bg-background/0"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Left nav */}
            <nav className="hidden lg:flex items-center gap-10" aria-label="Hauptnavigation links">
              {navLeft.map((link) => (
                <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Center: Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center"
              aria-label="DatenpflegeNord – zur Startseite"
            >
              <Logo variant="header" showLabel={false} width={44} height={44} />
            </Link>

            {/* Right nav */}
            <nav className="hidden lg:flex items-center gap-10 ml-auto" aria-label="Hauptnavigation rechts">
              {navRight.map((link) => (
                <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile burger */}
            <button
              className="lg:hidden ml-auto p-2 -mr-2 text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-background border-t border-border/40">
            <nav
              id="mobile-nav"
              className="max-w-[1400px] mx-auto px-8 py-6 flex flex-col"
              aria-label="Mobile Navigation"
            >
              {[...navLeft, ...navRight].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] tracking-[0.2em] font-light py-4 border-b border-border/40 last:border-0 text-foreground/70 hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile bottom CTA bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-foreground px-6 py-4">
        <Link
          href="/kontakt?anliegen=signalcheck"
          className="block w-full text-center text-[11px] tracking-[0.2em] font-light text-background uppercase"
        >
          Signalcheck anfragen
        </Link>
      </div>
    </>
  )
}
