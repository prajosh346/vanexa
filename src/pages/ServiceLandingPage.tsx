import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsAppButton'

export type ServicePageMeta = {
  slug: string
  title: string
  description: string
  keywords: string
  heading: string
  intro: string
  highlights: string[]
  faqs: Array<{ q: string; a: string }>
}

export default function ServiceLandingPage({
  title,
  description,
  keywords,
  heading,
  intro,
  highlights,
  faqs,
}: ServicePageMeta) {
  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />

      <main className="section pt-28 pb-20">
        <div className="container max-w-5xl">
          <div className="rounded-[28px] border border-[#e8dfcf] bg-white p-6 shadow-[0_22px_50px_rgba(169,111,36,0.08)] md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a96f24]">{title}</p>
            <h1 className="mt-4 text-3xl font-bold text-[#071033] md:text-5xl">{heading}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#5c5750] md:text-lg">{intro}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#d9a441] px-6 py-3 font-semibold text-black shadow-[0_12px_24px_rgba(169,111,36,0.18)] transition hover:bg-[#f4ca74]"
              >
                Discuss your project
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-[#d9a441] bg-white px-6 py-3 font-semibold text-black transition hover:border-[#a96f24] hover:text-[#a96f24]"
              >
                Back to home
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[24px] border border-[#e8dfcf] bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-[#071033]">Why this matters</h2>
              <p className="mt-4 text-base leading-7 text-[#5c5750]">{description}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] p-4">
                    <p className="text-sm font-medium text-[#071033]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[24px] border border-[#e8dfcf] bg-[#f9fbff] p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#071033]">Keywords</h3>
              <p className="mt-3 text-sm leading-6 text-[#5c5750]">{keywords}</p>

              <div className="mt-6">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#071033] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1a1917]"
                >
                  Get a quote
                </a>
              </div>
            </aside>
          </div>

          <div className="mt-10 rounded-[24px] border border-[#e8dfcf] bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-[#071033]">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {faqs.map((item) => (
                <div key={item.q} className="rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] p-4">
                  <h3 className="font-semibold text-[#071033]">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c5750]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
