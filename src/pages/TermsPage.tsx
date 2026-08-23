import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f7fbff] text-[#1f2d4c]">
      <Navbar />
      <section className="section bg-[#f7fbff] pt-28 pb-24 text-[#10264d]">
        <div className="container max-w-4xl rounded-[28px] border border-[#dfeeff] bg-white p-6 shadow-[0_20px_40px_rgba(61,122,245,0.06)] md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d7b15d]">Terms & Conditions</p>
          <h1 className="mt-4 text-3xl font-bold text-[#10264d] md:text-4xl">Terms & Conditions</h1>

          <p className="mt-6 text-[#405274]">
            These terms govern our relationship with clients who engage VANEXA for website design, branding, development, digital marketing, and related services.
          </p>

          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-[#edf3ff] bg-[#f8fbff] p-5">
              <h2 className="text-lg font-bold text-[#10264d]">Scope of services</h2>
              <p className="mt-2 text-[#405274]">
                VANEXA provides services based on the agreed scope, deliverables, timeline, and pricing described in the proposal or written agreement for each project.
              </p>
            </div>

            <div className="rounded-2xl border border-[#edf3ff] bg-[#f8fbff] p-5">
              <h2 className="text-lg font-bold text-[#10264d]">Client responsibilities</h2>
              <p className="mt-2 text-[#405274]">
                Clients are expected to provide timely feedback, approvals, business content, and access to required brand or platform assets. Delays in information or review may affect project timelines and deliverables.
              </p>
            </div>

            <div className="rounded-2xl border border-[#edf3ff] bg-[#f8fbff] p-5">
              <h2 className="text-lg font-bold text-[#10264d]">Payments and project ownership</h2>
              <p className="mt-2 text-[#405274]">
                Work is billed according to the agreed proposal or contract. Deliverables are typically released after due payments are completed. Any third-party assets, platform licenses, or external tools remain subject to their own terms and licensing conditions.
              </p>
            </div>

            <div className="rounded-2xl border border-[#edf3ff] bg-[#f8fbff] p-5">
              <h2 className="text-lg font-bold text-[#10264d]">Intellectual property</h2>
              <p className="mt-2 text-[#405274]">
                VANEXA retains ownership of proprietary methods, templates, and general design frameworks used in our work unless otherwise agreed in writing. Client-provided materials and final branded deliverables remain the property of the client after agreed payment and transfer conditions are completed.
              </p>
            </div>

            <div className="rounded-2xl border border-[#edf3ff] bg-[#f8fbff] p-5">
              <h2 className="text-lg font-bold text-[#10264d]">Performance and limitations</h2>
              <p className="mt-2 text-[#405274]">
                We aim to deliver high-quality outcomes and professional execution, but we do not guarantee specific rankings, conversion levels, or business outcomes, as digital performance depends on multiple external and market-based factors.
              </p>
            </div>
          </div>

          <p className="mt-8 text-[#405274]">
            By engaging with VANEXA, you agree to these terms and any written project agreement applicable to your engagement.
          </p>

          <div className="mt-10">
            <a href="/" className="inline-flex items-center rounded-full bg-[#3d7af5] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_22px_rgba(61,122,245,0.18)]">
              Back to home
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
