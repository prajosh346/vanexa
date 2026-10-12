import emailjs from '@emailjs/browser';
import { useState } from 'react';

import { buildWhatsAppUrl, getWhatsAppTemplate } from '../data/whatsapp';

const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_4ko9egl';

const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_p5gi66o';

const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '7lO21T4jEhhyrujjP';

const serviceOptions = [
  'Website Development',
  'Website Updation or Maintenance',
  'SEO & AI Search Optimization',
  'Google Business Profile Management',
  'Social Media Management',
  'Graphic Design & Branding',
  'Content Writing',
  'Multiple Services',
] as const;

type FormState = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: (typeof serviceOptions)[number];
  websiteUrl: string;
  businessCategory: string;
  requiredServices: string;
  projectScope: string;
  timeline: string;
  budget: string;
  notes: string;
};

const defaultForm: FormState = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  service: 'Website Development',
  websiteUrl: '',
  businessCategory: '',
  requiredServices: '',
  projectScope: '',
  timeline: '',
  budget: '',
  notes: '',
};

function normalizeService(service: string) {
  return service.trim();
}

function buildEstimatorSummary(form: FormState) {
  const entries = [
    `Service: ${form.service}`,
    form.name ? `Name: ${form.name}` : '',
    form.businessName ? `Business name: ${form.businessName}` : '',
    form.email ? `Email: ${form.email}` : '',
    form.phone ? `Phone: ${form.phone}` : '',
    form.websiteUrl ? `Website URL: ${form.websiteUrl}` : '',
    form.businessCategory ? `Business category: ${form.businessCategory}` : '',
    form.requiredServices ? `Required services: ${form.requiredServices}` : '',
    form.projectScope ? `Project scope: ${form.projectScope}` : '',
    form.timeline ? `Preferred timeline: ${form.timeline}` : '',
    form.budget ? `Budget range: ${form.budget}` : '',
    form.notes ? `Additional requirements: ${form.notes}` : '',
  ].filter(Boolean);

  return entries.join('\n');
}

const serviceSpecificFields: Record<string, string[]> = {
  'Website Development': ['websiteUrl', 'businessCategory', 'projectScope', 'timeline', 'budget'],
  'Website Updation or Maintenance': ['websiteUrl', 'businessCategory', 'projectScope', 'timeline', 'budget'],
  'SEO & AI Search Optimization': ['websiteUrl', 'businessCategory', 'projectScope', 'timeline', 'budget'],
  'Google Business Profile Management': ['businessCategory', 'requiredServices', 'timeline', 'budget'],
  'Social Media Management': ['businessCategory', 'requiredServices', 'timeline', 'budget'],
  'Graphic Design & Branding': ['businessCategory', 'requiredServices', 'timeline', 'budget'],
  'Content Writing': ['businessCategory', 'requiredServices', 'timeline', 'budget'],
  'Multiple Services': ['requiredServices', 'businessCategory', 'projectScope', 'timeline', 'budget'],
};

