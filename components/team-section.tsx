"use client"

import { teamMembers } from "@/content/team"
import { TeamMemberCard } from "@/components/team-member-card"
import { useInView } from "@/hooks/use-in-view"

export function TeamSection() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.07 })

  const personMembers = teamMembers.filter((m) => m.type === "person")
  const departmentMembers = teamMembers.filter((m) => m.type === "department")

  return (
    <section ref={sectionRef} className="py-14 md:py-20 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className="max-w-2xl mb-10"
          style={{
            transition: "opacity 0.7s ease, transform 0.7s ease",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-accent mb-3">
            Team & Fachbereiche
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-3">
            Persönlich erreichbar, technisch fokussiert
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            DatenpflegeNord verbindet technische Prüfung, klare Priorisierung und verständliche
            Umsetzung. Keine Rechtsberatung, keine Zertifizierungsversprechen – sondern
            nachvollziehbare Arbeit an konkreten digitalen Prozessen und Website-Signalen.
          </p>
        </div>

        {/* Person cards – full width row, larger visual weight */}
        {personMembers.length > 0 && (
          <div className="mb-5">
            {personMembers.map((member, i) => (
              <div
                key={member.initials}
                className="max-w-sm"
                style={{
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                  transitionDelay: `${i * 100}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        )}

        {/* Department cards – side-by-side, visually subordinate */}
        {departmentMembers.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-5">
            {departmentMembers.map((member, i) => (
              <div
                key={member.initials}
                style={{
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                  transitionDelay: `${(personMembers.length + i) * 120}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
