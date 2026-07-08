import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Project } from '@/entities/project.entity'
import { Service } from '@/entities/service.entity'
import { TeamMember } from '@/entities/team-member.entity'
import { BlogPost } from '@/entities/blog-post.entity'
import { ContactMessage } from '@/entities/contact-message.entity'
import { User } from '@/entities/user.entity'
import { config } from 'dotenv'

config()

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'medesign',
  entities: [Project, Service, TeamMember, BlogPost, ContactMessage, User],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  dropSchema: false,
}
