import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Service } from '@/entities/service.entity'
import { CreateServiceDto } from '@/dto/create-service.dto'

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.servicesRepository.create(createServiceDto)
    return this.servicesRepository.save(service)
  }

  async findAll(): Promise<Service[]> {
    return this.servicesRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.servicesRepository.findOne({
      where: { id },
    })

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`)
    }

    return service
  }

  async update(id: string, updateServiceDto: Partial<CreateServiceDto>): Promise<Service> {
    const service = await this.findOne(id)
    Object.assign(service, updateServiceDto)
    return this.servicesRepository.save(service)
  }

  async remove(id: string): Promise<void> {
    const result = await this.servicesRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Service with ID ${id} not found`)
    }
  }
}
