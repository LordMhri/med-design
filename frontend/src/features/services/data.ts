import type { ComponentType, SVGProps } from 'react'
import {
  PenTool,
  Layers,
  Globe,
  Megaphone,
  Camera,
  Edit,
  Share,
  FileText,
  TrendingUp,
} from '@/shared/components/Icon'

export type ServiceItem = {
  title: string
  description: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const SERVICES: ServiceItem[] = [
  {
    title: 'Logo Design',
    description:
      'Crafting unique and memorable logos that represent the essence of your medical brand, ensuring it stands out in a competitive market.',
    icon: PenTool,
  },
  {
    title: 'Brand Identity Development',
    description:
      'Building cohesive brand systems, including logos, color palettes, typography, and design guidelines, to establish a strong and consistent visual identity.',
    icon: Layers,
  },
  {
    title: 'Website Design & Management',
    description:
      'Creating responsive, user-friendly websites tailored for the healthcare industry, paired with ongoing management to ensure seamless performance and updates.',
    icon: Globe,
  },
  {
    title: 'PPC (Pay-Per-Click) Advertising',
    description:
      'Designing targeted and compelling social media advertisements that drive engagement, attract new patients, and boost your brand\u2019s online presence.',
    icon: Megaphone,
  },
  {
    title: 'Professional Medical Photoshoot',
    description:
      'Delivering high-quality photography services to showcase your facilities, team, and services with professionalism and authenticity.',
    icon: Camera,
  },
  {
    title: 'Content Creation',
    description:
      'Producing engaging and informative content\u2014ranging from videos to graphics\u2014that resonates with your audience and reflects your brand\u2019s values.',
    icon: Edit,
  },
  {
    title: 'Social Media Management',
    description:
      'Curating and maintaining your social media presence to build engagement, grow followers, and strengthen your brand voice.',
    icon: Share,
  },
  {
    title: 'Brochures & Flyers',
    description:
      'Designing professional print materials that effectively communicate your services and brand message to your target audience.',
    icon: FileText,
  },
  {
    title: 'Content Marketing',
    description:
      'Developing and executing content strategies that build authority, drive organic traffic, and convert visitors into loyal patients.',
    icon: TrendingUp,
  },
]
