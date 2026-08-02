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
    role: 'Medical Doctor, Marketing Expert & Head of MED Marketing Department',
    image: '/team-sara.png',
  },
  {
    name: 'Meheret Alemu',
    role: 'Software Engineer & Head of MED IT Department',
    image: '/team-meheret.png',
  },
  {
    name: 'Yeabtsega Mekonnen',
    role: 'Full Stack Developer & UI/UX Designer',
    image: '/team-yeabtsega.png',
  },
]

export type Testimonial = {
  name: string
  title: string
  quote: string
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

/** Partner names shown as quiet wordmarks until official logos ship. */
export const PARTNER_NAMES = [
  'Addis Specialty Clinic',
  'Nile Heart Center',
  'CarePath Diagnostics',
  'Horizon Hospitals',
  'MedEd Ethiopia',
  'St. Gabriel Care',
] as const
