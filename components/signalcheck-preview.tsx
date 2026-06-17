const scoreRows = [
  { label: "Lokale Sichtbarkeit", value: "62 / 100", width: "62%", tone: "bg-amber-500" },
  { label: "Technik & Struktur", value: "44 / 100", width: "44%", tone: "bg-destructive" },
  { label: "KI-Verständlichkeit", value: "Hoch", width: "84%", tone: "bg-accent" },
  { label: "Kontakt & Vertrauen", value: "71 / 100", width: "71%", tone: "bg-primary" },
]

const sidebarItems = ["Überblick", "Website-Signale", "KI-Potenzial", "Maßnahmen", "Monitoring"]
const nextSteps = [
  "Kontaktwege vereinfachen",
  "LocalBusiness-Daten ergänzen",
  "wiederkehrende Kundenanfragen automatisieren",
]

export function SignalcheckPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="motion-scale animate-scale-in rounded-2xl border border-border bg-white shadow-[0_18px_50px_-28px_rgba(26,46,82,0.45)] overflow-hidden signalcheck-float">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-primary">DatenpflegeNord Signalcheck</p>
              <p className="text-[11px] text-slate-500">Website: beispielbetrieb-sh.de</p>
            </div>
            <p className="text-[11px] font-medium text-accent">Region: Schleswig-Holstein</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-[128px_1fr]">
          <aside className="hidden border-r border-slate-200 bg-slate-50/80 p-3 sm:block">
            <div className="flex flex-col gap-1">
              {sidebarItems.map((item, index) => (
                <span
                  key={item}
                  className={`rounded-md px-2.5 py-1.5 text-[11px] ${
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "text-slate-500"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </aside>

          <div className="grid gap-4 p-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-4">
              <div className="grid gap-3">
                {scoreRows.map((row) => (
                  <div key={row.label} className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-slate-700">{row.label}</span>
                      <span className="text-xs font-semibold text-primary">{row.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100">
                      <div className={`h-full rounded-full ${row.tone}`} style={{ width: row.width }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                <div>
                  <p className="text-lg font-bold text-primary">7</p>
                  <p className="text-[10px] text-slate-500">priorisierte Maßnahmen</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-600">3</p>
                  <p className="text-[10px] text-slate-500">schnelle Korrekturen</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-accent">1</p>
                  <p className="text-[10px] text-slate-500">KI-Prozess empfohlen</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="mb-3 text-sm font-semibold text-primary">Nächste Schritte</p>
              <div className="flex flex-col gap-2.5">
                {nextSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-bold text-accent">
                      {index + 1}
                    </span>
                    <span className="text-xs leading-relaxed text-slate-600">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes signalcheck-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .signalcheck-float {
          animation: signalcheck-float 6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .signalcheck-float {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
