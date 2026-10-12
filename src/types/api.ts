export type BlogStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'DELETED' | string

export interface ApiCategory {
  id: number
  name: string
  slug: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export interface ApiTag {
  id: number
  name: string
  slug: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export interface BlogArticle {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImageUrl?: string
  authorId?: number
  categoryId?: number
  commentsEnabled?: boolean
  language?: string
  status?: BlogStatus
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
  deleted?: boolean
  viewCount?: number
  tagIds?: number[]
}

export interface BlogUpsertPayload {
  title: string
  slug?: string
  excerpt?: string
  content?: string
  featuredImageUrl?: string
  categoryId?: number | null
  status?: BlogStatus
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  language?: string
  commentsEnabled?: boolean
  tagIds?: number[]
}

export interface BlogStatusRequest {
  status: BlogStatus
}

export interface PageResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
  empty: boolean
  first: boolean
  last: boolean
}

export interface AuthSession {
  token: string
  email?: string
  name?: string
  role?: string
  roles?: string[]
}

export interface LoginApiResponse {
  token?: string
  accessToken?: string
  jwt?: string
  refreshToken?: string
  user?: {
    email?: string
    name?: string
    role?: string
    roles?: string[]
  }
  email?: string
  name?: string
  role?: string
  roles?: string[]
}
