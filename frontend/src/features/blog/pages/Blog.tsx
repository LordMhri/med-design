import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/shared/components/Container'
import { Eyebrow } from '@/shared/components/Tag'
import { Logo } from '@/shared/components/Logo'
import { ArrowCircleButton } from '@/shared/components/ArrowCircleButton'
import { fadeInUp, revealOnce, slideInLeft, slideInRight } from '@/shared/lib/motion'
import type { BlogPost } from '@/api/types'
// import { blogApi } from '@/api/services/blog'

const STATIC_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Building Patient Trust Through Visual Consistency',
    excerpt:
      'How a consistent healthcare brand system improves credibility, recognition, and patient confidence across digital and offline channels.',
    content: '',
    slug: 'patient-trust-through-visual-consistency',
    tags: ['Branding', 'Healthcare'],
    status: 'published',
  },
  {
    id: 'post-2',
    title: 'What Makes Healthcare Campaigns Actually Convert',
    excerpt:
      'A practical framework for campaign structure, messaging clarity, and channel alignment that drives stronger appointment intent.',
    content: '',
    slug: 'healthcare-campaigns-that-convert',
    tags: ['Marketing', 'Strategy'],
    status: 'published',
  },
  {
    id: 'post-3',
    title: 'Designing Educational Medical Content People Understand',
    excerpt:
      'From motion graphics to infographics, here are proven approaches to make complex health information accessible and engaging.',
    content: '',
    slug: 'designing-educational-medical-content',
    tags: ['Multimedia', 'Education'],
    status: 'published',
  },
]

export default function Blog() {
  return (
    <>
      <BlogHero />
      <LatestPosts />
    </>
  )
}

function BlogHero() {
  return (
    <section className="relative w-full pt-4 pb-12 sm:pb-16">
      <div className="relative">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <Logo variant="light" className="text-5xl" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70"
            >
              Your visionary partners in medical marketing. At MEDesign, we craft highly intentional branding and digital experiences, ensuring your healthcare brand grows authentically, predictably, and with clear purpose.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function LatestPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(STATIC_POSTS)
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState('')
  const loading = false
  const error = ''

  useEffect(() => {
    // Dynamic API blog fetch disabled temporarily until admin dashboard rollout.
    // let cancelled = false
    // blogApi
    //   .getPublished()
    //   .then((items) => {
    //     if (!cancelled) setPosts(items)
    //   })
    //   .catch(() => {
    //     if (!cancelled) setError('Unable to load posts. Is the backend running?')
    //   })
    //   .finally(() => {
    //     if (!cancelled) setLoading(false)
    //   })
    // return () => {
    //   cancelled = true
    // }
    setPosts(STATIC_POSTS)
  }, [])

  return (
    <Container className="pb-20 lg:pb-28">
      <Eyebrow className="mb-8 block">Latest</Eyebrow>

      {loading ? (
        <p className="text-slate-body">Loading posts…</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-slate-body">No published posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post, index) => {
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={post.id}
                variants={fadeInUp}
                {...revealOnce}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card"
              >
                <motion.div
                  variants={isEven ? slideInRight : slideInLeft}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {(post.tags?.length ? post.tags : ['Insights']).slice(0, 2).map((tag) => (
                      <Eyebrow key={tag}>{tag}</Eyebrow>
                    ))}
                  </div>

                  <h3 className="text-2xl font-extrabold text-ink lg:text-3xl">{post.title}</h3>

                  <p className="text-sm leading-relaxed text-slate-body max-w-lg">{post.excerpt}</p>

                  <div className="flex gap-3">
                    <Link to={`/blog/${post.slug || post.id}`}>
                      <ArrowCircleButton />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      )}
    </Container>
  )
}
