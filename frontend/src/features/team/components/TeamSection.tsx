import { useEffect, useState } from 'react'
import { Section } from '@/shared/components/Section'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { TeamCard } from './TeamCard'
import { TEAM, type Member } from '../data'
// import { teamApi } from '@/api/services/team'

const INTRO =
  'At MEDesign, we combine creative design, strategy, and data-driven marketing to help healthcare brands grow with purpose.'

/** "Meet our team" section shared between Home and About pages. */
export function TeamSection() {
  const [members, setMembers] = useState<Member[]>(TEAM)

  useEffect(() => {
    // Dynamic API team fetch disabled temporarily until admin dashboard rollout.
    // let cancelled = false
    // teamApi
    //   .getAll()
    //   .then((items) => {
    //     if (cancelled || items.length === 0) return
    //     setMembers(
    //       items.map((m) => ({
    //         name: m.name,
    //         role: m.position,
    //         image: m.image,
    //       })),
    //     )
    //   })
    //   .catch(() => {
    //     /* keep static fallback */
    //   })
    // return () => {
    //   cancelled = true
    // }
    setMembers(TEAM)
  }, [])

  return (
    <Section>
      <SectionHeading title="Meet our team" description={INTRO} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member, i) => (
          <TeamCard key={`${member.name}-${i}`} member={member} />
        ))}
      </div>
    </Section>
  )
}
