import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity('contact_messages')
export class ContactMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  phone: string

  @Column({ type: 'text' })
  message: string

  @Column('simple-array', { nullable: true })
  interests: string[]

  @Column({ nullable: true })
  budget: number

  @Column({ nullable: true })
  referralSource: string

  @Column({ default: 'new' })
  status: 'new' | 'read' | 'responded' | 'closed'

  @Column({ nullable: true })
  response: string

  @CreateDateColumn()
  createdAt: Date

  @Column({ nullable: true })
  userId: string

  @ManyToOne(() => User, (user) => user.messages, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User
}
