import { IsEmail, IsString, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string
}

export class RegisterDto {
  @IsEmail()
  email: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  @MinLength(6)
  password: string
}

export class AuthResponseDto {
  accessToken: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
  }
}
