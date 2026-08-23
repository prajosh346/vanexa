
const navigateTo = (path: string) => {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function Footer(){
  return (
    <footer className="bg-[#10264d] py-8 text-[#edf6ff]">
      <div className="container grid items-start gap-4 md:grid-cols-3">
        <div>
          <img src="/vanexa-logo.png" alt="VANEXA" className="h-14 w-auto object-contain md:h-16" />
          <p className="mt-3 text-sm text-[#cfe1ff]">GROW DIGITALLY. GROW BEYOND.</p>
        </div>
        <div className="text-sm">
          <div className="font-semibold text-[#d7b15d]">Navigation</div>
          <div className="mt-2 space-y-1 text-[#dfeeff]">
            <a href="#home" className="block hover:text-[#d7b15d]">Home</a>
            <a href="#services" className="block hover:text-[#d7b15d]">Services</a>
            <a href="#about" className="block hover:text-[#d7b15d]">About</a>
            <a href="#contact" className="block hover:text-[#d7b15d]">Contact</a>
          </div>
        </div>
        <div className="text-sm">
          <div className="font-semibold text-[#d7b15d]">Legal</div>
          <div className="mt-2 space-y-1 text-[#dfeeff]">
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigateTo('/privacy-policy') }} className="block hover:text-[#d7b15d]">Privacy Policy</a>
            <a href="/terms-and-conditions" onClick={(e) => { e.preventDefault(); navigateTo('/terms-and-conditions') }} className="block hover:text-[#d7b15d]">Terms & Conditions</a>
          </div>
        </div>
      </div>
      <div className="container mt-8 text-sm text-[#cfe1ff]">© 2026 VANEXA. All rights reserved.</div>
    </footer>
  )
}
