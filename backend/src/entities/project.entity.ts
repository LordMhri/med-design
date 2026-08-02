import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({ unique: true })
  slug: string

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'text', nullable: true })
  excerpt: string

  @Column({ nullable: true })
  category: string

  @Column({ nullable: true })
  image: string

  @Column('simple-array', { nullable: true })
  tags: string[]

  @Column({ nullable: true })
  link: string

  @Column({ type: 'text', nullable: true })
  details: string

  @Column({ type: 'text', nullable: true })
  challenge: string

  @Column({ type: 'text', nullable: true })
  solution: string

  @Column({ type: 'text', nullable: true })
  results: string

  @Column({ type: 'simple-array', nullable: true })
  images: string[]

  /** When true, prefer this project on the home "Selected work" strip. */
  @Column({ default: false })
  featured: boolean

  @Column({ type: 'int', default: 0 })
  sortOrder: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
