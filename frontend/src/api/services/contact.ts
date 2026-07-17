import { apiRequest } from '../client'
import type { ContactMessage, CreateContactDto } from '../types'

export const contactApi = {
  async submit(data: CreateContactDto): Promise<ContactMessage> {
    return apiRequest<ContactMessage>('/contact', { method: 'POST', body: data, auth: false })
  },

  async getAll(): Promise<ContactMessage[]> {
    return apiRequest<ContactMessage[]>('/contact')
  },

  async getById(id: string): Promise<ContactMessage> {
    return apiRequest<ContactMessage>(`/contact/${id}`)
  },

  async updateStatus(id: string, status: ContactMessage['status']): Promise<ContactMessage> {
    return apiRequest<ContactMessage>(`/contact/${id}/status`, {
      method: 'PATCH',
      body: { status },
    })
  },

  async respond(id: string, response: string): Promise<ContactMessage> {
    return apiRequest<ContactMessage>(`/contact/${id}/respond`, {
      method: 'PATCH',
      body: { response },
    })
  },

  async remove(id: string): Promise<void> {
    return apiRequest<void>(`/contact/${id}`, { method: 'DELETE' })
  },
}
