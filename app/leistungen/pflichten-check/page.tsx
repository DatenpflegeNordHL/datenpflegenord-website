import { ServiceDetailPage } from "@/components/service-detail-page"
import { services } from "@/content/services"

const service = services.find((s) => s.href === "/leistungen/pflichten-check")!

export default function PflichtenCheckPage() {
  return <ServiceDetailPage service={service} />
}
