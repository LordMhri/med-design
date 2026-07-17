import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/shared/lib/cn'
import { ArrowRight } from './Icon'

type CarouselProps = {
  items: ReactNode[]
  /** Items visible per page at the lg breakpoint (auto-reduces on smaller screens). */
  itemsPerView?: number
  className?: string
  gap?: number
}

/** Resolve a responsive items-per-view + the measured viewport width of the track. */
function useCarouselMetrics(desired: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [perView, setPerView] = useState(desired)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const compute = () => {
      const w = window.innerWidth
      setPerView(w < 640 ? 1 : w < 1024 ? Math.min(2, desired) : desired)
      setWidth(el.clientWidth)
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [desired])

  return { ref, perView, width }
}

/**
 * Lightweight paged carousel: a translating flex track with prev/next controls
 * and an "x / y" indicator matching the mockup. Supports drag on touch.
 */
export function Carousel({ items, itemsPerView = 1, className, gap = 24 }: CarouselProps) {
  const { ref, perView, width } = useCarouselMetrics(itemsPerView)
  const [page, setPage] = useState(0)
  const pages = Math.max(1, Math.ceil(items.length / perView))

  // Keep the page in range when perView changes on resize.
  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1))
  }, [pages])

  const go = useCallback(
    (dir: number) => setPage((p) => Math.min(pages - 1, Math.max(0, p + dir))),
    [pages],
  )

  // Each item spans an equal share of the visible width minus inter-item gaps.
  const itemWidth = useMemo(
    () => (width > 0 ? (width - gap * (perView - 1)) / perView : 0),
    [width, gap, perView],
  )

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div ref={ref} className="overflow-hidden">
        <motion.div
          className="flex"
          style={{ gap }}
          animate={{ x: -page * width }}
          transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          drag="x"
          dragConstraints={{ left: -(pages - 1) * width, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1)
            else if (info.offset.x > 60) go(-1)
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{ width: itemWidth > 0 ? itemWidth : undefined }}
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>

      {pages > 1 ? (
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <CarouselButton dir={-1} disabled={page === 0} onClick={() => go(-1)} />
            <CarouselButton dir={1} disabled={page === pages - 1} onClick={() => go(1)} />
          </div>
          <span className="text-sm font-semibold tabular-nums text-slate-body">
            {page + 1}/{pages}
          </span>
        </div>
      ) : null}
    </div>
  )
}

function CarouselButton({
  dir,
  disabled,
  onClick,
}: {
  dir: 1 | -1
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 1 ? 'Next' : 'Previous'}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-200 hover:bg-ink hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink',
      )}
    >
      <ArrowRight className={cn('h-4 w-4', dir === -1 && 'rotate-180')} />
    </button>
  )
}
