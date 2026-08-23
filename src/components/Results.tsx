import { motion } from 'framer-motion'

const metrics = [
  {label:'+ Organic Visibility', note:'Improved search presence'},
  {label:'+ Website Performance', note:'Faster pages and better experience'},
  {label:'+ Local Discovery', note:'Higher local visibility'},
  {label:'+ Qualified Leads', note:'Better conversion quality'}
]

export default function Results(){
  return (
    <section className="section bg-[linear-gradient(180deg,#edf6ff_0%,#f7fbff_100%)] text-[#10264d]">
      <div className="container">
        <h2 className="text-2xl font-semibold text-[#10264d]">Growth Is More Than a Number</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {metrics.map((m,i)=>(
            <motion.div key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} className="rounded-xl border border-[#dfeeff] bg-white p-6 text-left shadow-[0_16px_30px_rgba(61,122,245,0.08)]">
              <div className="text-xl font-bold text-[#10264d]">{m.label}</div>
              <div className="mt-1 text-sm text-[#405274]">{m.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
