import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PortalDashboardClient } from "@/components/portal/portal-dashboard-client"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Portal Dashboard | DatenpflegeNord",
  description:
    "Ergebnisansicht für CompanyProfile, Empfehlungen, TrustSignal Scan und KI-Sichtbarkeitsmonitoring Beta.",
}

export default function PortalDashboardPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              <Button asChild variant="ghost" size="sm" className="w-fit px-0 hover:bg-transparent">
                <Link href="/portal" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Zurück zum Portal
                </Link>
              </Button>
              <div className="max-w-3xl">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                  Dashboard
                </p>
                <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground text-balance md:text-4xl">
                  Ergebnisansicht für das CompanyProfile
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  Die Ansicht zeigt Profil, Empfehlungen, TrustSignal-Vorschau, GEO-Beta, Aufgaben
                  und Assistenten-Preview. Es gibt noch kein Kundenkonto, kein Billing und kein
                  echtes GEO-Monitoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PortalDashboardClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
