import { apiRequest } from '@/api/client'
import type { Project, CreateProjectDto } from '@/api/types'

export type StoredProject = Project

export async function getProjects(): Promise<StoredProject[]> {
  return apiRequest<StoredProject[]>('/projects')
}

export async function getProject(id: string): Promise<StoredProject | undefined> {
  try {
    return await apiRequest<StoredProject>(`/projects/${id}`)
  } catch {
    return undefined
  }
}

export async function saveProject(
  project: Partial<CreateProjectDto> & { id?: string },
): Promise<StoredProject> {
  if (project.id) {
    return apiRequest<StoredProject>(`/projects/${project.id}`, { method: 'PUT', body: project })
  }
  return apiRequest<StoredProject>('/projects', { method: 'POST', body: project as CreateProjectDto })
}

export async function deleteProject(id: string): Promise<void> {
  return apiRequest<void>(`/projects/${id}`, { method: 'DELETE' })
}
