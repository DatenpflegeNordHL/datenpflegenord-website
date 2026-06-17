import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { TeamMember } from "@/content/team"

type TeamMemberCardProps = {
  member: TeamMember
}

function PersonCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
      {/* Image area with soft bottom fade */}
      <div className="relative w-full aspect-[4/3] bg-secondary overflow-hidden">
        {member.imageSrc ? (
          <>
            <Image
              src={member.imageSrc}
              alt={`Foto von ${member.name}`}
              fill
              className="object-cover"
            />
            {/* Soft bottom fade */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.55) 100%)",
              }}
              aria-hidden="true"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-5xl font-bold text-primary/20 select-none"
              aria-hidden="true"
            >
              {member.initials}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Name + role */}
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Badge className="text-[10px] bg-accent/10 text-accent border-0 font-medium">
              Ansprechpartner
            </Badge>
          </div>
          <h3 className="font-bold text-foreground text-balance leading-snug text-lg mt-2">
            {member.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{member.role}</p>
        </div>

        {/* Tags */}
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

function DepartmentCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-secondary/60 border border-border rounded-2xl p-6 flex flex-col gap-4">
      {/* Header */}
      <div>
        <Badge variant="outline" className="text-[10px] text-muted-foreground mb-3">
          Fachbereich
        </Badge>
        <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3">
          <span className="text-xs font-bold text-primary select-none">{member.initials}</span>
        </div>
        <h3 className="font-bold text-foreground text-balance leading-snug">{member.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
      </div>

      {/* Tags */}
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
