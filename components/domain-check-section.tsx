import { DomainChecker } from "@/components/domain-checker"

export function DomainCheckSection() {
  return (
    <section className="border-y border-border bg-secondary/35 py-10 md:py-12">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-accent">
            Website-Schnellcheck
          </p>
          <h2 className="mb-3 text-2xl font-bold leading-tight text-foreground text-balance md:text-3xl">
            Website-Schnellcheck als Einstieg
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Der Schnellcheck zeigt erste technische Signale und mögliche digitale Schwachstellen.
            Danach ist klarer, ob ein Website-Check, Monitoring oder ein KI-Prozesscheck sinnvoll
            ist.
          </p>
        </div>

        <div className="mx-auto w-full max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
          <DomainChecker />
        </div>
      </div>
    </section>
  )
}
