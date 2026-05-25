import { ServiceDetailPage } from "@/components/service-detail-page"
import { getServiceByHref } from "@/content/services"
import { getServiceDetailByHref } from "@/content/service-details"

const href = "/leistungen/pflichten-check"

export default function PflichtenCheckPage() {
  return (
    <ServiceDetailPage
      service={getServiceByHref(href)}
      details={getServiceDetailByHref(href)}
    />
  )
}
