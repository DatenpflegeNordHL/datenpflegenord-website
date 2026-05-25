import { ServiceDetailPage } from "@/components/service-detail-page"
import { services } from "@/content/services"

const service = services.find((s) => s.href === "/leistungen/ki-bueroautomation")!

export default function KiBueroautomationPage() {
  return <ServiceDetailPage service={service} />
}
