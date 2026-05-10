import {
  Scale,
  Accessibility,
  Shield,
  FileText,
  Cookie,
  Server,
  Smartphone,
  Search,
  type LucideIcon,
} from "lucide-react"

interface AreaItem {
  title: string
  text: string
  icon: LucideIcon
}

const areas: AreaItem[] = [
  {
    title: "BFSG-Relevanz",
    text: "Hinweise, ob eine vertiefte Bewertung zur Barrierefreiheit sinnvoll sein kann.",
    icon: Scale,
  },
  {
    title: "Barrierefreiheit",
    text: "Technische Accessibility-Hinweise, zum Beispiel Kontraste, Struktur, Labels und Bedienbarkeit.",
    icon: Accessibility,
  },
  {
    title: "Datenschutz-Hinweise",
    text: "Prüfung sichtbarer Datenschutzelemente und grundlegender Hinweise.",
    icon: Shield,
  },
  {
    title: "Impressum-Basics",
    text: "Strukturelle Prüfung, ob zentrale Impressumsbereiche auffindbar sind.",
    icon: FileText,
  },
  {
    title: "Cookie-/Consent-Struktur",
    text: "Hinweise zur sichtbaren Consent-Struktur und Einbindung externer Dienste.",
    icon: Cookie,
  },
  {
    title: "Technik & Sicherheit",
    text: "Technische Auffälligkeiten, HTTPS, Header, Fehlerseiten und Basis-Sicherheit.",
    icon: Server,
  },
  {
    title: "Ladezeit & Mobile Darstellung",
    text: "Performance-Hinweise und mobile Nutzbarkeit.",
    icon: Smartphone,
  },
  {
    title: "SEO & Local SEO",
    text: "Meta-Daten, Indexierbarkeit, Überschriftenstruktur, lokale Signale und technische SEO-Basics.",
    icon: Search,
  },
]

export function PruefbereicheSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Was WebPflicht Monitor prüft
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm">
            Die Prüfung kombiniert automatisierte Scans mit strukturierten Hinweisen. Rechtliche
            Detailbewertungen erfolgen nicht automatisiert und ersetzen keine anwaltliche Beratung.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {areas.map(({ title, text, icon: Icon }) => (
            <div
              key={title}
              className="relative bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Watermark background icon */}
              <div
                className="absolute -right-4 -bottom-4 md:-right-3 md:-bottom-3 pointer-events-none select-none"
                aria-hidden="true"
              >
                <Icon
                  className="w-24 h-24 md:w-28 md:h-28 text-primary opacity-[0.06]"
                  strokeWidth={1}
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-2 h-2 rounded-full bg-accent mb-3" />
                <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
