import { forwardRef, useId } from 'react'
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/shared/lib/cn'
import { ChevronDown } from './Icon'

const fieldBase =
  'w-full rounded-xl border border-white/10 bg-ink/40 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-colors duration-200 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30'

/** Label + helper wrapper for a form control. */
export function FormField({
  label,
  htmlFor,
  required,
  className,
  children,
}: {
  label: string
  htmlFor?: string
  required?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-white">
        {label} {required ? <span className="text-accent">*</span> : null}
      </label>
      {children}
    </div>
  )
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(fieldBase, className)} {...props} />
  },
)

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(fieldBase, 'resize-none', className)} {...props} />
})

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & { placeholder?: string }
>(function Select({ className, children, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(fieldBase, 'appearance-none pr-10', className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
    </div>
  )
})

/** Selectable chip used in the "You're Interested In" group. */
export function Chip({
  selected,
  children,
  onClick,
}: {
  selected: boolean
  children: ReactNode
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      aria-pressed={selected}
      className={cn(
        'rounded-xl border px-4 py-3 text-center text-sm font-medium transition-colors duration-200',
        selected
          ? 'border-accent bg-accent/15 text-white'
          : 'border-white/10 bg-ink/30 text-white/80 hover:border-white/25 hover:text-white',
      )}
    >
      {children}
    </motion.button>
  )
}

/** Branded range slider with live value + endpoint labels. */
export function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1000,
  onChange,
  format,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  format: (v: number) => string
}) {
  const id = useId()
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-sm font-semibold text-white">
        {label} — <span className="text-accent">{format(value)}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-accent h-1.5 w-full cursor-pointer appearance-none rounded-full"
        style={{
          background: `linear-gradient(to right, #66C797 ${pct}%, rgba(255,255,255,0.15) ${pct}%)`,
        }}
      />
      <div className="flex justify-between text-xs text-white/50">
        <span>{format(min)}</span>
        <span>{format(max)}+</span>
      </div>
    </div>
  )
}
