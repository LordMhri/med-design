import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Testimonial } from '@/entities/testimonial.entity'
import { TestimonialsService } from './testimonials.service'
import { TestimonialsController } from './testimonials.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Testimonial])],
  providers: [TestimonialsService],
  controllers: [TestimonialsController],
  exports: [TestimonialsService],
})
export class TestimonialsModule {}
