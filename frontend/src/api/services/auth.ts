import { apiRequest, setAuthToken, clearAuthToken } from '../client'
import type { AuthResponse, LoginDto, RegisterDto } from '../types'

export const authApi = {
  async login(data: LoginDto): Promise<AuthResponse> {
    const res = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: data,
      auth: false,
    })
    setAuthToken(res.accessToken)
    return res
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    const res = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: data,
      auth: false,
    })
    setAuthToken(res.accessToken)
    return res
  },

  logout() {
    clearAuthToken()
  },
}
