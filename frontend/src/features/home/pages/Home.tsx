import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/shared/components/Section'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { Carousel } from '@/shared/components/Carousel'
import { Footer } from '@/shared/components/Footer'
import { TestimonialCard } from '@/shared/components/TestimonialCard'
import { TeamSection } from '@/features/team/components/TeamSection'
import { ArrowRight, ChevronDown } from '@/shared/components/Icon'
import { easeOut, fadeInUp, revealOnce, staggerContainer } from '@/shared/lib/motion'
import { fetchProjects, type Project } from '@/features/projects/data'
import { PARTNER_NAMES, TESTIMONIALS } from '@/features/team/data'

type Scene = 'hero' | 'main'

export default function Home() {
  return <HomeStaged />
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Staged scenes: full viewport swap (mobile + desktop)                 */
/* ────────────────────────────────────────────────────────────────────── */
function HomeStaged() {
  const reduceMotion = useReducedMotion()
  const [scene, setScene] = useState<Scene>('hero')
  const locking = useRef(false)
  const mainRef = useRef<HTMLElement>(null)
  const touchY = useRef(0)

  useEffect(() => {
    document.body.classList.add('home-staged')
    return () => {
      document.body.classList.remove('home-staged')
      document.body.classList.remove('home-staged-main')
    }
  }, [])

  // Signal navbar: white scene needs solid bar + dark logo (window scroll stays at 0).
  useEffect(() => {
    document.body.classList.toggle('home-staged-main', scene === 'main')
  }, [scene])

  const transition = useMemo(
    () => ({
      duration: reduceMotion ? 0.01 : 0.75,
      ease: easeOut,
    }),
    [reduceMotion],
  )

  const goMain = useCallback(() => {
    if (locking.current || scene === 'main') return
    locking.current = true
    setScene('main')
    window.setTimeout(() => {
      locking.current = false
    }, reduceMotion ? 20 : 780)
  }, [reduceMotion, scene])

  const goHero = useCallback(() => {
    if (locking.current || scene === 'hero') return
    locking.current = true
    setScene('hero')
    window.setTimeout(() => {
      locking.current = false
    }, reduceMotion ? 20 : 780)
  }, [reduceMotion, scene])

  // Wheel: commit to the other scene (not a soft scroll blend).
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (locking.current) {
        e.preventDefault()
        return
      }

      if (scene === 'hero' && e.deltaY > 12) {
        e.preventDefault()
        goMain()
        return
      }

      if (scene === 'main' && e.deltaY < -12) {
        const panel = mainRef.current
        if (panel && panel.scrollTop <= 2) {
          e.preventDefault()
          goHero()
        }
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [goHero, goMain, scene])

  // Keyboard: same discrete scene jump as wheel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (locking.current) return
      const keysDown = e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' '
      const keysUp = e.key === 'ArrowUp' || e.key === 'PageUp'

      if (scene === 'hero' && keysDown) {
        e.preventDefault()
        goMain()
        return
      }

      if (scene === 'main' && keysUp) {
        const panel = mainRef.current
        if (panel && panel.scrollTop <= 2) {
          e.preventDefault()
          goHero()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goHero, goMain, scene])

  const onTouchStart = (e: React.TouchEvent) => {
    touchY.current = e.touches[0]?.clientY ?? 0
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (locking.current) return
    const endY = e.changedTouches[0]?.clientY ?? touchY.current
    const dy = touchY.current - endY

    if (scene === 'hero' && dy > 56) {
      goMain()
      return
    }

    if (scene === 'main' && dy < -56) {
      const panel = mainRef.current
      if (panel && panel.scrollTop <= 2) goHero()
    }
  }

  return (
    <div
      className="relative h-dvh w-full overflow-hidden bg-white"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Spacer so layout main keeps height while scenes are fixed */}
      <div className="h-dvh" aria-hidden />

      {/*
        sync: both panes move together so the ink/white underlay never
        peeks through (mode=wait caused the brief dark-green flash).
      */}
      <AnimatePresence initial={false} mode="sync">
        {scene === 'hero' ? (
          <motion.div
            key="scene-hero"
            className="fixed inset-0 z-40 bg-ink"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={transition}
          >
            <HomeHero onContinue={goMain} />
          </motion.div>
        ) : (
          <motion.section
            key="scene-main"
            ref={mainRef}
            className="fixed inset-0 z-30 overflow-y-auto overscroll-y-contain bg-white pt-[max(4.75rem,calc(env(safe-area-inset-top)+3.75rem))]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={transition}
          >
            <div className="relative min-h-dvh">
              <LatestProjects />
              <Partnerships />
              <TeamSection />
              <Footer />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Hero                                                                 */
/* ────────────────────────────────────────────────────────────────────── */
function HomeHero({ onContinue }: { onContinue: () => void }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative h-full w-full">
      <div className="relative h-full w-full">
        <div className="hero-frame hero-frame-viewport h-full min-h-0 overflow-hidden !rounded-none">
          <img
            src="/hero-bg.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[68%_center] opacity-45 sm:object-center sm:opacity-55"
          />
          <div className="absolute inset-0 bg-ink/55 sm:bg-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/50 sm:from-ink/90 sm:via-ink/25 sm:to-ink/55" />
        </div>

        <div className="absolute inset-0 z-10 flex w-full flex-col px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(4.25rem,calc(env(safe-area-inset-top)+3rem))] sm:px-12 sm:pb-28 sm:pt-[max(5rem,calc(env(safe-area-inset-top)+4rem))] lg:px-16">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="show"
            className="flex flex-1 flex-col items-center justify-center text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="w-full max-w-none text-[2.125rem] font-extrabold leading-[1.12] tracking-tight text-white sm:max-w-3xl sm:text-5xl lg:text-[3.75rem]"
            >
              <span className="sm:hidden">
                Healthcare marketing
                <br />
                that builds <span className="text-accent">Trust.</span>
              </span>
              <span className="hidden sm:inline">
                Creative Marketing for
                <br />
                Healthcare That Builds
                <br />
                <span className="text-accent">Trust.</span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-4 w-full max-w-sm text-sm leading-relaxed text-white/85 sm:mt-6 sm:max-w-xl sm:text-white/70"
            >
              Design, strategy, and data-driven marketing for hospitals, clinics, and healthcare brands.
              <span className="hidden sm:inline">
                {' '}
                Built to inspire confidence and lasting connections.
              </span>
            </motion.p>
          </motion.div>

          {/* Mobile continue */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.45 }}
            className="flex w-full flex-col items-center gap-3 sm:hidden"
          >
            <button
              type="button"
              onClick={onContinue}
              className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 text-sm font-bold text-ink transition-colors hover:bg-accent-hover"
            >
              See our work
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onContinue}
              className="flex flex-col items-center gap-0.5 text-white/55 transition-colors hover:text-white/85"
              aria-label="Swipe up for work"
            >
              <ChevronDown
                className={reduceMotion ? 'h-5 w-5' : 'h-5 w-5 animate-bounce'}
              />
            </button>
          </motion.div>
        </div>

        {/* Desktop continue: same scene jump as wheel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute inset-x-0 bottom-0 z-10 hidden items-center justify-between gap-4 px-6 pb-8 sm:flex lg:px-8 lg:pb-10"
        >
          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-white p-1.5 shadow-sm">
            <span className="h-10 w-10 rounded-full bg-ink" />
            <span className="h-10 w-10 rounded-full bg-accent" />
            <span className="h-10 w-10 rounded-full bg-ink" />
            <span className="h-10 w-10 rounded-full bg-accent" />
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="ml-auto flex max-w-[900px] flex-1 items-center justify-end rounded-full bg-accent px-8 py-4 text-sm font-bold text-ink transition-colors hover:bg-accent-hover"
          >
            See our work
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Latest Projects                                                      */
/* ────────────────────────────────────────────────────────────────────── */
function LatestProjects() {
  const [page, setPage] = useState(0)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    let cancelled = false
    fetchProjects()
      .then((items) => {
        if (!cancelled) setProjects(items.slice(0, 6))
      })
      .catch(() => {
        if (!cancelled) setProjects([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  const [perView, setPerView] = useState(2)
  useEffect(() => {
    const updatePerView = () => {
      if (window.innerWidth < 640) setPerView(1)
      else if (window.innerWidth < 1024) setPerView(2)
      else setPerView(2)
    }
    updatePerView()
    window.addEventListener('resize', updatePerView)
    return () => window.removeEventListener('resize', updatePerView)
  }, [])

  const pages = Math.ceil(projects.length / perView) || 1

  const go = useCallback(
    (dir: number) => setPage((p) => Math.min(pages - 1, Math.max(0, p + dir))),
    [pages],
  )

  const trackRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const compute = () => setTrackWidth(el.clientWidth)
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const gap = 24
  const cardWidth = useMemo(
    () => (trackWidth > 0 ? (trackWidth - gap * (perView - 1)) / perView : 0),
    [trackWidth, perView, gap],
  )

  return (
    <Section className="max-sm:pb-8 max-sm:pt-2">
      <motion.div
        variants={staggerContainer(0.1)}
        {...revealOnce}
        viewport={{ once: true, amount: 0.2 }}
        className="grid items-start gap-6 lg:grid-cols-12 lg:items-center lg:gap-12"
      >
        {/* Mobile: compact bar. Desktop: short side column (no reused pitch). */}
        <motion.div
          variants={fadeInUp}
          className="flex items-end justify-between gap-4 lg:col-span-5 lg:flex-col lg:items-start lg:gap-5"
        >
          <div>
            <span className="inline-flex rounded-full border border-accent/40 bg-accent/5 px-3.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent sm:px-4 sm:py-1.5 sm:text-xs">
              Selected work
            </span>
            <h2 className="mt-3 hidden max-w-sm text-3xl font-extrabold leading-snug text-ink sm:block lg:text-[2rem]">
              Recent work for clinics and hospitals.
            </h2>
          </div>
          <Link
            to="/work"
            className="inline-flex shrink-0 items-center rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-ink/90 sm:mt-1 sm:px-8 sm:py-3.5 sm:text-sm lg:mt-2"
          >
            More works
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
          </Link>
        </motion.div>

        <motion.div variants={fadeInUp} className="relative w-full overflow-hidden lg:col-span-7">
          <div ref={trackRef} className="overflow-hidden">
            <motion.div
              className="flex"
              style={{ gap }}
              animate={{ x: -page * (trackWidth + gap) }}
              transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            >
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="shrink-0"
                  style={{ width: cardWidth > 0 ? cardWidth : undefined }}
                >
                  <LatestProjectCard project={p} />
                </div>
              ))}
            </motion.div>
          </div>

          {pages > 1 ? (
            <div className="mt-5 flex items-center gap-3 sm:mt-8 sm:justify-end">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={page === 0}
                aria-label="Previous"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-200 hover:bg-ink hover:text-white disabled:opacity-30 sm:h-11 sm:w-11 sm:border-accent sm:text-accent sm:hover:bg-accent sm:hover:text-ink"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={page === pages - 1}
                aria-label="Next"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-200 hover:bg-ink hover:text-white disabled:opacity-30 sm:h-11 sm:w-11 sm:border-accent sm:text-accent sm:hover:bg-accent sm:hover:text-ink"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold tabular-nums text-slate-body sm:hidden">
                {page + 1}/{pages}
              </span>
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </Section>
  )
}

function LatestProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[1.75rem] bg-ink shadow-card hover:shadow-card-hover sm:rounded-[2rem]"
    >
      {project.image ? (
        <img
          src={project.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : null}
      <Link to={`/work/${project.slug}`} className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
        <div className="relative z-10">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent">
            {project.category}
          </p>
          <h3 className="mt-1.5 text-lg font-bold leading-snug text-white sm:text-xl">
            {project.title}
          </h3>
        </div>
      </Link>
    </motion.article>
  )
}

function Partnerships() {
  return (
    <Section className="bg-slate-50">
      <SectionHeading
        align="center"
        title={
          <>
            Partner<span className="text-accent">ships</span>
          </>
        }
        description="We're proud to collaborate with leading hospitals, clinics, and healthcare brands across Ethiopia."
      />

      <div className="relative mb-10 overflow-hidden sm:mb-14 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 sm:gap-16">
          {[...PARTNER_NAMES, ...PARTNER_NAMES].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-sm font-semibold tracking-wide text-ink/45 sm:text-base"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <p className="mb-6 text-center text-xs text-slate-body sm:mb-8">
        Official partner marks coming soon. Names shown for now.
      </p>

      <motion.div variants={staggerContainer()} {...revealOnce}>
        <Carousel
          itemsPerView={3}
          items={TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        />
      </motion.div>
    </Section>
  )
}
