import { apiRequest } from '../client'
import type { Testimonial, CreateTestimonialDto } from '../types'

export const testimonialsApi = {
  async getAll(opts?: { all?: boolean }): Promise<Testimonial[]> {
    const q = opts?.all ? '?all=1' : ''
    return apiRequest<Testimonial[]>(`/testimonials${q}`, {
      auth: Boolean(opts?.all),
    })
  },

  async getById(id: string): Promise<Testimonial> {
    return apiRequest<Testimonial>(`/testimonials/${id}`, { auth: false })
  },

  async create(data: CreateTestimonialDto): Promise<Testimonial> {
    return apiRequest<Testimonial>('/testimonials', {
      method: 'POST',
      body: data,
    })
  },

  async update(
    id: string,
    data: Partial<CreateTestimonialDto>,
  ): Promise<Testimonial> {
    return apiRequest<Testimonial>(`/testimonials/${id}`, {
      method: 'PUT',
      body: data,
    })
  },

  async remove(id: string): Promise<void> {
    return apiRequest<void>(`/testimonials/${id}`, { method: 'DELETE' })
  },
}
