
const items = [
  {title:'One Digital Partner',desc:'SEO, websites, content, Google Business and graphics under one roof.'},
  {title:'Business-Focused',desc:'We focus on business goals, not just beautiful designs.'},
  {title:'SEO-Ready Development',desc:'Websites are structured with search visibility and performance in mind.'},
  {title:'Long-Term Growth',desc:'We focus on sustainable digital growth instead of temporary results.'}
]

export default function WhyVanexa(){
  return (
    <section className="section">
      <div className="container">
        <h3 className="text-2xl font-semibold">Why Businesses Choose VANEXA</h3>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(it=> (
            <div key={it.title} className="p-4 border rounded-lg">
              <h4 className="font-semibold">{it.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
