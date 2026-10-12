import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsAppButton'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />
      <section className="section bg-[#f5f2ec] pt-28 pb-24 text-black">
        <div className="container max-w-4xl rounded-[20px] border border-[#e8dfcf] bg-white p-6 shadow-[0_20px_40px_rgba(81,51,16,0.08)] md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a96f24]">Terms & Conditions</p>
          <h1 className="mt-4 text-3xl font-bold text-black md:text-4xl">Terms & Conditions</h1>

          <p className="mt-6 text-[#405274]">
            These terms govern our relationship with clients who engage VANEXA for website design, branding, development, digital marketing, and related services.
          </p>

          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-[#e8dfcf] bg-[#f8f4ed] p-5">
              <h2 className="text-lg font-bold text-black">Scope of services</h2>
              <p className="mt-2 text-[#405274]">
                VANEXA provides services based on the agreed scope, deliverables, timeline, and pricing described in the proposal or written agreement for each project.
              </p>
            </div>

            <div className="rounded-xl border border-[#e8dfcf] bg-[#f8f4ed] p-5">
              <h2 className="text-lg font-bold text-black">Client responsibilities</h2>
              <p className="mt-2 text-[#405274]">
                Clients are expected to provide timely feedback, approvals, business content, and access to required brand or platform assets. Delays in information or review may affect project timelines and deliverables.
              </p>
            </div>

            <div className="rounded-xl border border-[#e8dfcf] bg-[#f8f4ed] p-5">
              <h2 className="text-lg font-bold text-black">Payments and project ownership</h2>
              <p className="mt-2 text-[#405274]">
                Work is billed according to the agreed proposal or contract. Deliverables are typically released after due payments are completed. Any third-party assets, platform licenses, or external tools remain subject to their own terms and licensing conditions.
              </p>
            </div>

            <div className="rounded-xl border border-[#e8dfcf] bg-[#f8f4ed] p-5">
              <h2 className="text-lg font-bold text-black">Intellectual property</h2>
              <p className="mt-2 text-[#405274]">
                VANEXA retains ownership of proprietary methods, templates, and general design frameworks used in our work unless otherwise agreed in writing. Client-provided materials and final branded deliverables remain the property of the client after agreed payment and transfer conditions are completed.
              </p>
            </div>

            <div className="rounded-xl border border-[#e8dfcf] bg-[#f8f4ed] p-5">
              <h2 className="text-lg font-bold text-black">Performance and limitations</h2>
              <p className="mt-2 text-[#405274]">
                We aim to deliver high-quality outcomes and professional execution, but we do not guarantee specific rankings, conversion levels, or business outcomes, as digital performance depends on multiple external and market-based factors.
              </p>
            </div>
          </div>

          <p className="mt-8 text-[#405274]">
            By engaging with VANEXA, you agree to these terms and any written project agreement applicable to your engagement.
          </p>

          <div className="mt-10">
            <a href="/" className="inline-flex items-center rounded-full bg-[#d9a441] px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_22px_rgba(169,111,36,0.2)]">
              Back to home
            </a>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
