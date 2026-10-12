import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Process from './components/Process'
import Results from './components/Results'
import WhyVanexa from './components/WhyVanexa'
import LocalBusinessGrowth from './components/LocalBusinessGrowth'
import ProjectEstimator from './components/ProjectEstimator'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import ServiceLandingPage, { type ServicePageMeta } from './pages/ServiceLandingPage'
import TermsPage from './pages/TermsPage'
import BlogListPage from './pages/BlogListPage'
import BlogDetailPage from './pages/BlogDetailPage'
import { AboutPage, ContactPage, DisclaimerPage, PortfolioPage, ServicesPage } from './pages/InfoPages'
import {
  AdminDashboardPage,
  AdminLoginPage,
  AuthorBlogEditorPage,
  AuthorBlogListPage,
  AuthorDashboardPage,
  ProtectedRoute,
} from './pages/AdminPages'

const servicePageMeta: Record<string, ServicePageMeta> = {
  '/services/seo-ai-search-optimization': {
    slug: 'seo-ai-search-optimization',
    title: 'SEO & AI Search Optimization Services in Pune | Vanexa Studio',
    description: 'Improve visibility with SEO services in Pune, AI search optimization, technical SEO and website SEO audit support from Vanexa Studio.',
    keywords: 'SEO services in Pune, AI SEO services, generative engine optimization, answer engine optimization, local SEO services, website SEO audit',
    heading: 'SEO & AI Search Optimization',
    intro: 'VANEXA helps businesses improve visibility in search results, Google Maps, and AI-driven discovery with practical SEO strategies built around content quality, technical health, and local relevance.',
    highlights: ['Technical SEO review', 'Local SEO strategy', 'AI search visibility improvements', 'Content and keyword planning'],
    faqs: [
      { q: 'How long does SEO take?', a: 'SEO is a long-term strategy. Results depend on competition, technical health, content quality and consistent optimisation over time.' },
      { q: 'Do you help with AI search visibility?', a: 'Yes. We support content and technical improvements that improve discoverability in search and AI-assisted answer systems.' },
    ],
  },
  '/services/website-development': {
    slug: 'website-development',
    title: 'Website Development Services in Pune | Vanexa Studio',
    description: 'Professional website development services in Pune for business websites, redesigns, responsive design and website maintenance support.',
    keywords: 'website development company in Pune, website development services Pune, business website design, website redesign services, responsive website development',
    heading: 'Website Development & Updates',
    intro: 'A strong website helps your business look credible, answer customer questions and convert visitors into leads. We build and update websites that are clear, mobile-friendly and aligned with your business goals.',
    highlights: ['Responsive business websites', 'Website updates and maintenance', 'Conversion-focused design', 'Content and structure support'],
    faqs: [
      { q: 'Do you update existing websites?', a: 'Yes. We help businesses improve, refresh and maintain their existing websites without losing their current structure or brand identity.' },
      { q: 'Can you build a new website for my business?', a: 'Yes. We can create a new website or redesign an existing one based on your business goals, audience and service offering.' },
    ],
  },
  '/services/google-business-profile': {
    slug: 'google-business-profile',
    title: 'Google Business Profile Management in Pune | Vanexa Studio',
    description: 'Get local visibility with Google Business Profile optimization, Google Maps SEO and local business listing management for Pune businesses.',
    keywords: 'Google Business Profile management services, Google Business Profile optimization Pune, Google Maps SEO, local business listing optimization, local search visibility services',
    heading: 'Google Business Profile Management',
    intro: 'A well-managed Google Business Profile helps nearby customers discover your business, verify your services and trust your credibility before they even call or visit.',
    highlights: ['Profile optimization', 'Local SEO improvements', 'Review and listing support', 'Better map visibility'],
    faqs: [
      { q: 'Do you manage Google Business Profile listing updates?', a: 'Yes. We can help with profile setup, business details, category and content updates, and better local visibility.' },
      { q: 'Why is GBP important for local businesses?', a: 'It helps your business rank in local map results and makes your company easier to find when customers search nearby.' },
    ],
  },
  '/services/social-media-management': {
    slug: 'social-media-management',
    title: 'Social Media Management in Pune | Vanexa Studio',
    description: 'Social media management in Pune for Instagram marketing services, content creation, creatives and audience growth for local businesses.',
    keywords: 'social media management Pune, social media marketing agency in Pune, instagram marketing services, social media content creation, social media creatives',
    heading: 'Social Media Management',
    intro: 'Social media helps businesses stay visible, build trust and create consistent engagement with potential customers. We create practical content strategies and promotional creatives that support your business goals.',
    highlights: ['Content strategy', 'Instagram creatives', 'Promotional design', 'Brand consistency'],
    faqs: [
      { q: 'Do you create content for social media?', a: 'Yes. We can plan and create content themes, captions, reels ideas and promotional creatives aligned with your business goals.' },
      { q: 'Can social media help local businesses?', a: 'Yes. For local businesses, social media helps with visibility, trust-building, community engagement and lead generation.' },
    ],
  },
  '/services/content-writing': {
    slug: 'content-writing',
    title: 'Content Writing Services in Pune | Vanexa Studio',
    description: 'Website content writing and SEO content services in Pune to help businesses communicate clearly, build trust and improve search visibility.',
    keywords: 'content writing services Pune, website content writing, SEO content writing, business content creation',
    heading: 'Content Writing for Business Growth',
    intro: 'Clear, useful content helps customers understand your offer and take the next step. Vanexa Studio supports website and SEO content shaped around your audience, services and business goals.',
    highlights: ['Website page content', 'SEO-focused content planning', 'Business and service descriptions', 'Clear calls to action'],
    faqs: [
      { q: 'Can you write content for existing websites?', a: 'Yes. We can improve existing website copy or create new service and landing page content based on your audience and goals.' },
      { q: 'Do you provide SEO content writing?', a: 'Yes. Content can be planned around relevant search intent while remaining useful and clear for your customers.' },
    ],
  },
  '/services/graphic-design': {
    slug: 'graphic-design',
    title: 'Graphic Design & Branding Services in Pune | Vanexa Studio',
    description: 'Graphic design services in Pune for branding, logo design, promotional posts and digital creatives that support your business growth.',
    keywords: 'graphic design agency Pune, branding services for small businesses, logo design services, promotional post design, brochure design, digital advertising creatives',
    heading: 'Graphic Design & Branding',
    intro: 'Great design helps businesses communicate clearly, stand out from competitors and build trust with potential customers through professional visuals and consistent branding.',
    highlights: ['Logo and branding support', 'Promotional creatives', 'Digital marketing graphics', 'Visual consistency'],
    faqs: [
      { q: 'Do you design social media creatives?', a: 'Yes. We create digital creatives and promotional assets for social media campaigns, brand communication and product promotion.' },
      { q: 'Can design support my marketing efforts?', a: 'Yes. Strong visuals improve brand recall, ad performance, and customer trust across websites, social channels and advertising.' },
    ],
  },
}

