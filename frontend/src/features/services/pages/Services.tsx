import { motion } from 'framer-motion'
import { PageHero } from '@/shared/components/PageHero'
import { Section } from '@/shared/components/Section'
import { Container } from '@/shared/components/Container'
import { Button } from '@/shared/components/Button'
import { IconChip } from '@/shared/components/IconChip'
import { ServiceCard } from '../components/ServiceCard'
import { Star } from '@/shared/components/Icon'
import { fadeInUp, revealOnce, scaleIn } from '@/shared/lib/motion'
import { SERVICES } from '../data'

export default function Services() {
  return (
    <>
      <PageHero
        title={<>Servic<span className="text-accent">es</span></>}
        subtitle="At MEDesign, we combine creative design, strategy, and data-driven marketing to help healthcare brands grow with purpose."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </Section>

      <CustomCtaBand />
    </>
  )
}

function CustomCtaBand() {
  return (
    <Container className="pb-20 lg:pb-28">
      <motion.div
        variants={scaleIn}
        {...revealOnce}
        className="relative overflow-hidden rounded-4xl bg-navy px-8 py-14 text-center sm:px-12 lg:px-16"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(102,199,151,0.18),transparent_45%)]"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center gap-6">
          <IconChip icon={Star} tone="dark" className="h-14 w-14 rounded-2xl" />
          <motion.h2
            variants={fadeInUp}
            className="max-w-2xl text-2xl font-extrabold text-white sm:text-4xl"
          >
            Need more? We&apos;ll create something{' '}
            <span className="text-accent">custom</span> for you.
          </motion.h2>
          <motion.p variants={fadeInUp} className="max-w-xl text-sm leading-relaxed text-white/70">
            Whatever your healthcare brand needs, we&apos;ll build a tailored package that aligns
            with your goals — combining strategy, design, and marketing to deliver real results.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button to="/contact" size="lg">
              Let&apos;s discuss
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </Container>
  )
}
