import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BlogPost } from '@/entities/blog-post.entity'

export interface CreateBlogPostDto {
  title: string
  content: string
  excerpt: string
  slug?: string
  image?: string
  tags?: string[]
  status?: 'draft' | 'published' | 'archived'
}

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private blogRepository: Repository<BlogPost>,
  ) {}

  async create(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    const slug = createBlogPostDto.slug || this.generateSlug(createBlogPostDto.title)
    const post = this.blogRepository.create({
      ...createBlogPostDto,
      slug,
      publishedAt: createBlogPostDto.status === 'published' ? new Date() : null,
    })
    return this.blogRepository.save(post)
  }

  async findAll(includeArchived = false): Promise<BlogPost[]> {
    const query = this.blogRepository.createQueryBuilder('post')

    if (!includeArchived) {
      query.where('post.status != :status', { status: 'archived' })
    }

    return query.orderBy('post.publishedAt', 'DESC').addOrderBy('post.createdAt', 'DESC').getMany()
  }

  async findPublished(): Promise<BlogPost[]> {
    return this.blogRepository.find({
      where: { status: 'published' },
      order: {
        publishedAt: 'DESC',
      },
    })
  }

  async findOne(id: string): Promise<BlogPost> {
    const post = await this.blogRepository.findOne({
      where: { id },
    })

    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`)
    }

    return post
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const post = await this.blogRepository.findOne({
      where: { slug },
    })

    if (!post) {
      throw new NotFoundException(`Blog post with slug ${slug} not found`)
    }

    return post
  }

  async update(id: string, updateBlogPostDto: Partial<CreateBlogPostDto>): Promise<BlogPost> {
    const post = await this.findOne(id)

    if (updateBlogPostDto.title && !updateBlogPostDto.slug) {
      updateBlogPostDto.slug = this.generateSlug(updateBlogPostDto.title)
    }

    Object.assign(post, updateBlogPostDto)

    if (updateBlogPostDto.status === 'published' && !post.publishedAt) {
      post.publishedAt = new Date()
    }

    return this.blogRepository.save(post)
  }

  async incrementViews(id: string): Promise<void> {
    await this.blogRepository.increment({ id }, 'views', 1)
  }

  async remove(id: string): Promise<void> {
    const result = await this.blogRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Blog post with ID ${id} not found`)
    }
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
}
