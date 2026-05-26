import type { Metadata } from "next"
import { ServiceDetailPage } from "@/components/service-detail-page"
import { getServiceByHref } from "@/content/services"
import { getServiceDetailByHref } from "@/content/service-details"

export const metadata: Metadata = {
  title: "Pflichten-Check",
  description:
    "Technische Sortierung digitaler Pflichtstellen wie E-Rechnung, LUCID, Widerrufsbutton, Green Claims und Basisstruktur.",
  alternates: { canonical: "https://datenpflegenord.de/leistungen/pflichten-check" },
}

const href = "/leistungen/pflichten-check"

export default function PflichtenCheckPage() {
  return (
    <ServiceDetailPage
      service={getServiceByHref(href)}
      details={getServiceDetailByHref(href)}
    />
  )
}
