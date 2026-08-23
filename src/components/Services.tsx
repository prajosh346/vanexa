import ServiceCard from './ServiceCard'
import { services } from '../data/services'
import { Search, Code, MapPin, Pen, Palette } from 'lucide-react'

const iconMap:any = { Search, Code, MapPin, Pen, Palette }

export default function Services(){
  return (
    <section id="services" className="section bg-[#f4f7ff]">
      <div className="container">
        <h2 className="text-2xl font-semibold text-[#071033]">Everything You Need to Grow Online</h2>
        <p className="mt-2 max-w-2xl text-[#384868]">From search visibility to websites and creative content, we build the digital foundation your business needs to grow.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(s=> (
            <ServiceCard key={s.id} title={s.title} description={s.description} cta={s.cta} Icon={iconMap[s.icon]} />
          ))}
        </div>
      </div>
    </section>
  )
}
