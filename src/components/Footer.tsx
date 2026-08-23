
export default function Footer(){
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container grid md:grid-cols-3 gap-4 items-start">
        <div>
          <img src="/src/assets/vanexa-logo.png" alt="VANEXA" className="h-14 md:h-16 w-auto object-contain" />
          <p className="mt-3 text-sm opacity-80">GROW DIGITALLY. GROW BEYOND.</p>
        </div>
        <div className="text-sm">
          <div className="font-semibold">Navigation</div>
          <div className="mt-2 space-y-1">
            <a href="#home">Home</a><br/>
            <a href="#services">Services</a><br/>
            <a href="#about">About</a><br/>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="text-sm">
          <div className="font-semibold">Legal</div>
          <div className="mt-2 space-y-1">
            <a href="#">Privacy Policy</a><br/>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
      <div className="container mt-8 text-sm text-gray-400">© 2026 VANEXA. All rights reserved.</div>
    </footer>
  )
}
