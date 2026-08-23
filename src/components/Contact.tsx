
export default function Contact(){
  return (
    <section id="contact" className="section">
      <div className="container grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold">Let's Talk About Your Growth</h2>
          <p className="text-gray-600 mt-2">Share a few details and we'll get back to you to discuss your project.</p>
          <div className="mt-6 text-sm text-gray-600">
            <div>Email: hello[at]yourdomain.com</div>
            <div>Phone: +91 00000 00000</div>
            <div>Location: Pune, Maharashtra, India</div>
          </div>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input placeholder="Name" className="p-3 border rounded" />
            <input placeholder="Business Name" className="p-3 border rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input placeholder="Email" className="p-3 border rounded" />
            <input placeholder="Phone" className="p-3 border rounded" />
          </div>
          <select className="p-3 border rounded w-full">
            <option>SEO</option>
            <option>Website Development</option>
            <option>Google Business Profile</option>
            <option>Content Writing</option>
            <option>Graphics Design</option>
            <option>Multiple Services</option>
          </select>
          <textarea placeholder="Message" className="p-3 border rounded w-full h-32" />
          <div>
            <button className="px-6 py-3 bg-vanexa-gold rounded font-semibold">Send Enquiry</button>
          </div>
        </form>
      </div>
    </section>
  )
}
