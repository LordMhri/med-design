import { useEffect, useState } from 'react'
import { Section } from '@/shared/components/Section'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { TeamCard } from './TeamCard'
import { TEAM, type Member } from '../data'

const INTRO =
  'Designers, clinicians, and engineers: one studio shaping how healthcare brands show up.'

/** "Meet our team" section shared between Home and About pages. */
export function TeamSection() {
  const [members, setMembers] = useState<Member[]>(TEAM)

  useEffect(() => {
    // Dynamic API team fetch disabled temporarily until admin dashboard rollout.
    setMembers(TEAM)
  }, [])

  return (
    <Section>
      <SectionHeading title="Meet our team" description={INTRO} />
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {members.map((member, i) => (
          <TeamCard key={`${member.name}-${i}`} member={member} />
        ))}
      </div>
    </Section>
  )
}
