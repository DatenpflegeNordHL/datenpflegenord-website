import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { TeamMember } from "@/content/team"

type TeamMemberCardProps = {
  member: TeamMember
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
      {/* Avatar */}
      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
        {member.imageSrc ? (
          <Image
            src={member.imageSrc}
            alt={member.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <span className="text-lg font-semibold text-primary select-none">
              {member.initials}
            </span>
          </div>
        )}
      </div>

      {/* Name + role */}
      <div>
        <h3 className="font-bold text-foreground text-balance leading-snug">{member.name}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{member.role}</p>
      </div>

      {/* Focus badge */}
      <Badge variant="secondary" className="text-xs w-fit">
        {member.focus}
      </Badge>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
    </div>
  )
}
