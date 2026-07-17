import { INestApplicationContext } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../entities/user.entity'
import { Project } from '../entities/project.entity'
import { BlogPost } from '../entities/blog-post.entity'
import { Service } from '../entities/service.entity'
import { TeamMember } from '../entities/team-member.entity'

export async function runSeed(app: INestApplicationContext): Promise<void> {
  const users = app.get<Repository<User>>(getRepositoryToken(User))
  const projects = app.get<Repository<Project>>(getRepositoryToken(Project))
  const posts = app.get<Repository<BlogPost>>(getRepositoryToken(BlogPost))
  const services = app.get<Repository<Service>>(getRepositoryToken(Service))
  const team = app.get<Repository<TeamMember>>(getRepositoryToken(TeamMember))

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@medesign.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  let admin = await users.findOne({ where: { email: adminEmail } })
  if (!admin) {
    admin = users.create({
      email: adminEmail,
      firstName: 'Admin',
      lastName: 'MEDesign',
      password: await bcrypt.hash(adminPassword, 10),
      isAdmin: true,
    })
    await users.save(admin)
    console.log(`Created admin: ${adminEmail}`)
  } else if (!admin.isAdmin) {
    admin.isAdmin = true
    await users.save(admin)
    console.log(`Promoted existing user to admin: ${adminEmail}`)
  }

  if ((await projects.count()) === 0) {
    const sampleProjects = [
      {
        title: 'Brand Strategy & Identity',
        slug: 'brand-strategy-identity',
        excerpt: 'Crafting modern identity guidelines for medical providers.',
        category: 'Branding',
        tags: ['Branding', 'Design System'],
        description:
          'We built a complete brand system for a multi-clinic healthcare group, including identity guidelines, typography, and patient-facing collateral.',
      },
      {
        title: 'Responsive Medical Portal',
        slug: 'responsive-medical-portal',
        excerpt: 'Designing patient-first digital experiences on web & mobile.',
        category: 'Web Design',
        tags: ['Web Design', 'UI/UX Design'],
        description:
          'A responsive patient portal focused on appointment booking, care instructions, and clear clinical communication.',
      },
      {
        title: 'Targeted Patient Acquisition',
        slug: 'targeted-patient-acquisition',
        excerpt: 'Driving appointments via Google & social PPC campaigns.',
        category: 'Marketing',
        tags: ['Marketing', 'PPC Campaigns'],
        description:
          'Paid acquisition campaigns across Google and Meta that increased qualified appointment requests for specialty clinics.',
      },
      {
        title: 'Clinic Logo & Collateral',
        slug: 'clinic-logo-collateral',
        excerpt: 'Custom logo design for specialized clinics.',
        category: 'Branding',
        tags: ['Logo Design', 'Branding'],
        description:
          'Logo, stationery, and signage suite for a specialty clinic launching a new location.',
      },
      {
        title: 'Custom Telehealth Platform',
        slug: 'custom-telehealth-platform',
        excerpt: 'Secure portal development for medical communications.',
        category: 'Web Design',
        tags: ['Web Design', 'Development'],
        description:
          'Telehealth experience with secure messaging, visit summaries, and mobile-first UX for patients and providers.',
      },
      {
        title: 'Social Media Growth Campaign',
        slug: 'social-media-growth-campaign',
        excerpt: 'Growing brand awareness and engagement across channels.',
        category: 'Marketing',
        tags: ['Marketing', 'Social Media'],
        description:
          'Content and community strategy that grew awareness for a regional healthcare brand across Instagram and LinkedIn.',
      },
    ]

    await projects.save(sampleProjects.map((p) => projects.create(p)))
    console.log(`Seeded ${sampleProjects.length} projects`)
  }

  if ((await posts.count()) === 0) {
    const samplePosts = [
      {
        title: 'How Healthcare Brands Build Patient Trust Online',
        slug: 'healthcare-brands-patient-trust',
        excerpt:
          'Practical ways clinics can use design, content, and digital presence to earn patient confidence.',
        content:
          'Patient trust starts before the first appointment. Clear branding, accessible websites, and consistent messaging help healthcare organizations feel credible and caring.',
        tags: ['Branding', 'Healthcare'],
        status: 'published' as const,
        publishedAt: new Date(),
      },
      {
        title: 'Why Specialty Clinics Need Dedicated Digital Marketing',
        slug: 'specialty-clinics-digital-marketing',
        excerpt:
          'Generic agency playbooks miss clinical nuance. Specialty practices need targeted campaigns and patient-first creative.',
        content:
          'Specialty clinics compete on expertise and outcomes. Digital campaigns should reflect that with precise messaging and high-intent landing pages.',
        tags: ['Marketing', 'PPC'],
        status: 'published' as const,
        publishedAt: new Date(),
      },
      {
        title: 'Design Systems That Scale Across Clinic Locations',
        slug: 'clinic-design-systems',
        excerpt:
          'A shared visual system keeps multi-location brands consistent without slowing local teams down.',
        content:
          'When clinics expand, brand drift is common. A lightweight design system keeps every location aligned while still allowing local flexibility.',
        tags: ['Design', 'Brand Identity'],
        status: 'published' as const,
        publishedAt: new Date(),
      },
    ]

    await posts.save(samplePosts.map((p) => posts.create(p)))
    console.log(`Seeded ${samplePosts.length} blog posts`)
  }

  if ((await services.count()) === 0) {
    const sampleServices = [
      {
        name: 'Logo Design',
        description:
          'Crafting unique and memorable logos that represent the essence of your medical brand.',
        icon: 'PenTool',
        isActive: true,
      },
      {
        name: 'Brand Identity Development',
        description:
          'Building cohesive brand systems including logos, color palettes, typography, and guidelines.',
        icon: 'Layers',
        isActive: true,
      },
      {
        name: 'Website Design & Management',
        description:
          'Responsive, healthcare-focused websites with ongoing management and performance updates.',
        icon: 'Globe',
        isActive: true,
      },
      {
        name: 'PPC Advertising',
        description:
          'Targeted paid campaigns that attract new patients and grow qualified appointment volume.',
        icon: 'Megaphone',
        isActive: true,
      },
      {
        name: 'Professional Medical Photoshoot',
        description:
          'High-quality photography for facilities, teams, and services with a clinical yet human feel.',
        icon: 'Camera',
        isActive: true,
      },
      {
        name: 'Content Creation',
        description:
          'Videos, graphics, and written content that resonate with patients and reflect your brand.',
        icon: 'Edit',
        isActive: true,
      },
      {
        name: 'Social Media Management',
        description:
          'Ongoing social presence that builds engagement, authority, and community trust.',
        icon: 'Share',
        isActive: true,
      },
      {
        name: 'Brochures & Flyers',
        description:
          'Print materials that communicate services clearly and professionally.',
        icon: 'FileText',
        isActive: true,
      },
      {
        name: 'Content Marketing',
        description:
          'Strategies that build authority, drive organic traffic, and convert visitors into patients.',
        icon: 'TrendingUp',
        isActive: true,
      },
    ]

    await services.save(sampleServices.map((s) => services.create(s)))
    console.log(`Seeded ${sampleServices.length} services`)
  }

  if ((await team.count()) === 0) {
    const sampleTeam = [
      {
        name: 'Eyasu Kebede',
        position: 'CEO and Creative Director',
        bio: 'Leads creative strategy and brand direction for healthcare clients across digital and print.',
        expertise: ['Brand Strategy', 'Creative Direction'],
      },
      {
        name: 'Sara Haile',
        position: 'Head of Digital Marketing',
        bio: 'Builds patient acquisition systems through PPC, content, and conversion-focused campaigns.',
        expertise: ['PPC', 'Content Marketing'],
      },
      {
        name: 'Daniel Mekonnen',
        position: 'Lead Product Designer',
        bio: 'Designs patient-first digital experiences for clinics, telehealth, and care portals.',
        expertise: ['UI/UX', 'Web Design'],
      },
    ]

    await team.save(sampleTeam.map((m) => team.create(m)))
    console.log(`Seeded ${sampleTeam.length} team members`)
  }
}
