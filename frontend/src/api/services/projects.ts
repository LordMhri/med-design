import { apiRequest } from '../client'
import type { Project, CreateProjectDto } from '../types'

export const projectsApi = {
  async getAll(): Promise<Project[]> {
    return apiRequest<Project[]>('/projects', { auth: false })
  },

  async getById(id: string): Promise<Project> {
    return apiRequest<Project>(`/projects/${id}`, { auth: false })
  },

  async getBySlug(slug: string): Promise<Project> {
    return apiRequest<Project>(`/projects/slug/${slug}`, { auth: false })
  },

  async create(data: CreateProjectDto): Promise<Project> {
    return apiRequest<Project>('/projects', { method: 'POST', body: data })
  },

  async update(id: string, data: Partial<CreateProjectDto>): Promise<Project> {
    return apiRequest<Project>(`/projects/${id}`, { method: 'PUT', body: data })
  },

  async remove(id: string): Promise<void> {
    return apiRequest<void>(`/projects/${id}`, { method: 'DELETE' })
  },
}
