import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Process from './components/Process'
import Results from './components/Results'
import WhyVanexa from './components/WhyVanexa'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsPage from './pages/TermsPage'

function HomePage(){
  return (
    <div className="min-h-screen bg-[#f7fbff] text-[#1f2d4c]">
      <Navbar />
      <main className="pt-0">
        <Hero />
        <Services />
        <About />
        <Process />
        <Results />
        <WhyVanexa />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function App(){
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const handleRouteChange = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  if (path === '/privacy-policy') return <PrivacyPolicyPage />
  if (path === '/terms-and-conditions') return <TermsPage />

  return <HomePage />
}

export default App
