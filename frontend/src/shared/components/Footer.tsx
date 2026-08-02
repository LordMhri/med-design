import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/shared/components/Container'
import { Mail, Instagram, Linkedin, Twitter, Facebook } from '@/shared/components/Icon'
import { fadeInUp, revealOnce, staggerContainer } from '@/shared/lib/motion'

const COMPANY_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/work' },
  { label: 'Blog', to: '/blog' },
]

const SERVICE_LINKS = [
  { label: 'Branding & Identity', to: '/services' },
  { label: 'Marketing & Growth', to: '/services' },
  { label: 'Multimedia Production', to: '/services' },
  { label: 'Website & Digital Solutions', to: '/services' },
  { label: 'Events & Creative Support', to: '/services' },
]

const SOCIALS = [
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { label: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
]

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <motion.div variants={staggerContainer(0.08)} {...revealOnce}>
        <Container className="py-14 lg:py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            <motion.div variants={fadeInUp} className="sm:col-span-2 lg:col-span-5">
              <h2 className="text-3xl font-extrabold text-accent sm:text-4xl">
                Let&apos;s talk.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
                Ready to build a healthcare brand patients trust? Reach out and we&apos;ll start with a short discovery call.
              </p>
              <a
                href="mailto:hello@medesign.com"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 text-accent" /> hello@medesign.com
              </a>
              <p className="mt-2 text-sm text-white/45">Based in Addis Ababa, Ethiopia</p>
              <div className="mt-5 flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-accent hover:text-ink"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.nav variants={fadeInUp} aria-label="Company" className="lg:col-span-3">
              <p className="text-sm font-semibold text-white">Company</p>
              <div className="mt-4 flex flex-col gap-3">
                {COMPANY_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="text-sm text-white/60 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.nav>

            <motion.nav variants={fadeInUp} aria-label="Services" className="lg:col-span-4">
              <p className="text-sm font-semibold text-white">Services</p>
              <div className="mt-4 flex flex-col gap-3">
                {SERVICE_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="break-words text-sm text-white/60 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          </div>

          <motion.div variants={fadeInUp} className="mt-12 border-t border-white/10 pt-8">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} MEDesign. All rights reserved.
            </p>
          </motion.div>
        </Container>
      </motion.div>
    </footer>
  )
}
