
export default function CTA(){
  return (
    <section className="section bg-[linear-gradient(180deg,#f5f2ec_0%,#fffdfa_100%)] text-black">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h3 className="text-2xl font-bold text-black">Ready to Grow Beyond?</h3>
          <p className="mt-2 max-w-2xl text-[#5c5750]">Let's build a digital presence that helps your business get discovered, trusted and chosen.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="rounded-md bg-[#d9a441] px-5 py-3 font-semibold text-black shadow-[0_10px_24px_rgba(169,111,36,0.2)]">Start a Project</a>
          <a href="#contact" className="rounded-md border border-[#d9a441] bg-white px-5 py-3 font-semibold text-black transition hover:border-[#a96f24] hover:text-[#a96f24]">Talk to Us</a>
        </div>
      </div>
    </section>
  )
}
