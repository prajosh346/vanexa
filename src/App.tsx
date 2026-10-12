import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Process from './components/Process'
import Results from './components/Results'
import WhyVanexa from './components/WhyVanexa'
import LocalBusinessGrowth from './components/LocalBusinessGrowth'
import ProjectEstimator from './components/ProjectEstimator'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsPage from './pages/TermsPage'

function HomePage(){
  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1a1917]">
      <Navbar />
      <main className="pt-24 md:pt-28">
        <Hero />
        <Services />
        <About />
        <LocalBusinessGrowth />
        <Process />
        <Results />
        <WhyVanexa />
        <ProjectEstimator />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
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
