import Link from "next/link"
import { Logo } from "@/components/logo"

const footerLinks = [
  { label: "Quickcheck", href: "/quickcheck" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Branchen", href: "/branchen" },
  { label: "Monitoring", href: "/monitoring" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Impressum", href: "/impressum" },
]

export function Footer() {
  return (
    <footer className="bg-dark-surface text-dark-surface-foreground">
      <div className="max-w-[1400px] mx-auto px-8 py-16 md:py-20">

        {/* Centered logo */}
        <div className="flex justify-center mb-10">
          <Logo variant="footer" showLabel={false} width={48} height={48} />
        </div>

        {/* Centered nav links */}
        <nav
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
          aria-label="Footer Navigation"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] tracking-[0.22em] font-light uppercase text-dark-surface-foreground/45 hover:text-dark-surface-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-full h-px bg-dark-surface-foreground/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.16em] font-light text-dark-surface-foreground/30 uppercase">
            &copy; {new Date().getFullYear()} NordWerk Digital GmbH &middot; Marke DatenpflegeNord
          </p>
          <p className="text-[10px] tracking-[0.14em] font-light text-dark-surface-foreground/25 uppercase text-center sm:text-right">
            Keine anwaltliche Rechtsberatung &middot; Technische Vorprüfung
          </p>
        </div>
      </div>
    </footer>
  )
}
