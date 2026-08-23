
const items = [
  {title:'One Digital Partner',desc:'SEO, websites, content, Google Business and graphics under one roof.'},
  {title:'Business-Focused',desc:'We focus on business goals, not just beautiful designs.'},
  {title:'SEO-Ready Development',desc:'Websites are structured with search visibility and performance in mind.'},
  {title:'Long-Term Growth',desc:'We focus on sustainable digital growth instead of temporary results.'}
]

export default function WhyVanexa(){
  return (
    <section className="section bg-white">
      <div className="container">
        <h3 className="text-2xl font-semibold text-[#071033]">Why Businesses Choose VANEXA</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(it=> (
            <div key={it.title} className="rounded-xl border border-[#dfe9ff] bg-[#f9fbff] p-4 shadow-sm">
              <h4 className="font-semibold text-[#071033]">{it.title}</h4>
              <p className="mt-1 text-sm leading-6 text-[#384868]">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
