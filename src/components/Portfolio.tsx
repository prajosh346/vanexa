import { projects } from '../data/projects'

export default function Portfolio(){
  return (
    <section id="work" className="section bg-[#f4f7ff]">
      <div className="container">
        <h2 className="text-2xl font-semibold text-[#071033]">Work That Speaks</h2>
        <p className="mt-2 text-[#384868]">A selection of recent projects and case studies.</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(p=> (
            <a key={p.id} className="group block overflow-hidden rounded-xl border border-[#dfe9ff] bg-white shadow-sm">
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-[#0b63ff]/15 via-[#dfe9ff] to-[#d4a017]/20 text-[#071033]">Image</div>
              <div className="border-t border-[#dfe9ff] p-4">
                <div className="text-sm text-[#3b4d73]">{p.category} · {p.service}</div>
                <h4 className="mt-1 font-semibold text-[#071033]">{p.title}</h4>
                <p className="mt-2 text-sm leading-6 text-[#384868]">{p.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
