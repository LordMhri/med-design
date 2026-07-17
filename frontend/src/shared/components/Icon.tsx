import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
})

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const Menu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const Close = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const Mail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

export const Phone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
)

export const MapPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const Check = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m5 12 5 5L20 6" />
  </svg>
)

export const ChevronDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const Quote = (p: IconProps) => (
  <svg {...base({ ...p, fill: 'currentColor', stroke: 'none' })}>
    <path d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v1a2 2 0 0 1-2 2H4v2h1a4 4 0 0 0 4-4V7Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v1a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V7Z" />
  </svg>
)

export const Star = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5 14.6 9l5.9.6-4.4 4 1.3 5.9L12 16.8 6.6 19.5l1.3-5.9-4.4-4 5.9-.6L12 3.5Z" />
  </svg>
)

/* ---- Service icons ---- */

export const PenTool = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m12 19 7-7-3-3-7 7-1 4 4-1Z" />
    <path d="M14 7 17 4l3 3-3 3" />
    <circle cx="11" cy="14" r="1" />
  </svg>
)

export const Layers = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5M3 17l9 5 9-5" />
  </svg>
)

export const Globe = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
  </svg>
)

export const Megaphone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 10v4l9 4V6l-9 4Z" />
    <path d="M13 7a5 5 0 0 1 0 10M6 14v4a2 2 0 0 0 2 2" />
  </svg>
)

export const Camera = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
)

export const Edit = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 20h16M5 16l9-9 3 3-9 9H5v-3Z" />
  </svg>
)

export const Share = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" />
  </svg>
)

export const FileText = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 3h7l4 4v14H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v4h4M9 13h6M9 17h6" />
  </svg>
)

export const TrendingUp = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m3 16 5-5 4 4 8-8" />
    <path d="M15 7h5v5" />
  </svg>
)

export const Heart = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z" />
  </svg>
)

export const Award = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="9" r="5" />
    <path d="m9 13-1.5 8L12 19l4.5 2L15 13" />
  </svg>
)

export const Users = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5M18 20a6 6 0 0 0-3-5.2" />
  </svg>
)

/* ---- Social icons ---- */

export const Instagram = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const Linkedin = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" />
  </svg>
)

export const Twitter = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 6.5a7 7 0 0 1-2 .6 3.4 3.4 0 0 0 1.5-1.9 7 7 0 0 1-2.2.9A3.4 3.4 0 0 0 12 9.2 9.6 9.6 0 0 1 5 5.6a3.4 3.4 0 0 0 1 4.6 3.3 3.3 0 0 1-1.5-.4 3.4 3.4 0 0 0 2.7 3.4 3.4 3.4 0 0 1-1.5 0 3.4 3.4 0 0 0 3.2 2.4A6.9 6.9 0 0 1 4 17.1 9.7 9.7 0 0 0 9.3 19c6 0 9.3-5 9.3-9.3v-.5A6.7 6.7 0 0 0 21 6.5Z" />
  </svg>
)

export const Facebook = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2l.5-3H14V8.5A.5.5 0 0 1 14 8Z" />
  </svg>
)

export const LayoutDashboard = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

export const Briefcase = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="8" width="18" height="13" rx="2" />
    <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
    <path d="M3 12h18" />
  </svg>
)

export const MessageSquare = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 12a9 9 0 0 1-12 8.3l-4 1.7 1.7-4A9 9 0 1 1 21 12Z" />
  </svg>
)

export const LogOut = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
)

export const Plus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const Trash2 = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
)

export const Eye = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

export const Search = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="10" cy="10" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
)

export const Settings = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
)
