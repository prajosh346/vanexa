import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsAppButton'
import { services } from '../data/services'

const navigateTo = (path: string) => {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />
      <div className="container pb-20 pt-32 md:pt-36">
        <div className="rounded-[32px] border border-[#e8dfcf] bg-white p-8 shadow-[0_20px_56px_rgba(0,0,0,0.04)] md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a96f24]">About us</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-black md:text-5xl">Built for ambitious local businesses.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5c5750]">
            Vanexa Studio helps brands improve visibility, strengthen credibility, and turn online attention into measurable business growth. We focus on strategy, execution, and long-term value across digital marketing, SEO, web development, and local growth systems.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ['Strategy-first', 'We align every campaign and website update with business outcomes instead of vanity metrics.'],
              ['Execution-driven', 'Clear priorities and practical implementation keep projects moving without unnecessary complexity.'],
              ['Growth-minded', 'We build systems that support stronger visibility, better conversion, and sustained momentum.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-[#e8dfcf] bg-[#f9f5ef] p-5">
                <h2 className="text-xl font-bold text-black">{title}</h2>
                <p className="mt-3 text-[#5c5750]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />
      <div className="container pb-20 pt-32 md:pt-36">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a96f24]">Services</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-black md:text-5xl">Digital services designed for growth.</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="rounded-[26px] border border-[#e8dfcf] bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.03)]">
              <div className="inline-flex rounded-full bg-[#f7f2e7] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#a96f24]">
                {service.title}
              </div>
              <p className="mt-4 text-base leading-relaxed text-[#5c5750]">{service.description}</p>
              <button
                type="button"
                onClick={() => navigateTo(`/services/${service.slug}`)}
                className="mt-6 inline-flex items-center rounded-full bg-[#d9a441] px-4 py-2 text-sm font-semibold text-black"
              >
                View service
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export function PortfolioPage() {
  const projects = [
    { title: 'Local business growth website', category: 'Website development', summary: 'Responsive business website with stronger conversion-focused structure and local trust signals.' },
    { title: 'Search visibility sprint', category: 'SEO', summary: 'Search and on-page optimization plan to improve discoverability and lead quality.' },
    { title: 'Social media content system', category: 'Social media', summary: 'Ongoing content and design system to keep local businesses active, credible, and visible.' },
  ]

  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />
      <div className="container pb-20 pt-32 md:pt-36">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a96f24]">Portfolio</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-black md:text-5xl">Flexible growth systems for real businesses.</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} className="overflow-hidden rounded-[28px] border border-[#e8dfcf] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.03)]">
              <div className="flex h-48 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(217,164,65,0.35),_transparent_55%),linear-gradient(135deg,#1a1917,#403d39)] text-2xl font-black text-white">
                {project.category.slice(0, 2).toUpperCase()}
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a96f24]">{project.category}</p>
                <h2 className="mt-3 text-2xl font-bold text-black">{project.title}</h2>
                <p className="mt-3 text-[#5c5750]">{project.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />
      <div className="container pb-20 pt-32 md:pt-36">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a96f24]">Contact</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-black md:text-5xl">Let’s discuss your next growth step.</h1>
        </div>
        <Contact />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />
      <div className="container max-w-4xl pb-20 pt-32 md:pt-36">
        <div className="rounded-[30px] border border-[#e8dfcf] bg-white p-8 shadow-[0_20px_56px_rgba(0,0,0,0.04)] md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a96f24]">Disclaimer</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-black">Important information</h1>
          <div className="mt-6 space-y-4 text-[#5c5750] leading-relaxed">
            <p>Vanexa Studio provides digital marketing, website, and growth strategy services. Results depend on business conditions, market dynamics, competition, execution quality, and ongoing optimization.</p>
            <p>We do not guarantee specific rankings, lead volumes, or revenue outcomes from any single service, and any strategic recommendations should be evaluated in context with your business objectives and budget.</p>
            <p>All work is delivered in accordance with the project scope and agreed deliverables outlined during the consultation process.</p>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
