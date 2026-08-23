import { motion } from 'framer-motion'

const items = [
  {id:1,title:'Discover',desc:'Understand the business, audience, competitors and goals.'},
  {id:2,title:'Plan',desc:'Create the digital strategy, structure and roadmap.'},
  {id:3,title:'Build',desc:'Develop the website, content and creative assets.'},
  {id:4,title:'Optimize',desc:'Improve SEO, local visibility, performance and UX.'},
  {id:5,title:'Grow',desc:'Measure results and continuously improve.'}
]

export default function Process(){
  return (
    <section id="process" className="section bg-white">
      <div className="container">
        <h2 className="text-2xl font-semibold text-[#071033]">How We Grow Your Business</h2>
        <div className="mt-8 space-y-4">
          {items.map((it,i)=> (
            <motion.div key={it.id} initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.08}} className="rounded-xl border border-[#dfe9ff] bg-[#f9fbff] p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="text-lg font-bold text-[#0b63ff]">0{it.id}</div>
                <div>
                  <h4 className="font-semibold text-[#071033]">{it.title}</h4>
                  <p className="text-sm leading-6 text-[#384868]">{it.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
