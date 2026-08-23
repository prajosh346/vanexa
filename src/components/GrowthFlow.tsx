
const steps = [
  {title:'Build', desc:'Website + Brand'},
  {title:'Optimize', desc:'SEO + Google Business'},
  {title:'Attract', desc:'Search + Content'},
  {title:'Convert', desc:'Design + User Experience'},
  {title:'Grow', desc:'Traffic + Leads + Business'}
]

export default function GrowthFlow(){
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <h3 className="text-xl font-semibold">Digital Growth Flow</h3>
        <p className="text-gray-600 mt-2 max-w-2xl">Build → Optimize → Attract → Convert → Grow</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-5 gap-6">
          {steps.map((s,i)=> (
            <div key={s.title} className="p-4 bg-white border rounded-lg text-center">
              <div className="text-vanexa-gold font-bold text-lg">{String(i+1).padStart(2,'0')}</div>
              <h4 className="mt-2 font-semibold">{s.title}</h4>
              <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
