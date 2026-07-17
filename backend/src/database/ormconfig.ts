import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config as loadEnv } from 'dotenv'
import { Project } from '../entities/project.entity'
import { Service } from '../entities/service.entity'
import { TeamMember } from '../entities/team-member.entity'
import { BlogPost } from '../entities/blog-post.entity'
import { ContactMessage } from '../entities/contact-message.entity'
import { User } from '../entities/user.entity'

loadEnv({ path: '.env.local' })
loadEnv()

const entities = [Project, Service, TeamMember, BlogPost, ContactMessage, User]

const isProduction = process.env.NODE_ENV === 'production'
const databaseUrl = process.env.DATABASE_URL

const shared: Pick<
  TypeOrmModuleOptions,
  'entities' | 'synchronize' | 'logging' | 'dropSchema'
> = {
  entities,
  synchronize:
    process.env.TYPEORM_SYNCHRONIZE === 'true' || process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  dropSchema: false,
}

export const typeOrmConfig: TypeOrmModuleOptions = databaseUrl
  ? {
      type: 'postgres',
      url: databaseUrl,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
      ...shared,
    }
  : {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'medesign',
      ...shared,
    }
