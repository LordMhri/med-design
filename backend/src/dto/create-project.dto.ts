import { IsString, IsArray, IsOptional, IsUrl } from 'class-validator'

export class CreateProjectDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsOptional()
  @IsUrl()
  image: string

  @IsOptional()
  @IsArray()
  tags: string[]

  @IsOptional()
  @IsUrl()
  link: string

  @IsOptional()
  @IsString()
  details: string

  @IsOptional()
  @IsString()
  challenge: string

  @IsOptional()
  @IsString()
  solution: string

  @IsOptional()
  @IsString()
  results: string

  @IsOptional()
  @IsArray()
  images: string[]
}
