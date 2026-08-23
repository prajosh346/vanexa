
export default function CTA(){
  return (
    <section className="section bg-[linear-gradient(180deg,#edf6ff_0%,#f7fbff_100%)] text-[#10264d]">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h3 className="text-2xl font-bold text-[#10264d]">Ready to Grow Beyond?</h3>
          <p className="mt-2 max-w-2xl text-[#405274]">Let's build a digital presence that helps your business get discovered, trusted and chosen.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="rounded-md bg-[#3d7af5] px-5 py-3 font-semibold text-white shadow-[0_10px_24px_rgba(61,122,245,0.2)]">Start a Project</a>
          <a href="#contact" className="rounded-md border border-[#bfd9ff] bg-white px-5 py-3 font-semibold text-[#10264d] transition hover:border-[#3d7af5] hover:text-[#3d7af5]">Talk to Us</a>
        </div>
      </div>
    </section>
  )
}
