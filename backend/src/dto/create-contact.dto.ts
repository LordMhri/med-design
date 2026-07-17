import { IsString, IsEmail, IsArray, IsOptional, IsNumber, MinLength } from 'class-validator'

export class CreateContactDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsString()
  @MinLength(1)
  message: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[]

  @IsOptional()
  @IsNumber()
  budget?: number

  @IsOptional()
  @IsString()
  referralSource?: string
}
