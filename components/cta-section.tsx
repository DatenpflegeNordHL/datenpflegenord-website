import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection({
  onWebpflichtClick,
  onBetriebskiClick,
}: {
  onWebpflichtClick: () => void
  onBetriebskiClick: () => void
}) {
  return (
    <section id="kontakt" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
          Mehr Klarheit für Website und Unternehmensprozesse.
        </h2>
        <p className="text-primary-foreground/80 max-w-xl mx-auto leading-relaxed mb-8">
          Starten Sie mit einem BFSG Schnellcheck oder sprechen Sie mit uns über einen konkreten Prozess,
          der in Ihrem Unternehmen regelmäßig Zeit bindet.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={onWebpflichtClick}
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Barrierefreiheits-Audit anfragen <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            onClick={onBetriebskiClick}
            variant="outline"
            size="lg"
            className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            KI Prozesscheck anfragen
          </Button>
        </div>
      </div>
    </section>
  )
}
