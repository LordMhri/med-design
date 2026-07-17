import { apiRequest } from '@/api/client'
import type { BlogPost, CreateBlogPostDto } from '@/api/types'

export type { BlogPost }

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return apiRequest<BlogPost[]>('/blog/all')
}

export async function getBlogPost(id: string): Promise<BlogPost | undefined> {
  try {
    return await apiRequest<BlogPost>(`/blog/${id}`)
  } catch {
    return undefined
  }
}

export async function saveBlogPost(
  post: Partial<CreateBlogPostDto> & { id?: string },
): Promise<BlogPost> {
  if (post.id) {
    return apiRequest<BlogPost>(`/blog/${post.id}`, { method: 'PUT', body: post })
  }
  return apiRequest<BlogPost>('/blog', { method: 'POST', body: post as CreateBlogPostDto })
}

export async function deleteBlogPost(id: string): Promise<void> {
  return apiRequest<void>(`/blog/${id}`, { method: 'DELETE' })
}
