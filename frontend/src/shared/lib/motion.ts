import type { Variants } from 'framer-motion'

/**
 * Centralized motion presets. Framer Motion automatically respects the user's
 * `prefers-reduced-motion` setting when `MotionConfig reducedMotion="user"` is
 * set at the root (see RootLayout), collapsing transforms to opacity-only.
 */

export const easeOut = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
}

/** Parent container that staggers its children into view. */
export const staggerContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

/** Standard reveal props for scroll-triggered sections. */
export const revealOnce = {
  initial: 'hidden' as const,
  whileInView: 'show' as const,
  viewport: { once: true, amount: 0.2 },
}

/** Page transition used by AnimatePresence around routes. */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: easeOut } },
}

export const overlayTransition: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export const drawerTransition: Variants = {
  hidden: { x: '100%' },
  show: { x: 0, transition: { type: 'spring', stiffness: 320, damping: 34 } },
  exit: { x: '100%', transition: { duration: 0.25, ease: easeOut } },
}

export const dropdownTransition: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: easeOut } },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.14 } },
}
