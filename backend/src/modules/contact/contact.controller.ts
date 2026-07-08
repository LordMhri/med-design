import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common'
import { ContactService } from './contact.service'
import { CreateContactDto } from '@/dto/create-contact.dto'
import { ContactMessage } from '@/entities/contact-message.entity'
import { JwtAuthGuard } from '@/common/guards/jwt.guard'
import { AdminGuard } from '@/common/guards/admin.guard'

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(
    @Body() createContactDto: CreateContactDto,
    @Request() req?: any,
  ): Promise<ContactMessage> {
    const userId = req?.user?.id
    return this.contactService.create(createContactDto, userId)
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async findAll(): Promise<ContactMessage[]> {
    return this.contactService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async findOne(@Param('id') id: string): Promise<ContactMessage> {
    return this.contactService.findOne(id)
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body() { status }: { status: 'new' | 'read' | 'responded' | 'closed' },
  ): Promise<ContactMessage> {
    return this.contactService.updateStatus(id, status)
  }

  @Patch(':id/respond')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async respondToMessage(
    @Param('id') id: string,
    @Body() { response }: { response: string },
  ): Promise<ContactMessage> {
    return this.contactService.respondToMessage(id, response)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.contactService.remove(id)
  }
}
