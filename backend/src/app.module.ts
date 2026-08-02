import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { APP_PIPE } from '@nestjs/core'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { typeOrmConfig } from './database/ormconfig'
import { AuthModule } from './auth/auth.module'
import { ProjectsModule } from './modules/projects/projects.module'
import { ServicesModule } from './modules/services/services.module'
import { ContactModule } from './modules/contact/contact.module'
import { TeamModule } from './modules/team/team.module'
import { BlogModule } from './modules/blog/blog.module'
import { PartnersModule } from './modules/partners/partners.module'
import { TestimonialsModule } from './modules/testimonials/testimonials.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ProjectsModule,
    ServicesModule,
    ContactModule,
    TeamModule,
    BlogModule,
    PartnersModule,
    TestimonialsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
