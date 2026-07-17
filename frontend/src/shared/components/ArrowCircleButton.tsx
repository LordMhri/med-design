import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/shared/lib/cn'
import { ArrowRight } from './Icon'

type Props = {
  to?: string
  onClick?: () => void
  className?: string
  ariaLabel?: string
  size?: 'sm' | 'md'
}

const sizeMap = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
}

/** The green circular arrow button used on project/case-study cards. */
export function ArrowCircleButton({
  to,
  onClick,
  className,
  ariaLabel = 'View more',
  size = 'md',
}: Props) {
  const classes = cn(
    'group inline-flex items-center justify-center rounded-full bg-accent text-ink transition-colors duration-200 hover:bg-accent-hover',
    sizeMap[size],
    className,
  )

  const inner = (
    <motion.span
      className="inline-flex h-full w-full items-center justify-center"
      whileHover={{ rotate: -45 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
    </motion.span>
  )

  if (to) {
    return (
      <Link to={to} aria-label={ariaLabel} className={classes}>
        {inner}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={ariaLabel} className={classes}>
        {inner}
      </button>
    )
  }

  return (
    <div className={classes}>
      {inner}
    </div>
  )
}
