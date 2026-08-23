import emailjs from "@emailjs/browser";
import { type ChangeEvent, useEffect, useState } from "react";

const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_4ko9egl";

const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_p5gi66o";

const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "7lO21T4jEhhyrujjP";

const defaultForm = {
  name: "",
  businessName: "",
  phone: "",
  service: "SEO",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(defaultForm);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!statusMessage) return;

    const timer = window.setTimeout(() => {
      setStatusMessage(null);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [statusMessage]);

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.message.trim() !== "";

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (statusMessage) {
      setStatusMessage(null);
    }
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const name = formData.name.trim();
    const business = formData.businessName.trim() || "N/A";
    const phone = formData.phone.trim();
    const service = formData.service.trim();
    const message = formData.message.trim();

    // These names exactly match the EmailJS template:
    // {{name}}
    // {{business}}
    // {{phone}}
    // {{service}}
    // {{message}}
    const templateParams = {
      name,
      business,
      phone,
      service,
      message,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      setFormData(defaultForm);

      setStatusMessage({
        type: "success",
        text: "Your enquiry has been sent successfully.",
      });
    } catch (error) {
      console.error("EmailJS send failed:", error);

      setStatusMessage({
        type: "error",
        text: "Unable to send your enquiry. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section bg-[#f4f7ff]">
      <div className="container grid gap-8 md:grid-cols-2">
        {/* Left Content */}
        <div>
          <h2 className="text-2xl font-semibold text-[#071033]">
            Let's Talk About Your Growth
          </h2>

          <p className="mt-2 text-[#384868]">
            Share a few details and we'll get back to you to discuss your
            project.
          </p>

          <div className="mt-6 space-y-2 text-sm text-[#384868]">
            <div>Email: vanexastudio@gmail.com</div>
            <div>Phone: 9405243860</div>
            <div>Location: Pune, Maharashtra, India</div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-[#dfe9ff] bg-white p-5 shadow-[0_18px_40px_rgba(7,16,51,0.05)]"
        >
          {/* Name + Business Name */}
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

          {/* Phone + Service */}
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

          {/* Message */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            required
            className="h-32 w-full rounded-lg border border-[#dfe9ff] bg-[#f9fbff] p-3 text-[#071033] outline-none placeholder:text-[#6b7b9a]"
          />

          {/* Status */}
          {statusMessage && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                statusMessage.type === "success"
                  ? "border-[#cfe7d7] bg-[#edfdf3] text-[#1a6d43]"
                  : "border-[#f4d2d2] bg-[#fff2f2] text-[#9c2e2e]"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="rounded-md bg-linear-to-r from-[#d4a017] to-[#f0c75a] px-6 py-3 font-semibold text-[#071033] shadow-[0_10px_24px_rgba(212,160,23,0.35)] disabled:cursor-not-allowed disabled:opacity-55"
            >
              {isSubmitting ? "Sending..." : "Send Enquiry"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
