import { apiRequest } from '../client'
import type { Service, CreateServiceDto } from '../types'

export const servicesApi = {
  async getAll(): Promise<Service[]> {
    return apiRequest<Service[]>('/services', { auth: false })
  },

  async getById(id: string): Promise<Service> {
    return apiRequest<Service>(`/services/${id}`, { auth: false })
  },

  async create(data: CreateServiceDto): Promise<Service> {
    return apiRequest<Service>('/services', { method: 'POST', body: data })
  },

  async update(id: string, data: Partial<CreateServiceDto>): Promise<Service> {
    return apiRequest<Service>(`/services/${id}`, { method: 'PUT', body: data })
  },

  async remove(id: string): Promise<void> {
    return apiRequest<void>(`/services/${id}`, { method: 'DELETE' })
  },
}
