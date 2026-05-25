"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Quickcheck", href: "/kontakt" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Branchen", href: "/branchen" },
  { label: "Monitoring", href: "/monitoring" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Logo variant="header" showLabel={true} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-5" aria-label="Hauptnavigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors ${
                    pathname === link.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/kontakt">Signalcheck starten</Link>
              </Button>
            </div>

            {/* Mobile burger */}
            <button
              className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav
              className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
              aria-label="Mobile Navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm py-2.5 px-2 rounded-md border-b border-border last:border-0 transition-colors ${
                    pathname === link.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3">
                <Button asChild size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/kontakt" onClick={() => setMobileOpen(false)}>
                    Signalcheck starten
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Sticky mobile CTA bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border px-4 py-3">
        <Button asChild size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/kontakt">Signalcheck starten</Link>
        </Button>
      </div>
    </>
  )
}
