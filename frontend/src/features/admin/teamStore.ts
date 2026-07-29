import { apiRequest } from '@/api/client'
import type { TeamMember, CreateTeamMemberDto } from '@/api/types'

export type StoredTeamMember = TeamMember

export async function getTeamMembers(): Promise<StoredTeamMember[]> {
  return apiRequest<StoredTeamMember[]>('/team')
}

export async function getTeamMember(id: string): Promise<StoredTeamMember | undefined> {
  try {
    return await apiRequest<StoredTeamMember>(`/team/${id}`)
  } catch {
    return undefined
  }
}

export async function saveTeamMember(
  member: Partial<CreateTeamMemberDto> & { id?: string },
): Promise<StoredTeamMember> {
  if (member.id) {
    return apiRequest<StoredTeamMember>(`/team/${member.id}`, { method: 'PUT', body: member })
  }
  return apiRequest<StoredTeamMember>('/team', { method: 'POST', body: member as CreateTeamMemberDto })
}

export async function deleteTeamMember(id: string): Promise<void> {
  return apiRequest<void>(`/team/${id}`, { method: 'DELETE' })
}
