import { motion } from 'framer-motion'
import { IconChip } from '@/shared/components/IconChip'
import type { ServiceItem } from '../data'

export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-card hover:shadow-card-hover cursor-pointer flex flex-col items-start gap-4"
    >
      <IconChip icon={service.icon} />
      <h3 className="text-xl font-bold text-ink mt-2">{service.title}</h3>
      <p className="text-sm text-slate-body leading-relaxed">{service.description}</p>
    </motion.div>
  )
}

