import { cn } from '@/shared/lib/cn'

type Props = {
  className?: string
  tone?: 'dark' | 'light'
  label?: string
}

/**
 * Neutral image placeholder with the correct aspect handling. Stands in for the
 * stock imagery used in the mockup until real assets are supplied.
 */
export function Placeholder({ className, tone = 'dark', label }: Props) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        tone === 'dark'
          ? 'bg-gradient-to-br from-ink to-ink-deep'
          : 'bg-gradient-to-br from-slate-100 to-slate-200',
        className,
      )}
      role="img"
      aria-label={label ?? 'Placeholder image'}
    >
      <span
        className={cn(
          'absolute inset-0',
          tone === 'dark'
            ? 'bg-[radial-gradient(circle_at_30%_20%,rgba(102,199,151,0.18),transparent_55%)]'
            : 'bg-[radial-gradient(circle_at_30%_20%,rgba(102,199,151,0.22),transparent_55%)]',
        )}
      />
      {label ? (
        <span
          className={cn(
            'relative text-xs font-medium uppercase tracking-widest',
            tone === 'dark' ? 'text-white/30' : 'text-ink/30',
          )}
        >
          {label}
        </span>
      ) : null}
    </div>
  )
}
