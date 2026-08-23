import { testimonials } from '../data/testimonials'

export default function Testimonials(){
  return (
    <section className="section">
      <div className="container">
        <h2 className="text-2xl font-semibold">What Our Clients Say</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {testimonials.map(t=> (
            <div key={t.id} className="p-4 border rounded-lg">
              <p className="italic">“{t.quote}”</p>
              <div className="mt-3 font-semibold">{t.author}</div>
              <div className="text-sm text-gray-600">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
