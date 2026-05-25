import { teamMembers } from "@/content/team"
import { TeamMemberCard } from "@/components/team-member-card"

export function TeamSection() {
  return (
    <section className="py-14 md:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
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
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.initials} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
