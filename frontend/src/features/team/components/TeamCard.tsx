import { motion } from 'framer-motion'
import { Placeholder } from '@/shared/components/Placeholder'
import { fadeInUp } from '@/shared/lib/motion'
import type { Member } from '../data'

/** Portrait-led team card: name sits under the photo, not on a heavy ink bar. */
export function TeamCard({ member }: { member: Member }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group"
    >
      {member.image ? (
        <div className="aspect-[4/5] w-full overflow-hidden rounded-[1.75rem]">
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <Placeholder
          tone="dark"
          label="Portrait"
          className="aspect-[4/5] w-full rounded-[1.75rem] transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
      <div className="pt-4">
        <h3 className="text-base font-bold text-ink">{member.name}</h3>
        <p className="mt-1 text-xs font-medium leading-snug tracking-wide text-slate-body sm:text-[0.8125rem]">
          {member.role}
        </p>
      </div>
    </motion.article>
  )
}
