import type { ComponentType, SVGProps } from 'react'
import { cn } from '@/shared/lib/cn'

type Props = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  className?: string
  tone?: 'soft' | 'dark'
}

/** Rounded icon badge used on service / value cards (mint background). */
export function IconChip({ icon: Icon, className, tone = 'soft' }: Props) {
  return (
    <span
      className={cn(
        'inline-flex h-12 w-12 items-center justify-center rounded-2xl',
        tone === 'soft' ? 'bg-accent-soft text-accent' : 'bg-accent/15 text-accent',
        className,
      )}
    >
      <Icon className="h-6 w-6" />
    </span>
  )
}
