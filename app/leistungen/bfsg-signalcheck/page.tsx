import { ServiceDetailPage } from "@/components/service-detail-page"
import { services } from "@/content/services"

const service = services.find((s) => s.href === "/leistungen/bfsg-signalcheck")!

export default function BfsgSignalcheckPage() {
  return <ServiceDetailPage service={service} />
}
