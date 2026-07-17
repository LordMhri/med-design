import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

/** Small green pill label (e.g. the "Top Rates" tags on case studies). */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Uppercase eyebrow label that sits above section titles. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent',
        className,
      )}
    >
      {children}
    </span>
  )
}
