import { ServiceDetailPage } from "@/components/service-detail-page"
import { services } from "@/content/services"

const service = services.find((s) => s.href === "/monitoring")!

export default function MonitoringPage() {
  return <ServiceDetailPage service={service} />
}
