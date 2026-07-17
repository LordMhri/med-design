import { IsString, IsArray, IsOptional, IsUrl } from 'class-validator'

export class CreateProjectDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsOptional()
  @IsString()
  slug?: string

  @IsOptional()
  @IsString()
  excerpt?: string

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsString()
  image?: string

  @IsOptional()
  @IsArray()
  tags?: string[]

  @IsOptional()
  @IsUrl()
  link?: string

  @IsOptional()
  @IsString()
  details?: string

  @IsOptional()
  @IsString()
  challenge?: string

  @IsOptional()
  @IsString()
  solution?: string

  @IsOptional()
  @IsString()
  results?: string

  @IsOptional()
  @IsArray()
  images?: string[]
}
