export const INTERESTS = [
  'Logo Design',
  'Brand Identity Development',
  'Website Design & Management',
  'PPC (Pay-Per-Click) Advertising',
  'Professional Medical Photoshoot',
  'Content Creation',
  'Social Media Management',
  'Brochures & Flyers',
  'Content Marketing',
] as const

export const REFERRAL_SOURCES = [
  'Google Search',
  'Social Media',
  'Referral from a friend',
  'Advertisement',
  'Other',
] as const

export const BUDGET = {
  min: 15000,
  max: 1000000,
  step: 5000,
  default: 50000,
} as const

export const CONTACT_INFO = {
  email: 'letschat@rno1.com',
  phones: ['+251 98 878 3646', '+251 93 023 9907'],
} as const
