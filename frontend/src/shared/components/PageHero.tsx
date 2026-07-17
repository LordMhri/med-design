import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/shared/components/Container'
import { fadeInUp, staggerContainer } from '@/shared/lib/motion'

type Props = {
  /** Title nodes — wrap part of the text in <span className="text-accent"> for the green accent. */
  title: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
  /** Smaller hero for inner pages vs. the tall home hero. */
  size?: 'md' | 'lg'
}

/**
 * Masked display page hero matching the design pattern from the mockup.
 * Used across inner pages (Services, About, Work, Contact, Blog).
 */
export function PageHero({ title, subtitle, children }: Props) {
  return (
    <section className="relative w-full pt-4 pb-12 sm:pb-16">
      <div className="relative">
        {/* Masked frame — height driven by native aspect ratio, not content */}
        <div className="hero-frame hero-mask overflow-hidden">
          <img
            src="/hero-bg.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-ink/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/30" />
        </div>

        <Container className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col items-center justify-center text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="max-w-4xl text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
            >
              {title}
            </motion.h1>
            {subtitle ? (
              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 mx-auto"
              >
                {subtitle}
              </motion.p>
            ) : null}
            {children ? (
              <motion.div variants={fadeInUp} className="mt-8">
                {children}
              </motion.div>
            ) : null}
          </motion.div>
        </Container>
      </div>
    </section>
  )
}

