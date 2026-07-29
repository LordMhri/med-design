import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/shared/lib/cn'
import { fadeInUp } from '@/shared/lib/motion'

type Props = {
  title: ReactNode
  /** Optional descriptive copy shown to the right (desktop) / below (mobile). */
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}

/**
 * Section heading that mirrors the mockup pattern: a large display title on the
 * left with a muted paragraph aligned to the right.
 */
export function SectionHeading({
  title,
  description,
  align = 'left',
  tone = 'dark',
  className,
}: Props) {
  return (
    <div
      className={cn(
        'mb-8 flex flex-col gap-3 sm:mb-10 sm:gap-4 lg:mb-14',
        align === 'center'
          ? 'items-center text-center'
          : 'lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <motion.h2
        variants={fadeInUp}
        className={cn(
          'max-w-xl text-2xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]',
          align === 'center' && 'mx-auto',
          tone === 'dark' ? 'text-ink' : 'text-white',
        )}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeInUp}
          className={cn(
            'max-w-md text-sm leading-relaxed',
            align === 'center' && 'mx-auto',
            tone === 'dark' ? 'text-slate-body' : 'text-white/70',
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  )
}
