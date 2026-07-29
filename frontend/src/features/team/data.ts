export type Member = {
  name: string
  role: string
  image?: string
}

export const TEAM: Member[] = [
  {
    name: 'Meheret Alemu',
    role: 'Software Engineer & Head of MED IT Department',
    image: '/team-meheret.png',
  },
  {
    name: 'Dr. Sara Tekle',
    role: 'Medical Doctor, Marketing Expert & Head of MED Marketing Department',
    image: '/team-sara.png',
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
    name: 'Lorem Ipsum',
    title: 'Lorem ipsum',
    quote:
      'Lorem ipsum dolor sit amet, consectetuer Lorem ipsum dolor sit amet, consectetuer Lorem ipsum dolor sit amet.',
  },
  {
    name: 'Lorem Ipsum',
    title: 'Lorem ipsum',
    quote:
      'Lorem ipsum dolor sit amet, consectetuer Lorem ipsum dolor sit amet, consectetuer Lorem ipsum dolor sit amet.',
  },
  {
    name: 'Lorem Ipsum',
    title: 'Lorem ipsum',
    quote:
      'Lorem ipsum dolor sit amet, consectetuer Lorem ipsum dolor sit amet, consectetuer Lorem ipsum dolor sit amet.',
  },
  {
    name: 'Lorem Ipsum',
    title: 'Lorem ipsum',
    quote:
      'Lorem ipsum dolor sit amet, consectetuer Lorem ipsum dolor sit amet, consectetuer Lorem ipsum dolor sit amet.',
  },
]
