import { Suspense, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from '@/features/admin/auth'
import { Sidebar } from './Sidebar'

function AdminFallback() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  )
}

export function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login', { replace: true })
    }
  }, [navigate, location.pathname])

  if (!isAuthenticated()) return null

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <Suspense fallback={<AdminFallback />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

