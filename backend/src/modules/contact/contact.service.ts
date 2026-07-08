import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ContactMessage } from '@/entities/contact-message.entity'
import { CreateContactDto } from '@/dto/create-contact.dto'

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private messagesRepository: Repository<ContactMessage>,
  ) {}

  async create(createContactDto: CreateContactDto, userId?: string): Promise<ContactMessage> {
    const message = this.messagesRepository.create({
      ...createContactDto,
      userId,
      status: 'new',
    })
    return this.messagesRepository.save(message)
  }

  async findAll(): Promise<ContactMessage[]> {
    return this.messagesRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: ['user'],
    })
  }

  async findOne(id: string): Promise<ContactMessage> {
    const message = await this.messagesRepository.findOne({
      where: { id },
      relations: ['user'],
    })

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`)
    }

    return message
  }

  async updateStatus(id: string, status: 'new' | 'read' | 'responded' | 'closed'): Promise<ContactMessage> {
    const message = await this.findOne(id)
    message.status = status
    return this.messagesRepository.save(message)
  }

  async respondToMessage(id: string, response: string): Promise<ContactMessage> {
    const message = await this.findOne(id)
    message.response = response
    message.status = 'responded'
    return this.messagesRepository.save(message)
  }

  async remove(id: string): Promise<void> {
    const result = await this.messagesRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Message with ID ${id} not found`)
    }
  }
}
