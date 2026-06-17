import Link from "next/link"
import { Logo } from "@/components/logo"

const footerCols = [
  {
    heading: "Leistungen",
    links: [
      { label: "Alle Leistungen", href: "/leistungen" },
      { label: "BFSG-Signalcheck", href: "/leistungen/bfsg-signalcheck" },
      { label: "Pflichten-Check", href: "/leistungen/pflichten-check" },
      { label: "KI & Büroautomation", href: "/leistungen/ki-bueroautomation" },
      { label: "Monitoring", href: "/monitoring" },
      { label: "Quickcheck", href: "/quickcheck" },
    ],
  },
  {
    heading: "Regionen",
    links: [
      { label: "Lübeck", href: "/branchen" },
      { label: "Kiel", href: "/branchen" },
      { label: "Flensburg", href: "/branchen" },
      { label: "Neumünster", href: "/branchen" },
      { label: "Alle Regionen", href: "/branchen" },
    ],
  },
  {
    heading: "Unternehmen",
    links: [
      { label: "Branchen", href: "/branchen" },
      { label: "Kontakt", href: "/kontakt" },
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-8 md:pt-16 md:pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="mb-5">
              <Logo variant="footer" showLabel={true} />
            </div>
            <p className="text-sm text-navy-foreground/60 leading-relaxed mb-4">
              Mehr Sichtbarkeit. Weniger Website-Risiko. Weniger Büroarbeit.
            </p>
            <p className="text-xs text-navy-foreground/35 leading-relaxed">
              DatenpflegeNord ist die Marke der NordWerk Digital GmbH für technische und
              organisatorische Prüfung, Umsetzungshilfe und digitale Prozessunterstützung.
              Keine Rechtsberatung, keine Steuerberatung und keine behördliche Zertifizierung.
            </p>
          </div>

          {footerCols.map((col) => (
            <div key={col.heading}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-foreground/40 mb-4">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-foreground/60 hover:text-navy-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-navy-foreground/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[11px] text-navy-foreground/35">
            &copy; {new Date().getFullYear()} NordWerk Digital GmbH · Marke DatenpflegeNord.
            Alle Rechte vorbehalten.
          </p>
          <p className="text-[11px] text-navy-foreground/35">
            Keine anwaltliche Rechtsberatung. Technische und strukturelle Vorprüfung.
          </p>
        </div>
      </div>
    </footer>
  )
}
