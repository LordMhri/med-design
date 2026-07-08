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

  @Column({ type: 'text' })
  description: string

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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
