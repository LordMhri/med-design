import { apiRequest } from '../client'
import type { Partner, CreatePartnerDto } from '../types'

export const partnersApi = {
  async getAll(opts?: { all?: boolean }): Promise<Partner[]> {
    const q = opts?.all ? '?all=1' : ''
    return apiRequest<Partner[]>(`/partners${q}`, { auth: Boolean(opts?.all) })
  },

  async getById(id: string): Promise<Partner> {
    return apiRequest<Partner>(`/partners/${id}`, { auth: false })
  },

  async create(data: CreatePartnerDto): Promise<Partner> {
    return apiRequest<Partner>('/partners', { method: 'POST', body: data })
  },

  async update(id: string, data: Partial<CreatePartnerDto>): Promise<Partner> {
    return apiRequest<Partner>(`/partners/${id}`, { method: 'PUT', body: data })
  },

  async remove(id: string): Promise<void> {
    return apiRequest<void>(`/partners/${id}`, { method: 'DELETE' })
  },
}
