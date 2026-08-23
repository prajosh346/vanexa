import type { LucideIcon } from 'lucide-react'

type Props = {
  title: string
  description: string
  cta: string
  Icon?: LucideIcon
}

export default function ServiceCard({title,description,cta,Icon}:Props){
  return (
    <div className="p-6 border rounded-xl hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        {Icon ? <Icon className="w-8 h-8 text-vanexa-blue" /> : <div className="w-8 h-8 bg-gray-200 rounded"/>}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-4 text-sm text-gray-600">{description}</p>
      <div className="mt-6">
        <a href="#services" className="text-vanexa-blue font-medium">{cta} →</a>
      </div>
    </div>
  )
}
