import type { Metadata } from "next"
import { ServiceDetailPage } from "@/components/service-detail-page"
import { getServiceByHref } from "@/content/services"
import { getServiceDetailByHref } from "@/content/service-details"

export const metadata: Metadata = {
  title: "KI & Büroautomation",
  description:
    "Pragmatische KI- und Automationsansätze für wiederkehrende Büroprozesse, Dokumente, E-Mails und Rechnungen.",
  alternates: { canonical: "https://datenpflege-nord.de/leistungen/ki-bueroautomation" },
}

const href = "/leistungen/ki-bueroautomation"

export default function KiBueroautomationPage() {
  return (
    <ServiceDetailPage
      service={getServiceByHref(href)}
      details={getServiceDetailByHref(href)}
    />
  )
}
