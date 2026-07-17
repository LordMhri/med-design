import { apiRequest } from '../client'
import type { TeamMember, CreateTeamMemberDto } from '../types'

export const teamApi = {
  async getAll(): Promise<TeamMember[]> {
    return apiRequest<TeamMember[]>('/team', { auth: false })
  },

  async getById(id: string): Promise<TeamMember> {
    return apiRequest<TeamMember>(`/team/${id}`, { auth: false })
  },

  async create(data: CreateTeamMemberDto): Promise<TeamMember> {
    return apiRequest<TeamMember>('/team', { method: 'POST', body: data })
  },

  async update(id: string, data: Partial<CreateTeamMemberDto>): Promise<TeamMember> {
    return apiRequest<TeamMember>(`/team/${id}`, { method: 'PUT', body: data })
  },

  async remove(id: string): Promise<void> {
    return apiRequest<void>(`/team/${id}`, { method: 'DELETE' })
  },
}
