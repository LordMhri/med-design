import { cn } from '@/shared/lib/cn'

type Props = {
  name: string
  className?: string
  tone?: 'accent' | 'muted'
}

/** Initial-based avatar circle (used in testimonials). */
export function Avatar({ name, className, tone = 'accent' }: Props) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <span
      className={cn(
        'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold',
        tone === 'accent' ? 'bg-accent text-ink' : 'bg-ink/10 text-ink',
        className,
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}
