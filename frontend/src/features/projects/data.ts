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
//   }
// }

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    slug: 'st-mary-rebrand',
    title: 'St. Mary Specialty Clinic Rebrand',
    excerpt: 'Unified brand identity that improved trust and recognition across patient touchpoints.',
    category: 'Branding & Identity',
    tags: ['Branding', 'Strategy'],
    description:
      'We redesigned the clinic brand system, messaging tone, and visual language to make patient communication clearer and more consistent across digital and print assets.',
    image: '/team-sara.png',
  },
  {
    id: 'project-2',
    slug: 'city-heart-campaign',
    title: 'City Heart Hospital Campaign',
    excerpt: 'A digital growth campaign focused on awareness, bookings, and patient education.',
    category: 'Marketing & Growth',
    tags: ['Campaign', 'Social Media'],
    description:
      'Our team launched multi-channel campaign creatives and weekly performance optimization that increased appointment intent and improved engagement quality.',
    image: '/team-meheret.png',
  },
  {
    id: 'project-3',
    slug: 'meded-learning-series',
    title: 'MedEd Learning Content Series',
    excerpt: 'Educational multimedia assets crafted for patient awareness and retention.',
    category: 'Multimedia Production',
    tags: ['Video', 'Content'],
    description:
      'We produced short-form health education videos, motion graphics, and awareness visuals designed to simplify complex medical information for the public.',
    image: '/team-yeabtsega.png',
  },
]

export async function fetchProjects(): Promise<Project[]> {
  // Dynamic API fetch disabled temporarily until admin dashboard rollout.
  // const items = await projectsApi.getAll()
  // return items.map(mapProject)
  return PROJECTS
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
  //     return undefined
  //   }
  // }
  return PROJECTS.find((p) => p.slug === slug || p.id === slug)
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
