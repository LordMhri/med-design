import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/shared/lib/cn'
import { Container } from './Container'
import { revealOnce, staggerContainer } from '@/shared/lib/motion'

type SectionProps = {
  children: ReactNode
  className?: string
  containerClassName?: string
  /** Render without the inner Container wrapper. */
  bleed?: boolean
  id?: string
}

/** Vertical-rhythm section wrapper with a scroll-reveal stagger container. */
export function Section({
  children,
  className,
  containerClassName,
  bleed = false,
  id,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn('py-12 sm:py-16 lg:py-24', className)}
      variants={staggerContainer()}
      {...revealOnce}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </motion.section>
  )
}
