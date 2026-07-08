import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('team_members')
export class TeamMember {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  position: string

  @Column({ type: 'text' })
  bio: string

  @Column({ nullable: true })
  image: string

  @Column({ nullable: true })
  email: string

  @Column('simple-array', { nullable: true })
  expertise: string[]

  @Column({ nullable: true })
  linkedinUrl: string

  @Column({ nullable: true })
  twitterUrl: string

  @Column({ nullable: true })
  portfolioUrl: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
