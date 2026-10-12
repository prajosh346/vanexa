import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsAppButton'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />
      <section className="section bg-[#f5f2ec] pt-28 pb-24 text-black">
        <div className="container max-w-4xl rounded-[20px] border border-[#e8dfcf] bg-white p-6 shadow-[0_20px_40px_rgba(81,51,16,0.08)] md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a96f24]">Privacy Policy</p>
          <h1 className="mt-4 text-3xl font-bold text-black md:text-4xl">Privacy Policy</h1>

          <p className="mt-6 text-[#405274]">
            At VANEXA, we respect your privacy and are committed to protecting the personal information you share with us through inquiries, consultations, proposals, and digital service engagements.
          </p>

          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-[#e8dfcf] bg-[#f8f4ed] p-5">
              <h2 className="text-lg font-bold text-black">Information we collect</h2>
              <p className="mt-2 text-[#405274]">
                We may collect your name, email address, phone number, business information, project goals, communication history, and other details you voluntarily provide when contacting us or requesting a proposal.
              </p>
            </div>

            <div className="rounded-xl border border-[#e8dfcf] bg-[#f8f4ed] p-5">
              <h2 className="text-lg font-bold text-black">How we use your information</h2>
              <p className="mt-2 text-[#405274]">
                Your information is used to understand your requirements, communicate with you, prepare proposals, deliver services, manage project timelines, and improve our website and customer experience.
              </p>
            </div>

            <div className="rounded-xl border border-[#e8dfcf] bg-[#f8f4ed] p-5">
              <h2 className="text-lg font-bold text-black">Data sharing and security</h2>
              <p className="mt-2 text-[#405274]">
                We do not sell or rent your personal data. We may share information with trusted third-party providers only when necessary to perform services such as hosting, analytics, communication, or project operations, and we apply reasonable safeguards to protect your data.
              </p>
            </div>

            <div className="rounded-xl border border-[#e8dfcf] bg-[#f8f4ed] p-5">
              <h2 className="text-lg font-bold text-black">Your rights and choices</h2>
              <p className="mt-2 text-[#405274]">
                You may contact us to request access, correction, or deletion of your personal information, or to opt out of marketing communications. We will respond to reasonable requests as permitted by applicable law.
              </p>
            </div>
          </div>

          <p className="mt-8 text-[#405274]">
            If you have any questions, please contact us at <a href="mailto:vanexastudio@gmail.com" className="font-semibold text-[#a96f24]">vanexastudio@gmail.com</a>.
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