function updatePageMeta(title: string, description: string, keywords?: string) {
  document.title = title

  const metaDescription = document.querySelector('meta[name="description"]') ?? document.createElement('meta')
  metaDescription.setAttribute('name', 'description')
  metaDescription.setAttribute('content', description)
  if (!metaDescription.parentNode) {
    document.head.appendChild(metaDescription)
  }

  const openGraphTitle = document.querySelector('meta[property="og:title"]') ?? document.createElement('meta')
  openGraphTitle.setAttribute('property', 'og:title')
  openGraphTitle.setAttribute('content', title)
  if (!openGraphTitle.parentNode) {
    document.head.appendChild(openGraphTitle)
  }

  const openGraphDescription = document.querySelector('meta[property="og:description"]') ?? document.createElement('meta')
  openGraphDescription.setAttribute('property', 'og:description')
  openGraphDescription.setAttribute('content', description)
  if (!openGraphDescription.parentNode) {
    document.head.appendChild(openGraphDescription)
  }

  const canonical = document.querySelector('link[rel="canonical"]') ?? document.createElement('link')
  canonical.setAttribute('rel', 'canonical')
  canonical.setAttribute('href', `${window.location.origin}${window.location.pathname}`)
  if (!canonical.parentNode) {
    document.head.appendChild(canonical)
  }

  const metaKeywords = document.querySelector('meta[name="keywords"]')
  if (keywords) {
    const keywordMeta = metaKeywords ?? document.createElement('meta')
    keywordMeta.setAttribute('name', 'keywords')
    keywordMeta.setAttribute('content', keywords)
    if (!keywordMeta.parentNode) document.head.appendChild(keywordMeta)
  } else {
    metaKeywords?.remove()
  }

  const privateRoute = /^\/(admin|author)(\/|$)/.test(window.location.pathname)
  const robotsMeta = document.querySelector('meta[name="robots"]')
  if (privateRoute) {
    const privateRobotsMeta = robotsMeta ?? document.createElement('meta')
    privateRobotsMeta.setAttribute('name', 'robots')
    privateRobotsMeta.setAttribute('content', 'noindex,nofollow')
    if (!privateRobotsMeta.parentNode) document.head.appendChild(privateRobotsMeta)
  } else {
    robotsMeta?.remove()
  }
}

