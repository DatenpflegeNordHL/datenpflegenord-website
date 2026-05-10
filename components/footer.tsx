import Link from "next/link"
import { Logo } from "@/components/logo"

const footerLinks = [
  {
    heading: "Produkte",
    links: [
      { label: "NordAudit Portal", href: "#nordaudit" },
      { label: "KI Prozessautomatisierung", href: "#ki-automatisierung" },
      { label: "Kundenportal", href: "#portal" },
      { label: "Preise", href: "#pakete" },
    ],
  },
  {
    heading: "Rechtliches",
    links: [
      { label: "Datenschutz", href: "/datenschutz" },
      { label: "Impressum", href: "/impressum" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo variant="footer" showLabel={true} />
            </div>
            <p className="text-sm text-navy-foreground/60 leading-relaxed mb-4">
              Websites prüfen. Unternehmensprozesse mit KI automatisieren.
            </p>
            <p className="text-xs text-navy-foreground/50 leading-relaxed">
              Digitale Prüf- und KI-Systeme für deutsche KMU.
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-foreground/50 mb-4">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-foreground/70 hover:text-navy-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-navy-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-navy-foreground/40">
            &copy; {new Date().getFullYear()} DatenpflegeNord. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-navy-foreground/40">
            Keine anwaltliche Rechtsberatung. Technische und strukturelle Vorprüfung.
          </p>
        </div>
      </div>
    </footer>
  )
}
