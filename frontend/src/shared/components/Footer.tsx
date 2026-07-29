import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/shared/components/Container'
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Facebook } from '@/shared/components/Icon'
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
  { label: 'Marketing Materials, Events & Creative Support', to: '/services' },
]

const SOCIALS = [
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { label: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
]

export function Footer() {
  return (
    <footer className="bg-ink text-white rounded-br-4xl">
      <motion.div variants={staggerContainer(0.08)} {...revealOnce}>
        <Container className="py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <motion.div variants={fadeInUp} className="flex flex-col gap-4">
              <h2 className="text-4xl font-extrabold text-accent sm:text-5xl">Let&apos;s</h2>
              <nav aria-label="Company" className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-white">Company</p>
                {COMPANY_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="text-sm text-white/60 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </motion.div>

            <motion.nav variants={fadeInUp} aria-label="Services" className="flex flex-col gap-4">
              <h2 className="text-4xl font-extrabold sm:text-5xl">Services</h2>
              <div className="flex flex-col gap-3">
                {SERVICE_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="text-sm text-white/60 transition-colors hover:text-accent break-words"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.nav>

            <motion.div variants={fadeInUp} className="flex flex-col gap-4">
              <h2 className="text-4xl font-extrabold sm:text-5xl">Connect</h2>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-white">Contact</p>
                <a
                  href="mailto:hello@medesign.com"
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4 text-accent" /> hello@medesign.com
                </a>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-accent"
                >
                  <Phone className="h-4 w-4 text-accent" /> +1 (555) 123-4567
                </a>
                <p className="flex items-start gap-2 text-sm text-white/60">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> 123 Design Street,
                  Creative City, CC 12345
                </p>
                <div className="mt-2 flex items-center gap-3">
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
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            className="mt-12 border-t border-white/10 pt-8"
          >
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} MEDesign. All rights reserved.
            </p>
          </motion.div>
        </Container>
      </motion.div>
    </footer>
  )
}
