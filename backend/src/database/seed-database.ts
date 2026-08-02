import { INestApplicationContext } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../entities/user.entity'
import { Project } from '../entities/project.entity'
import { BlogPost } from '../entities/blog-post.entity'
import { Service } from '../entities/service.entity'
import { TeamMember } from '../entities/team-member.entity'
import { Partner } from '../entities/partner.entity'
import { Testimonial } from '../entities/testimonial.entity'

export async function runSeed(app: INestApplicationContext): Promise<void> {
  const users = app.get<Repository<User>>(getRepositoryToken(User))
  const projects = app.get<Repository<Project>>(getRepositoryToken(Project))
  const posts = app.get<Repository<BlogPost>>(getRepositoryToken(BlogPost))
  const services = app.get<Repository<Service>>(getRepositoryToken(Service))
  const team = app.get<Repository<TeamMember>>(getRepositoryToken(TeamMember))
  const partners = app.get<Repository<Partner>>(getRepositoryToken(Partner))
  const testimonials = app.get<Repository<Testimonial>>(
    getRepositoryToken(Testimonial),
  )

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
        title: 'St. Mary Specialty Clinic Rebrand',
        slug: 'st-mary-rebrand',
        excerpt: 'Unified brand identity across patient touchpoints.',
        category: 'Branding & Identity',
        tags: ['Branding', 'Strategy'],
        description:
          'We redesigned the clinic brand system, messaging tone, and visual language to make patient communication clearer and more consistent across digital and print assets.',
        image: '/project-st-mary.jpg',
        featured: true,
        sortOrder: 1,
      },
      {
        title: 'City Heart Hospital Campaign',
        slug: 'city-heart-campaign',
        excerpt: 'Awareness, bookings, and patient education, grown together.',
        category: 'Marketing & Growth',
        tags: ['Campaign', 'Social Media'],
        description:
          'Our team launched multi-channel campaign creatives and weekly performance optimization that increased appointment intent and improved engagement quality.',
        image: '/project-city-heart.jpg',
        featured: true,
        sortOrder: 2,
      },
      {
        title: 'MedEd Learning Content Series',
        slug: 'meded-learning-series',
        excerpt: 'Educational multimedia for patient awareness and retention.',
        category: 'Multimedia Production',
        tags: ['Video', 'Content'],
        description:
          'We produced short-form health education videos, motion graphics, and awareness visuals designed to simplify complex medical information for the public.',
        image: '/project-meded.jpg',
        featured: true,
        sortOrder: 3,
      },
      {
        title: 'Responsive Medical Portal',
        slug: 'responsive-medical-portal',
        excerpt: 'Designing patient-first digital experiences on web and mobile.',
        category: 'Website & Digital',
        tags: ['Web Design', 'UI/UX Design'],
        description:
          'A responsive patient portal focused on appointment booking, care instructions, and clear clinical communication.',
        featured: false,
        sortOrder: 4,
      },
      {
        title: 'Targeted Patient Acquisition',
        slug: 'targeted-patient-acquisition',
        excerpt: 'Driving appointments via Google and social PPC campaigns.',
        category: 'Marketing & Growth',
        tags: ['Marketing', 'PPC Campaigns'],
        description:
          'Paid acquisition campaigns across Google and Meta that increased qualified appointment requests for specialty clinics.',
        featured: false,
        sortOrder: 5,
      },
      {
        title: 'Custom Telehealth Platform',
        slug: 'custom-telehealth-platform',
        excerpt: 'Secure portal development for medical communications.',
        category: 'Website & Digital',
        tags: ['Web Design', 'Development'],
        description:
          'Telehealth experience with secure messaging, visit summaries, and mobile-first UX for patients and providers.',
        featured: false,
        sortOrder: 6,
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
        image: '/team-eyasu.png',
        expertise: ['Brand Strategy', 'Creative Direction'],
      },
      {
        name: 'Dr. Sara Tekle',
        position: 'Medical Marketing Lead',
        bio: 'Bridges clinical credibility and patient-facing campaigns for hospitals and specialty clinics.',
        image: '/team-sara.png',
        expertise: ['Healthcare Marketing', 'Content'],
      },
      {
        name: 'Meheret Alemu',
        position: 'Head of MED IT',
        bio: 'Builds digital products and systems that keep clinic brands fast, secure, and measurable.',
        image: '/team-meheret.png',
        expertise: ['Engineering', 'Product'],
      },
      {
        name: 'Yeabtsega Mekonnen',
        position: 'Full Stack Designer',
        bio: 'Designs and ships interfaces that make care pathways clearer for patients and staff.',
        image: '/team-yeabtsega.png',
        expertise: ['UI/UX', 'Frontend'],
      },
    ]

    await team.save(sampleTeam.map((m) => team.create(m)))
    console.log(`Seeded ${sampleTeam.length} team members`)
  }

  if ((await partners.count()) === 0) {
    const samplePartners = [
      'Addis Specialty Clinic',
      'Nile Heart Center',
      'CarePath Diagnostics',
      'Horizon Hospitals',
      'MedEd Ethiopia',
      'St. Gabriel Care',
    ].map((name, i) => ({
      name,
      sortOrder: i + 1,
      isActive: true,
    }))

    await partners.save(samplePartners.map((p) => partners.create(p)))
    console.log(`Seeded ${samplePartners.length} partners`)
  }

  if ((await testimonials.count()) === 0) {
    const sampleTestimonials = [
      {
        name: 'Dr. Helen Assefa',
        title: 'Medical Director, Addis Specialty Clinic',
        quote:
          'MEDesign gave our clinic a voice patients actually trust: clear, calm, and consistent from the waiting room to Instagram.',
        sortOrder: 1,
        isActive: true,
      },
      {
        name: 'Abel Tadesse',
        title: 'Marketing Lead, Nile Heart Center',
        quote:
          'They treated our campaign like clinical work: measured, iterative, and always about the patient outcome.',
        sortOrder: 2,
        isActive: true,
      },
      {
        name: 'Sara Negash',
        title: 'Founder, CarePath Diagnostics',
        quote:
          'From brand system to launch creatives, the team understood healthcare constraints without dulling the craft.',
        sortOrder: 3,
        isActive: true,
      },
      {
        name: 'Yonatan Bekele',
        title: 'Operations Manager, Horizon Hospitals',
        quote:
          'Our digital presence finally matches the standard of care we deliver on the floor. That shift was overdue.',
        sortOrder: 4,
        isActive: true,
      },
    ]

    await testimonials.save(
      sampleTestimonials.map((t) => testimonials.create(t)),
    )
    console.log(`Seeded ${sampleTestimonials.length} testimonials`)
  }
}
