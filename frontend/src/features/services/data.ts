import type { ComponentType, SVGProps } from 'react'
import {
  PenTool,
  Layers,
  Globe,
  Megaphone,
  Camera,
} from '@/shared/components/Icon'

export type ServiceItem = {
  title: string
  description: string
  services: string[]
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const SERVICES: ServiceItem[] = [
  {
    title: 'Branding & Identity',
    description:
      'We helps healthcare organizations create professional and consistent brand identities that strengthen their reputation and connect with patients.',
    services: [
      'Brand Strategy',
      'Brand Positioning & Messaging',
      'Logo Design',
      'Visual Identity Development',
      'Brand Guidelines',
      'Rebranding Solutions',
    ],
    icon: PenTool,
  },
  {
    title: 'Marketing & Growth',
    description:
      'We develop strategic marketing campaigns that increase visibility, strengthen patient engagement, and support organizational growth — from digital promotion to event marketing and professional social media hosting.',
    services: [
      'Social Media Management',
      'Professional Social Media Hosting',
      'Content Marketing',
      'Search Engine Optimization (SEO)',
      'Paid Advertising (Google, Facebook & Instagram Ads)',
      'Email Marketing',
      'Marketing Strategy Development',
      'Campaign Planning & Management',
      'Event Marketing & Promotion',
      'Campaign Organization & Coordination',
    ],
    icon: Megaphone,
  },
  {
    title: 'Multimedia Production',
    description:
      'Our team creates high-quality multimedia content designed to educate, inform, and engage your audience — from creative content production to complete event and broadcast media management.',
    services: [
      'Full Media Production',
      'Professional Camera Crew',
      'Video Editing',
      'Motion Graphics',
      'Health Awareness Campaign Content',
      'Copywriting & Storytelling',
      'Infographics & Educational Visuals',
      'Live Streaming Services',
      'Drone Videography & Photography',
      'Media Direction & Production Management',
      'Event Coverage & Documentation',
    ],
    icon: Camera,
  },
  {
    title: 'Website & Digital Solutions',
    description:
      'We design and manage healthcare-focused digital platforms that deliver results.',
    services: [
      'Website Design',
      'Website Development',
      'Website Management',
      'Landing Page Development',
      'User Experience (UX/UI) Design',
      'Website Analytics & Performance Tracking',
    ],
    icon: Globe,
  },
  {
    title: 'Marketing Materials, Events & Creative Support',
    description:
      'Professional marketing materials and event support solutions that communicate your message clearly and effectively.',
    services: [
      'Brochures',
      'Flyers',
      'Posters',
      'Roll-Up Banners',
      'Billboards',
      'Hospital Signage Design',
      'Corporate Presentation Design',
      'Social Media Graphics',
      'Digital Advertising Creatives',
      'LCD Screen Rental',
      'Sound System Rental',
      'Event Display & Presentation Setup',
    ],
    icon: Layers,
  },
]
