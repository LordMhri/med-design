import { apiRequest } from '@/api/client'
import type { Testimonial, CreateTestimonialDto } from '@/api/types'

export type StoredTestimonial = Testimonial

export async function getTestimonials(): Promise<StoredTestimonial[]> {
  return apiRequest<StoredTestimonial[]>('/testimonials?all=1')
}

export async function getTestimonial(
  id: string,
): Promise<StoredTestimonial | undefined> {
  try {
    return await apiRequest<StoredTestimonial>(`/testimonials/${id}`)
  } catch {
    return undefined
  }
}

export async function saveTestimonial(
  item: Partial<CreateTestimonialDto> & { id?: string },
): Promise<StoredTestimonial> {
  if (item.id) {
    return apiRequest<StoredTestimonial>(`/testimonials/${item.id}`, {
      method: 'PUT',
      body: item,
    })
  }
  return apiRequest<StoredTestimonial>('/testimonials', {
    method: 'POST',
    body: item as CreateTestimonialDto,
  })
}

export async function deleteTestimonial(id: string): Promise<void> {
  return apiRequest<void>(`/testimonials/${id}`, { method: 'DELETE' })
}
