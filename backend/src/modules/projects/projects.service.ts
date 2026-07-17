import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Project } from '@/entities/project.entity'
import { CreateProjectDto } from '@/dto/create-project.dto'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const slug = createProjectDto.slug || this.generateSlug(createProjectDto.title)
    const project = this.projectsRepository.create({
      ...createProjectDto,
      slug,
      excerpt: createProjectDto.excerpt || createProjectDto.description.slice(0, 160),
    })
    return this.projectsRepository.save(project)
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    })
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
    })

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`)
    }

    return project
  }

  async findBySlug(slug: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { slug },
    })

    if (!project) {
      throw new NotFoundException(`Project with slug ${slug} not found`)
    }

    return project
  }

  async update(
    id: string,
    updateProjectDto: Partial<CreateProjectDto>,
  ): Promise<Project> {
    const project = await this.findOne(id)

    if (updateProjectDto.title && !updateProjectDto.slug && !project.slug) {
      updateProjectDto.slug = this.generateSlug(updateProjectDto.title)
    }

    Object.assign(project, updateProjectDto)
    return this.projectsRepository.save(project)
  }

  async remove(id: string): Promise<void> {
    const result = await this.projectsRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`)
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
