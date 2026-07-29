import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Section } from '@/shared/components/Section'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { Carousel } from '@/shared/components/Carousel'
import { Logo } from '@/shared/components/Logo'
import { TestimonialCard } from '@/shared/components/TestimonialCard'
import { TeamSection } from '@/features/team/components/TeamSection'
import { ArrowRight } from '@/shared/components/Icon'
import { fadeInUp, revealOnce, staggerContainer } from '@/shared/lib/motion'
import { fetchProjects, type Project } from '@/features/projects/data'
import { TESTIMONIALS } from '@/features/team/data'


export default function Home() {
  return (
    <>
      <HomeHero />
      <LatestProjects />
      <Partnerships />
      <TeamSection />
    </>
  )
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Hero — full-width background image with left-aligned text            */
/* ────────────────────────────────────────────────────────────────────── */
function HomeHero() {
  return (
    <section className="relative w-full pt-4 pb-16 sm:pb-20">
      <div className="relative">
        {/* Masked frame — height driven by native aspect ratio, not content */}
        <div className="hero-frame hero-mask overflow-hidden">
          <img
            src="/hero-bg.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-ink/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/30" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-12 lg:px-16">
          <motion.div
            variants={staggerContainer(0.14)}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="max-w-3xl text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.75rem] mx-auto"
            >
              Creative Marketing for
              <br />
              Healthcare That Builds
              <br />
              <span className="text-accent">Trust.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 mx-auto"
            >
              We help hospitals, clinics, and healthcare brands grow with purpose — combining design, strategy, and data‑driven marketing to inspire confidence and lasting connections.
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom bar: circles left + green CTA right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 z-10 flex translate-y-1/2 items-center justify-between gap-4 px-2 sm:px-3 lg:px-4"
        >
        {/* Circles container (aligned with bottom-left cutout) */}
        <div className="flex items-center gap-1.5 rounded-full bg-white p-1.5 shadow-sm shrink-0">
          <span className="h-10 w-10 rounded-full bg-ink" />
          <span className="h-10 w-10 rounded-full bg-accent" />
          <span className="h-10 w-10 rounded-full bg-ink" />
          <span className="h-10 w-10 rounded-full bg-accent" />
        </div>

        {/* Wide green bar with "Get Started" (aligned with bottom-right cutout) */}
        <a
          href="/contact"
          className="flex flex-1 max-w-[360px] sm:max-w-[900px] ml-auto items-center justify-between rounded-full bg-accent px-8 py-4 text-sm font-bold text-ink transition-colors hover:bg-accent-hover"
        >
          <span />
          <span className="flex items-center">
            Let&apos;s build your healthcare brand together
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Latest Projects — left text + right carousel cards                   */
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

  const pages = Math.ceil(projects.length / perView)

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
    <Section>
      <div className="grid gap-12 lg:grid-cols-12 items-center">
        {/* Left column - Heading & CTA */}
        <div className="lg:col-span-5 flex flex-col items-start text-left gap-6">
          <span className="inline-flex rounded-full border border-accent/40 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            latest projects
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink leading-snug">
            At MEDesign, we combine creative design, strategy, and data-driven marketing to help healthcare brands grow with purpose.
          </h2>
          <Link
            to="/work"
            className="inline-flex rounded-full bg-ink px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-ink/90 mt-2"
          >
            More Works
          </Link>
        </div>

        {/* Right column - Carousel */}
        <div className="lg:col-span-7 w-full overflow-hidden relative">
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

          {/* Carousel arrows */}
          {pages > 1 && (
            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={page === 0}
                aria-label="Previous"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent text-accent transition-colors duration-200 hover:bg-accent hover:text-ink disabled:opacity-30"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={page === pages - 1}
                aria-label="Next"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent text-accent transition-colors duration-200 hover:bg-accent hover:text-ink disabled:opacity-30"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

/** Dark card matching the mockup page-1.png with text overlayed inside the block at the bottom. */
function LatestProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative aspect-[4/5] w-full bg-ink rounded-[2rem] overflow-hidden shadow-card hover:shadow-card-hover cursor-pointer"
    >
      {project.image ? (
        <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      <Link to={`/work/${project.slug}`} className="absolute inset-0 p-6 flex flex-col justify-end">
        {/* Dark overlay background for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-90" />
        
        {/* Text content inside the card */}
        <div className="relative z-10">
          <p className="text-white text-lg font-bold leading-snug line-clamp-3">
            {project.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Partnerships                                                         */
/* ────────────────────────────────────────────────────────────────────── */
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

      {/* Logo marquee */}
      <div className="relative mb-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16">
          {Array.from({ length: 10 }).map((_, i) => (
            <Logo key={i} variant="dark" className="text-2xl opacity-60" />
          ))}
        </div>
      </div>

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
