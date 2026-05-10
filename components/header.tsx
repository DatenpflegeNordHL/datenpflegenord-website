"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Menu, X, LogIn } from "lucide-react"

const navLinks = [
  { label: "Startseite", href: "/" },
  { label: "NordAudit Portal", href: "#nordaudit" },
  { label: "KI Prozessautomatisierung", href: "#ki-automatisierung" },
  { label: "Kundenportal", href: "#portal" },
  { label: "Preise", href: "#pakete" },
  { label: "Kontakt", href: "#kontakt" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo variant="header" showLabel={true} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Hauptnavigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="#domain-check">BFSG Schnellcheck</Link>
            </Button>
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#portal" className="flex items-center gap-1.5">
                <LogIn className="w-3.5 h-3.5" />
                Kundenlogin
              </Link>
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
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm py-2 text-foreground border-b border-border last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild variant="outline" size="sm">
                <Link href="#domain-check" onClick={() => setMobileOpen(false)}>
                  BFSG Schnellcheck
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="#portal" onClick={() => setMobileOpen(false)} className="flex items-center gap-1.5">
                  <LogIn className="w-3.5 h-3.5" />
                  Kundenlogin
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
