import { useEffect, useRef, useState, type ReactNode } from 'react'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsAppButton'
import { fetchPublicBlogBySlug, incrementBlogView } from '../lib/api'
import type { BlogArticle } from '../types/api'

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

type RichTextNode = {
  type?: string
  text?: string
  attrs?: Record<string, string>
  content?: RichTextNode[]
}

function renderNode(node: RichTextNode | null | undefined, index: string | number): ReactNode {
  if (!node) return null

  const content = node.content ?? []

  if (node.type === 'text') return <>{node.text ?? ''}</>
  if (node.type === 'paragraph') {
    return <p key={index} className="mb-5 leading-8 text-[#2d2a27]">{content.map((child, childIndex) => renderNode(child, `${String(index)}-${childIndex}`))}</p>
  }
  if (node.type === 'heading') {
    const level = Number(node.attrs?.level ?? 2)
    const headingTag = level === 1 ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : level === 4 ? 'h4' : level === 5 ? 'h5' : 'h6'
    const Heading = headingTag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    return <Heading key={index} className="mb-4 mt-8 font-black tracking-tight text-black">{content.map((child, childIndex) => renderNode(child, `${String(index)}-${childIndex}`))}</Heading>
  }
  if (node.type === 'bulletList') {
    return <ul key={index} className="mb-5 list-disc space-y-2 pl-6 text-[#2d2a27]">{content.map((child, childIndex) => renderNode(child, `${String(index)}-${childIndex}`))}</ul>
  }
  if (node.type === 'orderedList') {
    return <ol key={index} className="mb-5 list-decimal space-y-2 pl-6 text-[#2d2a27]">{content.map((child, childIndex) => renderNode(child, `${String(index)}-${childIndex}`))}</ol>
  }
  if (node.type === 'listItem') {
    return <li key={index} className="leading-8">{content.map((child, childIndex) => renderNode(child, `${String(index)}-${childIndex}`))}</li>
  }
  if (node.type === 'blockquote') {
    return <blockquote key={index} className="mb-5 border-l-4 border-[#d9a441] bg-[#f7f2e7] p-4 italic text-[#1a1917]">{content.map((child, childIndex) => renderNode(child, `${String(index)}-${childIndex}`))}</blockquote>
  }
  if (node.type === 'codeBlock') {
    return <pre key={index} className="mb-5 overflow-x-auto rounded-2xl bg-[#111827] p-4 text-sm text-[#f9fafb]"><code>{node.content?.[0]?.text ?? ''}</code></pre>
  }
  if (node.type === 'image') {
    return <img key={index} src={node.attrs?.src ?? ''} alt={node.attrs?.alt ?? 'Article visual'} className="my-6 w-full rounded-3xl object-cover shadow-sm" />
  }
  if (node.type === 'hardBreak') {
    return <br key={index} />
  }
  if (node.type === 'link') {
    return <a key={index} href={node.attrs?.href || '#'} target="_blank" rel="noreferrer" className="text-[#a96f24] underline decoration-[#d9a441] underline-offset-2">{content.map((child, childIndex) => renderNode(child, `${String(index)}-${childIndex}`))}</a>
  }
  if (content.length > 0) {
    return <>{content.map((child, childIndex) => renderNode(child, `${String(index)}-${childIndex}`))}</>
  }

  return null
}

function getContentNodes(content: string): RichTextNode[] {
  if (!content) return []

  try {
    const parsed = JSON.parse(content)
    return Array.isArray(parsed.content) ? parsed.content : []
  } catch {
    return []
  }
}

