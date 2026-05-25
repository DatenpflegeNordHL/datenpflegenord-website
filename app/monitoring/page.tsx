import { ServiceDetailPage } from "@/components/service-detail-page"
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
