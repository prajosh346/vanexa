
export default function Navbar(){
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-slate-200 z-40">
      <div className="container flex items-center justify-between py-3">
        <a href="#home" className="brand-mark flex items-center">
          <img src="/src/assets/vanexa-logo.png" alt="VANEXA" className="h-14 md:h-16 w-auto object-contain" />
        </a>
        <nav className="hidden md:flex gap-8 items-center text-sm text-gray-700">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="hidden md:block">
          <a href="#contact" className="inline-flex items-center px-4 py-2 bg-vanexa-gold text-black rounded-md font-semibold shadow-sm">Get Started</a>
        </div>
        <div className="md:hidden">
          <button aria-label="Open menu" className="p-2 rounded-md border border-slate-200">☰</button>
        </div>
      </div>
    </header>
  )
}
