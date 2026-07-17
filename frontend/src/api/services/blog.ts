import { apiRequest } from '../client'
import type { BlogPost, CreateBlogPostDto } from '../types'

export const blogApi = {
  async getPublished(): Promise<BlogPost[]> {
    return apiRequest<BlogPost[]>('/blog', { auth: false })
  },

  async getAll(): Promise<BlogPost[]> {
    return apiRequest<BlogPost[]>('/blog/all')
  },

  async getById(id: string): Promise<BlogPost> {
    return apiRequest<BlogPost>(`/blog/${id}`, { auth: false })
  },

  async getBySlug(slug: string): Promise<BlogPost> {
    return apiRequest<BlogPost>(`/blog/slug/${slug}`, { auth: false })
  },

  async create(data: CreateBlogPostDto): Promise<BlogPost> {
    return apiRequest<BlogPost>('/blog', { method: 'POST', body: data })
  },

  async update(id: string, data: Partial<CreateBlogPostDto>): Promise<BlogPost> {
    return apiRequest<BlogPost>(`/blog/${id}`, { method: 'PUT', body: data })
  },

  async remove(id: string): Promise<void> {
    return apiRequest<void>(`/blog/${id}`, { method: 'DELETE' })
  },
}
