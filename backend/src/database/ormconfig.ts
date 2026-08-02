import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config as loadEnv } from 'dotenv'
import { Project } from '../entities/project.entity'
import { Service } from '../entities/service.entity'
import { TeamMember } from '../entities/team-member.entity'
import { BlogPost } from '../entities/blog-post.entity'
import { ContactMessage } from '../entities/contact-message.entity'
import { User } from '../entities/user.entity'
import { Partner } from '../entities/partner.entity'
import { Testimonial } from '../entities/testimonial.entity'

loadEnv({ path: '.env.local' })
loadEnv()

const entities = [
  Project,
  Service,
  TeamMember,
  BlogPost,
  ContactMessage,
  User,
  Partner,
  Testimonial,
]

const isProduction = process.env.NODE_ENV === 'production'
const databaseUrl = process.env.DATABASE_URL?.trim()

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

function buildTypeOrmConfig(): TypeOrmModuleOptions {
  if (databaseUrl) {
    return {
      type: 'postgres',
      url: databaseUrl,
      // Render Postgres requires SSL; rejectUnauthorized:false for their managed certs
      ssl: isProduction ? { rejectUnauthorized: false } : false,
      ...shared,
    }
  }

  if (isProduction) {
    throw new Error(
      'DATABASE_URL is required in production. Link your Render Postgres database to this service (Environment → DATABASE_URL).',
    )
  }

  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'medesign',
    ...shared,
  }
}

export const typeOrmConfig: TypeOrmModuleOptions = buildTypeOrmConfig()
