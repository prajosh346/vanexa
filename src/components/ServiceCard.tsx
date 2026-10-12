import type { LucideIcon } from 'lucide-react'

import { buildWhatsAppUrl, getWhatsAppTemplate } from '../data/whatsapp'

type Props = {
  title: string
  description: string
  cta: string
  slug?: string
  Icon?: LucideIcon
}

export default function ServiceCard({title,description,cta,slug,Icon}:Props){
  const whatsappUrl = buildWhatsAppUrl(getWhatsAppTemplate(title))
  const detailsUrl = slug ? `/services/${slug}` : '#services'

  return (
    <div className="rounded-2xl border border-[#dfe9ff] bg-white p-6 shadow-[0_16px_40px_rgba(7,16,51,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(11,99,255,0.12)]">
      <div className="flex items-center gap-4">
        {Icon ? <Icon className="h-8 w-8 text-[#0b63ff]" /> : <div className="h-8 w-8 rounded bg-[#eaf2ff]" />}
        <h3 className="text-lg font-semibold text-[#071033]">{title}</h3>
      </div>
      <p className="mt-4 text-sm leading-6 text-[#384868]">{description}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a href={detailsUrl} className="inline-flex items-center justify-center rounded-full border border-[#dfe9ff] bg-[#f9fbff] px-3 py-2 text-sm font-medium text-[#071033] transition hover:border-[#a96f24] hover:text-[#a96f24]">Learn more</a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#d9a441] px-3 py-2 text-sm font-semibold text-black shadow-[0_10px_20px_rgba(169,111,36,0.16)] transition hover:bg-[#f4ca74]">{cta}</a>
      </div>
    </div>
  )
}
