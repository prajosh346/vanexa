
import SocialMediaIcons from './SocialMediaIcons'

const navigateTo = (path: string) => {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-black py-8 text-[#f8f4ed]">
      <div className="container grid items-start gap-6 md:grid-cols-3">
        <div>
          <button type="button" onClick={() => navigateTo('/')} className="inline-flex items-center">
            <img src="/Vanexa.png" alt="VANEXA Studio" className="h-20 w-20 object-contain md:h-24 md:w-24" />
          </button>
          <p className="mt-3 text-sm text-[#cfe1ff]">GROW DIGITALLY. GROW BEYOND.</p>
        </div>
        <div className="text-sm">
          <div className="font-semibold text-[#d7b15d]">Navigation</div>
          <div className="mt-2 space-y-1 text-[#dfeeff]">
            <button type="button" onClick={() => navigateTo('/')} className="block w-full text-left hover:text-[#d7b15d]">Home</button>
            <button type="button" onClick={() => navigateTo('/services')} className="block w-full text-left hover:text-[#d7b15d]">Services</button>
            <button type="button" onClick={() => navigateTo('/about')} className="block w-full text-left hover:text-[#d7b15d]">About</button>
            <button type="button" onClick={() => navigateTo('/blog')} className="block w-full text-left hover:text-[#d7b15d]">Blog</button>
            <button type="button" onClick={() => navigateTo('/contact')} className="block w-full text-left hover:text-[#d7b15d]">Contact</button>
          </div>
        </div>
        <div className="text-sm">
          <div className="font-semibold text-[#d7b15d]">Legal</div>
          <div className="mt-2 space-y-1 text-[#dfeeff]">
            <button type="button" onClick={() => navigateTo('/privacy-policy')} className="block w-full text-left hover:text-[#d7b15d]">Privacy Policy</button>
            <button type="button" onClick={() => navigateTo('/terms-and-conditions')} className="block w-full text-left hover:text-[#d7b15d]">Terms & Conditions</button>
            <button type="button" onClick={() => navigateTo('/disclaimer')} className="block w-full text-left hover:text-[#d7b15d]">Disclaimer</button>
          </div>
          <div className="mt-5">
            <div className="mb-2 font-semibold text-[#d7b15d]">Follow Us</div>
            <SocialMediaIcons theme="light" />
          </div>
        </div>
      </div>
      <div className="container mt-8 text-sm text-[#cfe1ff]">© 2026 VANEXA. All rights reserved.</div>
    </footer>
  )
}
