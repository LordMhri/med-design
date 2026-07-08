import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TeamMember } from '@/entities/team-member.entity'

export interface CreateTeamMemberDto {
  name: string
  position: string
  bio: string
  image?: string
  email?: string
  expertise?: string[]
  linkedinUrl?: string
  twitterUrl?: string
  portfolioUrl?: string
}

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamMember)
    private teamRepository: Repository<TeamMember>,
  ) {}

  async create(createTeamMemberDto: CreateTeamMemberDto): Promise<TeamMember> {
    const member = this.teamRepository.create(createTeamMemberDto)
    return this.teamRepository.save(member)
  }

  async findAll(): Promise<TeamMember[]> {
    return this.teamRepository.find({
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: string): Promise<TeamMember> {
    const member = await this.teamRepository.findOne({
      where: { id },
    })

    if (!member) {
      throw new NotFoundException(`Team member with ID ${id} not found`)
    }

    return member
  }

  async update(id: string, updateTeamMemberDto: Partial<CreateTeamMemberDto>): Promise<TeamMember> {
    const member = await this.findOne(id)
    Object.assign(member, updateTeamMemberDto)
    return this.teamRepository.save(member)
  }

  async remove(id: string): Promise<void> {
    const result = await this.teamRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Team member with ID ${id} not found`)
    }
  }
}
