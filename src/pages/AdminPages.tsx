import { useEffect, useMemo, useState } from 'react'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import {
  clearStoredSession,
  createBlog,
  fetchBlogById,
  fetchBlogsAdmin,
  fetchCategories,
  fetchTags,
  getStoredSession,
  loginUser,
  logoutUser,
  updateBlog,
  updateBlogStatus,
  uploadImage,
} from '../lib/api'
import type { ApiCategory, ApiTag, BlogArticle, BlogStatus, BlogUpsertPayload } from '../types/api'

const navigateTo = (path: string) => {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

const signOutAndRedirect = async (redirectPath = '/') => {
  try {
    await logoutUser()
  } catch {
    clearStoredSession()
  } finally {
    navigateTo(redirectPath)
  }
}

function formatDate(value?: string) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function blogSlugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

type BlogFormState = {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImageUrl: string
  categoryId: number | ''
  status: BlogStatus
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  language: string
  commentsEnabled: boolean
  tagIds: number[]
}

const getInitialForm = (): BlogFormState => ({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImageUrl: '',
  categoryId: '',
  status: 'DRAFT',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  language: 'en',
  commentsEnabled: true,
  tagIds: [],
})

export function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await loginUser({ email, password })
      const roles = response.roles ?? response.user?.roles ?? []
      const role = response.role ?? response.user?.role

      if (role === 'ADMIN' || roles.includes('ADMIN')) {
        navigateTo('/admin/dashboard')
        return
      }

      if (role === 'AUTHOR' || roles.includes('AUTHOR')) {
        navigateTo('/author/dashboard')
        return
      }

      navigateTo('/admin/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please confirm the backend contract with the server team.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />
      <main className="px-4 py-24 md:py-28">
        <div className="mx-auto max-w-md rounded-[30px] border border-[#e8dfcf] bg-white p-8 shadow-[0_20px_56px_rgba(0,0,0,0.04)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a96f24]">Protected access</p>
          <h1 className="mt-4 text-3xl font-black tracking-[-0.05em] text-black">Admin / author login</h1>
          <p className="mt-3 text-sm text-[#5c5750]">
            This form uses the deployed backend auth endpoint and stores the bearer token in local storage for authenticated app sessions.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1a1917]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-[#1a1917] outline-none focus:border-[#d9a441]"
                placeholder="you@vanexa.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1a1917]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-[#1a1917] outline-none focus:border-[#d9a441]"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-[#f2c8c8] bg-[#fff6f6] px-4 py-3 text-sm text-[#8f2c2c]">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full rounded-full bg-[#d9a441] px-5 py-3 text-base font-bold text-black disabled:cursor-not-allowed disabled:opacity-55">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ProtectedRoute({ requiredRole, children }: { requiredRole?: 'ADMIN' | 'AUTHOR'; children: React.ReactNode }) {
  const session = getStoredSession()

  if (!session?.token) {
    return (
      <div className="min-h-screen bg-[#f5f2ec] px-4 py-20 text-center text-[#1a1917]">
        <div className="mx-auto max-w-xl rounded-[28px] border border-[#e8dfcf] bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black tracking-[-0.05em] text-black">Authentication required</h1>
          <p className="mt-3 text-[#5c5750]">Please sign in with the appropriate admin or author account to access this area.</p>
          <button type="button" onClick={() => navigateTo('/admin/login')} className="mt-5 rounded-full bg-[#d9a441] px-5 py-3 font-semibold text-black">
            Go to login
          </button>
        </div>
      </div>
    )
  }

  const roles = (session.roles || (session.role ? [session.role] : [])) as string[]
  if (requiredRole && !roles.includes(requiredRole)) {
    return (
      <div className="min-h-screen bg-[#f5f2ec] px-4 py-20 text-center text-[#1a1917]">
        <div className="mx-auto max-w-xl rounded-[28px] border border-[#e8dfcf] bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-black tracking-[-0.05em] text-black">Access denied</h1>
          <p className="mt-3 text-[#5c5750]">This dashboard is restricted to {requiredRole} users.</p>
          <button type="button" onClick={() => { void signOutAndRedirect('/') }} className="mt-5 rounded-full border border-[#d9a441] bg-white px-5 py-3 font-semibold text-[#1a1917]">
            Sign out
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export function AdminDashboardPage() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadOverview = async () => {
      try {
        const result = await fetchBlogsAdmin({ page: 0, size: 50 })
        if (!active) return
        setBlogs(result.content || [])
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unable to load dashboard data.')
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadOverview()
    return () => {
      active = false
    }
  }, [])

  const publishedCount = blogs.filter((item) => item.status === 'PUBLISHED').length
  const draftCount = blogs.filter((item) => item.status === 'DRAFT').length
  const archivedCount = blogs.filter((item) => item.status === 'ARCHIVED').length

  return (
    <ProtectedRoute requiredRole="ADMIN">
      <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
        <Navbar />
        <main className="container px-4 py-24 md:py-28">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a96f24]">Admin dashboard</p>
              <h1 className="mt-2 text-4xl font-black tracking-[-0.05em] text-black">Content overview</h1>
            </div>
            <button type="button" onClick={() => { void signOutAndRedirect('/') }} className="rounded-full border border-[#d9a441] bg-white px-5 py-3 text-sm font-semibold text-[#1a1917]">
              Sign out
            </button>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-3xl border border-[#e8dfcf] bg-white p-6">
                  <div className="h-4 w-20 rounded bg-[#efe7dc]" />
                  <div className="mt-6 h-8 w-20 rounded bg-[#efe7dc]" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-[#f2c8c8] bg-[#fff6f6] p-6 text-[#8f2c2c]">{error}</div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  ['Total posts', String(blogs.length), 'Protected blog inventory from the authenticated admin feed'],
                  ['Published', String(publishedCount), 'Currently visible public articles'],
                  ['Draft', String(draftCount), 'Drafts available in raw backend data when exposed'],
                  ['Archived', String(archivedCount), 'Archived content from available backend states'],
                ].map(([label, value, note]) => (
                  <div key={label} className="rounded-3xl border border-[#e8dfcf] bg-white p-6 shadow-sm">
                    <div className="text-sm uppercase tracking-[0.15em] text-[#5c5750]">{label}</div>
                    <div className="mt-4 text-4xl font-black text-black">{value}</div>
                    <div className="mt-3 text-sm text-[#5c5750]">{note}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-3xl border border-[#e8dfcf] bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold text-black">Recent posts</h2>
                  <button type="button" onClick={() => navigateTo('/blog')} className="rounded-full bg-[#d9a441] px-4 py-2 text-sm font-semibold text-black">
                    Open public blog
                  </button>
                </div>

                <div className="space-y-4">
                  {blogs.slice(0, 5).map((blog) => (
                    <div key={blog.id} className="flex flex-col gap-3 rounded-2xl border border-[#efe7dc] bg-[#faf6f0] p-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#a96f24]">{blog.status || 'PUBLISHED'}</div>
                        <h3 className="mt-2 text-xl font-bold text-black">{blog.title}</h3>
                      </div>
                      <div className="text-sm text-[#5c5750]">{formatDate(blog.updatedAt || blog.publishedAt || blog.createdAt)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

export function AuthorDashboardPage() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadOverview = async () => {
      try {
        const result = await fetchBlogsAdmin({ page: 0, size: 20 })
        if (!active) return
        setBlogs(result.content || [])
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unable to load author dashboard data.')
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadOverview()
    return () => {
      active = false
    }
  }, [])

  return (
    <ProtectedRoute requiredRole="AUTHOR">
      <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
        <Navbar />
        <main className="container px-4 py-24 md:py-28">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a96f24]">Author dashboard</p>
              <h1 className="mt-2 text-4xl font-black tracking-[-0.05em] text-black">Your content workspace</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => navigateTo('/author/blogs/new')} className="rounded-full bg-[#d9a441] px-5 py-3 text-sm font-semibold text-black">
                New article
              </button>
              <button type="button" onClick={() => navigateTo('/author/blogs')} className="rounded-full border border-[#d9a441] bg-white px-5 py-3 text-sm font-semibold text-[#1a1917]">
                Manage articles
              </button>
              <button type="button" onClick={() => { void signOutAndRedirect('/') }} className="rounded-full border border-[#d9a441] bg-white px-5 py-3 text-sm font-semibold text-[#1a1917]">
                Sign out
              </button>
            </div>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-[#e8dfcf] bg-white p-8 text-[#5c5750] shadow-sm">Loading your posts…</div>
          ) : error ? (
            <div className="rounded-3xl border border-[#f2c8c8] bg-[#fff6f6] p-6 text-[#8f2c2c]">{error}</div>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ['Drafts', String(blogs.filter((blog) => blog.status === 'DRAFT').length), 'Posts awaiting publishing'],
                  ['Published', String(blogs.filter((blog) => blog.status === 'PUBLISHED').length), 'Visible public articles'],
                  ['Total', String(blogs.length), 'All author articles'],
                ].map(([label, value, note]) => (
                  <div key={label} className="rounded-3xl border border-[#e8dfcf] bg-white p-6 shadow-sm">
                    <div className="text-sm uppercase tracking-[0.15em] text-[#5c5750]">{label}</div>
                    <div className="mt-4 text-4xl font-black text-black">{value}</div>
                    <div className="mt-3 text-sm text-[#5c5750]">{note}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-[#e8dfcf] bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold text-black">Recent articles</h2>
                  <button type="button" onClick={() => navigateTo('/author/blogs/new')} className="rounded-full bg-[#d9a441] px-4 py-2 text-sm font-semibold text-black">
                    Create article
                  </button>
                </div>

                <div className="space-y-4">
                  {blogs.slice(0, 5).map((blog) => (
                    <div key={blog.id} className="flex flex-col gap-3 rounded-2xl border border-[#efe7dc] bg-[#faf6f0] p-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#a96f24]">{blog.status || 'DRAFT'}</div>
                        <h3 className="mt-2 text-xl font-bold text-black">{blog.title}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => navigateTo(`/author/blogs/${blog.id}/edit`)} className="rounded-full border border-[#d9a441] bg-white px-4 py-2 text-sm font-semibold text-[#1a1917]">
                          Edit
                        </button>
                        {blog.status === 'DRAFT' ? (
                          <button type="button" onClick={async () => { await updateBlogStatus(blog.id, 'PUBLISHED'); navigateTo('/author/blogs') }} className="rounded-full bg-[#d9a441] px-4 py-2 text-sm font-semibold text-black">
                            Publish
                          </button>
                        ) : (
                          <button type="button" onClick={async () => { await updateBlogStatus(blog.id, 'DRAFT'); navigateTo('/author/blogs') }} className="rounded-full border border-[#d9a441] bg-white px-4 py-2 text-sm font-semibold text-[#1a1917]">
                            Save draft
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

export function AuthorBlogListPage() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refreshBlogs = async () => {
    try {
      const result = await fetchBlogsAdmin({ page: 0, size: 50 })
      setBlogs(result.content || [])
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load your articles.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let active = true

    void (async () => {
      try {
        const result = await fetchBlogsAdmin({ page: 0, size: 50 })
        if (!active) return

        setBlogs(result.content || [])
        setError('')
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unable to load your articles.')
      } finally {
        if (active) setLoading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [])

  return (
    <ProtectedRoute requiredRole="AUTHOR">
      <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
        <Navbar />
        <main className="container px-4 py-24 md:py-28">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a96f24]">Author articles</p>
              <h1 className="mt-2 text-4xl font-black tracking-[-0.05em] text-black">Your blog library</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => navigateTo('/author/blogs/new')} className="rounded-full bg-[#d9a441] px-5 py-3 text-sm font-semibold text-black">
                New article
              </button>
              <button type="button" onClick={() => navigateTo('/author/dashboard')} className="rounded-full border border-[#d9a441] bg-white px-5 py-3 text-sm font-semibold text-[#1a1917]">
                Dashboard
              </button>
            </div>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-[#e8dfcf] bg-white p-8 text-[#5c5750] shadow-sm">Loading your articles…</div>
          ) : error ? (
            <div className="rounded-3xl border border-[#f2c8c8] bg-[#fff6f6] p-6 text-[#8f2c2c]">{error}</div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="rounded-[26px] border border-[#e8dfcf] bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#a96f24]">{blog.status || 'DRAFT'}</div>
                      <h3 className="mt-2 text-2xl font-bold text-black">{blog.title}</h3>
                      <p className="mt-2 text-sm text-[#5c5750]">{blog.excerpt || 'No excerpt yet.'}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => navigateTo(`/author/blogs/${blog.id}/edit`)} className="rounded-full border border-[#d9a441] bg-white px-4 py-2 text-sm font-semibold text-[#1a1917]">
                        Edit
                      </button>
                      {blog.status === 'DRAFT' ? (
                        <button type="button" onClick={async () => { await updateBlogStatus(blog.id, 'PUBLISHED'); await refreshBlogs() }} className="rounded-full bg-[#d9a441] px-4 py-2 text-sm font-semibold text-black">
                          Publish
                        </button>
                      ) : (
                        <button type="button" onClick={async () => { await updateBlogStatus(blog.id, 'DRAFT'); await refreshBlogs() }} className="rounded-full border border-[#d9a441] bg-white px-4 py-2 text-sm font-semibold text-[#1a1917]">
                          Save draft
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

export function AuthorBlogEditorPage({ blogId }: { blogId?: number }) {
  const [categories, setCategories] = useState<ApiCategory[]>([])
  const [tags, setTags] = useState<ApiTag[]>([])
  const [form, setForm] = useState<BlogFormState>(getInitialForm())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchLookups = async () => {
    const [categoryList, tagList] = await Promise.all([fetchCategories(), fetchTags()])
    setCategories(categoryList)
    setTags(tagList)
  }

  useEffect(() => {
    let active = true

    const loadPage = async () => {
      try {
        await fetchLookups()
        if (!active) return

        if (blogId) {
          const existing = await fetchBlogById(blogId)
          setForm({
            title: existing.title ?? '',
            slug: existing.slug ?? '',
            excerpt: existing.excerpt ?? '',
            content: existing.content ?? '',
            featuredImageUrl: existing.featuredImageUrl ?? '',
            categoryId: existing.categoryId ?? '',
            status: (existing.status ?? 'DRAFT') as BlogStatus,
            seoTitle: existing.seoTitle ?? '',
            seoDescription: existing.seoDescription ?? '',
            seoKeywords: existing.seoKeywords ?? '',
            language: existing.language ?? 'en',
            commentsEnabled: Boolean(existing.commentsEnabled),
            tagIds: existing.tagIds ?? [],
          })
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Unable to load the article editor.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadPage()
    return () => {
      active = false
    }
  }, [blogId])

  const updateField = <K extends keyof BlogFormState>(field: K, value: BlogFormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const submitBlog = async (status: BlogStatus) => {
    if (!form.title.trim()) {
      setError('Add a title before publishing or saving the article.')
      return
    }

    try {
      setSaving(true)
      setError('')
      setSuccess('')

      const payload: BlogUpsertPayload = {
        title: form.title.trim(),
        slug: form.slug.trim() || blogSlugify(form.title),
        excerpt: form.excerpt.trim() || form.content.trim().slice(0, 180),
        content: form.content,
        featuredImageUrl: form.featuredImageUrl || undefined,
        categoryId: form.categoryId ? Number(form.categoryId) : null,
        status,
        seoTitle: form.seoTitle || form.title,
        seoDescription: form.seoDescription || form.excerpt || form.content.slice(0, 180),
        seoKeywords: form.seoKeywords,
        language: form.language || 'en',
        commentsEnabled: form.commentsEnabled,
        tagIds: form.tagIds,
      }

      if (blogId) {
        await updateBlog(blogId, payload)
      } else {
        await createBlog(payload)
      }

      setSuccess(status === 'PUBLISHED' ? 'Article published successfully.' : 'Draft saved successfully.')
      navigateTo('/author/blogs')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save the article.')
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      setError('')
      const result = (await uploadImage(file)) as Record<string, unknown>
      const uploadedUrl = String(
        result.url ?? result.imageUrl ?? result.secure_url ?? result.secureUrl ?? '',
      )

      if (!uploadedUrl) {
        throw new Error('The backend did not return a valid image URL.')
      }

      setForm((current) => ({ ...current, featuredImageUrl: uploadedUrl }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed.')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  const tagSelection = useMemo(
    () => new Set(form.tagIds),
    [form.tagIds],
  )

  if (loading) {
    return (
      <ProtectedRoute requiredRole="AUTHOR">
        <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
          <Navbar />
          <main className="container px-4 py-24 md:py-28">
            <div className="rounded-3xl border border-[#e8dfcf] bg-white p-8 text-[#5c5750] shadow-sm">Loading editor…</div>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute requiredRole="AUTHOR">
      <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
        <Navbar />
        <main className="container px-4 py-24 md:py-28">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a96f24]">Author editor</p>
              <h1 className="mt-2 text-4xl font-black tracking-[-0.05em] text-black">{blogId ? 'Edit article' : 'Create article'}</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => submitBlog('DRAFT')} disabled={saving} className="rounded-full border border-[#d9a441] bg-white px-5 py-3 text-sm font-semibold text-[#1a1917] disabled:cursor-not-allowed disabled:opacity-50">
                {saving ? 'Saving...' : 'Save draft'}
              </button>
              <button type="button" onClick={() => submitBlog('PUBLISHED')} disabled={saving} className="rounded-full bg-[#d9a441] px-5 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50">
                {saving ? 'Publishing...' : 'Publish article'}
              </button>
            </div>
          </div>

          {error && <div className="mb-6 rounded-2xl border border-[#f2c8c8] bg-[#fff6f6] p-4 text-sm text-[#8f2c2c]">{error}</div>}
          {success && <div className="mb-6 rounded-2xl border border-[#d6ecd9] bg-[#f5fff7] p-4 text-sm text-[#1f5b39]">{success}</div>}

          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-6 rounded-[28px] border border-[#e8dfcf] bg-white p-5 shadow-sm md:p-7">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1a1917]">Title</label>
                <input value={form.title} onChange={(event) => updateField('title', event.target.value)} className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-[#1a1917] outline-none focus:border-[#d9a441]" placeholder="Article title" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1a1917]">Slug</label>
                <input value={form.slug} onChange={(event) => updateField('slug', event.target.value)} className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-[#1a1917] outline-none focus:border-[#d9a441]" placeholder="article-slug" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1a1917]">Excerpt</label>
                <textarea value={form.excerpt} onChange={(event) => updateField('excerpt', event.target.value)} rows={4} className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-[#1a1917] outline-none focus:border-[#d9a441]" placeholder="Write a short summary for the article." />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1a1917]">Content</label>
                <textarea value={form.content} onChange={(event) => updateField('content', event.target.value)} rows={16} className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-[#1a1917] outline-none focus:border-[#d9a441]" placeholder="Use your draft content here. The backend accepts JSON/Tiptap content; keep a plain text fallback for the editor if needed." />
              </div>
            </div>

            <div className="space-y-6 rounded-[28px] border border-[#e8dfcf] bg-white p-5 shadow-sm md:p-7">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1a1917]">Category</label>
                <select value={form.categoryId} onChange={(event) => updateField('categoryId', event.target.value ? Number(event.target.value) : '')} className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-[#1a1917] outline-none focus:border-[#d9a441]">
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1a1917]">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const active = tagSelection.has(tag.id)
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => {
                          const next = active
                            ? form.tagIds.filter((id) => id !== tag.id)
                            : [...form.tagIds, tag.id]
                          updateField('tagIds', next)
                        }}
                        className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${active ? 'bg-[#d9a441] text-black' : 'border border-[#e8dfcf] bg-white text-[#1a1917]'}`}
                      >
                        {tag.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1a1917]">Featured image URL</label>
                <input value={form.featuredImageUrl} onChange={(event) => updateField('featuredImageUrl', event.target.value)} className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-[#1a1917] outline-none focus:border-[#d9a441]" placeholder="https://..." />
                <label className="mt-3 inline-flex cursor-pointer items-center rounded-full bg-[#d9a441] px-4 py-2 text-sm font-semibold text-black">
                  {uploading ? 'Uploading...' : 'Upload image'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1a1917]">Language</label>
                <select value={form.language} onChange={(event) => updateField('language', event.target.value)} className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-[#1a1917] outline-none focus:border-[#d9a441]">
                  <option value="en">English</option>
                  <option value="mr">Marathi</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1a1917]">Status</label>
                <select value={form.status} onChange={(event) => updateField('status', event.target.value as BlogStatus)} className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-[#1a1917] outline-none focus:border-[#d9a441]">
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>

              <div className="rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] p-4">
                <label className="flex items-center gap-3 text-sm font-semibold text-[#1a1917]">
                  <input type="checkbox" checked={form.commentsEnabled} onChange={(event) => updateField('commentsEnabled', event.target.checked)} />
                  Comments enabled
                </label>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1a1917]">SEO title</label>
                <input value={form.seoTitle} onChange={(event) => updateField('seoTitle', event.target.value)} className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-[#1a1917] outline-none focus:border-[#d9a441]" placeholder="SEO title" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1a1917]">SEO description</label>
                <textarea value={form.seoDescription} onChange={(event) => updateField('seoDescription', event.target.value)} rows={3} className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-[#1a1917] outline-none focus:border-[#d9a441]" placeholder="SEO description" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1a1917]">SEO keywords</label>
                <input value={form.seoKeywords} onChange={(event) => updateField('seoKeywords', event.target.value)} className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-[#1a1917] outline-none focus:border-[#d9a441]" placeholder="keyword one, keyword two" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
