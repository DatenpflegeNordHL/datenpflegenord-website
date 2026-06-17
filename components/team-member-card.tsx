import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { TeamMember } from "@/content/team"

type TeamMemberCardProps = {
  member: TeamMember
}

/**
 * Placeholder visual for PersonCard when no real photo exists yet.
 * Uses a subtle geometric grid pattern and large watermark initials
 * with a Nord-inspired color palette. Prepares for imageSrc prop.
 *
 * FIXME: Add real portrait image when available:
 *   imageSrc: "/team/dustin-zander.jpg"
 * in content/team.ts. The Image block below will take over automatically.
 */
function PersonCardPlaceholder({ initials }: { initials: string }) {
  return (
    <div className="absolute inset-0 bg-primary overflow-hidden">
      {/* Subtle geometric grid – abstract Nord reference */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-primary-foreground" />
        {/* Diagonal accent lines */}
        <line x1="0" y1="100%" x2="100%" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-primary-foreground opacity-20" />
        <line x1="-20%" y1="100%" x2="80%" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-primary-foreground opacity-10" />
        <line x1="20%" y1="100%" x2="120%" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-primary-foreground opacity-10" />
      </svg>

      {/* Large watermark initials */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="text-[6rem] font-bold tracking-tight text-primary-foreground/10 select-none leading-none">
          {initials}
        </span>
      </div>

      {/* Smaller centered initials badge */}
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="w-20 h-20 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center backdrop-blur-[2px]">
          <span className="text-2xl font-bold text-primary-foreground/70 select-none">
            {initials}
          </span>
        </div>
      </div>

      {/* Bottom fade into card background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--card))",
        }}
        aria-hidden="true"
      />
    </div>
  )
}

function PersonCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col h-full">
      {/* Image / placeholder area */}
      <div className="relative w-full aspect-[3/2] overflow-hidden">
        {member.imageSrc ? (
          <>
            <Image
              src={member.imageSrc}
              alt={`Foto von ${member.name}`}
              fill
              className="object-cover object-top"
            />
            {/* Soft bottom fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 55%, rgba(255,255,255,0.12) 80%, var(--card) 100%)",
              }}
              aria-hidden="true"
            />
          </>
        ) : (
          <PersonCardPlaceholder initials={member.initials} />
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Ansprechpartner badge + name + role */}
        <div>
          <Badge className="text-[10px] bg-accent/10 text-accent border-0 font-semibold mb-2">
            Ansprechpartner
          </Badge>
          <h3 className="font-bold text-foreground leading-snug text-lg">{member.name}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{member.role}</p>
        </div>

        {/* Other badges (skip "Ansprechpartner" – already shown above) */}
        {member.badges && member.badges.filter((b) => b !== "Ansprechpartner").length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {member.badges
              .filter((b) => b !== "Ansprechpartner")
              .map((badge) => (
                <Badge key={badge} variant="secondary" className="text-xs font-normal">
                  {badge}
                </Badge>
              ))}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
      </div>
    </div>
  )
}

/**
 * DepartmentCard – clearly labelled as a Fachbereich, not a person.
 * Uses an abstract icon area instead of avatar initials.
 */
function DepartmentCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-secondary/60 border border-border rounded-2xl p-6 flex flex-col gap-4 h-full">
      {/* Header */}
      <div>
        <Badge variant="outline" className="text-[10px] text-muted-foreground mb-3 font-medium">
          Fachbereich
        </Badge>
        {/* Abstract icon block – no avatar/person initials */}
        <div
          className="w-10 h-10 rounded-xl border border-border bg-background flex items-center justify-center mb-3"
          aria-hidden="true"
        >
          {/* Simple abstract line icon representing a structured system */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25" className="text-muted-foreground" />
            <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25" className="text-muted-foreground" />
            <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25" className="text-muted-foreground" />
            <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.25" className="text-muted-foreground" />
          </svg>
        </div>
        <h3 className="font-bold text-foreground leading-snug text-balance">{member.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
      </div>

      {/* Badges */}
      {member.badges && (
        <div className="flex flex-wrap gap-1.5">
          {member.badges.map((badge) => (
            <Badge key={badge} variant="secondary" className="text-xs font-normal">
              {badge}
            </Badge>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
    </div>
  )
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  if (member.type === "person") {
    return <PersonCard member={member} />
  }
  return <DepartmentCard member={member} />
}
