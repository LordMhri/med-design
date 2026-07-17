import { motion } from 'framer-motion'
import { PageHero } from '@/shared/components/PageHero'
import { Container } from '@/shared/components/Container'
import { ContactForm } from '@/shared/components/ContactForm'
import { Mail, Phone } from '@/shared/components/Icon'
import { fadeInUp, revealOnce, staggerContainer } from '@/shared/lib/motion'
import { CONTACT_INFO } from '../data'

export default function Contact() {
  return (
    <div className="bg-ink">
      <PageHero
        title={
          <>
            GET IN <span className="text-accent">TOUCH</span>
          </>
        }
      />

      <Container className="pb-20 lg:pb-28">
        <motion.div variants={staggerContainer(0.1)} {...revealOnce}>
          {/* Info row */}
          <div className="mb-10 grid gap-5 lg:grid-cols-3">
            <motion.div
              variants={fadeInUp}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm font-semibold text-white">Have a question?</p>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="mt-2 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 text-accent" /> {CONTACT_INFO.email}
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm font-semibold text-white">Speak to Someone?</p>
              <div className="mt-2 flex flex-col gap-1">
                {CONTACT_INFO.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-accent"
                  >
                    <Phone className="h-4 w-4 text-accent" /> {phone}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between rounded-3xl bg-accent p-6"
            >
              <div>
                <p className="text-sm font-semibold text-ink/70">Ready to chat?</p>
                <p className="text-xl font-extrabold text-ink">Let&apos;s talk</p>
              </div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/10 text-ink">
                <Phone className="h-6 w-6" />
              </span>
            </motion.div>
          </div>

          <ContactForm />
        </motion.div>
      </Container>
    </div>
  )
}
