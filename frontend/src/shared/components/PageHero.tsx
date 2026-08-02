import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/shared/components/Container'
import { fadeInUp, staggerContainer } from '@/shared/lib/motion'

type Props = {
  /** Title nodes: wrap part of the text in <span className="text-accent"> for the green accent. */
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
    <section className="relative w-full pb-10 sm:pt-4 sm:pb-16">
      <div className="relative">
        {/* Frame: full-bleed on mobile, PNG mask from sm+ */}
        <div className="hero-frame hero-mask overflow-hidden">
          <img
            src="/hero-bg.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[68%_center] opacity-40 sm:object-center sm:opacity-60"
          />
          <div className="absolute inset-0 bg-ink/60 sm:bg-ink/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/50 sm:from-ink/90 sm:via-transparent sm:to-ink/30" />
        </div>

        <Container className="absolute inset-0 z-10 flex items-center justify-center px-4 pt-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))] sm:px-6 sm:pt-0">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="show"
            className="flex w-full flex-col items-center justify-center text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="max-w-4xl text-2xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl landscape:text-xl landscape:sm:text-5xl"
            >
              {title}
            </motion.h1>
            {subtitle ? (
              <motion.p
                variants={fadeInUp}
                className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-white/85 sm:mt-6 sm:text-base sm:text-white/70 landscape:mt-2 landscape:text-xs"
              >
                {subtitle}
              </motion.p>
            ) : null}
            {children ? (
              <motion.div variants={fadeInUp} className="mt-6 landscape:mt-3">
                {children}
              </motion.div>
            ) : null}
          </motion.div>
        </Container>
      </div>
    </section>
  )
}

