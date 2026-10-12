import type { ApiCategory, ApiTag, BlogArticle, BlogStatusRequest, BlogUpsertPayload, LoginApiResponse, PageResponse } from '../types/api'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'https://vanexa-backend.onrender.com').replace(/\/+$/, '')

export const apiBaseUrl = API_BASE_URL
let logoutRequest: Promise<boolean> | null = null

const statusMessages: Record<number, string> = {
  400: 'Check the submitted information and try again.',
  401: 'Your session is invalid or expired. Please sign in again.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested item could not be found.',
  409: 'This request conflicts with the current server state.',
  413: 'The upload or request is too large.',
  500: 'The server encountered an error. Please try again later.',
}

export function getStoredSession() {
  const raw = localStorage.getItem('vanexa_auth_session')
  if (!raw) return null

  try {
    return JSON.parse(raw) as { token?: string; role?: string; roles?: string[]; email?: string; name?: string }
  } catch {
    return null
  }
}

export function setStoredSession(session: { token: string; role?: string; roles?: string[]; email?: string; name?: string }) {
  localStorage.setItem('vanexa_auth_session', JSON.stringify(session))
}

export function clearStoredSession() {
  localStorage.removeItem('vanexa_auth_session')
}

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredSession()?.token
  const headers = new Headers(options.headers ?? {})

  if (options.body !== undefined && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    cache: 'no-store',
  })

  const text = await response.text()
  let payload: unknown = null
  if (text) {
    try {
      payload = JSON.parse(text)
    } catch {
      payload = text
    }
  }

  if (!response.ok) {
    const payloadMessage = typeof payload === 'string'
      ? payload.trimStart().startsWith('<') ? '' : payload.trim()
      : payload && typeof payload === 'object'
        ? String((payload as { message?: unknown; error?: unknown }).message ?? (payload as { error?: unknown }).error ?? '')
        : ''
    const message = payloadMessage || statusMessages[response.status] || 'Request failed. Please try again.'
    throw new Error(message)
  }

  return (payload ?? null) as T
}

export async function fetchPublicBlogs(params?: { page?: number; size?: number; keyword?: string; categoryId?: number | 'all'; tagId?: number | 'all' }): Promise<PageResponse<BlogArticle>> {
  const page = params?.page ?? 0
  const size = params?.size ?? 9

  if (params?.tagId && params.tagId !== 'all') {
    return apiRequest<PageResponse<BlogArticle>>(`/api/blogs/public/tag/${params.tagId}?page=${page}&size=${size}`)
  }

  if (params?.categoryId && params.categoryId !== 'all') {
    return apiRequest<PageResponse<BlogArticle>>(`/api/blogs/public/category/${params.categoryId}?page=${page}&size=${size}`)
  }

  if (params?.keyword && params.keyword.trim().length > 0) {
    const q = encodeURIComponent(params.keyword.trim())
    return apiRequest<PageResponse<BlogArticle>>(`/api/blogs/public/search?keyword=${q}&page=${page}&size=${size}`)
  }

  return apiRequest<PageResponse<BlogArticle>>(`/api/blogs/public?page=${page}&size=${size}`)
}

export async function fetchPublicBlogBySlug(slug: string): Promise<BlogArticle> {
  return apiRequest<BlogArticle>(`/api/blogs/public/${slug}`)
}

export async function fetchBlogsAdmin(params?: { page?: number; size?: number }): Promise<PageResponse<BlogArticle>> {
  const page = params?.page ?? 0
  const size = params?.size ?? 20
  return apiRequest<PageResponse<BlogArticle>>(`/api/blogs?page=${page}&size=${size}`)
}

export async function fetchBlogById(id: number): Promise<BlogArticle> {
  return apiRequest<BlogArticle>(`/api/blogs/${id}`)
}

export async function createBlog(payload: BlogUpsertPayload): Promise<BlogArticle> {
  return apiRequest<BlogArticle>('/api/blogs', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function updateBlog(id: number, payload: BlogUpsertPayload): Promise<BlogArticle> {
  return apiRequest<BlogArticle>(`/api/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function updateBlogStatus(id: number, status: string): Promise<BlogArticle> {
  return apiRequest<BlogArticle>(`/api/blogs/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status } satisfies BlogStatusRequest),
  })
}

export async function deleteBlog(id: number): Promise<void> {
  await apiRequest<void>(`/api/blogs/${id}`, { method: 'DELETE' })
}

export async function restoreBlog(id: number): Promise<BlogArticle> {
  return apiRequest<BlogArticle>(`/api/blogs/${id}/restore`, { method: 'PATCH' })
}

export async function permanentDeleteBlog(id: number): Promise<void> {
  await apiRequest<void>(`/api/blogs/${id}/permanent`, { method: 'DELETE' })
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  return apiRequest<ApiCategory[]>('/api/categories')
}

export async function fetchTags(): Promise<ApiTag[]> {
  return apiRequest<ApiTag[]>('/api/blogs/tags')
}

export async function uploadImage(file: File): Promise<Record<string, unknown>> {
  const formData = new FormData()
  formData.append('file', file)

  return apiRequest<Record<string, unknown>>('/api/uploads/image', {
    method: 'POST',
    body: formData,
  })
}

export async function incrementBlogView(slug: string): Promise<void> {
  await apiRequest<void>(`/api/blogs/public/${slug}/view`, { method: 'POST' })
}

export async function loginUser(payload: Record<string, string>): Promise<LoginApiResponse> {
  try {
    const data = await apiRequest<LoginApiResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    const token = data.token ?? data.accessToken ?? data.jwt
    const role = data.role ?? data.user?.role ?? data.roles?.[0] ?? data.user?.roles?.[0]
    const userEmail = data.email ?? data.user?.email
    const userName = data.name ?? data.user?.name

    if (token) {
      setStoredSession({
        token,
        role,
        roles: data.roles ?? data.user?.roles ?? (role ? [role] : []),
        email: userEmail,
        name: userName,
      })
    }

    return data
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'The backend login contract is returning an unexpected response. Please confirm the exact DTO with the server team.'

    throw new Error(message, {
      cause: error,
    })
  }
}

export function logoutUser(): Promise<boolean> {
  if (logoutRequest) return logoutRequest

  const token = getStoredSession()?.token
  if (!token) {
    clearStoredSession()
    return Promise.resolve(false)
  }

  logoutRequest = apiRequest<void>('/api/auth/logout', {
      method: 'POST',
    })
    .then(() => true)
    .finally(() => {
      clearStoredSession()
      logoutRequest = null
    })

  return logoutRequest
}
