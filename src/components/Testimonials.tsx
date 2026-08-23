import { testimonials } from '../data/testimonials'

export default function Testimonials(){
  return (
    <section className="section bg-[#edf4ff]">
      <div className="container">
        <h2 className="text-2xl font-semibold text-[#071033]">What Our Clients Say</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map(t=> (
            <div key={t.id} className="rounded-xl border border-[#dfe9ff] bg-white p-4 shadow-sm">
              <p className="italic text-[#1e2f52]">“{t.quote}”</p>
              <div className="mt-3 font-semibold text-[#071033]">{t.author}</div>
              <div className="text-sm text-[#384868]">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
