// import { projectsApi } from '@/api/services/projects'
// import type { Project as ApiProject } from '@/api/types'

/** UI shape used by public project pages and cards. */
export type Project = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  description: string
  image?: string
  featured?: boolean
  sortOrder?: number
}

// export function mapProject(p: ApiProject): Project {
//   const slug = p.slug || p.id
//   return {
//     id: p.id,
//     slug,
//     title: p.title,
//     excerpt: p.excerpt || p.description.slice(0, 140),
//     category: p.category || p.tags?.[0] || 'Project',
//     tags: p.tags || [],
//     description: p.description,
//     image: p.image,
//     featured: p.featured,
//     sortOrder: p.sortOrder,
//   }
// }

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    slug: 'st-mary-rebrand',
    title: 'St. Mary Specialty Clinic Rebrand',
    excerpt: 'Unified brand identity across patient touchpoints.',
    category: 'Branding & Identity',
    tags: ['Branding', 'Strategy'],
    description:
      'We redesigned the clinic brand system, messaging tone, and visual language to make patient communication clearer and more consistent across digital and print assets.',
    image: '/project-st-mary.jpg',
    featured: true,
    sortOrder: 1,
  },
  {
    id: 'project-2',
    slug: 'city-heart-campaign',
    title: 'City Heart Hospital Campaign',
    excerpt: 'Awareness, bookings, and patient education, grown together.',
    category: 'Marketing & Growth',
    tags: ['Campaign', 'Social Media'],
    description:
      'Our team launched multi-channel campaign creatives and weekly performance optimization that increased appointment intent and improved engagement quality.',
    image: '/project-city-heart.jpg',
    featured: true,
    sortOrder: 2,
  },
  {
    id: 'project-3',
    slug: 'meded-learning-series',
    title: 'MedEd Learning Content Series',
    excerpt: 'Educational multimedia for patient awareness and retention.',
    category: 'Multimedia Production',
    tags: ['Video', 'Content'],
    description:
      'We produced short-form health education videos, motion graphics, and awareness visuals designed to simplify complex medical information for the public.',
    image: '/project-meded.jpg',
    featured: true,
    sortOrder: 3,
  },
]

export async function fetchProjects(): Promise<Project[]> {
  // Dynamic API fetch disabled temporarily until admin dashboard rollout.
  // const items = await projectsApi.getAll()
  // if (items.length === 0) return PROJECTS
  // return items.map(mapProject)
  return PROJECTS
}

/** Featured projects for the home strip; falls back to first 6. */
export async function fetchFeaturedProjects(limit = 6): Promise<Project[]> {
  const all = await fetchProjects()
  const featured = all.filter((p) => p.featured)
  return (featured.length > 0 ? featured : all).slice(0, limit)
}

export async function fetchProject(slug: string): Promise<Project | undefined> {
  // Dynamic API fetch disabled temporarily until admin dashboard rollout.
  // try {
  //   const project = await projectsApi.getBySlug(slug)
  //   return mapProject(project)
  // } catch {
  //   try {
  //     const project = await projectsApi.getById(slug)
  //     return mapProject(project)
  //   } catch {
  //     return PROJECTS.find((p) => p.slug === slug || p.id === slug)
  //   }
  // }
  return PROJECTS.find((p) => p.slug === slug || p.id === slug)
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
