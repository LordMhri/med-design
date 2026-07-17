const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

let authToken: string | null = null

export function setAuthToken(token: string | null) {
  authToken = token
  if (token) {
    localStorage.setItem('med_access_token', token)
  } else {
    localStorage.removeItem('med_access_token')
  }
}

export function getAuthToken(): string | null {
  if (authToken) return authToken
  const stored = localStorage.getItem('med_access_token')
  if (stored) {
    authToken = stored
    return stored
  }
  return null
}

export function clearAuthToken() {
  setAuthToken(null)
}

type RequestOptions = {
  method?: string
  body?: unknown
  headers?: Record<string, string>
  auth?: boolean
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, auth = true } = options

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  }

  if (auth) {
    const token = getAuthToken()
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`
    }
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(error.message || `API error: ${res.status}`)
  }

  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return undefined as T
  }

  return res.json()
}