function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />
      <main className="pt-24 md:pt-28">
        <Hero />
        <Services />
        <About />
        <LocalBusinessGrowth />
        <Process />
        <Results />
        <WhyVanexa />
        <ProjectEstimator />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />
      <main className="container flex min-h-[70vh] flex-col items-center justify-center px-4 pt-28 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a96f24]">404</p>
        <h1 className="mt-3 text-4xl font-black text-black">This page could not be found.</h1>
        <p className="mt-3 max-w-lg text-[#5c5750]">The page may have moved or the address may be incorrect.</p>
        <a href="/" className="mt-6 rounded-full bg-[#d9a441] px-5 py-3 font-semibold text-black">
          Back to homepage
        </a>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function App() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const handleRouteChange = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  useEffect(() => {
    if (path === '/privacy-policy') {
      updatePageMeta('Privacy Policy | Vanexa Studio', 'Read the privacy policy for Vanexa Studio and understand how we handle project inquiries, contact data and digital service information.')
      return
    }

    if (path === '/terms-and-conditions') {
      updatePageMeta('Terms & Conditions | Vanexa Studio', 'Read the service terms and conditions for Vanexa Studio website, design, SEO and digital growth engagements.')
      return
    }

    if (path === '/about') {
      updatePageMeta('About Vanexa Studio', 'Learn about Vanexa Studio and the strategy-first digital growth approach we use for website, SEO, marketing and local business support.')
      return
    }

    if (path === '/services') {
      updatePageMeta('Services | Vanexa Studio', 'Explore Vanexa Studio web development, SEO, social media, Google Business Profile and digital growth services for modern businesses.')
      return
    }

    if (path === '/portfolio') {
      updatePageMeta('Portfolio | Vanexa Studio', 'See examples of digital growth work and service capabilities at Vanexa Studio.')
      return
    }

    if (path === '/contact') {
      updatePageMeta('Contact Vanexa Studio', 'Discuss your website, SEO, or digital marketing project with Vanexa Studio in Pune.')
      return
    }

    if (path === '/blog') {
      updatePageMeta('Blog | Vanexa Studio', 'Read practical insights on SEO, website growth, digital marketing and local business visibility from Vanexa Studio.')
      return
    }

    if (path.startsWith('/services/')) {
      const routeMeta = servicePageMeta[path]
      if (routeMeta) {
        updatePageMeta(routeMeta.title, routeMeta.description, routeMeta.keywords)
        return
      }
    }

    if (path.startsWith('/blog/')) {
      updatePageMeta('Vanexa Studio Blog', 'Read recent digital marketing and growth insights from Vanexa Studio.')
      return
    }

    if (path === '/disclaimer') {
      updatePageMeta('Disclaimer | Vanexa Studio', 'Read the Vanexa Studio disclaimer and important business information.')
      return
    }

    if (path === '/admin/login') {
      updatePageMeta('Admin / Author Login | Vanexa Studio', 'Sign in to the protected Vanexa Studio content workspace.')
      return
    }

    const protectedPageTitles: Record<string, string> = {
      '/admin/dashboard': 'Admin Dashboard | Vanexa Studio',
      '/admin/blogs/new': 'Create Blog | Vanexa Studio',
      '/author/dashboard': 'Author Dashboard | Vanexa Studio',
      '/author/blogs': 'Author Articles | Vanexa Studio',
      '/author/blogs/new': 'Create Article | Vanexa Studio',
    }
    const protectedPageTitle = protectedPageTitles[path] ?? (/^\/(admin|author)\/blogs\/\d+\/edit$/.test(path) ? 'Edit Article | Vanexa Studio' : null)
    if (protectedPageTitle) {
      updatePageMeta(protectedPageTitle, 'Manage content in the protected Vanexa Studio workspace.')
      return
    }

    if (path !== '/') {
      updatePageMeta('Page Not Found | Vanexa Studio', 'The requested page could not be found on Vanexa Studio.')
      return
    }

    updatePageMeta(
      'Vanexa Studio | Digital Marketing, SEO & Web Development Pune',
      'Vanexa Studio helps businesses grow online with website development and updates, SEO and AI search optimization, Google Business Profile management, social media marketing and graphic design.',
    )
  }, [path])

  if (path === '/privacy-policy') return <PrivacyPolicyPage />
  if (path === '/terms-and-conditions') return <TermsPage />
  if (path === '/about') return <AboutPage />
  if (path === '/services') return <ServicesPage />
  if (path === '/portfolio') return <PortfolioPage />
  if (path === '/contact') return <ContactPage />
  if (path === '/disclaimer') return <DisclaimerPage />
  if (path === '/blog') return <BlogListPage />
  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '')
    if (slug) return <BlogDetailPage slug={slug} />
  }
  if (path === '/admin/login') return <AdminLoginPage />
  if (path === '/admin/dashboard') return <ProtectedRoute requiredRole="ADMIN"><AdminDashboardPage /></ProtectedRoute>
  if (path === '/admin/blogs/new') return <ProtectedRoute requiredRole="ADMIN"><AuthorBlogEditorPage key="admin-new" role="ADMIN" /></ProtectedRoute>
  if (/^\/admin\/blogs\/\d+\/edit$/.test(path)) {
    const blogId = Number(path.split('/')[3])
    return <ProtectedRoute requiredRole="ADMIN"><AuthorBlogEditorPage key={`admin-${blogId}`} role="ADMIN" blogId={blogId} /></ProtectedRoute>
  }
  if (path === '/author/dashboard') return <ProtectedRoute requiredRole="AUTHOR"><AuthorDashboardPage /></ProtectedRoute>
  if (path === '/author/blogs') return <ProtectedRoute requiredRole="AUTHOR"><AuthorBlogListPage /></ProtectedRoute>
  if (path === '/author/blogs/new') return <ProtectedRoute requiredRole="AUTHOR"><AuthorBlogEditorPage key="new" /></ProtectedRoute>
  if (/^\/author\/blogs\/\d+\/edit$/.test(path)) {
    const blogId = Number(path.split('/')[3])
    return <ProtectedRoute requiredRole="AUTHOR"><AuthorBlogEditorPage key={blogId} role="AUTHOR" blogId={blogId} /></ProtectedRoute>
  }
  if (path.startsWith('/services/')) {
    const routeMeta = servicePageMeta[path]
    if (routeMeta) return <ServiceLandingPage {...routeMeta} />
  }

  return path === '/' ? <HomePage /> : <NotFoundPage />
}

export default App
