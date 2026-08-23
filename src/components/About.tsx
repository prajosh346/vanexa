
export default function About(){
  return (
    <section id="about" className="section bg-[#f4f7ff]">
      <div className="container grid items-start gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold text-[#071033]">We Don't Just Build Digital Presence. We Build Digital Growth.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#384868]">Your website, search visibility, content and brand should work together — not separately. VANEXA brings these digital services together to create a stronger online presence for your business.</p>
        </div>
        <div className="grid gap-4">
          <div className="rounded-xl border border-[#dfe9ff] bg-white p-4 shadow-sm">
            <h4 className="font-semibold text-[#071033]">Strategy</h4>
            <p className="mt-1 text-sm text-[#384868]">Every project starts with understanding the business and its goals.</p>
          </div>
          <div className="rounded-xl border border-[#dfe9ff] bg-white p-4 shadow-sm">
            <h4 className="font-semibold text-[#071033]">Visibility</h4>
            <p className="mt-1 text-sm text-[#384868]">We help businesses become easier to discover online.</p>
          </div>
          <div className="rounded-xl border border-[#dfe9ff] bg-white p-4 shadow-sm">
            <h4 className="font-semibold text-[#071033]">Growth</h4>
            <p className="mt-1 text-sm text-[#384868]">Everything we build is focused on creating long-term business value.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
