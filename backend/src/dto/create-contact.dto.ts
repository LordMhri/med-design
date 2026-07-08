import { IsString, IsEmail, IsArray, IsOptional, IsNumber, IsPhoneNumber } from 'class-validator'

export class CreateContactDto {
  @IsOptional()
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsOptional()
  @IsPhoneNumber('ET')
  phone: string

  @IsString()
  message: string

  @IsOptional()
  @IsArray()
  interests: string[]

  @IsOptional()
  @IsNumber()
  budget: number

  @IsOptional()
  @IsString()
  referralSource: string
}
