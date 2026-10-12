import { useEffect, useMemo, useState } from 'react'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsAppButton'
import { fetchCategories, fetchPublicBlogs, fetchTags } from '../lib/api'
import type { ApiCategory, ApiTag, BlogArticle } from '../types/api'

const navigateTo = (path: string) => {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function formatDate(value?: string) {
  if (!value) return 'Recently'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Recently'
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function BlogCard({ blog }: { blog: BlogArticle }) {
  const categoryLabel = blog.categoryId === 1 ? 'Digital Marketing' : 'Insights'
  const badge = blog.viewCount && blog.viewCount > 10 ? 'Trending' : 'Featured'

  return (
    <article className="overflow-hidden rounded-3xl border border-[#e8dfcf] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(169,111,36,0.12)]">
      <div className="relative">
        <img
          src={blog.featuredImageUrl || 'https://placehold.co/1200x630/png'}
          alt={blog.title}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[#d9a441] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-black">
          {badge}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.12em] text-[#5c5750]">
          <span>{categoryLabel}</span>
          <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
        </div>

        <h3 className="text-2xl font-bold leading-tight text-[#1a1917]">{blog.title}</h3>
        <p className="line-clamp-3 text-base leading-relaxed text-[#5c5750]">{blog.excerpt}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-[#a96f24]">By author #{blog.authorId ?? 'N/A'}</span>
          <button
            type="button"
            onClick={() => navigateTo(`/blog/${blog.slug}`)}
            className="inline-flex items-center rounded-full bg-[#d9a441] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#f4ca74]"
          >
            Read article
          </button>
        </div>
      </div>
    </article>
  )
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([])
  const [categories, setCategories] = useState<ApiCategory[]>([])
  const [tags, setTags] = useState<ApiTag[]>([])
  const [keyword, setKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all')
  const [selectedTag, setSelectedTag] = useState<number | 'all'>('all')
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadLookups = async () => {
      try {
        const [categoryData, tagData] = await Promise.all([fetchCategories(), fetchTags()])
        if (!cancelled) {
          setCategories(categoryData)
          setTags(tagData)
        }
      } catch {
        if (!cancelled) {
          setCategories([])
          setTags([])
        }
      }
    }

    void loadLookups()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let active = true

    const loadBlogs = async () => {
      setLoading(true)
      setError('')

      try {
        const result = await fetchPublicBlogs({
          page,
          size: 9,
          keyword: keyword.trim() || undefined,
          categoryId: selectedCategory,
          tagId: selectedTag,
        })

        if (!active) return

        setBlogs(result.content || [])
        setTotalPages(Math.max(result.totalPages || 1, 1))
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unable to load blog posts right now.')
        setBlogs([])
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadBlogs()

    return () => {
      active = false
    }
  }, [keyword, page, selectedCategory, selectedTag])

  const hasFilters = useMemo(
    () => keyword.trim().length > 0 || selectedCategory !== 'all' || selectedTag !== 'all',
    [keyword, selectedCategory, selectedTag],
  )

  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />
      <main className="container pb-20 pt-32 md:pt-36">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a96f24]">Insights</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.05em] text-black md:text-5xl">Vanexa Studio Blog</h1>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="inline-flex items-center justify-center rounded-full border border-[#d9a441] bg-white px-5 py-3 text-sm font-semibold text-[#1a1917] transition hover:border-[#a96f24]"
          >
            Back to homepage
          </button>
        </div>

        <div className="mb-8 grid gap-4 rounded-3xl border border-[#e8dfcf] bg-white p-4 shadow-sm md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <input
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value)
              setPage(0)
            }}
            placeholder="Search by keyword, topic, or service"
            className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-sm text-[#1a1917] outline-none focus:border-[#d9a441]"
          />

          <select
            value={selectedCategory}
            onChange={(event) => {
              setSelectedCategory(event.target.value === 'all' ? 'all' : Number(event.target.value))
              setPage(0)
            }}
            className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-sm text-[#1a1917] outline-none focus:border-[#d9a441]"
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={selectedTag}
            onChange={(event) => {
              setSelectedTag(event.target.value === 'all' ? 'all' : Number(event.target.value))
              setPage(0)
            }}
            className="w-full rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] px-4 py-3 text-sm text-[#1a1917] outline-none focus:border-[#d9a441]"
          >
            <option value="all">All tags</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse overflow-hidden rounded-3xl border border-[#e8dfcf] bg-white">
                <div className="h-56 w-full bg-[#efe7dc]" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-24 rounded bg-[#efe7dc]" />
                  <div className="h-6 w-full rounded bg-[#efe7dc]" />
                  <div className="h-6 w-5/6 rounded bg-[#efe7dc]" />
                  <div className="h-10 w-28 rounded-full bg-[#efe7dc]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-[#f4c6c6] bg-[#fff6f6] p-6 text-[#8e2a2a]">
            <p className="text-lg font-semibold">We could not load the blog list.</p>
            <p className="mt-2 text-sm">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-[#d9a441] px-4 py-2 text-sm font-semibold text-black"
            >
              Retry
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="rounded-3xl border border-[#e8dfcf] bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#1a1917]">No articles match this search.</h2>
            <p className="mt-3 text-[#5c5750]">
              Try a different keyword or switch back to all categories.
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setKeyword('')
                  setSelectedCategory('all')
                  setSelectedTag('all')
                  setPage(0)
                }}
                className="mt-5 rounded-full bg-[#d9a441] px-5 py-3 text-sm font-semibold text-black"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between gap-3 rounded-2xl border border-[#e8dfcf] bg-white p-4 shadow-sm">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(current - 1, 0))}
                disabled={page === 0}
                className="rounded-full border border-[#d9a441] px-4 py-2 text-sm font-semibold text-[#1a1917] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-[#5c5750]">
                Page {page + 1} of {Math.max(totalPages, 1)}
              </span>

              <button
                type="button"
                onClick={() => setPage((current) => current + 1)}
                disabled={page >= totalPages - 1}
                className="rounded-full bg-[#d9a441] px-4 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
