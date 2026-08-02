import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Partner } from '@/entities/partner.entity'

export interface CreatePartnerDto {
  name: string
  logoUrl?: string
  websiteUrl?: string
  sortOrder?: number
  isActive?: boolean
}

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private partnersRepository: Repository<Partner>,
  ) {}

  async create(dto: CreatePartnerDto): Promise<Partner> {
    const partner = this.partnersRepository.create({
      ...dto,
      sortOrder: dto.sortOrder ?? 0,
      isActive: dto.isActive ?? true,
    })
    return this.partnersRepository.save(partner)
  }

  async findAll(activeOnly = false): Promise<Partner[]> {
    return this.partnersRepository.find({
      where: activeOnly ? { isActive: true } : undefined,
      order: { sortOrder: 'ASC', createdAt: 'DESC' },
    })
  }

  async findOne(id: string): Promise<Partner> {
    const partner = await this.partnersRepository.findOne({ where: { id } })
    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`)
    }
    return partner
  }

  async update(id: string, dto: Partial<CreatePartnerDto>): Promise<Partner> {
    const partner = await this.findOne(id)
    Object.assign(partner, dto)
    return this.partnersRepository.save(partner)
  }

  async remove(id: string): Promise<void> {
    const result = await this.partnersRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Partner with ID ${id} not found`)
    }
  }
}
