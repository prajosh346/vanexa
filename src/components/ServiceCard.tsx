import type { LucideIcon } from 'lucide-react'

type Props = {
  title: string
  description: string
  cta: string
  Icon?: LucideIcon
}

export default function ServiceCard({title,description,cta,Icon}:Props){
  return (
    <div className="rounded-2xl border border-[#dfe9ff] bg-white p-6 shadow-[0_16px_40px_rgba(7,16,51,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(11,99,255,0.12)]">
      <div className="flex items-center gap-4">
        {Icon ? <Icon className="h-8 w-8 text-[#0b63ff]" /> : <div className="h-8 w-8 rounded bg-[#eaf2ff]" />}
        <h3 className="text-lg font-semibold text-[#071033]">{title}</h3>
      </div>
      <p className="mt-4 text-sm leading-6 text-[#384868]">{description}</p>
      <div className="mt-6">
        <a href="#services" className="font-medium text-[#0b63ff] transition hover:text-[#071033]">{cta} →</a>
      </div>
    </div>
  )
}
