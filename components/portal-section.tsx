import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import {
  ArrowRight,
  Globe,
  Calendar,
  AlertTriangle,
  CheckCircle,
  FileText,
  Clock,
  Cpu,
  Activity,
  BarChart3,
  Share2,
  Gauge,
  type LucideIcon,
} from "lucide-react"

const dashboardCards = [
  { label: "Geprüfte Domain", value: "beispiel-kmu.de", icon: Globe },
  { label: "Letzter Scan", value: "12. Juni 2026", icon: Calendar },
  { label: "Nächster Scan", value: "12. Juli 2026", icon: Clock },
  { label: "Neue Findings", value: "7", icon: AlertTriangle, highlight: true },
  { label: "Behobene Findings", value: "12", icon: CheckCircle, positive: true },
  { label: "PDF-Reports", value: "3 verfügbar", icon: FileText },
  { label: "Offene Freigaben", value: "2 Human-in-the-loop", icon: Cpu },
]

interface TileItem {
  title: string
  text: string
  icon: LucideIcon
}

const portalTiles: TileItem[] = [
  {
    title: "Website-Status",
    text: "Geprüfte Domain, letzter Scan, nächster Scan und aktueller Status.",
    icon: Gauge,
  },
  {
    title: "Findings & Verlauf",
    text: "Neue Findings, behobene Findings und unveränderte kritische Auffälligkeiten.",
    icon: Activity,
  },
  {
    title: "Reports & Fix-Liste",
    text: "PDF-Reports, Audit-Historie, Screenshots, Evidence und technische Fix-Liste.",
    icon: BarChart3,
  },
  {
    title: "Zusammenarbeit mit IT-Haus",
    text: "Share-Link für Dienstleister, damit technische Punkte sauber übergeben werden können.",
    icon: Share2,
  },
  {
    title: "KI-Prozessstatus",
    text: "Aktive KI-Prozesse, offene Freigaben und Human-in-the-loop-Aufgaben.",
    icon: Cpu,
  },
]

export function PortalSection() {
  return (
    <section id="portal" className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* Subtle watermark - very low opacity */}
      <div className="absolute right-0 bottom-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <div className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] opacity-[0.04] translate-x-1/3 translate-y-1/3">
          <Logo variant="watermark" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Audit- und KI-Kundenportal: Status, Historie und Aufgaben an einem Ort
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Das Kundenportal macht sichtbar, was geprüft wurde, was neu ist, was behoben wurde
            und wo Freigaben oder nächste Schritte offen sind.
          </p>
        </div>

        {/* Dashboard mock */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-10">
          {/* Mock browser bar */}
          <div className="bg-secondary/60 border-b border-border px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
              <div className="w-3 h-3 rounded-full bg-border" />
            </div>
            <div className="flex-1 mx-4 bg-background/80 rounded px-3 py-1 text-xs text-muted-foreground border border-border">
              portal.datenpflege-nord.de
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-foreground">Kundenportal</h3>
                <p className="text-xs text-muted-foreground">NordAudit & KI-Prozesse</p>
              </div>
              <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                Aktiv
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {dashboardCards.map(({ label, value, icon: Icon, highlight, positive }) => (
                <div
                  key={label}
                  className={`rounded-xl p-4 border ${
                    highlight
                      ? "bg-destructive/5 border-destructive/20"
                      : positive
                      ? "bg-accent/5 border-accent/20"
                      : "bg-secondary/50 border-border"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        highlight ? "text-destructive" : positive ? "text-accent" : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                  <p
                    className={`font-semibold text-sm ${
                      highlight
                        ? "text-destructive"
                        : positive
                        ? "text-accent"
                        : "text-foreground"
                    }`}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portal tiles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {portalTiles.map(({ title, text, icon: Icon }) => (
            <div
              key={title}
              className="relative bg-secondary/40 border border-border rounded-xl p-5 overflow-hidden"
            >
              {/* Watermark icon */}
              <div
                className="absolute -right-2 -bottom-2 pointer-events-none select-none"
                aria-hidden="true"
              >
                <Icon
                  className="w-16 h-16 md:w-20 md:h-20 text-primary opacity-[0.05]"
                  strokeWidth={1}
                />
              </div>

              <div className="relative z-10">
                <h4 className="font-semibold text-foreground text-sm mb-1.5">{title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#pakete">
              Portal-Demo anfragen <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
