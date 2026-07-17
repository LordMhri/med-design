export type Project = {
  id: string
  title: string
  description: string
  excerpt?: string
  slug?: string
  category?: string
  image?: string
  tags?: string[]
  link?: string
  details?: string
  challenge?: string
  solution?: string
  results?: string
  images?: string[]
  createdAt?: string
  updatedAt?: string
}

export type Service = {
  id: string
  name: string
  description: string
  icon?: string
  image?: string
  features?: string[]
  price?: number
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

export type TeamMember = {
  id: string
  name: string
  position: string
  bio: string
  image?: string
  email?: string
  expertise?: string[]
  linkedinUrl?: string
  twitterUrl?: string
  portfolioUrl?: string
  createdAt?: string
  updatedAt?: string
}

export type BlogPost = {
  id: string
  title: string
  content: string
  excerpt: string
  slug?: string
  image?: string
  tags?: string[]
  status: 'draft' | 'published' | 'archived'
  views?: number
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export type ContactMessage = {
  id: string
  name?: string
  email: string
  phone?: string
  message: string
  interests?: string[]
  budget?: number
  referralSource?: string
  status: 'new' | 'read' | 'responded' | 'closed'
  response?: string
  createdAt?: string
  userId?: string
}

export type User = {
  id: string
  email: string
  firstName?: string
  lastName?: string
  isAdmin: boolean
}

export type AuthResponse = {
  accessToken: string
  user: User
}

export type CreateProjectDto = {
  title: string
  description: string
  slug?: string
  excerpt?: string
  category?: string
  image?: string
  tags?: string[]
  link?: string
  details?: string
  challenge?: string
  solution?: string
  results?: string
  images?: string[]
}

export type CreateServiceDto = {
  name: string
  description: string
  icon?: string
  image?: string
  features?: string[]
  price?: number
  isActive?: boolean
}

export type CreateTeamMemberDto = {
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

export type CreateBlogPostDto = {
  title: string
  content: string
  excerpt: string
  slug?: string
  image?: string
  tags?: string[]
  status?: 'draft' | 'published' | 'archived'
}

export type CreateContactDto = {
  name?: string
  email: string
  phone?: string
  message: string
  interests?: string[]
  budget?: number
  referralSource?: string
}

export type LoginDto = {
  email: string
  password: string
}

export type RegisterDto = {
  email: string
  firstName: string
  lastName: string
  password: string
}
