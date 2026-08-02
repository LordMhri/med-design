import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/shared/lib/cn'
import { Logo } from '@/shared/components/Logo'
import { Button } from '@/shared/components/Button'
import { Close, Menu } from '@/shared/components/Icon'
import { drawerTransition, overlayTransition } from '@/shared/lib/motion'

const NAV_LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overLightScene, setOverLightScene] = useState(false)
  const location = useLocation()

  // Close the mobile drawer on route change.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    // Staged home already locks document scroll via body.home-staged.
    if (document.body.classList.contains('home-staged')) return

    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Passive scroll listener to toggle the condensed/elevated header.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Home staged “main” scene is a fixed white panel; window scroll stays 0.
  useEffect(() => {
    const sync = () =>
      setOverLightScene(document.body.classList.contains('home-staged-main'))
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const elevated = scrolled || overLightScene
  const onDarkHero =
    !overLightScene &&
    (location.pathname === '/' || location.pathname === '/contact' || scrolled)
  const logoVariant = onDarkHero ? 'light' : 'dark'

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'pointer-events-auto mx-auto w-full',
          overLightScene ? 'px-0' : 'px-4 sm:px-5 lg:px-6',
        )}
      >
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'flex items-center justify-between px-2 py-4 transition-all duration-300',
            overLightScene
              ? 'bg-white px-4 shadow-sm sm:px-5 lg:px-6'
              : elevated
                ? 'rounded-b-2xl bg-ink/90 shadow-lg backdrop-blur-md'
                : 'bg-transparent',
          )}
        >
          <Link to="/" aria-label="MEDesign home" className="shrink-0">
            <Logo variant={logoVariant} />
          </Link>

          <ul className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'relative text-sm font-semibold tracking-wide transition-colors duration-200',
                      isActive
                        ? 'text-accent'
                        : overLightScene
                          ? 'text-ink/70 hover:text-ink'
                          : 'text-white/80 hover:text-white',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              to="/contact"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Connect
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden',
                overLightScene
                  ? 'text-ink hover:bg-ink/5'
                  : 'text-white hover:bg-white/10',
              )}
            >
              <Menu />
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open ? (
          <MobileDrawer key="drawer" onClose={() => setOpen(false)} />
        ) : null}
      </AnimatePresence>
    </header>
  )
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="pointer-events-auto md:hidden">
      <motion.div
        className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm"
        variants={overlayTransition}
        initial="hidden"
        animate="show"
        exit="exit"
        onClick={onClose}
      />
      <motion.aside
        className="fixed right-0 top-0 z-50 flex h-full max-h-screen w-[82%] max-w-xs flex-col gap-6 overflow-y-auto bg-ink p-6 pr-[max(1.5rem,env(safe-area-inset-right))] pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] landscape:gap-4 landscape:py-4"
        variants={drawerTransition}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <div className="flex items-center justify-between shrink-0">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <Close />
          </button>
        </div>

        <motion.ul
          className="flex flex-col gap-1 my-auto"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
        >
          {NAV_LINKS.map((link) => (
            <motion.li
              key={link.to}
              variants={{
                hidden: { opacity: 0, x: 24 },
                show: { opacity: 1, x: 0 },
              }}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'block rounded-xl px-4 py-2.5 text-base font-semibold transition-colors landscape:py-2',
                    isActive ? 'bg-white/10 text-accent' : 'text-white hover:bg-white/5',
                  )
                }
              >
                {link.label}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>

        <Button to="/contact" className="mt-auto w-full shrink-0">
          Connect
        </Button>
      </motion.aside>
    </div>
  )
}
