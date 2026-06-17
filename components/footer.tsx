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
    <footer className="bg-[#080808] text-white">
      <div className="max-w-[1400px] mx-auto px-8 pt-20 pb-10 flex flex-col items-center text-center">

        {/* Logo */}
        <div className="mb-8">
          <Logo variant="footer" showLabel={false} width={52} height={52} />
        </div>

        {/* Nav links — single row, spaced caps */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12" aria-label="Footer Navigation">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[10px] tracking-[0.24em] font-light uppercase text-white/40 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social icons — exactly like Demo 22 */}
        <div className="flex items-center gap-5 mb-12" aria-label="Social Media">
          {/* LinkedIn */}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/40 hover:text-white transition-colors duration-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/40 hover:text-white transition-colors duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/40 hover:text-white transition-colors duration-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          {/* X / Twitter */}
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-white/40 hover:text-white transition-colors duration-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/8 mb-8" />

        {/* Copyright */}
        <p className="font-sans text-[10px] tracking-[0.18em] font-light text-white/25 uppercase">
          &copy; {new Date().getFullYear()} DatenpflegeNord &middot; Keine anwaltliche Rechtsberatung
        </p>

      </div>
    </footer>
  )
}
