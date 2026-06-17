export function NorthernHeroFade() {
  return (
    <div className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 760 520"
        className="absolute -left-16 top-0 h-full w-[760px] max-w-none opacity-60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="northernFade" x1="0" y1="0" x2="760" y2="520">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.10" />
            <stop offset="52%" stopColor="var(--accent)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="760" height="520" fill="url(#northernFade)" />

        {[70, 140, 210, 280, 350, 420].map((y) => (
          <line
            key={`h-${y}`}
            x1="40"
            y1={y}
            x2="650"
            y2={y}
            stroke="var(--primary)"
            strokeOpacity="0.08"
            strokeDasharray="4 12"
          />
        ))}
        {[90, 170, 250, 330, 410, 490, 570].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="35"
            x2={x}
            y2="455"
            stroke="var(--primary)"
            strokeOpacity="0.07"
            strokeDasharray="3 13"
          />
        ))}

        <path
          d="M92 402 C148 372 184 340 213 295 C235 262 270 252 304 230 C346 202 374 166 421 150 C466 135 506 118 548 84"
          stroke="var(--primary)"
          strokeWidth="1.4"
          strokeOpacity="0.16"
          strokeLinecap="round"
        />
        <path
          d="M138 430 C183 404 220 374 252 336 C285 296 324 284 358 254 C391 224 423 200 470 187 C512 175 548 155 600 124"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeOpacity="0.13"
          strokeLinecap="round"
        />
        <path
          d="M112 360 C154 346 190 334 230 306 C271 278 297 255 337 246 C378 237 411 209 454 196"
          stroke="var(--primary)"
          strokeWidth="0.8"
          strokeOpacity="0.11"
          strokeLinecap="round"
        />

        {[
          { label: "Kiel", x: 354, y: 174 },
          { label: "Lübeck", x: 498, y: 322 },
          { label: "Hamburg", x: 430, y: 390 },
          { label: "SH", x: 300, y: 244 },
        ].map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="3" fill="var(--accent)" fillOpacity="0.55" />
            <circle cx={point.x} cy={point.y} r="9" stroke="var(--accent)" strokeOpacity="0.16" />
            <text
              x={point.x + 10}
              y={point.y + 4}
              fontSize="10"
              fill="var(--primary)"
              fillOpacity="0.34"
              fontFamily="var(--font-inter), sans-serif"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--background)_0%,color-mix(in_oklch,var(--background)_94%,transparent)_34%,transparent_72%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_18%,transparent_72%,var(--background)_100%)]" />
    </div>
  )
}
