import { motion } from 'framer-motion'
import { PageHero } from '@/shared/components/PageHero'
import { Section } from '@/shared/components/Section'
import { Container } from '@/shared/components/Container'
import { SectionHeading } from '@/shared/components/SectionHeading'
import { IconChip } from '@/shared/components/IconChip'
import { Placeholder } from '@/shared/components/Placeholder'
import { TeamSection } from '../components/TeamSection'
import { Check } from '@/shared/components/Icon'
import { fadeInUp, revealOnce, slideInLeft, slideInRight, staggerContainer } from '@/shared/lib/motion'
import { VALUES, ABOUT_STATS as STORY_STATS, COMPANY_REASONS as WHY_CHOOSE } from '../aboutData'

export default function About() {
  return (
    <>
      <PageHero
        title={<span className="text-accent">About</span>}
        subtitle="At MEDesign, we bridge the gap between medicine and marketing. Our team of healthcare‑savvy creatives helps hospitals, clinics, and medical brands tell their stories with clarity, trust, and innovation — from strategy to visuals, and from concept to patient connection."
      />

      <OurStory />
      <TeamSection />
      <MissionValues />
      <WhyChoose />
    </>
  )
}

function OurStory() {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div variants={slideInLeft} {...revealOnce} className="flex justify-center">
          <div className="relative">
            <Placeholder
              tone="dark"
              label="Portrait"
              className="aspect-square w-72 rounded-full sm:w-80"
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-accent/30" />
          </div>
        </motion.div>

        <motion.div variants={slideInRight} {...revealOnce} className="flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Our <span className="text-accent">Story</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-body">
            MEDesign was founded by Eyasu Kebede in 2022, a visionary with over three years of
            experience in medical design and marketing. With a passion for blending creativity and
            healthcare expertise, Eyasu established MEDesign to address a critical need: helping
            healthcare providers communicate their services effectively in an increasingly digital
            and patient-focused world.
          </p>
          <p className="text-sm leading-relaxed text-slate-body">
            Today, MEDesign serves as a trusted partner for hospitals, clinics, wellness brands, and
            healthcare businesses across Ethiopia — offering comprehensive solutions that drive
            growth and patient engagement.
          </p>

          <div className="mt-2 flex flex-wrap gap-4">
            {STORY_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-card"
              >
                <IconChip icon={stat.icon} />
                <div>
                  <p className="text-lg font-extrabold text-ink">{stat.value}</p>
                  <p className="text-xs text-slate-muted">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function MissionValues() {
  return (
    <Section className="bg-slate-50">
      <SectionHeading
        align="center"
        title={
          <>
            Vision <span className="text-accent">&amp; Mission</span>
          </>
        }
        description="What drives us every day."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {VALUES.map((value) => (
          <motion.article
            key={value.title}
            variants={fadeInUp}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="flex h-full flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
          >
            <IconChip icon={value.icon} />
            <h3 className="text-lg font-bold text-ink">{value.title}</h3>
            <p className="text-sm leading-relaxed text-slate-body">{value.description}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}

function WhyChoose() {
  return (
    <Container className="pb-20 lg:pb-28">
      <motion.div
        variants={staggerContainer(0.1)}
        {...revealOnce}
        className="relative overflow-hidden rounded-4xl bg-ink px-8 py-14 sm:px-12 lg:px-16"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(102,199,151,0.16),transparent_45%)]"
          aria-hidden="true"
        />
        <div className="relative">
          <motion.h2
            variants={fadeInUp}
            className="mb-10 text-center text-2xl font-extrabold text-white sm:text-4xl"
          >
            Why Choose <span className="text-accent">MEDesign?</span>
          </motion.h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {WHY_CHOOSE.map((reason) => (
              <motion.div
                key={reason.title}
                variants={fadeInUp}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-accent/40"
              >
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
                  <Check className="h-5 w-5" strokeWidth={2.4} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{reason.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Container>
  )
}
