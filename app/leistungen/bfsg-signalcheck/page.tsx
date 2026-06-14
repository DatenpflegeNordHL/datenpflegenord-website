import type { Metadata } from "next"
import { ServiceDetailPage } from "@/components/service-detail-page"
import { getServiceByHref } from "@/content/services"
import { getServiceDetailByHref } from "@/content/service-details"

export const metadata: Metadata = {
  title: "BFSG-Signalcheck",
  description:
    "Technische Vorprüfung von BFSG- und Barrierefreiheits-Signalen für Websites, Shops und digitale Kontaktwege.",
  alternates: { canonical: "https://datenpflege-nord.de/leistungen/bfsg-signalcheck" },
}

const href = "/leistungen/bfsg-signalcheck"

export default function BfsgSignalcheckPage() {
  return (
    <ServiceDetailPage
      service={getServiceByHref(href)}
      details={getServiceDetailByHref(href)}
    />
  )
}
