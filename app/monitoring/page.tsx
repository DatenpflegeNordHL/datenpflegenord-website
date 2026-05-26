import type { Metadata } from "next"
import { ServiceDetailPage } from "@/components/service-detail-page"

export const metadata: Metadata = {
  title: "Audit-Monitoring",
  description:
    "Regelmäßige technische Wiederholprüfungen für Website-Status, Pflichtstellen und offene Aufgaben.",
  alternates: { canonical: "https://datenpflegenord.de/monitoring" },
}
import { getServiceByHref } from "@/content/services"
import { getServiceDetailByHref } from "@/content/service-details"

const href = "/monitoring"

export default function MonitoringPage() {
  return (
    <ServiceDetailPage
      service={getServiceByHref(href)}
      details={getServiceDetailByHref(href)}
    />
  )
}
