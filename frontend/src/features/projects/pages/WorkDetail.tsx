import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/shared/components/Container'
import { Section } from '@/shared/components/Section'
import { Button } from '@/shared/components/Button'
import { Logo } from '@/shared/components/Logo'
import { Eyebrow } from '@/shared/components/Tag'
import { CaseStudyRow } from '../components/CaseStudyRow'
import { ArrowRight } from '@/shared/components/Icon'
import { fadeInUp, staggerContainer } from '@/shared/lib/motion'
import { fetchProject, fetchProjects, type Project } from '../data'

export default function WorkDetail() {
  const { slug } = useParams()
  const [rows, setRows] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const [focused, all] = await Promise.all([
          slug ? fetchProject(slug) : Promise.resolve(undefined),
          fetchProjects(),
        ])
        if (cancelled) return
        const next = focused
          ? [focused, ...all.filter((p) => p.slug !== focused.slug)].slice(0, 4)
          : all.slice(0, 4)
        setRows(next)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <>
      <DetailHero />

      <Section className="bg-slate-50">
        <Eyebrow className="mb-8 block">Latest</Eyebrow>
        {loading ? (
          <p className="text-slate-body">Loading case studies…</p>
        ) : (
          <div className="flex flex-col gap-8">
            {rows.map((p, i) => (
              <CaseStudyRow key={p.id} project={p} flip={i % 2 === 1} />
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Button to="/work" variant="ghost">
            Back to all work
          </Button>
        </div>
      </Section>
    </>
  )
}

function DetailHero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-28 lg:pt-32">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(102,199,151,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,28,38,0.4),rgba(23,35,45,0.95))]" />
      </div>

      <Container className="relative">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center py-16 text-center lg:py-24"
        >
          <motion.div variants={fadeInUp}>
            <Logo className="text-5xl sm:text-6xl" withDot />
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/70"
          >
            We're not just another marketing agency—we specialize in the medical field, delivering
            results that elevate your brand in the competitive healthcare market.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8">
            <Button to="/contact" variant="pill" size="lg">
              Start your project
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
