import { projects } from '../data/projects'

export default function Portfolio(){
  return (
    <section id="work" className="section bg-gray-50">
      <div className="container">
        <h2 className="text-2xl font-semibold">Work That Speaks</h2>
        <p className="text-gray-600 mt-2">A selection of recent projects and case studies.</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p=> (
            <a key={p.id} className="block rounded overflow-hidden group">
              <div className="h-40 bg-gray-200 flex items-center justify-center">Image</div>
              <div className="p-4 bg-white border-t">
                <div className="text-sm text-gray-500">{p.category} · {p.service}</div>
                <h4 className="font-semibold mt-1">{p.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{p.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
