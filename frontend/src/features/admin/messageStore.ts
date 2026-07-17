import { apiRequest } from '@/api/client'
import type { ContactMessage } from '@/api/types'

export type { ContactMessage }

export async function getMessages(): Promise<ContactMessage[]> {
  return apiRequest<ContactMessage[]>('/contact')
}

export async function getUnreadCount(): Promise<number> {
  const messages = await getMessages()
  return messages.filter((m) => m.status === 'new').length
}

export async function markAsRead(id: string): Promise<void> {
  return apiRequest<void>(`/contact/${id}/status`, {
    method: 'PATCH',
    body: { status: 'read' },
  })
}

export async function markAsUnread(id: string): Promise<void> {
  return apiRequest<void>(`/contact/${id}/status`, {
    method: 'PATCH',
    body: { status: 'new' },
  })
}

export async function deleteMessage(id: string): Promise<void> {
  return apiRequest<void>(`/contact/${id}`, { method: 'DELETE' })
}
