import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { TeamService, CreateTeamMemberDto } from './team.service'
import { TeamMember } from '@/entities/team-member.entity'
import { JwtAuthGuard } from '@/common/guards/jwt.guard'
import { AdminGuard } from '@/common/guards/admin.guard'

@Controller('api/team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll(): Promise<TeamMember[]> {
    return this.teamService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TeamMember> {
    return this.teamService.findOne(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(@Body() createTeamMemberDto: CreateTeamMemberDto): Promise<TeamMember> {
    return this.teamService.create(createTeamMemberDto)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTeamMemberDto: Partial<CreateTeamMemberDto>,
  ): Promise<TeamMember> {
    return this.teamService.update(id, updateTeamMemberDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async remove(@Param('id') id: string): Promise<void> {
    return this.teamService.remove(id)
  }
}
