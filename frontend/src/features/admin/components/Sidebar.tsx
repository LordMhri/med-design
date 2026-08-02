import { NavLink, useNavigate } from 'react-router-dom'
import { Logo } from '@/shared/components/Logo'
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Settings,
  MessageSquare,
  LogOut,
  Building2,
  Quote,
} from '@/shared/components/Icon'
import { logout } from '@/features/admin/auth'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { to: '/admin/projects', label: 'Projects', icon: Briefcase },
  { to: '/admin/partners', label: 'Partners', icon: Building2 },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Quote },
  { to: '/admin/team', label: 'Team Members', icon: Users },
  { to: '/admin/services', label: 'Services', icon: Settings },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
]

export function Sidebar() {
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <aside className="flex h-screen w-64 flex-col bg-ink text-white">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <Logo variant="light" className="text-2xl" />
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent/15 text-accent'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <link.icon className="h-5 w-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </div>
    </aside>
  )
}