export default function ProjectEstimator() {
  const [formData, setFormData] = useState<FormState>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const visibleFields = serviceSpecificFields[normalizeService(formData.service)] ?? serviceSpecificFields['Website Development'];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (status) {
      setStatus(null);
    }
  };

  const handleWhatsApp = () => {
    const summary = buildEstimatorSummary(formData);
    const template = getWhatsAppTemplate(formData.service);
    const message = `${template}\n\nProject requirements:\n${summary}`;

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setStatus({ type: 'error', text: 'Please enter your name.' });
      return;
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      setStatus({ type: 'error', text: 'Please provide either an email address or a phone number.' });
      return;
    }

    const summary = buildEstimatorSummary(formData);

    setIsSubmitting(true);
    setStatus(null);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          business: formData.businessName || 'N/A',
          phone: formData.phone || 'Not provided',
          service: `${formData.service} - Project Estimator`,
          message: summary,
        },
        EMAILJS_PUBLIC_KEY,
      );

      setStatus({
        type: 'success',
        text: 'Your project requirements have been submitted successfully. We will get back to you soon.',
      });
      setFormData(defaultForm);
    } catch (error) {
      console.error('Project estimator submission failed:', error);
      setStatus({
        type: 'error',
        text: 'We could not submit the enquiry automatically. Please continue on WhatsApp to send your project details directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="estimator" className="section bg-[#f4f7ff]">
      <div className="container">
        <div className="mx-auto max-w-5xl rounded-[30px] border border-[#e8dfcf] bg-white p-5 shadow-[0_22px_50px_rgba(169,111,36,0.08)] md:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a96f24]">Project estimator</p>
            <h2 className="mt-3 text-3xl font-bold text-[#071033] md:text-4xl">Tell us about your project</h2>
            <p className="mt-3 text-base leading-7 text-[#5c5750]">
              Share your requirements and we will help recommend the right services for your goals, audience and growth stage.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#071033]">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#e8dfcf] bg-[#f9fbff] p-3 text-[#071033] outline-none focus:border-[#a96f24]"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#071033]">Business name</label>
              <input
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#e8dfcf] bg-[#f9fbff] p-3 text-[#071033] outline-none focus:border-[#a96f24]"
                placeholder="Your business"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#071033]">Email address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#e8dfcf] bg-[#f9fbff] p-3 text-[#071033] outline-none focus:border-[#a96f24]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#071033]">Phone / WhatsApp</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#e8dfcf] bg-[#f9fbff] p-3 text-[#071033] outline-none focus:border-[#a96f24]"
                placeholder="9405243860"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#071033]">Select a service</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#e8dfcf] bg-[#f9fbff] p-3 text-[#071033] outline-none focus:border-[#a96f24]"
              >
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {visibleFields.includes('websiteUrl') && (
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#071033]">Existing website URL</label>
                <input
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#e8dfcf] bg-[#f9fbff] p-3 text-[#071033] outline-none focus:border-[#a96f24]"
                  placeholder="https://example.com"
                />
              </div>
            )}

            {visibleFields.includes('businessCategory') && (
              <div>
                <label className="mb-2 block text-sm font-medium text-[#071033]">Business category</label>
                <input
                  name="businessCategory"
                  value={formData.businessCategory}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#e8dfcf] bg-[#f9fbff] p-3 text-[#071033] outline-none focus:border-[#a96f24]"
                  placeholder="Restaurant, salon, retail, etc."
                />
              </div>
            )}

            {visibleFields.includes('requiredServices') && (
              <div>
                <label className="mb-2 block text-sm font-medium text-[#071033]">Required services</label>
                <input
                  name="requiredServices"
                  value={formData.requiredServices}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#e8dfcf] bg-[#f9fbff] p-3 text-[#071033] outline-none focus:border-[#a96f24]"
                  placeholder="SEO, website, content, design"
                />
              </div>
            )}

            {visibleFields.includes('projectScope') && (
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#071033]">Project scope / number of pages</label>
                <input
                  name="projectScope"
                  value={formData.projectScope}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#e8dfcf] bg-[#f9fbff] p-3 text-[#071033] outline-none focus:border-[#a96f24]"
                  placeholder="For example: 5-page website, brochure site, landing page or redesign"
                />
              </div>
            )}

            {visibleFields.includes('timeline') && (
              <div>
                <label className="mb-2 block text-sm font-medium text-[#071033]">Expected timeline</label>
                <input
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#e8dfcf] bg-[#f9fbff] p-3 text-[#071033] outline-none focus:border-[#a96f24]"
                  placeholder="2-4 weeks"
                />
              </div>
            )}

            {visibleFields.includes('budget') && (
              <div>
                <label className="mb-2 block text-sm font-medium text-[#071033]">Estimated budget range</label>
                <input
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#e8dfcf] bg-[#f9fbff] p-3 text-[#071033] outline-none focus:border-[#a96f24]"
                  placeholder="Optional"
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#071033]">Additional requirements</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="h-28 w-full rounded-xl border border-[#e8dfcf] bg-[#f9fbff] p-3 text-[#071033] outline-none focus:border-[#a96f24]"
                placeholder="Tell us more about your goals, audience, and what success looks like."
              />
            </div>

            <div className="md:col-span-2">
              <div className="rounded-2xl border border-[#e8dfcf] bg-[#f9fbff] p-4">
                <div className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#a96f24]">Requirements summary</div>
                <pre className="whitespace-pre-wrap text-sm leading-6 text-[#071033]">{buildEstimatorSummary(formData)}</pre>
              </div>
            </div>

            {status && (
              <div
                className={`md:col-span-2 rounded-2xl border px-4 py-3 text-sm font-medium ${
                  status.type === 'success'
                    ? 'border-[#cfe7d7] bg-[#edfdf3] text-[#1a6d43]'
                    : 'border-[#f4d2d2] bg-[#fff2f2] text-[#9c2e2e]'
                }`}
              >
                {status.text}
              </div>
            )}

            <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-[#d9a441] px-6 py-3 font-semibold text-black shadow-[0_10px_24px_rgba(169,111,36,0.2)] transition hover:bg-[#f4ca74] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center rounded-full border border-[#d9a441] bg-white px-6 py-3 font-semibold text-black transition hover:border-[#a96f24] hover:text-[#a96f24]"
              >
                Continue on WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
