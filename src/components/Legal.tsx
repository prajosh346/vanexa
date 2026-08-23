const privacyPoints = [
  {
    title: 'Information we collect',
    text: 'We may collect information such as your name, email address, phone number, business details, project goals, and communication history when you contact us or request a proposal.'
  },
  {
    title: 'How we use it',
    text: 'The information is used to understand your requirements, respond to inquiries, prepare proposals, provide project support, and improve our services and website experience.'
  },
  {
    title: 'Sharing and storage',
    text: 'We do not sell or rent personal data. We may share information with trusted service providers necessary to deliver our work, such as hosting, analytics, or communication tools, and we keep data secure using reasonable safeguards.'
  },
  {
    title: 'Your choices',
    text: 'You may request access, correction, or deletion of your personal information at any time by contacting us. You may also opt out of marketing communications by using the unsubscribe link in emails.'
  }
]

const termsPoints = [
  {
    title: 'Scope of services',
    text: 'VANEXA provides website design, branding, development, SEO, and digital growth services. The scope, deliverables, timeline, and fees are defined in the proposal or agreement for each engagement.'
  },
  {
    title: 'Client responsibilities',
    text: 'Clients are expected to provide timely feedback, necessary content, brand assets, and approvals. Delays in communication may affect project timelines and delivery dates.'
  },
  {
    title: 'Payments and ownership',
    text: 'Projects are billed as agreed in the proposal. Final files and deliverables are released upon completion of agreed payments. Any pre-existing third-party assets remain subject to their own licenses and terms.'
  },
  {
    title: 'Intellectual property',
    text: 'VANEXA retains ownership of its templates, methods, and proprietary design assets unless otherwise agreed in writing. Client-provided content and final branded assets remain the property of the client after payment.'
  },
  {
    title: 'Limitations',
    text: 'We do our best to deliver high-quality work, but we do not guarantee specific rankings, conversions, or business outcomes. Digital performance depends on market conditions, user behavior, and other external factors.'
  }
]

export default function Legal(){
  return (
    <section className="section bg-[#f7fbff] py-20 text-[#10264d]">
      <div className="container space-y-12">
        <div id="privacy-policy" className="rounded-[28px] border border-[#dfeeff] bg-white p-6 shadow-[0_20px_40px_rgba(61,122,245,0.06)] md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#3d7af5]">Privacy Policy</p>
          <h3 className="mt-4 text-3xl font-bold text-[#10264d]">How we handle your information</h3>
          <p className="mt-4 max-w-3xl text-[#405274]">
            At VANEXA, we respect your privacy and are committed to protecting personal information shared with us as part of our client conversations, project inquiries, and digital services.
          </p>

          <div className="mt-8 space-y-6">
            {privacyPoints.map((point) => (
              <div key={point.title} className="rounded-2xl border border-[#edf3ff] bg-[#f8fbff] p-5">
                <h4 className="text-lg font-bold text-[#10264d]">{point.title}</h4>
                <p className="mt-2 text-[#405274]">{point.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[#405274]">
            If you have any questions about this policy, please contact us at <a href="mailto:vanexastudio@gmail.com" className="font-semibold text-[#3d7af5]">vanexastudio@gmail.com</a>.
          </p>
        </div>

        <div id="terms-and-conditions" className="rounded-[28px] border border-[#dfeeff] bg-white p-6 shadow-[0_20px_40px_rgba(61,122,245,0.06)] md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d7b15d]">Terms & Conditions</p>
          <h3 className="mt-4 text-3xl font-bold text-[#10264d]">Working with VANEXA</h3>
          <p className="mt-4 max-w-3xl text-[#405274]">
            These terms explain the expectations for projects, communication, deliverables, and responsibilities between VANEXA and our clients.
          </p>

          <div className="mt-8 space-y-6">
            {termsPoints.map((point) => (
              <div key={point.title} className="rounded-2xl border border-[#edf3ff] bg-[#f8fbff] p-5">
                <h4 className="text-lg font-bold text-[#10264d]">{point.title}</h4>
                <p className="mt-2 text-[#405274]">{point.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[#405274]">
            By engaging with VANEXA, you agree to these terms and any written proposal or service agreement applicable to your project.
          </p>
        </div>
      </div>
    </section>
  )
}
