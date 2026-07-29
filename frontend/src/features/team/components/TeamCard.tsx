import { motion } from 'framer-motion'
import { Placeholder } from '@/shared/components/Placeholder'
import { fadeInUp } from '@/shared/lib/motion'
import type { Member } from '../data'

/** Dark team member card with portrait + name + role (pages 1 & 3). */
export function TeamCard({ member }: { member: Member }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group overflow-hidden rounded-3xl bg-ink shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      {member.image ? (
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <Placeholder
          tone="dark"
          label="Portrait"
          className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="p-5">
        <h3 className="text-base font-bold text-white">{member.name}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">
          {member.role}
        </p>
      </div>
    </motion.article>
  )
}
