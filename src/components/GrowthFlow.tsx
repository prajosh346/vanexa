
const steps = [
  {title:'Build', desc:'Website + Brand'},
  {title:'Optimize', desc:'SEO + Google Business'},
  {title:'Attract', desc:'Search + Content'},
  {title:'Convert', desc:'Design + User Experience'},
  {title:'Grow', desc:'Traffic + Leads + Business'}
]

export default function GrowthFlow(){
  return (
    <section className="section bg-[#edf4ff]">
      <div className="container">
        <h3 className="text-xl font-semibold text-[#071033]">Digital Growth Flow</h3>
        <p className="mt-2 max-w-2xl text-[#3b4d73]">Build → Optimize → Attract → Convert → Grow</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-5">
          {steps.map((s,i)=> (
            <div key={s.title} className="rounded-xl border border-[#dfe9ff] bg-white p-4 text-center shadow-sm">
              <div className="text-lg font-bold text-[#d4a017]">{String(i+1).padStart(2,'0')}</div>
              <h4 className="mt-2 font-semibold text-[#071033]">{s.title}</h4>
              <p className="mt-1 text-sm text-[#384868]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
