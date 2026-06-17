import Link from "next/link"
import { Logo } from "@/components/logo"

// TODO: Replace /portal with the final login route once auth is set up
const PORTAL_HREF = "/portal"

const footerCols = [
  {
    heading: "KI-Systeme",
    links: [
      { label: "KI-Prozesscheck", href: "/kontakt?anliegen=ki-prozesscheck" },
      { label: "KI-Assistenzsysteme", href: "/leistungen/ki-bueroautomation" },
      { label: "Büroautomation", href: "/leistungen/ki-bueroautomation" },
      { label: "Dokumenten- & E-Mail-Automation", href: "/leistungen/ki-bueroautomation" },
    ],
  },
  {
    heading: "Website-Checks",
    links: [
      { label: "Website-Schnellcheck", href: "/quickcheck" },
      { label: "Website-Signalcheck", href: "/leistungen/bfsg-signalcheck" },
      { label: "Digitalpflichten-Check", href: "/leistungen/pflichten-check" },
      { label: "Website-Monitoring", href: "/monitoring" },
    ],
  },
  {
    heading: "Unternehmen",
    links: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Branchen", href: "/branchen" },
      { label: "Kontakt", href: "/kontakt" },
      { label: "Portal Login", href: PORTAL_HREF },
    ],
  },
  {
    heading: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="mb-4">
              <Logo variant="footer" showLabel={true} />
            </div>
            <p className="text-xs font-semibold text-navy-foreground/50 uppercase tracking-widest mb-2">
              Eine Marke der NordWerk Digital GmbH
            </p>
            <p className="text-sm text-navy-foreground/60 leading-relaxed mb-3">
              KI-Systeme für Unternehmen. Website-Checks als Einstieg. Automationen zur
              Prozessunterstützung.
            </p>
            <p className="text-xs text-navy-foreground/40 leading-relaxed">
              Keine Rechtsberatung. Keine Steuerberatung. Keine behördliche Zertifizierung.
              Technische und strukturelle Vorprüfung.
            </p>
          </div>

          {footerCols.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-foreground/50 mb-4">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-foreground/70 hover:text-navy-foreground transition-colors duration-150 focus-visible:text-navy-foreground focus-visible:underline focus-visible:underline-offset-2 outline-none"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Portal nudge above the line */}
        <div className="border-t border-navy-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-navy-foreground/40">
            &copy; {new Date().getFullYear()} NordWerk Digital GmbH · Marke DatenpflegeNord.
            Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={PORTAL_HREF}
              className="text-xs text-navy-foreground/50 hover:text-navy-foreground/80 transition-colors duration-150 underline underline-offset-2"
            >
              Bereits Kunde? Portal Login
            </Link>
            <p className="text-xs text-navy-foreground/40 hidden sm:block">
              Keine anwaltliche Rechtsberatung. Technische Vorprüfung.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
