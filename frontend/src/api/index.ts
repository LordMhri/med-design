export { authApi } from './services/auth'
export { projectsApi } from './services/projects'
export { servicesApi } from './services/services'
export { teamApi } from './services/team'
export { partnersApi } from './services/partners'
export { testimonialsApi } from './services/testimonials'
export { blogApi } from './services/blog'
export { contactApi } from './services/contact'
export type {
  Project,
  Service,
  TeamMember,
  Partner,
  Testimonial,
  BlogPost,
  ContactMessage,
  User,
  AuthResponse,
  CreateProjectDto,
  CreateServiceDto,
  CreateTeamMemberDto,
  CreatePartnerDto,
  CreateTestimonialDto,
  CreateBlogPostDto,
  CreateContactDto,
  LoginDto,
  RegisterDto,
} from './types'
