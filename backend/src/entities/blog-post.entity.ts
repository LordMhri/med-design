import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('blog_posts')
export class BlogPost {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'text' })
  excerpt: string

  @Column({ nullable: true })
  slug: string

  @Column({ nullable: true })
  image: string

  @Column('simple-array', { nullable: true })
  tags: string[]

  @Column({ default: 'draft' })
  status: 'draft' | 'published' | 'archived'

  @Column({ default: 0 })
  views: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ nullable: true })
  publishedAt: Date
}
