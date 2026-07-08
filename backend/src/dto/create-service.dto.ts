import { IsString, IsArray, IsOptional, IsNumber, IsBoolean } from 'class-validator'

export class CreateServiceDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsOptional()
  @IsString()
  icon: string

  @IsOptional()
  @IsString()
  image: string

  @IsOptional()
  @IsArray()
  features: string[]

  @IsOptional()
  @IsNumber()
  price: number

  @IsOptional()
  @IsBoolean()
  isActive: boolean
}