export default function BlogDetailPage({ slug }: { slug?: string }) {
  const [blog, setBlog] = useState<BlogArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const viewSent = useRef(false)

  const currentSlug = slug || window.location.pathname.split('/blog/')[1]

  useEffect(() => {
    let active = true

    const loadBlog = async () => {
      setLoading(true)
      setError('')

      try {
        const result = await fetchPublicBlogBySlug(currentSlug)
        if (!active) return
        setBlog(result)
        document.title = result.seoTitle || result.title

        const metaDescription = document.querySelector('meta[name="description"]') ?? document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        metaDescription.setAttribute('content', result.seoDescription || result.excerpt)
        if (!metaDescription.parentNode) document.head.appendChild(metaDescription)
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'This article could not be found.')
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadBlog()

    return () => {
      active = false
    }
  }, [currentSlug])

  useEffect(() => {
    if (!currentSlug || !blog || viewSent.current) return
    viewSent.current = true
    void incrementBlogView(currentSlug).catch(() => undefined)
  }, [blog, currentSlug])

  const copyLink = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      window.alert('Blog link copied to clipboard.')
    } catch {
      window.alert('Copy failed. Please copy the URL manually.')
    }
  }

  const shareLink = () => {
    const url = window.location.href
    if (navigator.share) {
      void navigator.share({ title: blog?.title ?? 'Vanexa Studio Blog', url }).catch(() => undefined)
      return
    }

    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f2ec] px-4 py-32">
        <Navbar />
        <div className="container max-w-4xl animate-pulse rounded-3xl border border-[#e8dfcf] bg-white p-8 shadow-sm">
          <div className="h-6 w-32 rounded bg-[#efe7dc]" />
          <div className="mt-6 h-14 w-full rounded bg-[#efe7dc]" />
          <div className="mt-6 h-10 w-5/6 rounded bg-[#efe7dc]" />
          <div className="mt-10 h-[300px] w-full rounded-3xl bg-[#efe7dc]" />
          <div className="mt-8 space-y-4">
            <div className="h-5 w-full rounded bg-[#efe7dc]" />
            <div className="h-5 w-full rounded bg-[#efe7dc]" />
            <div className="h-5 w-4/5 rounded bg-[#efe7dc]" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#f5f2ec] px-4 py-32">
        <Navbar />
        <div className="container max-w-2xl rounded-3xl border border-[#e8dfcf] bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-black text-black">Article not found</h1>
          <p className="mt-3 text-[#5c5750]">{error || 'The requested article could not be found or is no longer public.'}</p>
          <button type="button" onClick={() => navigateTo('/blog')} className="mt-6 rounded-full bg-[#d9a441] px-5 py-3 font-semibold text-black">
            View all articles
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const contentNodes = getContentNodes(blog.content)
  const categoryName = blog.categoryId === 1 ? 'Digital Marketing' : 'Vanexa Insights'

  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />
      <article className="container max-w-4xl pb-20 pt-32 md:pt-36">
        <button type="button" onClick={() => navigateTo('/blog')} className="mb-6 inline-flex items-center rounded-full border border-[#d9a441] bg-white px-4 py-2 text-sm font-semibold text-[#1a1917]">
          ← Back to blog
        </button>

        <div className="overflow-hidden rounded-[28px] border border-[#e8dfcf] bg-white shadow-[0_20px_56px_rgba(0,0,0,0.04)]">
          <img src={blog.featuredImageUrl || 'https://placehold.co/1200x630/png'} alt={blog.title} className="h-[280px] w-full object-cover md:h-[420px]" />

          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#5c5750]">
              <span>{categoryName}</span>
              <span>•</span>
              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
              <span>•</span>
              <span>{blog.viewCount ?? 0} views</span>
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] text-black md:text-5xl">{blog.title}</h1>
            <p className="mt-4 text-xl leading-relaxed text-[#5c5750]">{blog.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#f7f2e7] px-3 py-2 text-sm font-medium text-[#1a1917]">Author #{blog.authorId ?? 'N/A'}</span>
              {blog.seoKeywords && blog.seoKeywords.split(',').slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full border border-[#e8dfcf] px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#5c5750]">
                  {tag.trim()}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={copyLink} className="rounded-full bg-[#d9a441] px-4 py-2 text-sm font-semibold text-black">
                Copy link
              </button>
              <button type="button" onClick={shareLink} className="rounded-full border border-[#d9a441] bg-white px-4 py-2 text-sm font-semibold text-[#1a1917]">
                Share
              </button>
            </div>

            <div className="prose prose-lg mt-8 max-w-none text-[#1a1917]">
              {contentNodes.map((node: RichTextNode, index: number) => renderNode(node, index))}
            </div>
          </div>
        </div>
      </article>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
