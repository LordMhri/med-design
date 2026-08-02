// import { teamApi } from '@/api/services/team'
// import { partnersApi } from '@/api/services/partners'
// import { testimonialsApi } from '@/api/services/testimonials'
// import type {
//   Partner as ApiPartner,
//   Testimonial as ApiTestimonial,
// } from '@/api/types'

export type Member = {
  name: string
  role: string
  image?: string
}

export const TEAM: Member[] = [
  {
    name: 'Eyasu Kebede',
    role: 'CEO and Creative Director',
    image: '/team-eyasu.png',
  },
  {
    name: 'Dr. Sara Tekle',
    role: 'Medical Marketing Lead',
    image: '/team-sara.png',
  },
  {
    name: 'Meheret Alemu',
    role: 'Head of MED IT',
    image: '/team-meheret.png',
  },
  {
    name: 'Yeabtsega Mekonnen',
    role: 'Full Stack Designer',
    image: '/team-yeabtsega.png',
  },
]

export type Testimonial = {
  id?: string
  name: string
  title: string
  quote: string
  avatarUrl?: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Dr. Helen Assefa',
    title: 'Medical Director, Addis Specialty Clinic',
    quote:
      'MEDesign gave our clinic a voice patients actually trust: clear, calm, and consistent from the waiting room to Instagram.',
  },
  {
    name: 'Abel Tadesse',
    title: 'Marketing Lead, Nile Heart Center',
    quote:
      'They treated our campaign like clinical work: measured, iterative, and always about the patient outcome.',
  },
  {
    name: 'Sara Negash',
    title: 'Founder, CarePath Diagnostics',
    quote:
      'From brand system to launch creatives, the team understood healthcare constraints without dulling the craft.',
  },
  {
    name: 'Yonatan Bekele',
    title: 'Operations Manager, Horizon Hospitals',
    quote:
      'Our digital presence finally matches the standard of care we deliver on the floor. That shift was overdue.',
  },
]

export type Partner = {
  id?: string
  name: string
  logoUrl?: string
  websiteUrl?: string
}

/** Partner names shown as quiet wordmarks until official logos ship. */
export const PARTNER_NAMES = [
  'Addis Specialty Clinic',
  'Nile Heart Center',
  'CarePath Diagnostics',
  'Horizon Hospitals',
  'MedEd Ethiopia',
  'St. Gabriel Care',
] as const

export const PARTNERS: Partner[] = PARTNER_NAMES.map((name) => ({ name }))

// function mapPartner(p: ApiPartner): Partner {
//   return {
//     id: p.id,
//     name: p.name,
//     logoUrl: p.logoUrl,
//     websiteUrl: p.websiteUrl,
//   }
// }

// function mapTestimonial(t: ApiTestimonial): Testimonial {
//   return {
//     id: t.id,
//     name: t.name,
//     title: t.title,
//     quote: t.quote,
//     avatarUrl: t.avatarUrl,
//   }
// }

export async function fetchTeam(): Promise<Member[]> {
  // Dynamic API team fetch disabled temporarily until admin dashboard rollout.
  // const items = await teamApi.getAll()
  // if (items.length === 0) return TEAM
  // return items.map((m) => ({
  //   name: m.name,
  //   role: m.position,
  //   image: m.image,
  // }))
  return TEAM
}

export async function fetchPartners(): Promise<Partner[]> {
  // Dynamic API partners fetch disabled temporarily until admin dashboard rollout.
  // const items = await partnersApi.getAll()
  // if (items.length === 0) return PARTNERS
  // return items.map(mapPartner)
  return PARTNERS
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  // Dynamic API testimonials fetch disabled temporarily until admin dashboard rollout.
  // const items = await testimonialsApi.getAll()
  // if (items.length === 0) return TESTIMONIALS
  // return items.map(mapTestimonial)
  return TESTIMONIALS
}
