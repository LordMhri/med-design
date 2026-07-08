import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '@/entities/user.entity'
import { LoginDto, RegisterDto, AuthResponseDto } from '@/dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, firstName, lastName } = registerDto

    // Check if user exists
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    })
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      isAdmin: false,
    })

    await this.usersRepository.save(user)

    // Generate JWT
    const token = this.generateToken(user)

    return this.buildAuthResponse(token, user)
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto

    const user = await this.usersRepository.findOne({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const token = this.generateToken(user)

    return this.buildAuthResponse(token, user)
  }

  async validateUser(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
    })
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    }

    return this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRATION || '7d',
    })
  }

  private buildAuthResponse(token: string, user: User): AuthResponseDto {
    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
      },
    }
  }
}
