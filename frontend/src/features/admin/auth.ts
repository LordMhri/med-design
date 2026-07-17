import { getAuthToken } from '@/api/client'
import { authApi } from '@/api/services/auth'
import type { AuthResponse } from '@/api/types'

export type AdminUser = {
  email: string
  name: string
}

const AUTH_KEY = 'med_admin_auth'

function storeUser(res: AuthResponse) {
  const user: AdminUser = {
    email: res.user.email,
    name: res.user.firstName || 'Admin',
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify(user))
  return user
}

export async function login(email: string, password: string): Promise<AdminUser | null> {
  try {
    const res = await authApi.login({ email, password })
    return storeUser(res)
  } catch {
    return null
  }
}

export function logout(): void {
  authApi.logout()
  localStorage.removeItem(AUTH_KEY)
}

export function getCurrentUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return null
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null && getAuthToken() !== null
}
