import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { BlogService, CreateBlogPostDto } from './blog.service'
import { BlogPost } from '@/entities/blog-post.entity'
import { JwtAuthGuard } from '@/common/guards/jwt.guard'
import { AdminGuard } from '@/common/guards/admin.guard'

@Controller('api/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll(): Promise<BlogPost[]> {
    return this.blogService.findPublished()
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async findAllIncludeArchived(): Promise<BlogPost[]> {
    return this.blogService.findAll(true)
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string): Promise<BlogPost> {
    const post = await this.blogService.findBySlug(slug)
    await this.blogService.incrementViews(post.id)
    return post
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BlogPost> {
    const post = await this.blogService.findOne(id)
    await this.blogService.incrementViews(id)
    return post
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(@Body() createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    return this.blogService.create(createBlogPostDto)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: Partial<CreateBlogPostDto>,
  ): Promise<BlogPost> {
    return this.blogService.update(id, updateBlogPostDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.blogService.remove(id)
  }
}
