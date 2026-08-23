import emailjs from '@emailjs/browser'
import { type FormEvent, useState } from 'react'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_4ko9egl'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_p5gi66o'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '7lO21T4jEhhyrujjP'

const defaultForm = {
  name: '',
  businessName: '',
  phone: '',
  service: 'SEO',
  message: '',
}

export default function Contact() {
  const [formData, setFormData] = useState(defaultForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.message.trim() !== ''

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isFormValid) return

    setIsSubmitting(true)

    const name = formData.name.trim()
    const businessName = formData.businessName.trim() || 'N/A'
    const phone = formData.phone.trim()
    const service = formData.service.trim()
    const message = formData.message.trim()

    const templateParams = {
      from_name: name,
      business_name: businessName,
      from_email: 'customer@not-available.com',
      phone,
      service,
      message,
      to_email: 'vanexastudio@gmail.com',
      reply_to: 'vanexastudio@gmail.com',
    }

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      setFormData(defaultForm)
      alert('Your enquiry has been sent successfully.')
    } catch (error) {
      console.error('EmailJS send failed:', error)
      alert('EmailJS rejected the request because the recipient email is not configured in the template. Please set the template recipient to vanexastudio@gmail.com in your EmailJS dashboard.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section bg-[#f4f7ff]">
      <div className="container grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-[#071033]">Let's Talk About Your Growth</h2>
          <p className="mt-2 text-[#384868]">Share a few details and we'll get back to you to discuss your project.</p>
          <div className="mt-6 space-y-2 text-sm text-[#384868]">
            <div>Email: vanexastudio@gmail.com</div>
            <div>Phone: 9405243860</div>
            <div>Location: Pune, Maharashtra, India</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[#dfe9ff] bg-white p-5 shadow-[0_18px_40px_rgba(7,16,51,0.05)]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="rounded-lg border border-[#dfe9ff] bg-[#f9fbff] p-3 text-[#071033] outline-none ring-0 placeholder:text-[#6b7b9a] focus:border-[#0b63ff]"
            />
            <input
              name="businessName"
              type="text"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              className="rounded-lg border border-[#dfe9ff] bg-[#f9fbff] p-3 text-[#071033] outline-none ring-0 placeholder:text-[#6b7b9a] focus:border-[#0b63ff]"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
              className="rounded-lg border border-[#dfe9ff] bg-[#f9fbff] p-3 text-[#071033] outline-none ring-0 placeholder:text-[#6b7b9a] focus:border-[#0b63ff]"
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#dfe9ff] bg-[#f9fbff] p-3 text-[#071033] outline-none focus:border-[#0b63ff]"
            >
              <option>SEO</option>
              <option>Website Development</option>
              <option>Google Business Profile</option>
              <option>Content Writing</option>
              <option>Graphics Design</option>
              <option>Multiple Services</option>
            </select>
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
            className="h-32 w-full rounded-lg border border-[#dfe9ff] bg-[#f9fbff] p-3 text-[#071033] outline-none placeholder:text-[#6b7b9a] focus:border-[#0b63ff]"
          />
          <div>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="rounded-md bg-gradient-to-r from-[#d4a017] to-[#f0c75a] px-6 py-3 font-semibold text-[#071033] shadow-[0_10px_24px_rgba(212,160,23,0.35)] disabled:cursor-not-allowed disabled:opacity-55"
            >
              {isSubmitting ? 'Sending...' : 'Send Enquiry'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
