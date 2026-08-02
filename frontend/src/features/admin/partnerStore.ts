import { apiRequest } from '@/api/client'
import type { Partner, CreatePartnerDto } from '@/api/types'

export type StoredPartner = Partner

export async function getPartners(): Promise<StoredPartner[]> {
  return apiRequest<StoredPartner[]>('/partners?all=1')
}

export async function getPartner(id: string): Promise<StoredPartner | undefined> {
  try {
    return await apiRequest<StoredPartner>(`/partners/${id}`)
  } catch {
    return undefined
  }
}

export async function savePartner(
  partner: Partial<CreatePartnerDto> & { id?: string },
): Promise<StoredPartner> {
  if (partner.id) {
    return apiRequest<StoredPartner>(`/partners/${partner.id}`, {
      method: 'PUT',
      body: partner,
    })
  }
  return apiRequest<StoredPartner>('/partners', {
    method: 'POST',
    body: partner as CreatePartnerDto,
  })
}

export async function deletePartner(id: string): Promise<void> {
  return apiRequest<void>(`/partners/${id}`, { method: 'DELETE' })
}
