type City = {
  id: string
  label: string
  x: number
  y: number
  primary?: boolean
}

const cities: City[] = [
  { id: "flensburg", label: "Flensburg", x: 62, y: 12 },
  { id: "kiel", label: "Kiel", x: 72, y: 40 },
  { id: "neumuenster", label: "Neumünster", x: 58, y: 58 },
  { id: "luebeck", label: "Lübeck", x: 84, y: 68, primary: true },
]

const connections: [string, string][] = [
  ["flensburg", "kiel"],
  ["kiel", "neumuenster"],
  ["kiel", "luebeck"],
  ["neumuenster", "luebeck"],
]

function getCityById(id: string) {
  return cities.find((c) => c.id === id)
}

export function SHMapVisual() {
  return (
    <div
      className="bg-card border border-border rounded-2xl p-4 shadow-sm"
      role="img"
      aria-label="Schematische Karte Schleswig-Holstein mit den Standorten Flensburg, Kiel, Neumünster und Lübeck"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block w-2 h-2 rounded-full bg-primary/60 shrink-0" aria-hidden="true" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Schleswig-Holstein
        </span>
      </div>

      <svg
        viewBox="0 0 120 100"
        className="w-full h-auto max-h-36"
        aria-hidden="true"
      >
        {/* Background region shape (abstract outline) */}
        <path
          d="M30 10 Q45 5 65 8 Q85 10 95 22 Q105 38 98 58 Q92 75 80 82 Q65 90 48 85 Q32 80 24 68 Q16 55 20 38 Q24 22 30 10Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="3 2"
          className="text-border"
        />

        {/* Connection lines */}
        {connections.map(([aId, bId]) => {
          const a = getCityById(aId)
          const b = getCityById(bId)
          if (!a || !b) return null
          return (
            <line
              key={`${aId}-${bId}`}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="2 1.5"
              className="text-primary/25"
            />
          )
        })}

        {/* City dots + labels */}
        {cities.map((city) => (
          <g key={city.id}>
            {city.primary && (
              <circle
                cx={city.x} cy={city.y} r={6}
                fill="currentColor"
                className="text-primary/10"
              />
            )}
            <circle
              cx={city.x} cy={city.y} r={city.primary ? 3 : 2}
              fill="currentColor"
              className={city.primary ? "text-primary" : "text-primary/50"}
            />
            <text
              x={city.x + (city.x > 70 ? -4 : 4)}
              y={city.y - 5}
              fontSize="6"
              textAnchor={city.x > 70 ? "end" : "start"}
              className="fill-muted-foreground"
              fontWeight={city.primary ? "600" : "400"}
            >
              {city.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
