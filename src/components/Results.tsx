import { motion } from 'framer-motion'

const metrics = [
  {label:'+ Organic Visibility', note:'Improved search presence'},
  {label:'+ Website Performance', note:'Faster pages and better experience'},
  {label:'+ Local Discovery', note:'Higher local visibility'},
  {label:'+ Qualified Leads', note:'Better conversion quality'}
]

export default function Results(){
  return (
    <section className="section bg-vanexa-navy text-white">
      <div className="container">
        <h2 className="text-2xl font-semibold">Growth Is More Than a Number</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m,i)=>(
            <motion.div key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} className="p-6 bg-white/6 rounded-lg text-left">
              <div className="font-bold text-xl">{m.label}</div>
              <div className="text-sm opacity-80 mt-1">{m.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
