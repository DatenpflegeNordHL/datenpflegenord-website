"use client"

import { teamMembers } from "@/content/team"
import { TeamMemberCard } from "@/components/team-member-card"
import { useInView } from "@/hooks/use-in-view"

const cardDelays = [0, 120, 240]

export function TeamSection() {
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.08 })

  return (
    <section ref={sectionRef} className="py-14 md:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-2xl mb-10 transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-tight mb-3">
            Persönlich erreichbar, technisch fokussiert
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            DatenpflegeNord verbindet technische Prüfung, klare Priorisierung und verständliche
            Umsetzung. Keine Rechtsberatung, keine Zertifizierungsversprechen – sondern
            nachvollziehbare Arbeit an konkreten digitalen Pflichtstellen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {teamMembers.map((member, i) => (
            <div
              key={member.initials}
              className={`transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{ transitionDelay: `${cardDelays[i] ?? 0}ms` }}
            >
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
