import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { cn } from '@/shared/lib/cn'

// Native drag/animation handlers collide with Framer Motion's own — drop them.
type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
>

type Variant = 'primary' | 'outline' | 'ghost' | 'pill'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:bg-accent-hover shadow-sm',
  outline: 'border border-white/25 text-white hover:bg-white/10',
  ghost: 'text-ink hover:bg-ink/5',
  pill: 'bg-accent/15 text-accent hover:bg-accent/25 backdrop-blur',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-base',
}

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-60 disabled:pointer-events-none'

const hover = { y: -2 }
const tap = { scale: 0.97 }

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<NativeButtonProps, 'className' | 'children'> & {
    to?: undefined
    href?: undefined
  }

type ButtonAsLink = CommonProps & { to: string; href?: undefined }
type ButtonAsAnchor = CommonProps & { href: string; to?: undefined }

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, ...rest },
  ref,
) {
  const classes = cn(baseClass, variants[variant], sizes[size], className)

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...linkRest } = rest as ButtonAsLink
    return (
      <motion.div className="inline-flex" whileHover={hover} whileTap={tap}>
        <Link to={to} className={classes} {...(linkRest as object)}>
          {children}
        </Link>
      </motion.div>
    )
  }

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={hover}
        whileTap={tap}
        {...(anchorRest as object)}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      className={classes}
      whileHover={hover}
      whileTap={tap}
      {...(rest as HTMLMotionProps<'button'>)}
    >
      {children}
    </motion.button>
  )
})
