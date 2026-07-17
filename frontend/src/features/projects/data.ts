import { projectsApi } from '@/api/services/projects'
import type { Project as ApiProject } from '@/api/types'

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

export function mapProject(p: ApiProject): Project {
  const slug = p.slug || p.id
  return {
    id: p.id,
    slug,
    title: p.title,
    excerpt: p.excerpt || p.description.slice(0, 140),
    category: p.category || p.tags?.[0] || 'Project',
    tags: p.tags || [],
    description: p.description,
    image: p.image,
  }
}

/** @deprecated Prefer fetchProjects() — kept as empty fallback for offline/SSR. */
export const PROJECTS: Project[] = []

export async function fetchProjects(): Promise<Project[]> {
  const items = await projectsApi.getAll()
  return items.map(mapProject)
}

export async function fetchProject(slug: string): Promise<Project | undefined> {
  try {
    const project = await projectsApi.getBySlug(slug)
    return mapProject(project)
  } catch {
    try {
      const project = await projectsApi.getById(slug)
      return mapProject(project)
    } catch {
      return undefined
    }
  }
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
