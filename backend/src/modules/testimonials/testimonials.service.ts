import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Testimonial } from '@/entities/testimonial.entity'

export interface CreateTestimonialDto {
  name: string
  title: string
  quote: string
  avatarUrl?: string
  sortOrder?: number
  isActive?: boolean
}

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private testimonialsRepository: Repository<Testimonial>,
  ) {}

  async create(dto: CreateTestimonialDto): Promise<Testimonial> {
    const item = this.testimonialsRepository.create({
      ...dto,
      sortOrder: dto.sortOrder ?? 0,
      isActive: dto.isActive ?? true,
    })
    return this.testimonialsRepository.save(item)
  }

  async findAll(activeOnly = false): Promise<Testimonial[]> {
    return this.testimonialsRepository.find({
      where: activeOnly ? { isActive: true } : undefined,
      order: { sortOrder: 'ASC', createdAt: 'DESC' },
    })
  }

  async findOne(id: string): Promise<Testimonial> {
    const item = await this.testimonialsRepository.findOne({ where: { id } })
    if (!item) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`)
    }
    return item
  }

  async update(
    id: string,
    dto: Partial<CreateTestimonialDto>,
  ): Promise<Testimonial> {
    const item = await this.findOne(id)
    Object.assign(item, dto)
    return this.testimonialsRepository.save(item)
  }

  async remove(id: string): Promise<void> {
    const result = await this.testimonialsRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`)
    }
  }
}
