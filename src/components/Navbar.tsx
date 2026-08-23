import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[#2a3d68] bg-[#10264d]/95 backdrop-blur-md">
      <div className="container flex items-center justify-between gap-4 py-3">
        <a href="#home" className="brand-mark flex items-center">
          <img src="/vanexa-logo.png" alt="VANEXA" className="h-12 w-auto object-contain md:h-14" />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#edf6ff] md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[#d7b15d]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-[#d7b15d] px-5 py-3 text-lg font-bold text-[#10264d] shadow-[0_10px_22px_rgba(215,177,93,0.18)] transition hover:brightness-105"
          >
            Get Started
          </a>
        </div>

        <div className="md:hidden">
          <button
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md border border-[#3a4e7d] bg-[#1a335b] p-2 text-[#edf6ff] transition hover:bg-[#223b67]"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#2a3d68] bg-[#10264d] md:hidden">
          <nav className="container flex flex-col py-4 text-base font-medium text-[#edf6ff]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-[#243c68] px-1 py-3 last:border-b-0 transition hover:text-[#d7b15d]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#d7b15d] px-5 py-3 text-base font-bold text-[#10264d] shadow-[0_10px_22px_rgba(215,177,93,0.18)]"
            >
              Get Started
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
