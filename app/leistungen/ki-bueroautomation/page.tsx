import type { Metadata } from "next"
import { ServiceDetailPage } from "@/components/service-detail-page"

export const metadata: Metadata = {
  title: "KI & Büroautomation",
  description:
    "Pragmatische KI- und Automationsansätze für wiederkehrende Büroprozesse, Dokumente, E-Mails und Rechnungen.",
  alternates: { canonical: "https://datenpflegenord.de/leistungen/ki-bueroautomation" },
}
import { getServiceByHref } from "@/content/services"
import { getServiceDetailByHref } from "@/content/service-details"

const href = "/leistungen/ki-bueroautomation"

export default function KiBueroautomationPage() {
  return (
    <ServiceDetailPage
      service={getServiceByHref(href)}
      details={getServiceDetailByHref(href)}
    />
  )
}
