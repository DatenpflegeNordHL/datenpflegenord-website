"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Menu, X, LogIn } from "lucide-react"

const navLinks = [
  { label: "Website prüfen", href: "/quickcheck" },
  { label: "KI-Systeme", href: "/leistungen/ki-bueroautomation" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Monitoring", href: "/monitoring" },
  { label: "Branchen", href: "/branchen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
]

// TODO: Replace /portal with the final login route once auth is set up
const PORTAL_HREF = "/portal"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0"
              aria-label="DatenpflegeNord – zur Startseite"
            >
              <Logo variant="header" showLabel={true} />
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden xl:flex items-center gap-5 flex-1 justify-center"
              aria-label="Hauptnavigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm whitespace-nowrap transition-colors duration-150 ${
                    pathname === link.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden xl:flex items-center gap-2 shrink-0">
              <Link
                href={PORTAL_HREF}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 px-3 py-1.5 rounded-md hover:bg-secondary"
              >
                <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
                Portal
              </Link>
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-150"
              >
                <Link href="/kontakt?anliegen=ki-prozesscheck">KI-Potenzial besprechen</Link>
              </Button>
            </div>

            {/* Mobile burger */}
            <button
              className="xl:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
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
          <div className="xl:hidden border-t border-border bg-background">
            <nav
              id="mobile-nav"
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
              {/* Portal Login in mobile menu */}
              <Link
                href={PORTAL_HREF}
                className="flex items-center gap-1.5 text-sm py-2.5 px-2 text-muted-foreground hover:text-foreground transition-colors border-b border-border"
                onClick={() => setMobileOpen(false)}
              >
                <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
                Portal Login
              </Link>
              <div className="pt-3 flex flex-col gap-2">
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link
                    href="/kontakt?anliegen=ki-prozesscheck"
                    onClick={() => setMobileOpen(false)}
                  >
                    KI-Potenzial besprechen
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link href="/quickcheck" onClick={() => setMobileOpen(false)}>
                    Website prüfen lassen
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Sticky mobile CTA bar */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border px-4 py-3 flex gap-2">
        <Button
          asChild
          size="sm"
          variant="outline"
          className="flex-1 border-border text-foreground"
        >
          <Link href="/quickcheck">Website prüfen</Link>
        </Button>
        <Button
          asChild
          size="sm"
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/kontakt?anliegen=ki-prozesscheck">KI-Potenzial besprechen</Link>
        </Button>
      </div>
    </>
  )
}
