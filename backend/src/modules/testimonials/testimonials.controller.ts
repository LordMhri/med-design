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
import {
  TestimonialsService,
  CreateTestimonialDto,
} from './testimonials.service'
import { Testimonial } from '@/entities/testimonial.entity'
import { JwtAuthGuard } from '@/common/guards/jwt.guard'
import { AdminGuard } from '@/common/guards/admin.guard'

@Controller('api/testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  async findAll(@Query('all') all?: string): Promise<Testimonial[]> {
    return this.testimonialsService.findAll(all !== '1')
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Testimonial> {
    return this.testimonialsService.findOne(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(@Body() dto: CreateTestimonialDto): Promise<Testimonial> {
    return this.testimonialsService.create(dto)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateTestimonialDto>,
  ): Promise<Testimonial> {
    return this.testimonialsService.update(id, dto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.testimonialsService.remove(id)
  }
}
