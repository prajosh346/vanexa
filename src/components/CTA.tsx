
export default function CTA(){
  return (
    <section className="section bg-vanexa-blue text-white">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold">Ready to Grow Beyond?</h3>
          <p className="mt-2 opacity-90">Let's build a digital presence that helps your business get discovered, trusted and chosen.</p>
        </div>
        <div className="flex gap-3">
          <a href="#contact" className="px-5 py-3 bg-vanexa-gold text-black rounded-md font-semibold">Start a Project</a>
          <a href="#contact" className="px-5 py-3 border rounded-md">Talk to Us</a>
        </div>
      </div>
    </section>
  )
}
