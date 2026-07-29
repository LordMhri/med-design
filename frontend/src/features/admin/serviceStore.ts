import { apiRequest } from '@/api/client'
import type { Service, CreateServiceDto } from '@/api/types'

export type StoredService = Service

export async function getServices(): Promise<StoredService[]> {
  return apiRequest<StoredService[]>('/services')
}

export async function getService(id: string): Promise<StoredService | undefined> {
  try {
    return await apiRequest<StoredService>(`/services/${id}`)
  } catch {
    return undefined
  }
}

export async function saveService(
  service: Partial<CreateServiceDto> & { id?: string },
): Promise<StoredService> {
  if (service.id) {
    return apiRequest<StoredService>(`/services/${service.id}`, { method: 'PUT', body: service })
  }
  return apiRequest<StoredService>('/services', { method: 'POST', body: service as CreateServiceDto })
}

export async function deleteService(id: string): Promise<void> {
  return apiRequest<void>(`/services/${id}`, { method: 'DELETE' })
}
