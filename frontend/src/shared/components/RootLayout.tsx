import { Suspense, useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { pageTransition } from '@/shared/lib/motion'

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  )
}

export function RootLayout() {
  const location = useLocation()

  // Reset scroll position on every navigation (belt-and-braces with ScrollRestoration).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={location.pathname}
                variants={pageTransition}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </main>
        <Footer />
        <ScrollRestoration />
      </div>
    </MotionConfig>
  )
}
