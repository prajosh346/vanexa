import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa6'

import { socialMediaLinks } from '../data/socialLinks'

const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
} as const

const hoverClasses = {
  facebook: 'hover:text-[#1877F2]',
  instagram: 'hover:text-[#E4405F]',
  linkedin: 'hover:text-[#0A66C2]',
} as const

type SocialMediaIconsProps = {
  theme?: 'dark' | 'light'
  className?: string
}

export default function SocialMediaIcons({
  theme = 'dark',
  className = '',
}: SocialMediaIconsProps) {
  const wrapperClasses =
    theme === 'dark'
      ? 'text-[#071033]'
      : 'text-[#f8f4ed]'

  const linkClasses =
    theme === 'dark'
      ? 'border border-[#dfe9ff] bg-white text-[#071033] hover:border-[#0b63ff] hover:text-[#0b63ff]'
      : 'border border-[#2a3858] bg-[#0f172a]/40 text-[#f8f4ed] hover:border-[#d7b15d] hover:text-[#d7b15d]'

  return (
    <div className={`flex items-center gap-3 ${wrapperClasses} ${className}`}>
      {socialMediaLinks.map(({ id, label, href }) => {
        const Icon = iconMap[id]

        return (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit Vanexa Studio on ${label}`}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(11,99,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b63ff] focus-visible:ring-offset-2 ${linkClasses} ${hoverClasses[id]}`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        )
      })}
    </div>
  )
}
