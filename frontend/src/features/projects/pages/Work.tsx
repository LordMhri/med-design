import { useEffect, useState } from 'react'
import { PageHero } from '@/shared/components/PageHero'
import { Section } from '@/shared/components/Section'
import { ProjectCard } from '../components/ProjectCard'
import { fetchProjects, type Project } from '../data'

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetchProjects()
      .then((items) => {
        if (!cancelled) setProjects(items)
      })
      .catch(() => {
        if (!cancelled) setError('Unable to load projects. Is the backend running?')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <PageHero
        title={<span className="text-accent">Work</span>}
        subtitle="Every project we deliver is more than design — it's measurable impact. From hospital rebrands that boost patient trust, to digital campaigns that increase appointment bookings, our work reflects a passion for turning ideas into results. We craft healthcare stories that inspire confidence, drive growth, and make a difference in people's lives."
      />

      <Section>
        {loading ? (
          <p className="text-center text-slate-body">Loading projects…</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-slate-body">No projects published yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
