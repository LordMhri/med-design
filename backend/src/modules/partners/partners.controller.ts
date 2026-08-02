import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common'
import { PartnersService, CreatePartnerDto } from './partners.service'
import { Partner } from '@/entities/partner.entity'
import { JwtAuthGuard } from '@/common/guards/jwt.guard'
import { AdminGuard } from '@/common/guards/admin.guard'

@Controller('api/partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get()
  async findAll(@Query('all') all?: string): Promise<Partner[]> {
    // Public: active only. Admin list can pass ?all=1
    return this.partnersService.findAll(all !== '1')
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Partner> {
    return this.partnersService.findOne(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(@Body() dto: CreatePartnerDto): Promise<Partner> {
    return this.partnersService.create(dto)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreatePartnerDto>,
  ): Promise<Partner> {
    return this.partnersService.update(id, dto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.partnersService.remove(id)
  }
}
